import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image'


export default function ImageGrid({url, filename}) {
    return (
        <div className="relative border-2 border-solid border-white rounded-3xl w-80 bg-white h-96">
            <div className="w-full h-full object-cover rounded-3xl border-2 border-white">
                <Image  blurDataURL={url} placeholder={'blur'} objectFit='cover' layout='fill' src={url} alt={filename} />
            </div>
            <div>
                <p className='text-sm rounded-t-3xl text-white flex justify-between px-4 absolute top-0 left-0 right-0 py-4 bg-gray-900 font-semibold'>{filename}</p>
            </div>
            {/* <!-- BOTTOM ICONS --> */}
            <div className="absolute py-2 bottom-6 left-0 right-0 flex justify-center">
                <div className="rounded-full p-2 bg-gray-700 text-white mr-2 cursor-pointer hover:bg-gray-800 transition-all duration-150 ease-linear">
                    <a href={url} download={url}>
                        <FontAwesomeIcon className='h-8 w-8' icon={faDownload} />
                    </a>
                </div>
            </div>
        </div>
    )
}
