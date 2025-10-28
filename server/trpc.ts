import { initTRPC } from '@trpc/server';
import { z } from 'zod';

// Initialize tRPC
const t = initTRPC.create();

// Base router and procedure helpers
export const router = t.router;
export const publicProcedure = t.procedure;

// Context type (can be extended later for authentication)
export type Context = {
  // Add database context here when ready
};

// Create context
export const createContext = (): Context => ({
  // Add database context here when ready
});
