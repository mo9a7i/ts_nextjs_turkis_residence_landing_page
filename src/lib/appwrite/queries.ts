import { databases } from './config';
import { Query } from 'appwrite';

export async function getUserStats(userId: string) {
    try {
        const [properties, visits, subscription] = await Promise.all([
            // Get total properties count
            databases.listDocuments(
                process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
                'properties',
                [Query.equal('userId', userId)]
            ),
            // Get total visits in last 30 days
            databases.listDocuments(
                process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
                'pageVisits',
                [
                    Query.equal('userId', userId),
                    Query.greaterThan('timestamp', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
                ]
            ),
            // Get current subscription
            databases.listDocuments(
                process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
                'subscriptions',
                [
                    Query.equal('userId', userId),
                    Query.equal('status', 'active'),
                    Query.orderDesc('$createdAt'),
                    Query.limit(1)
                ]
            )
        ]);

        return {
            totalProperties: properties.total,
            totalVisits: visits.total,
            subscription: subscription.documents[0] || null
        };
    } catch (error) {
        console.error('Error fetching user stats:', error);
        throw error;
    }
}

export async function getRecentActivity(userId: string) {
    try {
        const visits = await databases.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
            'pageVisits',
            [
                Query.equal('userId', userId),
                Query.orderDesc('timestamp'),
                Query.limit(5)
            ]
        );

        return visits.documents;
    } catch (error) {
        console.error('Error fetching recent activity:', error);
        throw error;
    }
} 