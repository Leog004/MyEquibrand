import React from 'react'

export default function PopItem() {
    return (
        <div class="flex flex-col items-center justify-center max-w-sm mx-auto">
            <div class="w-full h-64 bg-transparent bg-center bg-contain bg-no-repeat rounded-lg shadow-md" style={{backgroundImage: `url(http://myequibrand.com/img/POP/16HEADER24X6_CE.JPG)`}}></div>

            <div class="w-56 -mt-10 overflow-hidden bg-white rounded-lg shadow-lg md:w-64 dark:bg-gray-800">
                <h3 class="py-2 font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white">CLASSIC EQUINE HEADER</h3>
                
                <div class="flex items-center justify-between px-3 py-2 bg-gray-200 dark:bg-gray-700">
                    <span class="font-bold text-gray-800 dark:text-gray-200">$6.00</span>
                    <button class="px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-200 transform bg-gray-800 rounded hover:bg-gray-700 dark:hover:bg-gray-600 focus:bg-gray-700 dark:focus:bg-gray-600 focus:outline-none">Header Size 6x6</button>
                </div>
            </div>
        </div>
    )
}
