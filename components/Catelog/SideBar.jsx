import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faMapPin } from '@fortawesome/free-solid-svg-icons';

export default function SideBar({setoutSideNumber}) {

    const [number, setnumber] = useState('')
    

    const handleChange = (e) => {
        setnumber(e.target.value);

        if(e.target.value <= 350){
            setoutSideNumber(e.target.value);
            document.getElementById('PageSearch').style.border = '1px solid rgba(209, 213, 219, 0.7)';
        }else{
            document.getElementById('PageSearch').style.border = '3px solid red';
        }
    }

    return (
        <div class="flex flex-col w-2/6 h-screen px-4 py-8 bg-white border-r dark:bg-gray-800 dark:border-gray-600">
        <h2 class="text-3xl font-semibold text-gray-800 dark:text-white">My Equibrand</h2>

        <div class="relative mt-6">
            {/* <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg class="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                    <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </span> */}
            <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
                <FontAwesomeIcon className='w-5 h-5 text-gray-400' icon={faMapPin} />
            </span>
            <input id='PageSearch' value={number} onChange={handleChange} type="text" class="w-full py-3 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" placeholder="Page Number"/>
        </div>
        
        <div class="flex flex-col justify-between flex-1 mt-6">
            <nav>
                <a  onClick={() => {setoutSideNumber(3); setnumber(3)}}  class="flex items-center px-4 py-2 text-gray-700 bg-gray-200 rounded-md dark:bg-gray-700 dark:text-gray-200" href="#!">
                
                    <FontAwesomeIcon className='w-5 h-5 text-gray-400' icon={faEllipsisV} />

                    <span class="mx-4 text-sm">Classic Rope</span>
                </a>

                <a onClick={() => {setoutSideNumber(15); setnumber(15)}} class="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700" href="#!">
                <FontAwesomeIcon className='w-5 h-5 text-gray-400' icon={faEllipsisV} />


                    <span  class="mx-4 text-sm">Rattler Rope</span>
                </a>

                <a onClick={() => {setoutSideNumber(23); setnumber(23)}} class="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700" href="#!">
                <FontAwesomeIcon className='w-5 h-5 text-gray-400' icon={faEllipsisV} />


                    <span  class="mx-4 text-sm">Classic Equine</span>
                </a>

                <a  onClick={() => {setoutSideNumber(139); setnumber(139)}}  class="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700" href="#!">
                <FontAwesomeIcon className='w-5 h-5 text-gray-400' icon={faEllipsisV} />


                    <span class="mx-4 text-sm">Train Win Compete</span>
                </a>

                <a onClick={() => {setoutSideNumber(150); setnumber(150)}} class="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700" href="#!">
                <FontAwesomeIcon className='w-5 h-5 text-gray-400' icon={faEllipsisV} />


                    <span   class="mx-4 text-sm">Martin Saddlery</span>
                </a>

                <hr class="my-6 dark:border-gray-600" />

                <a  onClick={() => {setoutSideNumber(259); setnumber(259)}} class="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700" href="#!">
                <FontAwesomeIcon className='w-5 h-5 text-gray-400' icon={faEllipsisV} />


                    <span class="mx-4 text-sm">Cashel</span>
                </a>
            </nav>

            <div class="flex items-center px-4 -mx-2">
                <img class="object-cover mx-2 rounded-full h-9 w-9" src="http://www.learntocodewithleo.com/Images/Leo.jpg" alt="avatar"/>
                <h4 class="mx-2 font-medium text-gray-800 dark:text-gray-200 hover:underline">Leo Garza</h4>
            </div>
        </div>
        </div>
    )
}
