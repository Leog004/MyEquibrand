import React from 'react'

export default function FeaturedNew() {
    return (
        <div className='bg-gray-100 w-full relative container pt-10 pb-20 mx-auto justify-center text-center'>
            <div className="max-w-5xl mx-auto pt-12">
                {/* <!-- title --> */}
                <div className="relative flex items-end font-bold px-8 sm:px-0 justify-between">
                    <h2 className="text-2xl">News</h2>
                    <h2 className="text-2xl">Featured Items</h2>
                </div>



                <div className='flex w-full h-full justify-between mt-10'>
                    
                    <div className='flex flex-col w-3/4 gap-y-10'>

                        <div className='flex w-full justify-center items-end shadow-sm rounded-md bg-white overflow-hidden'>
                            <img className='flex w-auto h-80' src={'http://myequibrand.com/img/News/22BlanketBookingGen.jpg'} />
                            <div className='flex w-full justify-start items-start flex-col p-10'>
                                <h4 className='text-sm text-gray-500 font-semibold mb-0'>Classic Equine</h4>
                                <h1 className='text-xl text-black font-semibold uppercase mb-2'>Title of the news</h1>
                                <p className='text-base text-black'>DON'T BE LEFT IN THE COLD</p>

                                <div className='flex mt-20 w-full justify-between'>
                                    <span>Date Posted</span>
                                    <span>Contact</span>
                                </div>
                            </div>
                        </div>

                        <div className='flex w-full justify-center items-end shadow-sm rounded-md bg-white overflow-hidden'>
                            <img className='flex w-auto h-80' src={'http://myequibrand.com/img/News/22ProBags.jpg'} />
                            <div className='flex w-full justify-start items-start flex-col p-10'>
                                <h4 className='text-sm text-gray-500 font-semibold mb-0'>Classic Rope</h4>
                                <h1 className='text-xl text-black font-semibold uppercase mb-2'>Title of the news</h1>
                                <p className='text-base text-black text-left'>NEW COLORS IN PROFESSIONAL ROPE BAGS</p>

                                <div className='flex mt-20 w-full justify-between'>
                                    <span>Date Posted</span>
                                    <span>Contact</span>
                                </div>
                            </div>
                        </div>

                        <div className='flex w-full justify-center items-end shadow-sm rounded-md bg-white overflow-hidden'>
                            <img className='flex w-auto h-80' src={'http://myequibrand.com/img/News/CEMidnightTravel.jpg'} />
                            <div className='flex w-full justify-start items-start flex-col p-10'>
                                <h4 className='text-sm text-gray-500 font-semibold mb-0'>Classic Equine</h4>
                                <h1 className='text-xl text-black font-semibold uppercase mb-2'>Title of the news</h1>
                                <p className='text-base text-black'>NEW FOR FALL</p>

                                <div className='flex mt-20 w-full justify-between'>
                                    <span>Date Posted</span>
                                    <span>Contact</span>
                                </div>
                            </div>
                        </div>


                        <div className='flex w-full justify-center items-end shadow-sm rounded-md bg-white overflow-hidden'>
                            <img className='flex w-auto h-52' src={'http://myequibrand.com/img/News/CEflourishAccess.jpg'} />
                            <div className='flex w-full justify-start items-start flex-col p-10 text-left'>
                                <h4 className='text-sm text-gray-500 font-semibold mb-0'>Classic Equine</h4>
                                <h1 className='text-xl text-black font-semibold uppercase mb-2'>Title of the news</h1>
                                <p className='text-base text-black'>NEW FOR FALL</p>

                                <div className='flex mt-20 w-full justify-between'>
                                    <span>Date Posted</span>
                                    <span>Contact</span>
                                </div>
                            </div>
                        </div>

                    </div>


                    
                    <div id='spacer' className='flex w-1/6'></div>


                    
                    <div className='flex flex-col bg-white w-1/4 gap-y-10 h-full px-5 py-10 sticky top-0'>

                        <div className='flex flex-col justify-center items-center align-middle mx-auto cursor-pointer'>
                            <h3>No Hood</h3>
                            <img className='w-auto' src='https://martinsaddlery.com/iShare/Thumbs600/cxb519bk.png' style={{marginBlockEnd: 'auto'}} />
                        </div>

                        <div className='flex flex-col justify-center items-center align-middle mx-auto cursor-pointer'>
                            <h3>Hood</h3>
                            <img className='w-auto' src='https://martinsaddlery.com/iShare/Thumbs600/cxb519hbk.png' style={{marginBlockEnd: 'auto'}} />
                        </div>

                    </div>


                </div>


            </div>
        </div>
    )
}
 