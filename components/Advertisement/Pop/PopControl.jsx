import React from 'react'
import PopItem from './PopItem'

export default function PopControl({data, brands}) {
    console.log(data);
    return (
        <>
        <div className='flex flex-col'>

            <div className='flex flex-col'>
                <div className='flex'>
                    <h1 className='text-5xl'>Classic Rope</h1>
                </div>
                <div className='grid grid-cols-4 gap-y-10 bg-red-50 w-full'>
                    <PopItem/>
                    <PopItem/>
                    <PopItem/>
                    <PopItem/>
                </div>
            </div>

            <div className='flex flex-col'>
                <div className='flex'>
                    <h1 className='text-5xl'>Rattler Rope</h1>
                </div>
                <div className='grid grid-cols-4 gap-y-10 bg-red-50 w-full'>
                    <PopItem/>
                    <PopItem/>
                    <PopItem/>
                    <PopItem/>
                </div>
            </div>

        </div>
        </>
    )
}
