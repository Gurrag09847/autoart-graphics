import NextAuth, { AuthError } from "next-auth"
import Credentials from "next-auth/providers/credentials" 
import { db } from "./server/db"
import { eq } from "drizzle-orm"
import { users } from "./server/db/schema"
import bcrypt from 'bcryptjs'

import { CredentialsSignin } from "@auth/core/errors" // import is specific to your framework

export class CustomError extends CredentialsSignin {
  code = "Error";
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
})