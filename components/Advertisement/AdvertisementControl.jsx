import React, {useState} from 'react'
import {PopItem} from '../../components'


export default function AdvertisementControl({brands, showContent}) {

// border-blue-500 text-blue-600
    return (
    <div class="flex justify-center mb-20 bg-gray-100 h-28 items-center">
    {
        showContent.length > 0 ? showContent.map((el) => (
            <button key={el.brand} className={`h-10 mx-4 px-4 py-2 -mb-px text-sm text-center ${el.show ? 'border-green-500 text-green-600' : 'border-gray-200 text-gray-200'}  bg-transparent border-b-2  sm:text-base whitespace-nowrap focus:outline-none`}>
                {el.brand}
            </button>
        ))
        : <h1>There is no brands assigned to your profile. Please contact us.</h1>
    }
    </div>
    )
}
