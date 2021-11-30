import React from 'react'
import { Header, Footer } from ".";

export default function Layout({children}) {
    return (
        <>
        {/* Stylesheets */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300&display=swap" rel="stylesheet" />
        
        <Header />
        {children}
        <Footer/>
        </>
    )
}
