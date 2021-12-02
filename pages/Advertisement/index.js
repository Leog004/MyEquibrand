import React from 'react'
import { AdvertisementNews, HeaderBlock } from '../../components'
import { getSession } from 'next-auth/react';


export default function Advertisement() {
    return (
        <>
            <HeaderBlock/>
            <AdvertisementNews/>
        </>
    )
}


export async function getServerSideProps(context) {


    const session = await getSession(context);

    if(!session){
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        };
    }

    return {
        props: {  },
      };

}
