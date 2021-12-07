import React from 'react'
import PopItem from './PopItem'

export default function PopControl({pops, brands}) {
    return (
        <>
        <div className='flex flex-col space-y-10'>

        {
                brands.map((brand) => (
                    <div className={'flex flex-col'}>
                        <div className='flex'>
                            <h1 className='text-5xl font-semibold py-10'>{brand.brand}</h1>
                        </div>
                        <div className='grid grid-cols-2 md:grid-cols-4 gap-y-10 w-full h-full'>
                            {
                                pops.map((pop) => (
                                    brand.brand === pop.brand.title &&
                                   <PopItem key={pop.description} image={pop.image.url} title={pop.title} description={pop.description} price={pop.price} />
                                ))
                            }
                        </div>
                    </div>                  
                ))
            }
        </div>
        </>
    )
}
