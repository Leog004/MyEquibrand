import React from 'react'
import { AdvertisementNews, HeaderBlock, FeaturedBrands } from '../../components'
import { getSession } from 'next-auth/react';
import {getNews } from '../../services';

// getting our server side props passed through
export default function Advertisement({news}) {
    return (
        <>
            <HeaderBlock title={'News'} />
            <FeaturedBrands/>
            <AdvertisementNews data={news} />
        </>
    )
}


// this method runs when page is loaded. Pulls data from server
export async function getServerSideProps(context) {

    // checking to see whether the user is logged in
    const session = await getSession(context);

    // if user is not logged in, we will redirect them to our home page
    if(!session){
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        };
    }

    try{
        // getting our advertisement data that is being called from service file
        var news = (await getNews()) || [];

        return {
            props: { news }, // return them to our front end as props
          };

    }catch(err){
        console.log(err);
    }

}
