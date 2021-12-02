import React from 'react'
import Link from 'next/link'
import { FeaturedBrands } from '.'
import AdvertisementBlock from './AdvertisementBlock';

export default function AdvertisementNews({data}) {

    return (
                <div className="w-full">
                    <FeaturedBrands/>
                    {
                        data.map((el) => (
                            <AdvertisementBlock el={el}  />
                        ))                  
                    }
                </div>
    )
}
