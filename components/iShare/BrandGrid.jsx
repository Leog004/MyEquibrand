/*
    MyEquibrand 2021 - BrandGrid Component - 12/21/21
    Leo Garza, Justin Johnson

    Goal: To download files from our directory and generate a zip folder that the client can recieve
    PAGE REFERENCES: api/readerZip.js, pages/iShare/index.js
    Status: 
        We are able to sucessfully generate a zip folder to the client. 
*/


import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudDownloadAlt, faDownload } from '@fortawesome/free-solid-svg-icons';
import JSZip from "jszip";
import { saveAs } from 'file-saver';

/*
    This imports toastify, the pop-up window
*/
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
toast.configure();


export default function BrandGrid({title, handleChange}) {

    const toastId = React.useRef(null); // creating a reference to variable toastID

    const [buttonClicked, setbuttonClicked] = useState(false); // will hold the state if the button to download has been clicked
    const [downloadPending, setdownloadPending] = useState(true); // will hold the state if we had started to download folder
    const [downloadComplete, setDownloadComplete] = useState(false); // will hold the state if the download is complete

    async function download() {

       let zip = new JSZip(); // creating a JSzip instance
       let folder = zip.folder('collection');  // creates a folder

        // Here we are calling our API readerZip. We are passing a parameter that will contain our brand name to indicate the brand folder we would like to open
        const data = await fetch('/api/readerZip?' + new URLSearchParams({
            brand: title,
        })).then((res) => res.json()) // this should return all the file names within that folder and store it in an array object called data
            
   
        // Here we are going to iterate all the filenames that we recieved from our api.
        data.files.map((el, index) => {
          
            // We are doing a fetch request for each file. Example: www.equibrand.com/../brands/cashel/ascsd.png and then return the blob that will allow us to convert that to an image
            const imageBlob = fetch(`https://traincompetewin.com/Product Images/Brands/${title}/${el}`).then(response => response.blob());
            
            // creating a file to our zip folder. Parameter 1: filename 'exampleFile.png', Parameter 2: blob
            folder.file(`${el}`, imageBlob); 
            
        });

        
        // Here we are going to zip the folder and all its content, there is 9 compression levels: 1 - 9 (fast - slow). 
        folder.generateAsync({ 
            type: "blob",     
            compression: "DEFLATE",
            compressionOptions: {
            level: 1
        }}, function updateCallback(metadata){


            // check if we already displayed a toast, if not we are going to create a new toast that show on screen
            if(toastId.current === null){

                setdownloadPending(false); // here we are setting the we are no longer pending and downloading has started

                // toast properties
                toastId.current = toast.warn(`The download is currently underway for ${title} images. Please stay on this page until the download is finished.`, {
                    progress: (0 / 100),
                    position: toast.POSITION.BOTTOM_CENTER,
                    autoClose: false,
                    closeOnClick: false
                });

            } else {

                // here we are updating our progress bar of the toast. || console.log("progression: " + metadata.percent.toFixed(2) + " %") // for getting the percent of download
                toast.update(toastId.current, {
                    progress: metadata.percent.toFixed(2) / 100
                })

            }

            // This if statement checks if the currentFile is valid. || // console.log("current file = " + metadata.currentFile); // if you want to show the filename that is being downloaded
            if(metadata.currentFile) {
                
            }    


        }).then(content =>{ 

            // Then once all the files have been added to the folder and zip, we are now going to download it into the client computers || USING DEPENCIE file-saver
            saveAs(content, title) // (content, filename) *Note, the first paramater takes the content, the second take what you want to name the folder.

            setDownloadComplete(true); // setting that our downloadcomplete state is now true
        });

    }

    return (
        <div className='relative'>
            <article onClick={() => handleChange(title)} className="relative w-full h-64 bg-cover bg-center group rounded-lg overflow-hidden shadow-lg hover:shadow-2xl  transition duration-300 ease-in-out"

            style={{backgroundImage: `url('https://images.unsplash.com/flagged/photo-1557296126-ae91316e5746?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80')`}} >
            <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:opacity-75 transition duration-300 ease-in-out"></div>
            <div className="relative w-full h-full px-4 sm:px-6 lg:px-4 flex justify-center items-center">
            {
                /* <!-- This alert will show when the user has clicked on the button | letting the user know that the folder is being downloaded --> */
                buttonClicked && 
                <div className={`w-full ${downloadPending ? 'bg-yellow-400' : 'bg-red-400' } ${downloadComplete && 'bg-green-400'} text-white text-sm absolute top-0 text-center`}>
                    
                    <p><FontAwesomeIcon icon={faCloudDownloadAlt} /> 
                        {!downloadComplete ? downloadPending ? ' Pending Downlaod' : ' Your download has started' : ' Download is now complete'}
                    </p>
                </div>
            }
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
                <div className={`rounded-full p-2 bg-gray-700 text-white mr-2 cursor-pointer hover:bg-gray-800 transition-all duration-150 ease-linear ${buttonClicked && 'opacity-40'}`}>
                    <button onClick={ () => {
                       !buttonClicked && download();
                       setbuttonClicked(true);
                    } }>
                        <FontAwesomeIcon className='h-8 w-8' icon={faDownload} />
                    </button>
                </div>
            </div>
        </div>
    )
}
