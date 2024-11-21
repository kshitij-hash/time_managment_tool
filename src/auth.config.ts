import Google from "next-auth/providers/google"
import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
 
export default { providers: [Google({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
}), Credentials({
    credentials: {
        email: {},
        password: {}
    }, authorize: async (credentials) => {
        let user = null;
        
        const pwHash = saltAndHashPassword(credentials.password);
        user = await getUserFromDb(credentials.email, pwHash);

        if(!user) {
            throw new Error("Invalid credentials");
        }

        return user;
    }
})], } satisfies NextAuthConfig