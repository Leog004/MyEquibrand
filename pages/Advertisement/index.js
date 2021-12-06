import React from 'react'
import { HeaderBlock, Advertisement } from '../../components'
import { getNews } from '../../services'
import { getSession } from 'next-auth/react'

export default function index({news, session}) {
    return (
        <>
           <HeaderBlock title={"Advertisement"} />
           <Advertisement />
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
        var news = (await getNews()) || [];

        
        if(session){
           
            session.state.map((el) => {
                brands.push(el.Type);
            })

            
            brands.map((brand) => {
                news = news.filter((el) => {
                    console.log(el.brand.title.toString().substr(el.brand.title.indexOf(' ') + 1));
                    return el.brand.title.toString().substr(0,el.brand.title.indexOf(' ') + 1).toUpperCase() === brand
                })
            })

            console.log(brands, news);
        }
    
        return {
            props: { news, session }, // return them to our front end as props
          };

    }catch(err){
        console.log(err);
    }

}