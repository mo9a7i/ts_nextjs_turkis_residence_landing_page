import { Client, Databases } from 'node-appwrite';

export const getAdminConfig = () => {
    if (process.env.NODE_ENV !== 'development') {
        throw new Error('Admin config is only available in development');
    }

    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
        .setKey(process.env.APPWRITE_API_KEY!);

    return {
        client,
        databases: new Databases(client)
    };
};

export const appwriteConfig = {
    databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
}; 