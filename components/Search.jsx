import React, {useState} from 'react'

export default function Search({hidden}) {

    const [search, setSearch] = useState([]);


    const handleOnChange = () => {
        
    }

    return (
            <div className={`absolute top-2 right-10 ${hidden ? 'hidden' : ''}`}>
                <div className="inline-flex flex-col justify-center relative text-gray-500">
                    <div className="relative">
                        <input onChange={handleOnChange} type="text" className="p-2 pl-8 rounded border border-gray-200 bg-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent" placeholder="search..." value="Gar" />
                        <svg className="w-4 h-4 absolute left-2.5 top-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                        </svg>
                    </div>
                    <h3 className="mt-2 text-sm">Results:</h3>
                    <ul className="bg-white border border-gray-100 w-full mt-2 ">
                        <li className="pl-8 pr-2 py-1 border-b-2 border-gray-100 relative cursor-pointer hover:bg-yellow-50 hover:text-gray-900">
                            <b>Gar</b>dameer - Italië
                        </li>
                        <li className="pl-8 pr-2 py-1 border-b-2 border-gray-100 relative cursor-pointer hover:bg-yellow-50 hover:text-gray-900">
                            <b>Gar</b>da - Veneto - Italië
                        </li>
                        <li className="pl-8 pr-2 py-1 border-b-2 border-gray-100 relative cursor-pointer hover:bg-yellow-50 hover:text-gray-900">
                            <b>Gar</b>da Hotel - Italië
                        </li>
                    </ul>
                </div>
            </div>
    )
}
