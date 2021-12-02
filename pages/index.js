import { useSession} from 'next-auth/react'
import { FeaturedBrands, FeaturedNew, FeaturedVideo, Features, Hero } from '../components'

export default function Home() {

  const {data: session} = useSession();

  
  return (
    <main>
      <Hero session= {session}/>
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
