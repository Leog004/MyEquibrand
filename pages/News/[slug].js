import React from 'react'
import { getAdvertisementDetails, GetAdvertisementsSlug } from '../../services';
import {useRouter} from 'next/router'
import { useSession } from "next-auth/react"
import {HeaderBlock, FeaturedBrands} from '../../components/index'
import Breadcrums from '../../components/Breadcrums';
import News from '../../components/News';

export default function blogDetails({advertisement}) {

    const router = useRouter()

    // Checking whether the user is logged in or not. 
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
          // The user is not authenticated, handle it here.
          // Since the user is not logged in. We are going to redirect them to the signIn Page
          return router.push(
                '/auth/signIn'
            )
        }
    })


    // will showing loading on the screen if the user is not logged in or if the page is not found yet
    if(router.isFallback || status === "loading" || !session) {
        return <h1>Loading...</h1>
    }

    if(session){
        return (
            <>
                {/* Checking to see if the headerBlock has an image, if so we pass in the url, else we pass in an empty string  */}
                <HeaderBlock title={advertisement.title} image={advertisement.headerImage ? advertisement.headerImage.url : ''} />
                <Breadcrums pageBehind={'News'} current={advertisement.title} brand={advertisement.brand.image.url}/>
                <News el={advertisement} />
                {/* getting featured brands */}
                <FeaturedBrands/>
            </>
        )
    }
}


// Fetch data at build time
export async function getStaticProps ({params})
{
    // fetching data
    const adver = (await getAdvertisementDetails(params.slug));
    
    // if not data is found, we will redirect to our advertisement main page
    if(!adver){
        return {
            redirect: {
                destination: '/News',
                permanent: false
            }      
        }
    }

    return {
        props: {
            advertisement: adver
        },
        revalidate: 60 * 60 * 24 // 1 day in second
    };

}

// Specify dynamic routes to pre-render pages based on data.
// The html is generated at build time and will be reused on each request
export async function getStaticPaths(){

    // getting our slugs statically
    const advertisements = await GetAdvertisementsSlug();

    return {
        paths: advertisements.map(({node: {slug}}) => ({ params: { slug }})),
        fallback: true,
    };

}

