import React from 'react'

export default function FeaturedProduct() {
    return (

  <div class="hidden sm:flex flex-col items-center justify-center absolute sm:bottom-0 sm:right-0 md:bottom-32 md:right-48 h-sm w-50 mx-auto shadow-xl cursor-pointer animate-bounce-slow z-10">
    <div class="container">
      <div class="max-w-md w-full shadow-lg rounded-xl p-6" style={{backgroundColor: '#202020'}}>
        <div class="flex flex-col ">
          <div class="">
            <div class="relative h-full w-48 mb-3 mx-auto">
              <img src="https://martinsaddlery.com/iShare/Thumbs600/fcls102bkset.png" alt="Just a flower" class="w-full  object-fill  rounded-2xl" />
            </div>
            <div class="flex-auto justify-evenly">
              <div class="text-xl text-white font-semibold mt-1">Classic Equine Legboots</div>
              <div class="lg:flex  py-4  text-sm text-gray-600">
                <div class="flex-1 inline-flex items-center mb-3">
                  <span class="text-secondary whitespace-nowrap mr-3">Size</span>
                  <div class="cursor-pointer text-gray-400 ">
                    <span class="hover:text-purple-500 p-1 py-0">S</span>
                    <span class="hover:text-purple-500 p-1 py-0">M</span>
                    <span class="hover:text-purple-500 p-1 py-0">L</span>
                    <span class="hover:text-purple-500 p-1 py-0">XL</span>
                  </div>
                </div>
              </div>
              <div class="flex space-x-2 text-sm font-medium justify-start">
                <button class="transition ease-in duration-300 inline-flex items-center text-sm font-medium mb-2 md:mb-0 bg-purple-500 px-5 py-2 hover:shadow-lg tracking-wider text-white rounded-full hover:bg-purple-600 ">
                  <span>Contact Sales</span>
                </button>
                <button class="transition ease-in duration-300 bg-gray-700 hover:bg-gray-800 border hover:border-gray-500 border-gray-700 hover:text-white  hover:shadow-lg text-gray-400 rounded-full w-9 h-9 text-center p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  

    )
}
