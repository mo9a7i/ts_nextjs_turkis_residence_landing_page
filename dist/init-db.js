"use strict";

// scripts/init-db.ts
var import_node_appwrite3 = require("node-appwrite");

// scripts/config/server.ts
var import_node_appwrite = require("node-appwrite");
var getAdminConfig = () => {
  if (process.env.NODE_ENV !== "development") {
    throw new Error("Admin config is only available in development");
  }
  const client = new import_node_appwrite.Client().setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT).setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID).setKey(process.env.APPWRITE_API_KEY);
  return {
    client,
    databases: new import_node_appwrite.Databases(client)
  };
};
var appwriteConfig = {
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID
};

// scripts/config/collections.ts
var import_node_appwrite2 = require("node-appwrite");

// scripts/config/enums.ts
var enums = {
  subscriptionStatus: ["active", "cancelled", "expired"],
  pageType: ["marketing", "property", "admin"],
  domainStatus: ["pending", "active", "failed"]
};

// scripts/config/collections.ts
var collections = {
  users: {
    name: "users",
    permissions: [
      import_node_appwrite2.Permission.read(import_node_appwrite2.Role.user("{{user.$id}}")),
      import_node_appwrite2.Permission.update(import_node_appwrite2.Role.user("{{user.$id}}"))
    ],
    attributes: {
      name: { type: "string", size: 255, required: true },
      email: { type: "email", required: true },
      planId: { type: "string", size: 64, required: true },
      customDomain: { type: "string", size: 255, required: false },
      createdAt: { type: "datetime", required: true }
    }
  },
  properties: {
    name: "properties",
    permissions: [
      import_node_appwrite2.Permission.read(import_node_appwrite2.Role.any()),
      import_node_appwrite2.Permission.create(import_node_appwrite2.Role.user("{{document.userId}}")),
      import_node_appwrite2.Permission.update(import_node_appwrite2.Role.user("{{document.userId}}")),
      import_node_appwrite2.Permission.delete(import_node_appwrite2.Role.user("{{document.userId}}"))
    ],
    attributes: {
      userId: { type: "string", size: 255, required: true },
      name: { type: "string", size: 255, required: true },
      slug: { type: "string", size: 255, required: true },
      seo: { type: "string", size: 65535, required: true },
      amenities: { type: "string", size: 65535, required: true },
      location: { type: "string", size: 65535, required: true },
      images: { type: "string", size: 255, required: true },
      createdAt: { type: "datetime", required: true },
      updatedAt: { type: "datetime", required: true }
    }
  },
  subscriptions: {
    name: "subscriptions",
    permissions: [
      import_node_appwrite2.Permission.read(import_node_appwrite2.Role.user("{{document.userId}}")),
      import_node_appwrite2.Permission.update(import_node_appwrite2.Role.user("{{document.userId}}"))
    ],
    attributes: {
      userId: { type: "string", size: 255, required: true },
      planId: { type: "string", size: 64, required: true },
      status: { type: "enum", required: true, options: enums.subscriptionStatus },
      startDate: { type: "datetime", required: true },
      endDate: { type: "datetime", required: true },
      features: { type: "string", size: 65535, required: true }
    }
  },
  pageVisits: {
    name: "pageVisits",
    permissions: [
      import_node_appwrite2.Permission.read(import_node_appwrite2.Role.user("{{document.userId}}"))
    ],
    attributes: {
      userId: { type: "string", size: 255, required: true },
      propertyId: { type: "string", size: 255, required: false },
      pageType: { type: "enum", required: true, options: enums.pageType },
      timestamp: { type: "datetime", required: true },
      visitorIp: { type: "string", size: 45, required: true },
      userAgent: { type: "string", size: 255, required: true }
    }
  },
  customDomains: {
    name: "customDomains",
    permissions: [
      import_node_appwrite2.Permission.read(import_node_appwrite2.Role.user("{{document.userId}}")),
      import_node_appwrite2.Permission.update(import_node_appwrite2.Role.user("{{document.userId}}"))
    ],
    attributes: {
      userId: { type: "string", size: 255, required: true },
      domain: { type: "string", size: 255, required: true },
      status: { type: "enum", required: true, options: enums.domainStatus },
      verificationToken: { type: "string", size: 255, required: true },
      createdAt: { type: "datetime", required: true }
    }
  }
};

// scripts/config/indexes.ts
var indexes = {
  properties: [
    {
      name: "properties_user_id",
      type: "key",
      attributes: ["userId"]
    }
  ],
  pageVisits: [
    {
      name: "visits_user_timestamp",
      type: "key",
      attributes: ["userId", "timestamp"]
    }
  ]
};

// scripts/init-db.ts
async function createDatabase(databases) {
  try {
    await databases.create(
      import_node_appwrite3.ID.unique(),
      "PropertyFlow Database"
    );
    console.log("Database created successfully");
  } catch (error) {
    const appwriteError = error;
    if (appwriteError.code === 409) {
      console.log("Database already exists");
    } else {
      console.error("Error creating database:", error);
      throw error;
    }
  }
}
async function createAttribute(databases, databaseId, collectionId, name, attr) {
  switch (attr.type) {
    case "string":
      await databases.createStringAttribute(
        databaseId,
        collectionId,
        name,
        attr.size,
        attr.required
      );
      return Promise.resolve();
    case "email":
      await databases.createEmailAttribute(
        databaseId,
        collectionId,
        name,
        attr.required
      );
      return Promise.resolve();
    case "datetime":
      await databases.createDatetimeAttribute(
        databaseId,
        collectionId,
        name,
        attr.required
      );
      return Promise.resolve();
    case "enum":
      await databases.createEnumAttribute(
        databaseId,
        collectionId,
        name,
        attr.options,
        attr.required
      );
      return Promise.resolve();
    default:
      const _exhaustiveCheck = attr;
      throw new Error(`Unsupported attribute type: ${JSON.stringify(_exhaustiveCheck)}`);
  }
}
async function createCollections(databases) {
  try {
    for (const [key, config] of Object.entries(collections)) {
      const collection = await databases.createCollection(
        appwriteConfig.databaseId,
        import_node_appwrite3.ID.unique(),
        config.name,
        config.permissions.map((permission) => permission.toString())
      );
      await Promise.all(
        Object.entries(config.attributes).map(
          ([name, attr]) => createAttribute(
            databases,
            appwriteConfig.databaseId,
            collection.$id,
            name,
            attr
          )
        )
      );
    }
    console.log("Collections created successfully");
  } catch (error) {
    const appwriteError = error;
    if (appwriteError.code === 409) {
      console.log("Collections already exist");
    } else {
      console.error("Error creating collections:", error);
      throw error;
    }
  }
}
async function createIndexes(databases) {
  try {
    await Promise.all(
      Object.entries(indexes).flatMap(
        ([collectionId, collectionIndexes]) => collectionIndexes.map(
          (index) => databases.createIndex(
            appwriteConfig.databaseId,
            collectionId,
            index.name,
            index.type,
            index.attributes
          )
        )
      )
    );
    console.log("Indexes created successfully");
  } catch (error) {
    const appwriteError = error;
    if (appwriteError.code === 409) {
      console.log("Indexes already exist");
    } else {
      console.error("Error creating indexes:", error);
      throw error;
    }
  }
}
async function initializeDatabase(databases) {
  try {
    await createDatabase(databases);
    await createCollections(databases);
    await createIndexes(databases);
    console.log("Database initialization completed");
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
}
if (process.env.NODE_ENV === "development") {
  const { databases } = getAdminConfig();
  initializeDatabase(databases).then(() => console.log("Database initialized")).catch(console.error);
}
