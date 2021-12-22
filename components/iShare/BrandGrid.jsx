import React, {useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import JSZip from "jszip";
import { saveAs } from 'file-saver';

export default function BrandGrid({title, handleChange,progress, setProgress}) {

    useEffect(() => {

    },[])

    async function download() {

       let zip = new JSZip();
       let folder = zip.folder('collection'); 

        const data = await fetch('/api/readerZip?' + new URLSearchParams({
            brand: title,
        })).then((res) => res.json())  
        
        console.log(progress);

        
        data.files.map((el, index) => {
          
            const imageBlob = fetch(`http://equibrand.com/Product Images/Brands/${title}/${el}`).then(response => response.blob());
            folder.file(`${el}`, imageBlob);
            
        })

        folder.generateAsync({ 
            type: "blob",     
            compression: "DEFLATE",
            compressionOptions: {
            level: 1
        }}, function updateCallback(metadata){
                //console.log("progression: " + metadata.percent.toFixed(2) + " %")

                setProgress(metadata.percent.toFixed(2));
                if(metadata.currentFile) {
                   // console.log("current file = " + metadata.currentFile);
                }    
        }).then(content =>{ 
            saveAs(content, "files")
            setProgress(0);
        });

    }

    return (
        <div className='relative'>
            <article onClick={() => handleChange(title)} className="relative w-full h-64 bg-cover bg-center group rounded-lg overflow-hidden shadow-lg hover:shadow-2xl  transition duration-300 ease-in-out"

            style={{backgroundImage: `url('https://images.unsplash.com/flagged/photo-1557296126-ae91316e5746?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80')`}} >
            <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:opacity-75 transition duration-300 ease-in-out"></div>
            <div className="relative w-full h-full px-4 sm:px-6 lg:px-4 flex justify-center items-center">
            <h3 className="text-center">
                <a className="text-white text-2xl font-bold text-center" href="#!">
                    <span className="absolute inset-0"></span>
                    {title}
                </a>
            </h3>
            </div>
        </article>
            {/* <!-- BOTTOM ICONS --> */}
            <div className="absolute py-2 bottom-6 left-0 right-0 flex justify-center z-40">
            <div className="rounded-full p-2 bg-gray-700 text-white mr-2 cursor-pointer hover:bg-gray-800 transition-all duration-150 ease-linear">
                <button onClick={download}>
                    <FontAwesomeIcon className='h-8 w-8' icon={faDownload} />
                </button>
            </div>
        </div>
        {
            (progress > 1 ) && 
            <div className="w-full bg-gray-200 rounded-full">
                <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-l-full" style={{width: `${ progress}%`}}> { progress}%</div>
            </div>
        }

    </div>
    )
}
