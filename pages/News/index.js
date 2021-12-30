import React from 'react'
import { AdvertisementNews, HeaderBlock, FeaturedBrands } from '../../components'
import { getSession } from 'next-auth/react';
import {getNews } from '../../services';
import { validBrands } from '../../services/utils';

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
    var brands = []; // This array will contain the user brands

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

        if(session){           
            session.state.map((el) => {
                brands.push(el.Privilege); // pushing user privalges into brands array
            })

            brands = validBrands(brands); // this will go through the brand array and return distinct valid brands that the user can view
            brands.unshift({brand: 'All', show: true}); // this is a custom insert called All that which act as a brand that will show all products, inserting in the beginning of the array
        }

        const validNewsToShow = news.filter((el) => {
            return brands.some((f) => {
                return f.brand === el.brand.title
            })
        })

        return {
            props: { news: validNewsToShow }, // return them to our front end as props
          };

    }catch(err){
        console.log(err);
    }

}
