import Head from 'next/head'
import { signIn, signOut, useSession} from 'next-auth/react'

import { FeaturedBrands, FeaturedNew, FeaturedVideo, Features, Footer, Hero, Search } from '../components'
import Header from '../components/Header'

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
