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
    
              // console.log('This is User:------------',user)

              if (!user) {
                console.log("User not found");
                return null;
              }
    
              const isMatch = await bcrypt.compare(password, user.password);
              console.log("Password match:", isMatch);
    
              if (!isMatch) {
                console.log("Password does not match");
                return null;
              }
              console.log("User authorized");
              return user;
    
            } catch (error) {
              console.error("Error in authorize:", error);
              throw new Error('Unable to authorize user');
            }
          }
        })
      ],
      callbacks:{
        async jwt({token, user}){
          if(user){
            token.role = user.role;
          }
          return token;
        },
        async session({session, token}){
          if(token){
            session.user.role = token.role;
          }
          return session;
        }
      },
      session: {
        jwt: true, 
        maxAge: 24 * 60 * 60, // 24 hours (in seconds)
      },
      pages: {
        signIn: '/auth/login' // Custom sign-in page
      }
}

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
  