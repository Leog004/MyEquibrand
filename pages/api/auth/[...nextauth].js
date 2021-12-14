import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {GetUser} from '../../../services/utils'

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'your email',
            credentials: {
                username: {
                    label: 'Email', type: 'email', placeholder: 'email@email.com'
                },
                password: {
                    label: 'Password', type: 'password'
                }
            },
            authorize: async (credentials) => {
                // Database Look Up
                try{
                     return GetUser(credentials.username, credentials.password);
                }catch(err){
                    return null;
                }
            },
        }),
    ],
    debug:true,
    jwt:{
        signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
    },
    callbacks: {
            jwt: async ({ token, user }) => {            
                if (user) {
                    token.id = user.id;

                    if(user?.state)
                        token.state = user.state;

                    if(user?.notifications)
                        token.notifications = user.notifications;

                    if(user?.privaleges)
                        token.privaleges = user.privaleges;
                }
        
                return token
            },
            session: async ({ session, token }) => {

                session.id = token.id;

                if(token?.state)
                    session.state = token.state

                if(token?.notifications)
                    session.user.notifications = token.notifications

                if(token?.privaleges)
                    session.privaleges = token.privaleges;

                return session
            },
        },
        secret: process.env.JWT_SECRET,
        pages: {
            signIn: '/auth/signIn',
           // error: '/auth/error'
        }
});

