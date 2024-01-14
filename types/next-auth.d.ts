// https://next-auth.js.org/getting-started/typescript#adapters

import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id?: string | null
      name?: string | null
      email?: string | null
      image?: string | null
      status?: number | null
      role?: string | null
      createdAt?: Date | null
      updatedAt?: Date | null
    }
  }
}
