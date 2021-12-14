import React, {useState, useEffect} from 'react'
import { getSession } from 'next-auth/react'
import { validBrands } from '../../services/utils';
import { getProductsBy_Filter_Active_Brand } from '../../services';


export default function index({brands}) {

    const handleBrandChange = (e) => {
        setSelectedBrand(e.target.value);
    }

    const handleCategoryChange = (e) => {
        setselectedCategory(e.target.id);
    }

    const initCategories = (arr) => {
         let categories_ = arr.length > 0 && arr[0].filter || ['All']
         setCategories(categories_)
    }


    // Here we are getting the user available brands that they can choose from. We are rending it into our select field as <options></options>
    const selectionOptions = brands.map((el) => (<option key={el.brand} value={el.brand}>{el.brand}</option>));

    const [selectedCategory, setselectedCategory] = useState(''); // this will carry the state of our category
    const [selectedBrand, setSelectedBrand] = useState(brands.length > 0 ? brands[0].brand : ''); // this will carry the state of our brand
    const [products, setProducts] = useState([]); // this will carry the state of the products that will be showing
    const [categories, setCategories] = useState([]);


    // This will be called in the beginning when the components mounts or when selectedBrand state value has changed
    useEffect(() => {
        getProductsBy_Filter_Active_Brand(selectedCategory, selectedBrand).then((result) => {
            setProducts(result)
            initCategories(result);
        });
    }, [selectedBrand]);


    // This will be called in the beginning when the components mounts or when selectedCategory state value has changed
    useEffect(() => {
        getProductsBy_Filter_Active_Brand(selectedCategory, selectedBrand).then((result) => setProducts(result));
    }, [selectedCategory]);

    return (
        <section className="bg-white dark:bg-gray-900 p-20">
        <div className="container px-6 py-8 mx-auto">
            <div className="lg:flex lg:-mx-2">
                <div className="space-y-3 lg:w-1/5 lg:px-2 lg:space-y-4">
                    {
                        categories.length > 0 && categories.map((el) => (
                            <a key={el} onClick={handleCategoryChange} id={el} href="#" className="block font-medium text-gray-500 dark:text-gray-300 hover:underline">{el}</a>
                        ))
                    }
                    {/* <a href="#" className="block font-medium text-gray-500 dark:text-gray-300 hover:underline">Jackets & Coats</a>
                    <a href="#" className="block font-medium text-gray-500 dark:text-gray-300 hover:underline">Hoodies</a>
                    <a href="#" className="block font-medium text-blue-600 dark:text-blue-500 hover:underline">T-shirts & Vests</a>
                    <a href="#" className="block font-medium text-gray-500 dark:text-gray-300 hover:underline">Shirts</a>
                    <a href="#" className="block font-medium text-gray-500 dark:text-gray-300 hover:underline">Blazers & Suits</a>
                    <a href="#" className="block font-medium text-gray-500 dark:text-gray-300 hover:underline">Jeans</a>
                    <a href="#" className="block font-medium text-gray-500 dark:text-gray-300 hover:underline">Trousers</a>
                    <a href="#" className="block font-medium text-gray-500 dark:text-gray-300 hover:underline">Shorts</a>
                    <a href="#" className="block font-medium text-gray-500 dark:text-gray-300 hover:underline">Underwear</a> */}
                </div>

                <div className="mt-6 lg:mt-0 lg:px-2 lg:w-4/5 ">
                    <div className="flex items-center justify-between text-sm tracking-widest uppercase ">
                        <p className="text-gray-500 dark:text-gray-300">{products.length > 0 ? `${products.length} Items` : '0 Items' }</p>
                        <div className="flex items-center">
                            <p className="text-gray-500 dark:text-gray-300">Brand</p>
                            <select defaultValue={selectedBrand} onChange={handleBrandChange} className="font-medium text-gray-700 bg-transparent dark:text-gray-500 focus:outline-none border-none">
                                {selectionOptions}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">


                        {
                            products.length > 0 && products.map((el) => (
                                <div key={el.title} className="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
                                    <img className="object-contain w-full rounded-md h-72 xl:h-80" src={el.mainImage.url} alt="T-Shirt" />
                                    <h4 className="mt-2 text-lg font-medium text-gray-700 dark:text-gray-200 text-center capitalize">{el.title.toLowerCase()}</h4>
                                    <p className="text-blue-500">${el.price}</p>
                                    <button className="flex items-center justify-center w-full px-2 py-2 mt-4 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
                                        <span className="mx-1">View More</span>
                                    </button>
                                </div>
                            ))
                        }

                        <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
                            <img className="object-cover w-full rounded-md h-72 xl:h-80" src="https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80" alt="T-Shirt" />
                            <h4 className="mt-2 text-lg font-medium text-gray-700 dark:text-gray-200">Printed T-shirt</h4>
                            <p className="text-blue-500">$12.55</p>

                            <button className="flex items-center justify-center w-full px-2 py-2 mt-4 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mx-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                </svg>
                                <span className="mx-1">Add to cart</span>
                            </button>
                        </div>

                        <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
                            <img className="object-cover w-full rounded-md h-72 xl:h-80" src="https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=966&q=80" alt="T-Shirt" />
                            <h4 className="mt-2 text-lg font-medium text-gray-700 dark:text-gray-200"> Slub jersey T-shirt</h4>
                            <p className="text-blue-500">$18.70</p>

                            <button className="flex items-center justify-center w-full px-2 py-2 mt-4 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mx-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                </svg>
                                <span className="mx-1">Add to cart</span>
                            </button>
                        </div>

                        <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
                            <img className="object-cover w-full rounded-md h-72 xl:h-80" src="https://images.unsplash.com/photo-1603320409990-02d834987237?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" alt="T-Shirt" />
                            <h4 className="mt-2 text-lg font-medium text-gray-700 dark:text-gray-200">T-shirt with a motif</h4>
                            <p className="text-blue-500">$16.55</p>

                            <button className="flex items-center justify-center w-full px-2 py-2 mt-4 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mx-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                </svg>
                                <span className="mx-1">Add to cart</span>
                            </button>
                        </div>

                        <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
                            <img className="object-cover w-full rounded-md h-72 xl:h-80" src="https://images.unsplash.com/photo-1603320410149-db26b12d5c2b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80" alt="T-Shirt" />
                            <h4 className="mt-2 text-lg font-medium text-gray-700 dark:text-gray-200">Art T-shirt</h4>
                            <p className="text-blue-500">$12.55</p>

                            <button className="flex items-center justify-center w-full px-2 py-2 mt-4 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mx-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                </svg>
                                <span className="mx-1">Add to cart</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}



// this method runs when page is loaded. Pulls data from server
export async function getServerSideProps(context) {

    // checking to see whether the user is logged in
    const session = await getSession(context);
    var brands = []; // This array will contain the user brands

    try{

        if(session){           
            session.state.map((el) => {
                brands.push(el.Privilege);
            })

            brands = validBrands(brands);
        }

        return {
            props: { brands }, // return them to our front end as props
          };

    }catch(err){
        console.log(err);
    }

}
