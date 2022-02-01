import React,{useState, useEffect} from 'react'
import { HeaderBlock, GraphicItem } from '../../components'
import { getAdvertisementGraphic, getAdvertisementPop, GetAdvertisementPopsByBrand } from '../../services'
import { getSession } from 'next-auth/react'
import { validBrands } from '../../services/utils'
import Head from 'next/head'
import "react-multi-carousel/lib/styles.css";
import CarouselSimple from '../../components/Helpers/Carousel'

export default function newPage({brands, pops, graphics, deviceType}) {

    const [selectedBrand, setSelectedBrand] = useState(brands.length > 0 ? brands[0].brand : 'All'); // this will carry the state of our brand
    const selectionOptions = brands.map((el) => (<option key={el.brand} value={el.brand}>{el.brand}</option>));
    const [advpop, setAdvpop] = useState([]);
    const [advgraph, setAdvgraph] = useState([]);
    const [brandsBySelection, setBrandsBySelection] = useState([]);

    const handleBrandChange = (e) => {
        setSelectedBrand(e.target.value); // Changing the value of our select brand state by getting the value of our <option value>
    }


    useEffect(() => {
        GetAdvertisementPopsByBrand(selectedBrand).then((result) => {
            setAdvpop(result.result);
            setBrandsBySelection([...result.valid]);
        });
    }, [selectedBrand])

    
  return <main>
              <Head>
               {/* Title */}
               <title>MyEquibrand Advertisement</title>
                {/* Meta Tag */}
                <meta name="description" content="In myequibrand advertisement page" key='description' />
                <meta name="keywords" content="Classic Equine, Classic Rope, MyEquibrand, Rattler Rope, Cashel" key='keyWords' />
            </Head>

           <HeaderBlock 
                title={"Advertisement"} 
                description={'This is your source for available Point-Of-Purchase signage, banners and merchandising tools. Everything you need to enhance your merchandising displays is here, ready to attract customers and increase sales.'}        
            />

            

            {/* Brand Selection */}
                <section className="mt-6 lg:mt-10 lg:px-2 lg:w-4/5 mx-auto">
                        <div className="flex items-center justify-between text-sm tracking-widest uppercase">
                            <div></div>
                            <div className="flex items-center">
                                <p className="text-gray-500 dark:text-gray-300">Brand</p>
                                <select value={selectedBrand} onChange={handleBrandChange} className="cursor-pointer font-medium text-gray-700 bg-transparent dark:text-gray-500 focus:outline-none border-none">
                                    {selectionOptions}
                                </select>
                            </div>
                        </div>
                </section>


            {/* Pops */}
            <section class="text-gray-600 body-font">
                {
                    brandsBySelection.length > 0 && brandsBySelection.map((brand) => (
                    <div key={brand} class="container px-5 py-24 mx-auto">
                        <div class="flex flex-wrap w-full mb-20">
                            <div class="lg:w-1/2 w-full mb-6 lg:mb-0">
                                <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">{brand}</h1>
                                <div class="h-1 w-20 bg-blue-500 rounded"></div>
                            </div>
                        </div>
                        <div class="flex flex-wrap -m-4 items-end">
                        {
                            advpop.length > 0 && advpop.map((pop) => (
                                
                                    pop.brand.title === brand && (
                                        
                                    <div key={pop.title} class="xl:w-1/5 md:w-1/2 p-4">
                                        <div class="bg-gray-100 p-2 rounded-lg shadow-md">
                                            <img class="h-auto rounded w-full object-cover object-center mb-6" src={pop.image.url} alt="content" />
                                            <h3 class="tracking-widest text-indigo-500 text-xs font-medium title-font">{pop.title}</h3>
                                            <h2 class="text-lg text-gray-900 font-medium title-font mb-4">${pop.price}</h2>
                                            <p class="leading-relaxed text-base">{pop.description}</p>
                                        </div>
                                    </div>
                                      
                                    )
                                
                            ))
                        }
                        </div>

                        <div className='w-full overflow-hidden mt-20 bg-gray-200 pt-2 rounded-lg'>
                            <h2 className='pl-10 pt-2 pb-2 font-semibold uppercase text-gray-700 w-full border-b-2 border-gray-300'>Graphics <span className='text-red-400 text-xs'>(Click image to download)</span></h2>
                        </div>
                        <CarouselSimple deviceType={deviceType} brand={brand} />
                        {/* <div className='w-full overflow-hidden mt-20 bg-gray-200 pt-2 rounded-lg'>
                            <h2 className='pl-10 pt-2 pb-2 font-semibold uppercase text-gray-700 w-full border-b-2 border-gray-300'>Graphics <span className='text-red-400 text-xs'>(Click image to download)</span></h2>
                            <div className='flex justify-between items-center w-full overflow-x-scroll gap-x-24 overflow-hidden graphic_scroll'>
                            
                           

                                    {

                                        graphics.map((graph) => (
                                            brand === graph.brand.title &&
                                            <GraphicItem key={graph.GraphicName} asset={graph.graphicAsset} image={graph.graphicAsset[0].url} />
                                        ))
                                    }
                            </div>
                        </div> */}

                    </div>
                ))
            }

            </section>

        </main>
}



// this method runs when page is loaded. Pulls data from server
export async function getServerSideProps(context) {

    // checking to see whether the user is logged in
    const session = await getSession(context);
    var brands = []; // This array will contain the user brands


    let isMobileView = (context.req
        ? context.req.headers['user-agent']
        : navigator.userAgent).match(
          /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
        )
    

    // if user is not logged in, we will redirect them to our home page
    if(!session){
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        };
    }

    try{
        // getting our advertisement data that is being called from service file
        var pops = (await getAdvertisementPop()) || [];

        var graphics  = (await getAdvertisementGraphic()) || [];


        if(session){           
            session.state.map((el) => {
                brands.push(el.Privilege); // pushing user privalges into brands array
            })

            brands = validBrands(brands); // this will go through the brand array and return distinct valid brands that the user can view
            brands.unshift({brand: 'All', show: true}); // this is a custom insert called All that which act as a brand that will show all products, inserting in the beginning of the array
        
        }

    
        return {
            props: { brands, pops, graphics, deviceType: isMobileView }, // return them to our front end as props
          };

    }catch(err){
        console.log(err);
    }

}