import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";


export async function middleware(req){

    const token = await getToken({req, secret: process.env.JWT_SECRET});


    const {pathname} = req.nextUrl;

    // Allow the request if the following is true...

    // 1). We are checking if our current path contains a token, if so then we proceed
    // We are allowing them to continue without a token to our home page and sign In. 
    // In the home page, I have settings set up to only allow them to see the header if they are not logged in.
    if(pathname.includes('/api/auth') || pathname == '/' || token){
        return NextResponse.next();
    }



    // Redirect them to login if they do not have a token and are requesting a protected route
    if(!token && pathname !== '/auth/signIn'){
        return NextResponse.redirect('/auth/signIn')
    }



}