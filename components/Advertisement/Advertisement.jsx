import React, {useState} from 'react'
import AdvertisementControl from './AdvertisementControl'
import PopControl from './Pop/PopControl'



export default function Advertisement({news}) {

    const [brands, setbrands] = useState(["Classic Rope", "Rattler Rope", "Classic Equine", "Martin Saddlery"])

    return (
        <div className='w-full h-full'>
            <div className='max-w-6xl w-full h-full mx-auto py-20 px-0'>
                <AdvertisementControl brands={brands} />
                {/* <PopControl data={news} brands={brands} /> */}
            </div>
        </div>
    )
}

