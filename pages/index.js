import { useSession, getSession} from 'next-auth/react'
import { FeaturedBrands, FeaturedNew, FeaturedVideo, Features, Hero } from '../components'
import { validBrands } from '../services/utils';

export default function Home({brands}) {

  const {data: session} = useSession();

  
  return (
    <main>

      {/* Checking if the user has logged in and passing that information inside the hero component */}
      <Hero session= {session}/>


      {/* If user is logged in then we will show them the rest of the page, else it will be hidden and not rendered */}
    {
      session && (
        <>
          <FeaturedBrands/>
          <Features/>
          <FeaturedNew validBrands={brands} />
          <FeaturedVideo/>
        </>
      )
    }


    </main>
  )
}



// this method runs when page is loaded. Pulls data from server
export async function getServerSideProps(context) {

    // checking to see whether the user is logged in
    const session = await getSession(context);
    var brands = []; // This array will contain the user brands

    // if user is not logged in, we will redirect them to our home page
    if(session){
        session.state.map((el) => {
          brands.push(el.Privilege); // pushing user privalges into brands array
      })

      brands = validBrands(brands); // this will go through the brand array and return distinct valid brands that the user can view
      brands.unshift({brand: 'All', show: true}); // this is a custom insert called All that which act as a brand that will show all products, inserting in the beginning of the array

      return {
          props: { brands }, // return them to our front end as props
        };

    }else{
      return {
        props: { brands: [] }, // return them to our front end as props
      };
    }
}