import React from 'react'
import { FeaturedProduct } from '.';

const HeaderImage = 'http://myequibrand.com/img/4818875210.jpg';
const LinearGradient = 'linear-gradient(90deg, #303030 0%, #c6770070 100%)'


export default function Hero() {
    return (
        <>
        <div id='headerImage' className="h-lg bg-center" style={{backgroundImage: `${LinearGradient},url(${HeaderImage})`, backgroundSize: 'cover'}}>
            <div className="flex h-full justify-between items-center max-w-6xl mx-auto my-0">
             <div className='flex flex-col w-full sm:w-1/2 px-4'>
                 <h1 className='text-4xl uppercase text-white font-semibold mb-2' style={{textShadow: ' 0 15px 30px rgba(0,0,0,0.11), 0 5px 15px rgba(0,0,0,0.08);'}}>What makes Equibrand</h1>
                 <p className='text-base text-gray-200'>Equibrand's mission is to provide our customers with the highest quality western merchandise with the most courteous, effective service.</p>
                 <button className='px-4 py-2 text-sm bg-yellow-600 rounded-sm mt-4 self-start'>View More</button>
             </div>
            </div>
        </div>
        
        <FeaturedProduct/>
        </>
    )
}
