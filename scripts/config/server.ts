import { Client, Databases } from 'node-appwrite';
import dotenv from 'dotenv';
dotenv.config();

// Add debug logging
console.log('Server config loading with:', {
    endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
    databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
});

export const getAdminConfig = () => {
    if (process.env.NODE_ENV !== 'development') {
        throw new Error('Admin config is only available in development');
    }

    if (!process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 
        !process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || 
        !process.env.APPWRITE_API_KEY) {
        throw new Error('Missing required environment variables');
    }

    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
        .setKey(process.env.APPWRITE_API_KEY);

    return {
        client,
        databases: new Databases(client)
    };
};

// Export config after ensuring env vars are loaded
export const appwriteConfig = {
    databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID! ,
    endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
    projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!,
    apiKey: process.env.APPWRITE_API_KEY!,
    bucketId: process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!,
};