import React from 'react'
import { getAdvertisementDetails, GetAdvertisementsSlug } from '../../services';
import {useRouter} from 'next/router'
import { useSession } from "next-auth/react"


export default function blogDetails({advertisement}) {

    const router = useRouter()

    // Checking whether the user is logged in or not. 
    const { status } = useSession({
        required: true,
        onUnauthenticated() {
          // The user is not authenticated, handle it here.
          // Since the user is not logged in. We are going to redirect them to the signIn Page
          return router.push(
                '/auth/signIn'
            )
        }
    })


    if(router.isFallback) {
        return <h1>Loading...</h1>
    }



    return (
        <div>
            <h1>{advertisement.title}</h1>
        </div>
    )
}


// Fetch data at build time
export async function getStaticProps ({params})
{

    const adver = (await getAdvertisementDetails(params.slug));
    

    if(!adver){
        return {
            redirect: {
                destination: '/Advertisement',
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


    const advertisements = await GetAdvertisementsSlug();

    return {
        paths: advertisements.map(({node: {slug}}) => ({ params: { slug }})),
        fallback: true,
    };

}

