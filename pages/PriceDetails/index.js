import React from 'react'
import { HeaderBlock } from '../../components'
import fileDownload from 'js-file-download'
import axios from 'axios'

export default function index() {

    // Here is our array object that contain our file path and title
    let files = 
        [   
            {
                Title : '2021 Product Details & Pricing',
                Asset : '/assets/Excel/EquibrandDealerPricingUpdate2021-Domestic.xlsx'
            },
            {
                Title : '2022 PRODUCT DETAILS & PRICING',
                Asset : '/assets/Excel/EquibrandDealerPricingUpdate2022-Domestic.xlsx'
            },
            {
                Title : '2022 PRODUCTS WITH PRICE CHANGE',
                Asset : '/assets/Excel/EQ ITEMS WITH PRICE CHANGE 12-20-2021.xlxs'
            },
        ]

    
    // When the user clicks on the image or title, we are passing the pathname
    const handleImageClick = (url) => {
        // filename is the name of the file to show the user when the download is complete
        const filename = url.replace('/assets/Excel', '');

        // getting the file byte content
        axios.get(url, {
            responseType: 'blob',
          })
          .then((res) => {
            fileDownload(res.data, filename); // downloading the file. 
          })

}

    return (
        <div className='main'>
            <HeaderBlock title={'Price Details'} />
            <div className='container py-20 mx-auto w-full justify-center items-center text-center'>
                <h1 className='text-4xl font-semibold'>Product Details & Pricing</h1>
                    <p className='text-gray-700 leading-6 mt-10'>
                        ***New pricing goes into effective Jan 3rd, 2022***
                    </p>
                    <p className='text-gray-700 bg-yellow-400 leading-6 mt-1'>
                        Corresponding MAP prices effective Jan 31, 2022
                    </p>
                    <div className='grid grid-cols-1 sm:grid-cols-3 py-10 gap-y-20 sm:gap-y-0'>
                        {
                            // here we are iterating through our object array and displaying its contents
                            files.map((el) => (                    
                                <div key={el.title} className='flex flex-col justify-center items-center sm:gap-y-5'>
                                    <img onClick={() => handleImageClick(el.Asset)} className='h-20 w-20' src='/assets/xlsImage.jpg' />
                                    <p onClick={() => handleImageClick(el.Asset)} className='text-sm font-semibold'>{el.Title}</p>
                                </div>
                            ))
                        }
                    </div>
            </div>
        </div>
    )
}
