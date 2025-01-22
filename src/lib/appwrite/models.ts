export interface User {
    $id?: string;
    name: string;
    email: string;
    createdAt: Date;
    planId: string;
    customDomain?: string;
}

export interface Property {
    $id?: string;
    userId: string;
    name: {
        en: string;
        ar: string;
    };
    slug: string;
    seo: {
        description: {
            en: string;
            ar: string;
        };
        images: {
            url: string;
            width: number;
            height: number;
            alt: {
                en: string;
                ar: string;
            };
        }[];
    };
    amenities: {
        id: string;
        icon: string;
        title: {
            en: string;
            ar: string;
        };
        description?: {
            en: string;
            ar: string;
        };
    }[];
    // ... other property fields
    createdAt: Date;
    updatedAt: Date;
}

export interface Subscription {
    $id?: string;
    userId: string;
    planId: string;
    status: 'active' | 'cancelled' | 'expired';
    startDate: Date;
    endDate: Date;
    features: {
        propertyLimit: number;
        customDomain: boolean;
        analytics: boolean;
    };
}

export interface PageVisit {
    $id?: string;
    userId: string;
    propertyId?: string;
    pageType: 'marketing' | 'property' | 'admin';
    timestamp: Date;
    visitorIp: string;
    userAgent: string;
}

export interface CustomDomain {
    $id?: string;
    userId: string;
    domain: string;
    status: 'pending' | 'active' | 'failed';
    verificationToken: string;
    createdAt: Date;
} 