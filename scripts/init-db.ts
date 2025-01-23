import dotenv from 'dotenv';
dotenv.config();

import { Databases, ID, Models } from 'node-appwrite';
import { getAdminConfig, appwriteConfig } from './config/server';
import { collections } from './config/collections';
import { indexes } from './config/indexes';
import { CollectionConfig, Attribute } from './config/types';

// Add debug logging at the start
console.log('Environment variables loaded:');
console.log({
    endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
    databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
    apiKey: process.env.APPWRITE_API_KEY?.substring(0, 10) + '...',
});

interface AppwriteError {
    code: number;
    message: string;
    type: string;
}

async function createDatabase(databases: Databases): Promise<void> {
    try {
        // Check if database exists first
        try {
            await databases.get('main');
            console.log('Database already exists, skipping creation');
            return;
        } catch (error) {
            // Database doesn't exist, create it
            await databases.create(
                'main',
                'PropertyFlow Database',
                true
            );
            console.log('Database created successfully');
        }
    } catch (error) {
        console.error('Error in database creation:', error);
        throw error;
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
        for (const [collectionId, config] of Object.entries(collections)) {
            try {
                // Check if collection exists
                await databases.getCollection(
                    appwriteConfig.databaseId,
                    collectionId
                );
                console.log(`Collection ${collectionId} already exists, skipping`);
                continue;
            } catch {
                // Collection doesn't exist, create it
                await databases.createCollection(
                    appwriteConfig.databaseId,
                    collectionId,
                    config.name,
                    config.permissions.map(permission => permission.toString())
                );
                console.log(`Collection ${collectionId} created`);

                // Create attributes
                for (const [name, attr] of Object.entries(config.attributes)) {
                    await createAttribute(
                        databases,
                        appwriteConfig.databaseId,
                        collectionId,
                        name,
                        attr
                    );
                }
                console.log(`Attributes created for ${collectionId}`);
            }
        }
        console.log('Collections setup completed');
    } catch (error) {
        console.error('Error creating collections:', error);
        throw error;
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
    console.log('Initializing database...');
    console.log(process.env.APPWRITE_API_KEY);
    console.log(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);
    console.log(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT);
    console.log(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID);
    console.log(appwriteConfig);
    const { databases } = getAdminConfig();
    initializeDatabase(databases)
        .then(() => console.log('Database initialized'))
        .catch(console.error);
} 