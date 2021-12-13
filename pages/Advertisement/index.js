import React,{useState, useEffect} from 'react'
import { GraphicItem, HeaderBlock, PopItem } from '../../components'
import { getAdvertisementGraphic, getAdvertisementPop, getNews } from '../../services'
import { getSession } from 'next-auth/react'
import { validBrands } from '../../services/utils'

export default function index({pops, brands, graphics}) {

    const [validBrands, setvalidBrands] = useState(brands)
    const [pop, setPop] = useState(true);
    const [graphic, setGraphic] = useState(false);
    
    const handleShowClick = (el) => {

        const editedTask = validBrands.map(task => {
            if(el.brand === task.brand){
                return {
                    ...task,
                    show: el.show = !el.show
                }
            }

            return task;
        })

        setvalidBrands(editedTask);
    }

    return (
        <>
           <HeaderBlock 
                title={"Advertisement"} 
                description={'This is your source for available Point-Of-Purchase signage, banners and merchandising tools. Everything you need to enhance your merchandising displays is here, ready to attract customers and increase sales.'}        
            />
            
        {/* Advertisemnet Filters / controls */}
            <div className="flex justify-center mb-5 bg-gray-100 h-28 items-center flex-wrap">
                {
                    brands.length > 0 ? brands.map((el, index) => (
                        <button onClick={() => handleShowClick(el)}  key={el.brand} className={`h-10 mx-4 px-4 py-2 -mb-px text-sm text-center ${el.show ? 'border-green-500 text-green-600' : 'border-gray-200 text-gray-200'}  bg-transparent border-b-2  sm:text-base whitespace-nowrap focus:outline-none`}>
                            {el.brand}
                        </button>
                    ))
                    : <h1>There is no brands assigned to your profile. Please contact us.</h1>
                }
            </div>

            <div className="flex items-center justify-center mb-10">
                <div className="flex space-x-10">
                    <label className="inline-flex items-center mt-3">
                        <input onChange={(e) => setPop((pop) => !pop)} type="checkbox" className="cursor-pointer form-checkbox h-5 w-5 rounded-full text-red-600" checked={pop} />
                        <span className="ml-2 text-gray-700">Store Pop</span>
                    </label>
                    {/* <label className="inline-flex items-center mt-3">
                        <input onChange={(e) => setGraphic((graph) => !graph)} type="checkbox" className="form-checkbox h-5 w-5 rounded-full text-red-600 cursor-pointer" checked={graphic} />
                        <span className="ml-2 text-gray-700">Graphics</span>
                    </label>                     */}
                </div>
            </div>


            {/* Store Pops and Filters */}

            <div className='max-w-6xl w-full mx-auto mb-20'>
                <div className='flex flex-col space-y-10'>

                {
                    pop &&
                        brands.map((el) => (
                            el.show &&
                            <div className={'flex flex-col border-b-2 pb-10 hover:shadow-md hover:bg-gray-50 px-10'}>
                                <div className='flex'>
                                    <h1 className='text-5xl font-semibold py-10'>{el.brand}</h1>
                                </div>
                                <div className='grid grid-cols-2 md:grid-cols-4 gap-x-20 gap-y-20 w-full h-full'>
                                    {
                                        pops.map((pop) => (
                                            el.brand === pop.brand.title &&
                                            <PopItem key={pop.description} image={pop.image.url} title={pop.title} description={pop.description} price={pop.price} />
                                        ))
                                    }
                                </div>

                                
                                {
    
                                    <div className='w-full overflow-hidden mt-20 bg-gray-200 pt-2 rounded-lg'>
                                        <h2 className='pl-10 pt-2 pb-2 font-semibold uppercase text-gray-700 w-full border-b-2 border-gray-300'>Graphics <span className='text-red-400 text-xs'>(Click image to download)</span></h2>
                                        <div className='flex justify-between items-center w-full overflow-x-scroll gap-x-24 overflow-hidden'>
                                                {
                                                    graphics.map((graph) => (
                                                        el.brand === graph.brand.title &&
                                                        <GraphicItem key={graph.title} asset={graph.graphicAsset} image={graph.graphicAsset[0].url} />
                                                    ))
                                                }
                                        </div>
                                    </div>
                                }

                            </div>    
                        ))
                    }
                    {
                    graphic && 
                         brands.map((el) => (
                             el.show && 
                             <div className={'w-full mx-auto my-0'}>
                                    {/* <h1 className='text-5xl font-semibold py-10'>{el.brand}</h1> */}
                            
                                <div className='w-full overflow-hidden'>
                                    <div className='flex justify-between items-center w-full overflow-x-scroll gap-x-32'>
                                {
                                    graphics.map((graph) => (
                                        el.brand === graph.brand.title &&
                                        <GraphicItem key={graph.title} image={graph.graphicAsset[0].url} />
                                    ))
                                }
                                    </div>
                                </div>
                            </div>
                         ))
                    }                   
                </div>
            </div>
           
        </>
    )
}


// this method runs when page is loaded. Pulls data from server
export async function getServerSideProps(context) {

    // checking to see whether the user is logged in
    const session = await getSession(context);
    var brands = []; // This array will contain the user brands

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
                brands.push(el.Privilege);
            })

            brands = validBrands(brands);
        }
    
        return {
            props: { pops, brands, graphics }, // return them to our front end as props
          };

    }catch(err){
        console.log(err);
    }

}