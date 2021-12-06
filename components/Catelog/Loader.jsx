import React from 'react'

export default function Loader({isLoading}) {
    
    if(!isLoading) return null;

    return (
        <div id='loader' className='flex flex-col justify-center items-center'>
            <img src='http://www.myequibrand.com/img/MyEquibrand_Brand.png' alt='loader'/>
            <p>Loading...</p>
        </div>
    )
}
