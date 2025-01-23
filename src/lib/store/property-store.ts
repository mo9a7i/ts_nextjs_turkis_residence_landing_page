import { create } from 'zustand';
import { databases } from '@/lib/appwrite/config';
import { ID } from 'appwrite';

interface PropertyFormData {
  name: string;
  slug: string;
  location: string | {
    address: string;
    city: string;
  };
  seo: string | {
    title: string;
    description: string;
  };
  amenities: string | string[];
  images: string | string[];
}

interface PropertyStore {
  isLoading: boolean;
  error: string | null;
  createProperty: (data: PropertyFormData, userId: string) => Promise<any>;
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
      
      const result = await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        'properties',
        ID.unique(),
        {
          userId,
          name: data.name,
          slug: data.slug,
          location: data.location,
          seo: data.seo,
          amenities: data.amenities,
          images: data.images,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      );

      return result;
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