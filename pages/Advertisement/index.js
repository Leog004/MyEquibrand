import React from 'react'
import { HeaderBlock, Advertisement } from '../../components'
import { getAdvertisementPop, getNews } from '../../services'
import { getSession } from 'next-auth/react'
import { validBrands } from '../../services/utils'

export default function index({pops, brands}) {
    return (
        <>
           <HeaderBlock 
                title={"Advertisement"} 
                description={'This is your source for available Point-Of-Purchase signage, banners and merchandising tools. Everything you need to enhance your merchandising displays is here, ready to attract customers and increase sales.'}        
            />
           <Advertisement pops={pops} brands={brands} />
        </>
    )
}


// this method runs when page is loaded. Pulls data from server
export async function getServerSideProps(context) {

    // checking to see whether the user is logged in
    const session = await getSession(context);
    var brands = [];

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
        var pops = (await getAdvertisementPop()) || [];
        
        if(session){           
            session.state.map((el) => {
                brands.push(el.Privilege);
            })

            brands = validBrands(brands);

            pops = pops.filter((el) => {
               return brands.includes(el.brand.title)
            })
        }
    
        return {
            props: { pops, brands }, // return them to our front end as props
          };

    }catch(err){
        console.log(err);
    }

}