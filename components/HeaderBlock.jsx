import React from 'react'

const LinearGradient = 'linear-gradient(90deg, #303030 0%, #c6770070 100%)'


export default function HeaderBlock({title, description, image}) {

    const defaultImage = 'https://images.unsplash.com/flagged/photo-1557296126-ae91316e5746?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80';

    const HeaderTitle = title || "There is no title";
    
    const HeaderDesc = description || "Change This header to anything by using the UX Builder. You can also remove it. It's only visible on the blog homepage.";
    
    if(!image) image = defaultImage;

    return (
        <div className='bg-background h-md bg-cover bg-center bg-no-repeat' style={{backgroundImage: `${LinearGradient},url(${image})`}}>
            <div className='flex flex-col gap-y-5 w-full mx-auto justify-center items-center h-full'>
                <h1 className='text-white text-5xl'>{HeaderTitle}</h1>
                <p className='text-gray-300 text-base'>{HeaderDesc}</p>
            </div>
        </div>
    )
}
