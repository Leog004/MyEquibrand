import React, {useEffect, useState} from 'react'
import {useSession} from 'next-auth/react'
import { getNews } from '../services';
import Link from 'next/link'
import sendMail from '../Email'

export default function FeaturedNew({validBrands}) {

    const [news, setNews] = useState([]);
    const {data: session} = useSession(); // This grabs our session data. If the user is not logged in, then the session will be null

  
    useEffect(() => {
        getNews().then((result) => {

            const validNewsToShow = result.filter((el) => {
                return validBrands.some((f) => {
                    return f.brand === el.brand.title
                })
            })

            setNews(validNewsToShow)

        });
    }, [])

    const handleContactClick = async () => {
        let response = await sendMail('This is an email sent from MyEquibrand, as a contact request message', session.user?.name);
        console.log(response);
    }

    return (
        <div className='bg-gray-100 w-full relative pt-10 pb-20 mx-auto justify-center text-center'>
            <div className="max-w-5xl mx-auto pt-12">
                {/* <!-- title --> */}
                <div className="relative flex items-end font-bold px-8 sm:px-0 justify-between">
                    <h2 className="text-2xl">Latest News</h2>
                </div>



                <div className='flex w-full h-full justify-between mt-10'>
                    
                    <div className='flex flex-col w-full gap-y-10'>
                        {
                            news.map((el, index) => (
                                index <= 2 &&
                                <div className='flex w-full flex-wrap md:flex-nowrap justify-center items-end shadow-lg rounded-md bg-white overflow-hidden'>
                                    <img className='flex w-auto max-h-96 md:h-80' src={el.mainImage.url} />
                                    <div className='flex w-full justify-start items-start flex-col p-10'>
                                        <h4 className='text-sm text-gray-500 font-semibold mb-0'>{el.brand.title}</h4>
                                        <h1 className='text-xl text-black font-semibold uppercase mb-2'>{el.title}</h1>
                                        <p className='text-base text-black text-left'>{el.description}</p>

                                        <div className='flex mt-20 w-full justify-between'>
                                            <Link href={`/News/${el.slug}`}>
                                            <button className='bg-primary px-2 py-2 text-white rounded-md shadow-sm hover:scale-105 hover:shadow-lg transition-all duration-150'>See more</button>
                                            </Link>
                                            <button onClick={handleContactClick} className='bg-red-400 px-2 py-2 text-white rounded-md shadow-sm hover:scale-105 hover:shadow-lg transition-all duration-150'>Contact</button>
                                        </div>
                                    </div>
                                </div>        
                            ))
                        }
                    </div>
                </div>
                <Link href={`/News/`}>
                 <button className='bg-primary mt-20 px-2 py-2 text-white rounded-md shadow-sm hover:scale-105 hover:shadow-lg transition-all duration-150'>View All News</button>
                </Link>
            </div>
        </div>
    )
}
 