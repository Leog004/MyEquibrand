import React from 'react'
import { NewsDetails } from '.'

export default function News({el}) {
    return (
        <div className="relative bg-white dark:bg-gray-800 max-w-5xl mx-auto py-28 px-20">
            <div className="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-12 lg:items-center">
                <div className="lg:col-start-2 md:pl-20">
                    <h4 className="text-2xl leading-8 font-extrabold text-gray-900 dark:text-white tracking-tight sm:leading-9">
                        {el.title}
                    </h4>
                    <NewsDetails details={el.advertisementDetails} />
                </div>
                <div className="mt-10 -mx-4 md:-mx-12 relative lg:mt-0 lg:col-start-1">
                    <a href={el.mainImage.url} target='_blank'>
                        <img src={el.mainImage.url} alt="illustration" className="relative mx-auto shadow-lg rounded w-auto"/>
                    </a>
                </div>
            </div>
            <div className='flex flex-col -mx-4 md:-mx-12 w-full mt-10 gap-y-5'>
                <hr className='w-full h-2 border-blue-200' />
                <p className='text-base leading-6 text-gray-500'>{el.description}</p>
            </div>
        </div>
    )
}
