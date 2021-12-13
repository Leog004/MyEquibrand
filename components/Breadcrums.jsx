import React from 'react'
import Link from 'next/link'

export default function Breadcrums({pageBehind, current, brand}) {
    return (
        <div className="bg-gray-200 dark:bg-gray-700">
        <div className="container flex items-center justify-between px-6 py-4 mx-auto overflow-y-auto whitespace-nowrap">
        <div className='flex'>
            <a href="/" className="text-gray-600 dark:text-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
            </a>

            <span className="mx-5 text-gray-500 dark:text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
            </span>

            <Link href={`/${pageBehind}`}>
                <a href="#" className="text-gray-600 dark:text-gray-200 hover:underline">
                    {pageBehind}
                </a>
            </Link>

            <span className="mx-5 text-gray-500 dark:text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
            </span>

            <a href="#" className="text-gray-700 hover:underline">
                {current}
            </a>
        </div>
            <div className='flex overflow-hidden'>
                <img className='h-8 rounded-sm shadow-md' src={brand} />
            </div>
        </div>
    </div>
    )
}
