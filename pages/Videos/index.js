import React, {useState, useEffect} from 'react'
import { getSession } from 'next-auth/react'
import { validBrands } from '../../services/utils';
import {Grid, HeaderBlock} from './../../components'
import { GetVideos } from '../../services';

export default function index({brands}) {

    const handleBrandChange = (e) => {
        setSelectedBrand(e.target.value); // Changing the value of our select brand state by getting the value of our <option value>
    }

    const [selectedBrand, setSelectedBrand] = useState(brands.length > 0 ? brands[0].brand : 'All'); // this will carry the state of our brand
    const [videos, setVideos] = useState([]); // this will carry our state of videos to display

    // Here we are getting the user available brands that they can choose from. We are rending it into our select field as <options></options>
    const selectionOptions = brands.map((el) => (<option key={el.brand} value={el.brand}>{el.brand}</option>));

    // This will run as soon as the component get mounted, and will update whenever selectedBrand changes
    useEffect(() => {
        GetVideos(selectedBrand).then((result) => {
            var validVideosToShow = result;

            if(selectedBrand === 'All'){
                validVideosToShow = result.filter((el) => {
                    return brands.some((f) => {
                        return f.brand === el.brand.title;
                    })
                })
                
            }
            setVideos(validVideosToShow)
        });
    }, [selectedBrand])
    
    return (
        <main>
            <HeaderBlock title={'Videos'} />
            <div className='max-w-6xl mx-auto container py-10 pb-24'>
                <div className="flex items-center justify-end text-sm tracking-widest uppercase">
                    <div className="flex items-center">
                        <p className="text-gray-500 dark:text-gray-300">Brand</p>
                        <select multiple={false} value={selectedBrand} onChange={handleBrandChange} className="font-medium text-gray-700 bg-transparent dark:text-gray-500 focus:outline-none border-none">
                            {selectionOptions}
                        </select>
                    </div>
                </div>
                <div class="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 xl:grid-cols-2">
                    {
                        videos && videos.map((el) => (
                            <Grid data={el} key={el.title} />
                        ))
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
