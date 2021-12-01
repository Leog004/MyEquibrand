import React, {useState} from 'react'
import { signIn, signOut, useSession} from 'next-auth/react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSearch, faIdCard, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Search } from '.';

export default function Header() {

    const {data: session} = useSession();

    const [showSearch, setShowSearch] = useState(true);

    const handleSearch = () => {

        if(showSearch) setShowSearch(false);
        if(!showSearch) setShowSearch(true);
    }

    return (
        <header className="text-gray-100 bg-gray-900 body-font shadow w-full" style={{fontFamily: `'Roboto', sans-serif`, backgroundColor: '#202020'}}>
        <div className='flex border border-gray-800 border-l-0 border-r-0 justify-between px-0 sm:px-20'>

        <div className='flex items-center border-gray-800 px-4 py-2 border-l border-r m-0'>
            <Link href='#'>
                {
                    session 
                    ?   <div className='flex'>
                            <button className='cursor-pointer uppercase font-semibold text-xs'> 
                                <FontAwesomeIcon className='mr-4' icon={faIdCard}/>
                            </button>
                            |
                            <button onClick={() => signOut()} className='cursor-pointer uppercase font-semibold text-xs'> 
                                <FontAwesomeIcon className='ml-4' icon={faSignOutAlt}/>
                            </button>   
                        </div>
                    :   <button type='button' onClick={() => signIn()} className='cursor-pointer uppercase font-semibold text-xs'> 
                            <FontAwesomeIcon className='mr-2' icon={faUser}/> Sign In
                        </button>
                }
 
            </Link>
        </div>

         <Link href='/'>
            <img src="http://www.myequibrand.com/img/MyEquibrand_Brand_White.png" style={{ height: '24px', marginTop: '10px', marginBottom: '10px'}} alt="logo" />
         </Link>
         <div className='flex items-center border-gray-800 px-4 py-2 border-l border-r m-0'>
            <Link href='#'><a onClick={handleSearch} className='cursor-pointer uppercase font-semibold text-xs'> <FontAwesomeIcon className='mr-2' icon={faSearch}/> Search</a></Link>
            <Search hidden={showSearch} handleSearch={handleSearch}/>
        </div>
         

        </div>
        {
            session && (
                <div className="container mx-auto flex flex-wrap px-20 py-5 flex-col md:flex-row items-center">
                    <nav className="flex mx-auto flex-wrap items-center text-sm md:ml-auto relative">
                        <Link href='#'><a className="mr-2 text-xs sm:mr-5 sm:text-sm hover:text-gray-200 cursor-pointer border-b border-transparent hover:border-indigo-200"><span className='bg-red-500 absolute -top-5 -left-3 px-2 rounded-lg' style={{fontSize: '.5rem'}}>New</span>Products</a></Link>
                        
                        <Link href='#'><a className="mr-2 text-xs sm:mr-5 sm:text-sm hover:text-gray-200 cursor-pointer border-b border-transparent hover:border-indigo-200">Advertising</a></Link>
                        <Link href='#'><a className="mr-2 text-xs sm:mr-5 sm:text-sm hover:text-gray-200 cursor-pointer border-b border-transparent hover:border-indigo-200">Saddles</a></Link>
                        <Link href='#'><a className="mr-2 text-xs sm:mr-5 sm:text-sm hover:text-gray-200 cursor-pointer border-b border-transparent hover:border-indigo-200">Ishare</a></Link>
                        {/* <Link href='#'><a className="mr-5 hover:text-gray-200 cursor-pointer border-b border-transparent hover:border-indigo-200">Price List</a></Link> */}
                        <Link href='#'><a className="mr-2 text-xs sm:mr-5 sm:text-sm hover:text-gray-200 cursor-pointer border-b border-transparent hover:border-indigo-200">Catelog</a></Link>
                        {/* <Link href='#'><a className="mr-5 hover:text-gray-200 cursor-pointer border-b border-transparent hover:border-indigo-200">Clearence</a></Link> */}
                        {/* <Link href='#'><a className="mr-5 hover:text-gray-200 cursor-pointer border-b border-transparent hover:border-indigo-200">Resources</a></Link> */}

                    </nav>
                </div>
            )
        }
        
        <div className='mx-auto my-0 py-2 w-full justify-center flex' style={{backgroundColor: '#303030'}}>
            <h3 className='text-sm uppercase'>New Leg boots are now available!</h3>
        </div>
    </header>
    );
}
