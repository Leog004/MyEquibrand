import { SessionProvider, session } from "next-auth/react";
import React from 'react'
import { Header, Footer } from ".";

export default function Layout({children}) {
    return (
        <SessionProvider session={session}>

            {/* Stylesheets */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300&display=swap" rel="stylesheet" />
            
            {/* Title */}
            <title>MyEquibrand</title>

            {/* Meta Tag */}
            <meta charSet="UTF-8" />
            <meta name="description" content="My MyEquibrand" />
            <meta name="keywords" content="Classic Equine, Classic Rope, MyEquibrand, Rattler Rope, Cashel" />
            <meta name="author" content="Equibrand" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />    


            <Header />
            {children}
            <Footer/>

            
        </SessionProvider>
    )
}
