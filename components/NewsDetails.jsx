import React from 'react'

export default function NewsDetails({details}) {
    console.log(details);
    return (
            <ul class="mt-10">
            {
               details && details.map((el) => (
                <li className='mb-10'>
                    <div class="flex">
                        <div class="flex-shrink-0">
                            <div class="flex items-center justify-center h-6 w-6 rounded-md bg-indigo-500 text-white">
                                <svg width="20" height="20" fill="currentColor" class="h-4 w-4" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z">
                                    </path>
                                </svg>
                            </div>
                        </div>
                        <div class="ml-4">
                            <h5 class="text-lg leading-6 text-gray-900 dark:text-white font-bold">
                                {el.title}
                            </h5>
                            <p class="mt-2 text-base leading-6 text-gray-500 dark:text-gray-300">
                               {el.description}
                            </p>
                        </div>
                    </div>
                </li>
                ))
            }
        </ul>
    )
}
