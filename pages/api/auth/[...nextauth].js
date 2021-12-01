import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from 'next-auth/providers/github'
import { PrismaClient } from '.prisma/client';
import { encryptPassword } from "../../../services/utils";
// import GitHubProvider from 'next-auth/providers/github'

// const Cryptr = require('cryptr');
// const crypto = require("crypto");
// const algorithm = "des-ecb"; 

export default NextAuth({
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
          }),
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

                const pass = encryptPassword(credentials.password);

                // const password = credentials.password;
                // // use a hex key here
                // const key = Buffer.from("d0e276d0144890d3", "hex");
                // const cipher = crypto.createCipheriv(algorithm, key, null);
                // let encrypted = cipher.update(password, 'utf8', 'hex');
                // encrypted += cipher.final('hex');

                //console.log("Encrypted: ", encrypted);

                const prisma = new PrismaClient();
                const rawSQL = `User_G_User_Login`;
                const result = await prisma.$queryRawUnsafe(`${rawSQL} @Email='${credentials.username}', @Password='${encrypted}'`)


                if(result.length > 0 && result[0]["status"]){
                    return {
                        id: result[0]['UserID'],         
                        name: `${result[0]['First Name']} ${result[0]['Last Name']}`,
                        email: result[0]['Email'],
                        notifications: result[0]['Notifications'],
                        privaleges: result[0]['Privaleges']
                    };
                }else{
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

                    if(user?.notifications)
                        token.notifications = user.notifications;

                    if(user?.privaleges)
                        token.privaleges = user.privaleges;
                }
        
                return token
            },
            session: async ({ session, token }) => {

                session.id = token.id;

                if(token?.notifications)
                    session.user.notifications = token.notifications

                if(token?.privaleges)
                    session.privaleges = token.privaleges;

                return session
            },
        },
        secret: "INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw",
        pages: {
            signIn: '/auth/signin',
           // error: '/auth/error'
        }
});

