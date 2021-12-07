import React, {useState, useEffect} from 'react'
import AdvertisementControl from './AdvertisementControl'
import PopControl from './Pop/PopControl'



export default function Advertisement({pops, brands}) {

    const [ActivePopbrands, setActivePopbrands] = useState([...brands])
    const [showContent, setShowContent] = useState([]);
    
    const getActiveBrands = () => {
        let active = [];
        let content = [];

        pops.filter((el) => {
            if(brands.includes(el.brand.title) && !active.includes(el.brand.title))
            active.push(    
               el.brand.title
            )
         })        

        

        active.forEach(brand => {
            content.push(...[{show: true, brand}])
        });

        active = content;

        setActivePopbrands(active)
        setShowContent(content)
    }

    useEffect(() => {
        getActiveBrands();
    }, [])

    return (
        <div className='w-full h-full'>
            <div className='max-w-6xl w-full h-full mx-auto pb-20 px-0'>
                <AdvertisementControl setActivePopbrands={setActivePopbrands} showContent={ActivePopbrands} brands={brands} />
                <PopControl pops={pops} brands={ActivePopbrands} />
            </div>
        </div>
    )
}

