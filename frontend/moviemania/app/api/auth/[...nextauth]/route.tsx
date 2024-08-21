import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

const BACKEND_ACCESS_TOKEN_LIFETIME = 60 * 24 * 8;

const getCurrentEpochTime = () => {
return Math.floor(new Date().getTime() / 1000);
};

export const authOptions = {
   secret: process.env.NEXTAUTH_SECRET,
   debug: process.env.NODE_ENV === "development",
   session: {
      strategy: "jwt",
      maxAge: 24 * 60 * 60, // Expire après 24 heures
   },
   providers: [
      CredentialsProvider({
         name: "credentials",
         credentials: {
            username: {
               label: "Pseudo",
               type: "text",
               placeholder: "Votre Pseudo",
            },
            password: {
               label: "Password",
               type: "password",
               placeholder: "Votre mot de passe",
            },
         },
         async authorize(credentials) {
            const { username, password } = credentials;
            const bodyContent = new URLSearchParams({ username, password });
            try {
               const response = await axios({
                  method: "post",
                  contentType: "application/x-www-form-urlencoded",
                  url: `${process.env.NEXT_PUBLIC_USERS_API_URL}/api/v1/login/access-token`,
                  data: bodyContent,
               });
               const data = response.data;
               if (data) return data;
            } catch (error) {
               console.error(error);
            }
         },
      }),
   ],
   callbacks: {
      async jwt({ user, token, account }) {
         // If `user` and `account` are set that means it is a login event
         if (user && account) {
            let backendResponse = account.provider === "credentials" ? user : account.meta;
            console.log("backendResponse", backendResponse);
            token["access_token"] = backendResponse.access_token;
            token["ref"] = getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME;
            console.log("jwt token", token);
         }
         return token || {};
      },
      // Since we're using Django as the backend we have to pass the JWT
      // token to the client instead of the `session`.
      async session({ token }) {
         return token;
      },
   },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
