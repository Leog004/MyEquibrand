import React from 'react'

export default function PopItem({title, description, sku, price, image}) {
    return (
        <div className="flex flex-col items-center justify-end max-w-sm mx-auto">
            <div className="w-full h-64 bg-transparent bg-center bg-contain bg-no-repeat rounded-lg shadow-md" style={{backgroundImage: `url(${image})`}}></div>

            <div className="w-full p-2 md:p-0 -mt-10 overflow-hidden bg-white rounded-sm shadow-lg md:w-64 dark:bg-gray-800">
                <h3 className="py-2 font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white">{title}</h3>
                
                <div className="flex flex-col items-center justify-center px-3 py-2 bg-gray-200 dark:bg-gray-700">
                    <span className="font-bold text-gray-800 dark:text-gray-200">${price}</span>
                    <button className="px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-200 transform bg-gray-800 rounded hover:bg-gray-700 dark:hover:bg-gray-600 focus:bg-gray-700 dark:focus:bg-gray-600 focus:outline-none">
                        {description}
                    </button>
                </div>
            </div>
        </div>
    )
}
