import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faWindowClose } from '@fortawesome/free-solid-svg-icons';
const HeaderImage = 'http://myequibrand.com/img/4818875210.jpg';
import ReactPlayer from 'react-player/youtube'

export default function Features() {

    const [video, setvideo] = useState(false)

    const handleVideo = () =>{
        
        if(video) setvideo(false);
        if(!video) setvideo(true);

    }

    return (
        <>
        <div className='h-screen sm:h-xl w-full bg-background'>
            <div className='flex flex-wrap sm:flex-nowrap h-full'>
                <div className='flex flex-col h-full w-full sm:w-1/2 justify-center items-center px-20 py-10 relative'>
                <img className='h-18 self-start mb-2' src={'https://rattlerrope.com/Images/Brands/RattlerPr.png'} />
                    <h3 className='text-white mb-8 text-lg'>When five strands of low stretch poly fibers are woven around a solid braided core, you get speed and snap as quick as a viper’s strike, with more consistency and less stretch than any calf rope available.</h3>
                    <div className='flex gap-6 self-start'>
                        <button className=' bg-purple-500 hover:bg-purple-600 px-4 py-1 text-white rounded-md'>asdasd</button>
                        <button className=' bg-purple-500  hover:bg-purple-600 px-4 py-1 text-white rounded-md'>asasd</button>
                    </div>
                    <div className='hidden sm:block bg-background h-full w-28 absolute -right-16 top-0 transform skew-x-12 z-10'></div>
                </div>
                <div className='flex h-full w-full sm:w-1/2 relative' style={{backgroundImage: `url(${HeaderImage})`, backgroundSize: 'cover'}}>
                    <div onClick={handleVideo} className='absolute left-2/4 top-2/4 text-white text-6xl transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20'>
                    
                    <FontAwesomeIcon icon={!video ? faPlayCircle : faWindowClose} />
                    {
                        video ? <ReactPlayer className='absolute right-24 -bottom-40' controls='true' playing={video} url='https://www.youtube.com/watch?v=fli0nzjTfMw' /> : ''
                    }
                    
                    </div>
                </div>
            </div>
        </div>
        <div className='h-full sm:h-md bg-white w-full relative'>
            <div className='bg-white w-full h-full sm:h-auto mx-auto max-w-5xl relative sm:absolute -top-24 left-2/4 transform -translate-x-1/2 shadow-lg rounded-sm z-20'>
                <div className='grid grid-cols-2 sm:grid-cols-4 gap-x-10 gap-y-10 py-10 px-6 text-center'>
                    <div className='flex flex-col h-full justify-center items-center align-middle mx-auto'>
                        <img className='w-auto' src='https://martinsaddlery.com/iShare/Thumbs600/spitfire.jpg' style={{marginBlockEnd: 'auto'}} />
                        <h4 className='text-sm text-gray-500 font-semibold'>SPITFIRE BREAKAWAY ROPE</h4>
                        <p className='text-sm text-black font-semibold capitalize leading-5 text-center'>The first four-strand calf rope with a CoreTech™ core.</p>
                    </div>
                    <div className='flex flex-col h-full'>
                    <img className='w-auto' src='https://martinsaddlery.com/iShare/Thumbs600/strike105.png' style={{marginBlockEnd: 'auto'}} />
                        <h4 className='text-sm text-gray-500 font-semibold'>SPITFIRE BREAKAWAY ROPE</h4>
                        <p className='text-sm text-black font-semibold capitalize leading-5 text-center'>The first four-strand calf rope with a CoreTech™ core.</p>
                    </div>
                    <div className='flex flex-col h-full'>
                    <img className='w-auto' src='https://martinsaddlery.com/iShare/Thumbs600/viper10.png' style={{marginBlockEnd: 'auto'}} />
                        <h4 className='text-sm text-gray-500 font-semibold'>VIPER CALF ROPE</h4>
                        <p className='text-sm text-black font-semibold capitalize leading-5 text-center'>When five strands of low stretch poly fibers are woven.</p>
                    </div>
                    <div className='flex flex-col h-full'>
                    <img className='w-auto' src='https://martinsaddlery.com/iShare/Thumbs600/spitfire.jpg' style={{marginBlockEnd: 'auto'}}  />
                        <h4 className='text-sm text-gray-500 font-semibold'>SPITFIRE BREAKAWAY ROPE</h4>
                        <p className='text-sm text-black font-semibold capitalize leading-5 text-center'>The First Four-Strand Calf Rope With A CoreTech™ Core.</p>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
