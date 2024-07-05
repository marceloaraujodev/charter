import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { mongooseConnect } from "@/app/lib/mongooseConnect";
import User from "@/app/models/user";
import bcrypt from 'bcrypt';

mongooseConnect();

export const authOptions = {
      providers: [
        CredentialsProvider({
          name: "Credentials",
          credentials: {
            email: { label: "email", type: "text", placeholder: "test" },
            password: { label: "password", type: "password" }
          },
          async authorize(credentials, req) {
            const { email, password } = credentials;
            console.log("Credentials received:", email, password);
    
            try {
              const user = await User.findOne({ email }).select('+password');
    
              if (!user) {
                console.log("User not found");
                return null;
              }
    
              const isMatch = await bcrypt.compare(password, user.password);
              console.log("Password match:", isMatch);
    
              if (!isMatch) {
                return null;
              }
    
              return user;
    
            } catch (error) {
              console.error("Error in authorize:", error);
              throw new Error('Unable to authorize user');
            }
          }
        })
      ],
      session: {
        jwt: true, // Use JSON Web Tokens (JWT) for session management
        maxAge: 1 * 60 * 60, // 24 hours (in seconds)
        // updateAge: 60 * 60, // 1 hour (in seconds) - Refresh session on access within an hour
      },
      pages: {
        signIn: '/auth/login' // Custom sign-in page
      }
}

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
  