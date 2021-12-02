import React from 'react'
import { AdvertisementNews, HeaderBlock } from '../../components'
import { getSession } from 'next-auth/react';
import { getAdvertisements } from '../../services';

// getting our server side props passed through
export default function Advertisement({advertisement}) {
    return (
        <>
            <HeaderBlock/>
            <AdvertisementNews data={advertisement} />
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
        var advertisement = (await getAdvertisements()) || [];

        return {
            props: { advertisement }, // return them to our front end as props
          };

    }catch(err){
        console.log(err);
    }

}
