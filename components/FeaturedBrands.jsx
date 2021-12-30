import React from 'react'

export default function FeaturedBrands() {
    return (
        <div className='bg-white w-full relative container pt-10 pb-20 mx-auto justify-center text-center'>
            <div className='absolute h-12 w-screen bg-white transform -skew-y-2 -top-4 z-0'></div>
            <div className="max-w-5xl mx-auto pt-12">
                {/* <!-- title --> */}
                <div className="relative flex items-end font-bold px-8 sm:px-0">
                    <h2 className="text-2xl">Brands</h2>
                </div>
                {/* <!-- cards --> */}
                <div className="mt-10">
                    <ul className="-m-3.5 flex flex-wrap sm:flex-nowrap">
                    <li style={{backgroundImage: `url('https://www.equibrand.com/eq/assets/img/EQH/20EBcoverWebMain_05.jpg')`}} className="product m-3.5 h-48 w-full mx-10 sm:mx-3.5 md:w-1/4 bg-cover rounded-xl cursor-pointer shadow-md"></li>
                    <li style={{backgroundImage: `url('https://www.equibrand.com/eq/assets/img/EQH/20EBcoverWebMain_04.jpg')`}} className="product m-3.5 h-48 w-full mx-10 sm:mx-3.5 md:w-1/4 bg-cover rounded-xl cursor-pointer shadow-md"></li>
                    <li style={{backgroundImage: `url('https://www.equibrand.com/eq/assets/img/EQH/20EBcoverWebMain_03.jpg')`}} className="product m-3.5 h-48 w-full mx-10 sm:mx-3.5 md:w-1/4 bg-cover rounded-xl cursor-pointer shadow-md"></li>
                    <li style={{backgroundImage: `url('https://www.equibrand.com/eq/assets/img/EQH/20EBcoverWebMain_02.jpg')`}} className="product m-3.5 h-48 w-full mx-10 sm:mx-3.5 md:w-1/4 bg-cover rounded-xl cursor-pointer shadow-md"></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
