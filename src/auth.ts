import NextAuth, { AuthError, DefaultSession } from "next-auth"
import Credentials from "next-auth/providers/credentials" 
import { db } from "./server/db"
import { eq } from "drizzle-orm"
import { users } from "./server/db/schema"
import bcrypt from 'bcryptjs'

import { CredentialsSignin } from "@auth/core/errors" // import is specific to your framework

export class CustomError extends CredentialsSignin {
  code = "Error";
}

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      role: "admin" | "user"
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"]
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        password: {},
        email: {},
      },
      authorize: async (credentials) => {
        let user = null
        // logic to salt and hash password
       if (!credentials.email || !credentials.password) {
        throw new CustomError("Provide credentials.")
       }
 
        // logic to verify if the user exists
        user = await db.query.users.findFirst({
          where: eq(users.email, (credentials?.email as string).toLowerCase())
        })

        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new CustomError("User not found.")
        }

        const isPasswordMatch = bcrypt.compare((credentials.password as string), user.password)
 
        if (!isPasswordMatch) {
          throw Error("Wrong password or email.")
        }
 
        // return user object with their profile data
        return user
      },
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      // @ts-expect-error role does exist
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role as "admin" | "user";
      return session;
    },
  }
})