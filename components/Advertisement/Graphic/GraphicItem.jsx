import React from 'react'
import fileDownload from 'js-file-download'
import axios from 'axios'

export default function GraphicItem({key, asset, image}) {

    const mainImage = asset.length > 1 ? asset.filter((el) => {
        if(el.mimeType === 'image/jpeg'){
            return el.url
        }
    }).map((el) => el.url) : asset[0].url


    const handleImageClick = (e) => {

        asset.map((el) => {
            axios.get(el.url, {
                responseType: 'blob',
              })
              .then((res) => {
                fileDownload(res.data, el.fileName);
              })
        })
    }

    return (
            <img key={key} onClick={handleImageClick} className='w-full max-h-auto h-full cursor-pointer active:scale-x-125 transform transition-all' src={mainImage || image} />
    )
}
