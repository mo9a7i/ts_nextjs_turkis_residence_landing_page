import { Permission, Role } from 'node-appwrite';
import { CollectionConfig } from './types';
import { enums } from './enums';

export const collections: Record<string, CollectionConfig> = {
    users: {
        name: 'users',
        permissions: [
            Permission.read(Role.user('{{user.$id}}')),
            Permission.update(Role.user('{{user.$id}}')),
        ],
        attributes: {
            name: { type: 'string', size: 255, required: true },
            email: { type: 'email', required: true },
            planId: { type: 'string', size: 64, required: true },
            customDomain: { type: 'string', size: 255, required: false },
            createdAt: { type: 'datetime', required: true }
        }
    },
    properties: {
        name: 'properties',
        permissions: [
            Permission.read(Role.any()),
            Permission.create(Role.user('{{document.userId}}')),
            Permission.update(Role.user('{{document.userId}}')),
            Permission.delete(Role.user('{{document.userId}}')),
        ],
        attributes: {
            userId: { type: 'string', size: 255, required: true },
            name: { type: 'string', size: 255, required: true },
            slug: { type: 'string', size: 255, required: true },
            seo: { type: 'string', size: 65535, required: true },
            amenities: { type: 'string', size: 65535, required: true },
            location: { type: 'string', size: 65535, required: true },
            images: { type: 'string', size: 255, required: true },
            createdAt: { type: 'datetime', required: true },
            updatedAt: { type: 'datetime', required: true }
        }
    },
    subscriptions: {
        name: 'subscriptions',
        permissions: [
            Permission.read(Role.user('{{document.userId}}')),
            Permission.update(Role.user('{{document.userId}}')),
        ],
        attributes: {
            userId: { type: 'string', size: 255, required: true },
            planId: { type: 'string', size: 64, required: true },
            status: { type: 'enum', required: true, options: enums.subscriptionStatus },
            startDate: { type: 'datetime', required: true },
            endDate: { type: 'datetime', required: true },
            features: { type: 'string', size: 65535, required: true }
        }
    },
    pageVisits: {
        name: 'pageVisits',
        permissions: [
            Permission.read(Role.user('{{document.userId}}')),
        ],
        attributes: {
            userId: { type: 'string', size: 255, required: true },
            propertyId: { type: 'string', size: 255, required: false },
            pageType: { type: 'enum', required: true, options: enums.pageType },
            timestamp: { type: 'datetime', required: true },
            visitorIp: { type: 'string', size: 45, required: true },
            userAgent: { type: 'string', size: 255, required: true }
        }
    },
    customDomains: {
        name: 'customDomains',
        permissions: [
            Permission.read(Role.user('{{document.userId}}')),
            Permission.update(Role.user('{{document.userId}}')),
        ],
        attributes: {
            userId: { type: 'string', size: 255, required: true },
            domain: { type: 'string', size: 255, required: true },
            status: { type: 'enum', required: true, options: enums.domainStatus },
            verificationToken: { type: 'string', size: 255, required: true },
            createdAt: { type: 'datetime', required: true }
        }
    }
}; 