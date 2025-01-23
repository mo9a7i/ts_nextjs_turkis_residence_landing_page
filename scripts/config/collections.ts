import { Permission, Role } from 'node-appwrite';
import { CollectionConfig } from './types';
import { enums } from './enums';

export const collections: Record<string, CollectionConfig> = {
    users: {
        name: 'Users',
        permissions: [
            Permission.read(Role.any()),
            Permission.update(Role.users()),
            Permission.delete(Role.users())
        ],
        attributes: {
            name: { type: 'string', size: 255, required: true },
            email: { type: 'email', required: true },
            websiteName: {
                type: 'string',
                size: 255,
                required: true,
            },
            createdAt: { type: 'datetime', required: true }
        }
    },
    properties: {
        name: 'Properties',
        permissions: [
            Permission.read(Role.any()),
            Permission.create(Role.users()),
            Permission.update(Role.users()),
            Permission.delete(Role.users())
        ],
        attributes: {
            userId: { type: 'string', size: 36, required: true },
            name_en: { type: 'string', size: 1024, required: true },
            name_ar: { type: 'string', size: 1024, required: true },
            welcomeMessage_en: { type: 'string', size: 1024, required: true },
            welcomeMessage_ar: { type: 'string', size: 1024, required: true },
            seo: { type: 'string', size: 2048, required: true },
            location: { type: 'string', size: 2048, required: true },
            wifi: { type: 'string', size: 1024, required: true },
            advertisement: { type: 'string', size: 2048, required: false },
            supportContact: { type: 'string', size: 255, required: true },
            images: { type: 'string', size: 2048, required: true },
            nearbyAttractions: { type: 'string', size: 4096, required: false }
        }
    },
    amenities: {
        name: 'Amenities',
        permissions: [
            Permission.read(Role.any()),
            Permission.create(Role.users()),
            Permission.update(Role.users())
        ],
        attributes: {
            title_en: { type: 'string', size: 255, required: true },
            title_ar: { type: 'string', size: 255, required: true },
            icon: { type: 'string', size: 64, required: true }, // Lucide icon name
            isDefault: { type: 'boolean', required: true, default: false }
        }
    },
    propertyAmenities: {
        name: 'PropertyAmenities',
        permissions: [
            Permission.read(Role.any()),
            Permission.create(Role.users()),
            Permission.delete(Role.users())
        ],
        attributes: {
            propertyId: { type: 'string', size: 36, required: true },
            amenityId: { type: 'string', size: 36, required: true }
        }
    },
    houseRules: {
        name: 'HouseRules',
        permissions: [
            Permission.read(Role.any()),
            Permission.create(Role.users()),
            Permission.update(Role.users())
        ],
        attributes: {
            title_en: { type: 'string', size: 255, required: true },
            title_ar: { type: 'string', size: 255, required: true },
            description_en: { type: 'string', size: 1024, required: true },
            description_ar: { type: 'string', size: 1024, required: true },
            icon: { type: 'string', size: 64, required: true },
            isDefault: { type: 'boolean', required: true, default: false }
        }
    },
    propertyHouseRules: {
        name: 'PropertyHouseRules',
        permissions: [
            Permission.read(Role.any()),
            Permission.create(Role.users()),
            Permission.delete(Role.users())
        ],
        attributes: {
            propertyId: { type: 'string', size: 36, required: true },
            houseRuleId: { type: 'string', size: 36, required: true }
        }
    },
    subscriptions: {
        name: 'subscriptions',
        permissions: [
            Permission.read(Role.users()),
            Permission.update(Role.users()),
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
            Permission.read(Role.users()),
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
            Permission.read(Role.users()),
            Permission.update(Role.users()),
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