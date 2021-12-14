import React from 'react'
import AdvertisementBlock from './AdvertisementBlock';

export default function AdvertisementNews({data}) {

    return (
                <div className="w-full">
                    {
                        data.map((el) => (
                            <AdvertisementBlock el={el}  />
                        ))                  
                    }
                </div>
    )
}
