import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image'

export default function BrandGrid({title, handleChange}) {
    return (
        <article onClick={() => handleChange(title)} class="relative w-full h-64 bg-cover bg-center group rounded-lg overflow-hidden shadow-lg hover:shadow-2xl  transition duration-300 ease-in-out"
        style={{backgroundImage: `url('https://images.unsplash.com/photo-1623479322729-28b25c16b011?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80');`}} >
        <div class="absolute inset-0 bg-black bg-opacity-50 group-hover:opacity-75 transition duration-300 ease-in-out"></div>
        <div class="relative w-full h-full px-4 sm:px-6 lg:px-4 flex justify-center items-center">
        <h3 class="text-center">
            <a class="text-white text-2xl font-bold text-center" href="#!">
                <span class="absolute inset-0"></span>
                {title}
            </a>
        </h3>

                        {/* <!-- BOTTOM ICONS --> */}
            <div class="absolute py-2 bottom-6 left-0 right-0 flex justify-center">
                <div class="rounded-full p-2 bg-gray-700 text-white mr-2 cursor-pointer hover:bg-gray-800 transition-all duration-150 ease-linear">
                    <a href={''} download={''}>
                        <FontAwesomeIcon className='h-8 w-8' icon={faDownload} />
                    </a>
                </div>
            </div>
        </div>
    </article>
    )
}
