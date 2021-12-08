import React,{useState, useEffect} from 'react'
import { HeaderBlock, PopItem } from '../../components'
import { getAdvertisementPop, getNews } from '../../services'
import { getSession } from 'next-auth/react'
import { validBrands } from '../../services/utils'

export default function index({pops, brands}) {

    const [validBrands, setvalidBrands] = useState(brands)
    const [pop, setPop] = useState(true);
    const [graphic, setGraphic] = useState(false);
    
    useEffect(() => {
        console.log(validBrands);
        console.log(pops);
        
    }, [validBrands])

    
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
            <div class="flex justify-center mb-5 bg-gray-100 h-28 items-center flex-wrap">
                {
                    brands.length > 0 ? brands.map((el, index) => (
                        <button onClick={() => handleShowClick(el)}  key={el.brand} className={`h-10 mx-4 px-4 py-2 -mb-px text-sm text-center ${el.show ? 'border-green-500 text-green-600' : 'border-gray-200 text-gray-200'}  bg-transparent border-b-2  sm:text-base whitespace-nowrap focus:outline-none`}>
                            {el.brand}
                        </button>
                    ))
                    : <h1>There is no brands assigned to your profile. Please contact us.</h1>
                }
            </div>

            <div class="flex items-center justify-center mb-10">
                <div class="flex space-x-10">
                    <label class="inline-flex items-center mt-3">
                        <input onClick={(e) => setPop((pop) => !pop)} type="checkbox" class="cursor-pointer form-checkbox h-5 w-5 rounded-full text-red-600" checked={pop} />
                        <span class="ml-2 text-gray-700">Store Pop</span>
                    </label>
                    <label class="inline-flex items-center mt-3">
                        <input type="checkbox" class="form-checkbox h-5 w-5 rounded-full text-red-600 cursor-pointer" checked={graphic} />
                        <span onClick={(e) => !e.target.checked} class="ml-2 text-gray-700">Graphics</span>
                    </label>                    
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
                                <div className='grid grid-cols-2 md:grid-cols-4 gap-y-10 w-full h-full'>
                                    {
                                        pops.map((pop) => (
                                            el.brand === pop.brand.title &&
                                            <PopItem key={pop.description} image={pop.image.url} title={pop.title} description={pop.description} price={pop.price} />
                                        ))
                                    }
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
        
        if(session){           
            session.state.map((el) => {
                brands.push(el.Privilege);
            })

            brands = validBrands(brands);

            // pops = pops.filter((el) => {
            //    return brands.includes(el.brand.title)
            // })
        }
    
        return {
            props: { pops, brands }, // return them to our front end as props
          };

    }catch(err){
        console.log(err);
    }

}