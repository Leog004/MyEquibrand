import { useSession} from 'next-auth/react'
import { FeaturedBrands, FeaturedNew, FeaturedVideo, Features, Hero } from '../components'

export default function Home() {

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
          <FeaturedNew/>
          <FeaturedVideo/>
        </>
      )
    }


    </main>
  )
}
