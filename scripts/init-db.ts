import { Databases, ID, Models } from 'node-appwrite';
import { getAdminConfig } from './config/server';
import { appwriteConfig } from './config/server';
import { collections } from './config/collections';
import { indexes } from './config/indexes';
import { CollectionConfig, Attribute } from './config/types';

interface AppwriteError {
    code: number;
    message: string;
    type: string;
}

async function createDatabase(databases: Databases): Promise<void> {
    try {
        await databases.create(
            ID.unique(),
            'PropertyFlow Database'
        );
        console.log('Database created successfully');
    } catch (error) {
        const appwriteError = error as AppwriteError;
        if (appwriteError.code === 409) {
            console.log('Database already exists');
        } else {
            console.error('Error creating database:', error);
            throw error;
        }
    }
}

async function createAttribute(
    databases: Databases,
    databaseId: string,
    collectionId: string,
    name: string,
    attr: Attribute
): Promise<void> {
    switch (attr.type) {
        case 'string':
            await databases.createStringAttribute(
                databaseId,
                collectionId,
                name,
                attr.size,
                attr.required
            );
            return Promise.resolve();
        case 'email':
            await databases.createEmailAttribute(
                databaseId,
                collectionId,
                name,
                attr.required
            );
            return Promise.resolve();
        case 'datetime':
            await databases.createDatetimeAttribute(
                databaseId,
                collectionId,
                name,
                attr.required
            );
            return Promise.resolve();
        case 'enum':
            await databases.createEnumAttribute(
                databaseId,
                collectionId,
                name,
                attr.options,
                attr.required
            );
            return Promise.resolve();
        default:
            const _exhaustiveCheck: never = attr;
            throw new Error(`Unsupported attribute type: ${JSON.stringify(_exhaustiveCheck)}`);
        }
}

async function createCollections(databases: Databases): Promise<void> {
    try {
        for (const [key, config] of Object.entries(collections)) {
            // Create collection
            const collection = await databases.createCollection(
                appwriteConfig.databaseId,
                ID.unique(),
                config.name,
                config.permissions.map(permission => permission.toString())
            ) as Models.Collection;

            // Create attributes
            await Promise.all(
                Object.entries(config.attributes).map(([name, attr]) =>
                    createAttribute(
                        databases,
                        appwriteConfig.databaseId,
                        collection.$id,
                        name,
                        attr
                    )
                )
            );
        }

        console.log('Collections created successfully');
    } catch (error) {
        const appwriteError = error as AppwriteError;
        if (appwriteError.code === 409) {
            console.log('Collections already exist');
        } else {
            console.error('Error creating collections:', error);
            throw error;
        }
    }
}

async function createIndexes(databases: Databases): Promise<void> {
    try {
        await Promise.all(
            Object.entries(indexes).flatMap(([collectionId, collectionIndexes]) =>
                collectionIndexes.map(index =>
                    databases.createIndex(
                        appwriteConfig.databaseId,
                        collectionId,
                        index.name,
                        index.type,
                        index.attributes
                    )
                )
            )
        );

        console.log('Indexes created successfully');
    } catch (error) {
        const appwriteError = error as AppwriteError;
        if (appwriteError.code === 409) {
            console.log('Indexes already exist');
        } else {
            console.error('Error creating indexes:', error);
            throw error;
        }
    }
}

async function initializeDatabase(databases: Databases): Promise<void> {
    try {
        await createDatabase(databases);
        await createCollections(databases);
        await createIndexes(databases);
        console.log('Database initialization completed');
    } catch (error) {
        console.error('Error initializing database:', error);
        throw error;
    }
}

// Only runs in development
if (process.env.NODE_ENV === 'development') {
    const { databases } = getAdminConfig();
    initializeDatabase(databases)
        .then(() => console.log('Database initialized'))
        .catch(console.error);
} 