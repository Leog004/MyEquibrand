import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import {FacebookShareButton} from "react-share";
import ReactPlayer from 'react-player/youtube'
import Image from 'next/image'

toast.configure();


export default function Grid({data}) {

    const [showVideo, setShowVideo] = useState(false);

    const successMessage = () => {
        toast.success('Url has been copied to your clipboard.', {position: toast.POSITION.BOTTOM_RIGHT, autoClose: 2000});
    }
    
    const handleOnClickCopy = (el) => {
        navigator.clipboard.writeText(el);
        successMessage();
    }

    const showVideoClick = () => {
        setShowVideo(showVideo => !showVideo);
    }

    return (
        <div className="px-12 py-8 transition-colors duration-200 transform border cursor-pointer rounded-xl hover:border-transparent group hover:bg-gray-700 dark:border-gray-700 dark:hover:border-transparent">
        {
            !showVideo ? (
                <>
                <div className="flex flex-col sm:-mx-4 sm:flex-row">
                    <div onClick={showVideoClick} className='flex-shrink-0 object-cover w-24 h-24 rounded-lg sm:mx-4 ring-4 ring-gray-300 relative overflow-hidden'>
                        <Image blurDataURL={data.thumbnailImage.url} placeholder={'blur'} layout='fill' objectFit='cover' src={data.thumbnailImage.url} alt={data.title} />
                    </div>
                    <div className="mt-4 sm:mx-4 sm:mt-0">
                        <h1 className="text-xl font-semibold text-gray-700 capitalize md:text-2xl dark:text-white group-hover:text-white">{data.title || ''}</h1>
                        
                        <p className="mt-2 text-gray-500 capitalize dark:text-gray-300 group-hover:text-gray-300">{data.brand.title}</p>
                    </div>
                </div>

                <p className="mt-4 text-gray-500 capitalize dark:text-gray-300 group-hover:text-gray-300">{data.description}</p>
            </>
            )
            : <div className="flex flex-col sm:flex-row h-64 drop-shadow-2xl">
                <ReactPlayer width='100%' height='100%' controls={true} playing={true} url={data.youtubeVideoUrl} /> 
            </div>
        }
            
            
            <div className="flex mt-4 -mx-2">
                <a onClick={() => { handleOnClickCopy(data.youtubeVideoUrl);}} href="#!" className="flex mx-2 text-gray-600 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300 group-hover:text-white" aria-label="facebook">
                    <FontAwesomeIcon className='w-full h-full' icon={faCode} />
                </a>

                <FacebookShareButton 
                url={data.youtubeVideoUrl}
                quote={`${data.title} - ${data.description}`}
                description={data.description}
                className='flex flex-grow mt-2'
                >
                <svg className="w-6 h-6 fill-current mx-2 text-gray-600 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300 group-hover:text-white" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M2.00195 12.002C2.00312 16.9214 5.58036 21.1101 10.439 21.881V14.892H7.90195V12.002H10.442V9.80204C10.3284 8.75958 10.6845 7.72064 11.4136 6.96698C12.1427 6.21332 13.1693 5.82306 14.215 5.90204C14.9655 5.91417 15.7141 5.98101 16.455 6.10205V8.56104H15.191C14.7558 8.50405 14.3183 8.64777 14.0017 8.95171C13.6851 9.25566 13.5237 9.68693 13.563 10.124V12.002H16.334L15.891 14.893H13.563V21.881C18.8174 21.0506 22.502 16.2518 21.9475 10.9611C21.3929 5.67041 16.7932 1.73997 11.4808 2.01722C6.16831 2.29447 2.0028 6.68235 2.00195 12.002Z">
                    </path>
                </svg>
              </FacebookShareButton>

             <button onClick={showVideoClick} className='flex px-4 mr-6 py-2 rounded-full bg-gray-800 text-white shadow-md justify-end self-end items-end'>
                {showVideo ? 'Stop Video' : 'Play Video'}
             </button>
            
            </div>
        </div>
    )
}



