import Head from 'next/head'
import { FeaturedBrands, FeaturedNew, FeaturedVideo, Features, Footer, Hero, Search } from '../components'
import Header from '../components/Header'

export default function Home() {
  return (
    <main>
      <Hero/>
      <FeaturedBrands/>
      <Features/>
      <FeaturedNew/>
      <FeaturedVideo/>
    </main>
  )
}
