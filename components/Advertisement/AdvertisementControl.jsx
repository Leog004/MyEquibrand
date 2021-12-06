import React, {useState} from 'react'
import {PopItem} from '../../components'


export default function AdvertisementControl({brands}) {
// border-blue-500 text-blue-600
    return (
    <div class="flex justify-center mb-20">
    {
        brands.map((el) => (
            <button className="h-10 mx-4 px-4 py-2 -mb-px text-sm text-center text-gray-600 bg-transparent border-b-2  sm:text-base dark:border-blue-400 dark:text-blue-300 whitespace-nowrap focus:outline-none">
                {el}
            </button>
        ))
    }
    </div>
    )
}
