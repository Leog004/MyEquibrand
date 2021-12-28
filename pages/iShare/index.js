import React, {useState, useEffect} from 'react'
import { getSession } from 'next-auth/react'
import { validBrands } from '../../services/utils';
import { HeaderBlock } from './../../components'
import ImageGrid from '../../components/iShare/ImageGrid';
import BrandGrid from '../../components/iShare/BrandGrid';


export default function index({brands}) {

    const handleBrandChange = (e) => {
        setSelectedBrand(e.target.value); // Changing the value of our select brand state by getting the value of our <option value>
    }

    const handleBrandChangeOnBackgroundImage = (e) => {
        setSelectedBrand(e); // Changing the value of our select brand state by getting the value of our <option value>
    }

    const handleSearch = (e) => {
        setSearch(e.target.value);

        let tempImages = images.filter((el) => JSON.stringify(el.fileName).toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1);

        if(tempImages.length > 0){ 
            setImages(tempImages);
        }

        if(e.target.value === '' || !e.target.value){
            fetchRequest();
        }
    }

    const fetchRequest = async () => {
        const data = await fetch('/api/reader?' + new URLSearchParams({
            brand: selectedBrand,
        })).then((res) => res.json())
        setImages(data.data);
    }

    // const initProgress = () => {
    //     var progressBrands = Array.from(brands);
    //     progressBrands.forEach((el) => {
    //         el.status = 0;
    //     })

    //     return progressBrands;
    // }

    const [selectedBrand, setSelectedBrand] = useState(brands.length > 0 ? brands[0].brand : 'All'); // this will carry the state of our brand
    const [search, setSearch] = useState('');

    //const [progress, setProgress] = useState(initProgress());

    const selectionOptions = brands.map((el) => (<option key={el.brand} value={el.brand}>{el.brand}</option>));

    const [images, setImages] = useState([]);

    useEffect(() => {
        if(selectedBrand !== 'All'){
            fetchRequest();
        }else{
            setImages([]);
        }
    },[selectedBrand])


    return (
        <main>
            <HeaderBlock title='iShare'/>
            <div className='max-w-6xl mx-auto container py-10 pb-24'>
                <div className='flex justify-between'>
                    <div className="flex items-center text-sm tracking-widest uppercase">
                        {  images.length > 0 &&
                            <div className="flex items-center">
                                <label className="text-gray-500 dark:text-gray-300">Search: </label>
                                <input value={search} onChange={handleSearch} name='search' type='text' placeholder='search image..' />
                            </div>
                        }
                    </div>
                    <div className="flex items-center text-sm tracking-widest uppercase">
                        <div className="flex items-center">
                            <p className="text-gray-500 dark:text-gray-300">Brand</p>
                            <select multiple={false} value={selectedBrand} onChange={handleBrandChange} className="font-medium text-gray-700 bg-transparent dark:text-gray-500 focus:outline-none border-none">
                                {selectionOptions}
                            </select>
                        </div>
                    </div>
                </div>
               
                    <div className={`grid sm:grid-cols-2 md:grid-cols-4 gap-y-24 mt-20 ${images.length > 0 ? '' : 'gap-x-10'}`}>
                    {
                       images.length > 0 ? images.map((el, index) => (
                           index <= 23 &&
                            <ImageGrid key={el.fileName} url={`http://equibrand.com/Product Images/Brands/${selectedBrand}/${el.fileName}`} filename={el.fileName} />
                        ))
                        : <> {
                                brands.length > 0 && brands.map((el) => (
                                    el.brand !== 'All' &&
                                    <BrandGrid key={el.brand} handleChange={handleBrandChangeOnBackgroundImage} title={el.brand} />
                                    //<BrandGrid_New key={el.brand} handleChange={handleBrandChangeOnBackgroundImage} title={el.brand} />
                                )) 
                             }
                             <h1 className='col-span-4 font-semibold'>*Click on Icon to download all images from brand</h1>
                        </>
                           
                    }
                    </div>
               
            </div>


    
        </main>
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
            brands.unshift({brand: 'All', show: true}); // this is a custom insert called All that which act as a brand that will show all products, inserting in the beginning of the array
        }

        return {
            props: { brands }, // return them to our front end as props
          };

    }catch(err){
        console.log(err);
    }

}