import React from 'react'
import { Breadcrums, HeaderBlock, } from '../../components'
import { GetProductSlugs, getProductDetails } from '../../services';
import Image from 'next/image'
import { useRouter } from 'next/router';
import { getContentFragment } from '../../services/contentFragment';

export default function Slug({product}) {

    const router = useRouter()

    // will showing loading on the screen if the user is not logged in or if the page is not found yet
    if(router.isFallback) {
        return <h1>Loading...</h1>
    }


    return (
        <>
           <HeaderBlock title={product.title} />
           <Breadcrums pageBehind='Products' current={product.title} />

           <div class="container flex flex-col px-6 py-10 mx-auto space-y-6 lg:h-128 lg:py-16 lg:flex-row lg:items-center">

            <div class="w-full lg:w-1/2">
                <div class="lg:max-w-lg">
                    <h1 class="text-2xl font-medium tracking-wide text-gray-800 dark:text-white lg:text-4xl">{product.title}</h1>
                    {/* <p class="mt-2 text-gray-600 dark:text-gray-300">{product.description}</p> */}
                    {
                       product.description && product.description.raw.children.map((typeObj, index) => {
                            const children = typeObj.children.map((item, itemindex) => getContentFragment(itemindex, item.text, item));
                            return getContentFragment(index, children, typeObj, typeObj.type);
                        })
                    }
                </div>
            </div>
    
            <div class="flex items-center justify-center w-full h-96 lg:w-1/2">
                <div className='object-cover w-full h-full max-w-2xl rounded-md relative cursor-pointer hover:shadow-2xl hover:scale-110 transform transition-all duration-300 ease-in-out'>
                    <a href={product.mainImage.url} target='_blank'>
                        <Image blurDataURL={product.mainImage.url} placeholder={'blur'} objectFit='contain' layout='fill' src={product.mainImage.url} />
                    </a>
                </div>
            </div>

        </div>


        {
            product.images &&
            <div class="container h-full p-20">
                <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    <div key={product.title} className="flex flex-col items-center justify-center w-full max-w-lg mx-auto pb-10 border-b-2 border-gray-200 sm:border-none sm:p-0">
                        <div className='object-contain w-full rounded-md h-72 xl:h-80 relative cursor-pointer hover:scale-125 transform transition-all ease-out duration-300'>
                            <Image blurDataURL={product.mainImage.url} placeholder={'blur'} objectFit={'contain'} layout={'fill'} src={product.mainImage.url} alt={product.title} />
                        </div>
                        <h4 className="mt-2 text-lg font-medium text-gray-700 dark:text-gray-200 text-center capitalize">{product.title.toLowerCase()}</h4>
                        <p className="text-blue-500">${product.price}</p>
                    </div>    
                </div>
            </div>
        }


        </>
    )
}


// Fetch data at build time
export async function getStaticProps ({params})
{
    // fetching data
    const data = (await getProductDetails(params.slug));
    
    // if not data is found, we will redirect to our advertisement main page
    if(!data){
        return {
            redirect: {
                destination: '/Product',
                permanent: false
            }      
        }
    }

    return {
        props: {
            product: data
        },
        revalidate: 60 * 60 * 24 // 1 day in second
    };

}




// Specify dynamic routes to pre-render pages based on data.
// The html is generated at build time and will be reused on each request
export async function getStaticPaths(){

    // getting our slugs statically
    const news = await GetProductSlugs();

    return {
        paths: news.map(({node: {slug}}) => ({ params: { slug }})),
        fallback: true,
    };

}