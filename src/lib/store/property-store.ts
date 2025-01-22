import { create } from 'zustand';
import { databases } from '@/lib/appwrite/config';
import { ID } from 'appwrite';

interface PropertyFormData {
  name: string;
  slug: string;
  images: string[];
  location: {
    address: string;
    city: string;
  };
  seo: {
    title: string;
    description: string;
  };
  amenities: string[];
}

interface PropertyStore {
  isLoading: boolean;
  error: string | null;
  createProperty: (data: PropertyFormData, userId: string) => Promise<void>;
  updateProperty: (id: string, data: Partial<PropertyFormData>) => Promise<void>;
  deleteProperty: (id: string) => Promise<void>;
}

// Add collection ID constant
const PROPERTIES_COLLECTION = 'properties'

export const usePropertyStore = create<PropertyStore>((set) => ({
  isLoading: false,
  error: null,

  createProperty: async (data, userId) => {
    try {
      set({ isLoading: true, error: null });
      
      // Generate a URL-friendly slug
      const slug = data.slug.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      
      await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        PROPERTIES_COLLECTION,
        ID.unique(),
        {
          userId,
          name: data.name,
          slug,
          location: {
            address: data.location.address,
            city: data.location.city,
          },
          seo: {
            title: data.seo.title,
            description: data.seo.description,
          },
          amenities: data.amenities,
          images: data.images,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      );
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  updateProperty: async (id, data) => {
    try {
      set({ isLoading: true, error: null });
      await databases.updateDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        'properties',
        id,
        {
          ...data,
          updatedAt: new Date().toISOString(),
        }
      );
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteProperty: async (id) => {
    try {
      set({ isLoading: true, error: null });
      await databases.deleteDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        'properties',
        id
      );
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
})); 