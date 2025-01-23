import { create } from 'zustand';
import { account } from '@/lib/appwrite/config';
import { ID } from 'appwrite';

interface AuthState {
  user: any | null;
  isLoading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  error: null,

  signIn: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      await account.createEmailPasswordSession(email, password);
      const user = await account.get();
      set({ user, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  signUp: async (email: string, password: string, name: string) => {
    try {
      set({ isLoading: true, error: null });
      await account.create(ID.unique(), email, password, name);
      await account.createSession(email, password);
      const user = await account.get();
      set({ user, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  signOut: async () => {
    try {
      set({ isLoading: true, error: null });
      await account.deleteSession('current');
      set({ user: null, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  checkAuth: async () => {
    try {
      set({ isLoading: true, error: null });
      const session = await account.getSession('current');
      if (session) {
        const user = await account.get();
        set({ user, isLoading: false });
      } else {
        set({ user: null, isLoading: false });
        throw new Error('No session found');
      }
    } catch (error) {
      set({ user: null, isLoading: false });
      throw error;
    }
  },
})); 