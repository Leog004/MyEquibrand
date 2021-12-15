import React, {useState, useEffect} from 'react'
import { getSession } from 'next-auth/react'
import { validBrands } from '../../services/utils';
import { getProductsBy_Filter_Active_Brand } from '../../services';
import Image from 'next/image'
import Link from 'next/link'


export default function index({brands}) {

    const handleBrandChange = (e) => {
        setSelectedBrand(e.target.value); // Changing the value of our select brand state by getting the value of our <option value>
    }

    const handleCategoryChange = (e) => {
        setselectedCategory(e.target.id); // Changing the value of our select brand state by getting the value of our <a [id] ></a>
    }

    const initCategories = (products) => {

         //let categories_ = products.length <= 0 && ['All'] // If somehow there is no products we are going to defulat our category to All | OLD CODE

         let uniqueCategories = []; // Here is a temp array that will hold our unique category filters

         if(products.length > 0){

            products.map((el) => el.filter.map((fil) => uniqueCategories.push(fil.replace('_', ' ')))); // looping through our products and pushing all filters in uniqueCategories array
            uniqueCategories = new Set(uniqueCategories) // getting unique values from our away so it can be distinct
            uniqueCategories = [...uniqueCategories]; // converting our set into an array
                        
            //uniqueCategories = [...new Set(products.map((el) => el.filter))]; // looping through our products array and getting our filter value. If it is new, then we add inyto the array || OLD CODE
            
            if(uniqueCategories.length > 1){ // if the filter temp array is greater than 1 proceed

                if(!uniqueCategories.includes(selectedCategory)) setselectedCategory('All') // we are checking if the current products have the same category as the previous brand if not then we will default to All

                //uniqueCategories = uniqueCategories[uniqueCategories.length - 1]; // getting the last array of our temp categories which are all unique || OLD CODE
            }
            
         }
         
         setCategories(uniqueCategories.length > 1 ? uniqueCategories : ['All']) // changing the state value of our Categories, if uniqueCategories is empty, then categories_('All') will take over
    }


    // Here we are getting the user available brands that they can choose from. We are rending it into our select field as <options></options>
    const selectionOptions = brands.map((el) => (<option key={el.brand} value={el.brand}>{el.brand}</option>));

    const [selectedCategory, setselectedCategory] = useState('All'); // this will carry the state of our category
    const [selectedBrand, setSelectedBrand] = useState(brands.length > 0 ? brands[0].brand : ''); // this will carry the state of our brand
    const [products, setProducts] = useState([]); // this will carry the state of the products that will be showing
    const [categories, setCategories] = useState([]); // This will cary the state of our categories that will be shown on the left side


    // This will be called in the beginning when the components mounts or when selectedBrand state value has changed
    useEffect(() => {
        getProductsBy_Filter_Active_Brand('All', selectedBrand).then((result) => {
            setProducts(result)
            initCategories(result);
        });
    }, [selectedBrand]);


    // This will be called in the beginning when the components mounts or when selectedCategory state value has changed
    useEffect(() => {
        getProductsBy_Filter_Active_Brand(selectedCategory, selectedBrand).then((result) => setProducts(result));
    }, [selectedCategory]);

    return (
    <section className="bg-white dark:bg-gray-900 sm:p-10 md:p-20 ">
        <div className="container px-6 py-8 mx-auto">
            <div className="lg:flex lg:-mx-2">
                <div className="space-y-3 lg:w-1/5 lg:px-2 lg:space-y-4">
                    {
                        categories.length > 0 && categories.map((el) => (
                            <a key={el} onClick={handleCategoryChange} id={el} href="#" className={`block font-medium ${el === selectedCategory ? 'text-blue-600 dark:text-blue-500' : 'text-gray-500 dark:text-gray-300'} hover:underline`}>{el}</a>
                        ))
                    }
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
                                    <div key={el.title} className="flex flex-col items-center justify-center w-full max-w-lg mx-auto pb-10 border-b-2 border-gray-200 sm:border-none sm:p-0">
                                        <div className='object-contain w-full rounded-md h-72 xl:h-80 relative cursor-pointer hover:scale-125 transform transition-all ease-out duration-300'>
                                            <Image blurDataURL={el.mainImage.url} placeholder={'blur'} objectFit={'contain'} layout={'fill'} src={el.mainImage.url} alt={el.title} />
                                        </div>
                                        <h4 className="mt-2 text-lg font-medium text-gray-700 dark:text-gray-200 text-center capitalize">{el.title.toLowerCase()}</h4>
                                        <p className="text-blue-500">${el.price}</p>
                                        <button className="flex items-center justify-center w-full px-2 py-2 mt-4 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
                                            <Link href={{pathname: '/Products/[slug]', query: {slug: encodeURIComponent(el.slug)}}}> 
                                                <span className="mx-1">View More</span>
                                            </Link>
                                        </button>
                                    </div>
                                ))
                            }
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
                brands.push(el.Privilege); // pushing user privalges into brands array
            })

            brands = validBrands(brands); // this will go through the brand array and return distinct valid brands that the user can view
        }

        return {
            props: { brands }, // return them to our front end as props
          };

    }catch(err){
        console.log(err);
    }

}
