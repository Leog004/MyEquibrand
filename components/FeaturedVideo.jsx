import React from 'react'

import ReactPlayer from 'react-player/youtube'


export default function FeaturedVideo() {
    return (
        <div className='h-full max-w-5xl mx-auto'>
            <div className='flex justify-between h-full gap-x-6 py-20'>
                <div className='w-4/5 h-lg'>
                    <ReactPlayer width='100%' height='100%' controls={true} playing={false} url='https://www.youtube.com/watch?v=4lMkurFS0zI' /> 
                </div>

                <div id='feature-video' className='flex h-lg flex-col w-1/5 gap-y-2 overflow-y-scroll'>
                    <ReactPlayer width='100%' height='200px' controls={true}  playing={false} url='https://www.youtube.com/watch?v=fli0nzjTfMw' /> 
                    
                    <ReactPlayer width='100%' height='200px' controls={true}  playing={false} url='https://www.youtube.com/watch?v=fli0nzjTfMw' /> 

                    <ReactPlayer width='100%' height='200px' controls={true}  playing={false} url='https://www.youtube.com/watch?v=fli0nzjTfMw' /> 

                    <ReactPlayer width='100%' height='200px' controls={true}  playing={false} url='https://www.youtube.com/watch?v=fli0nzjTfMw' /> 

                    <ReactPlayer width='100%' height='200px' controls={true}  playing={false} url='https://www.youtube.com/watch?v=fli0nzjTfMw' /> 
                </div>
            </div>
            <div className='w-2/3 flex flex-col -mt-10 mb-10'>
                <span className='text-sm text-gray-500 font-semibold' >Video News</span>
                <h1 className='text-2xl text-black font-semibold'>Equibrand 2021 New Products!</h1>
                <p className='text-xs font-normal text-gray-700 mt-2'>Catch all the highlights from Angelina Jolie, Kevin Feige, Chloe Zhao, Kumail Nanjiani, Kit Harington, Gemma Chan and more LIVE at the red carpet premiere of Marvel Studios' Eternals presented by Lexus!</p>
            </div>
        </div>
    )
}
