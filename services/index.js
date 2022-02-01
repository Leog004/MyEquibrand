import {request, gql} from 'graphql-request'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getNews = async () => {

    // Setting our query to get all of our advertisement content from graphcms
    const query = gql`
    query GetNews {
        news(locales: en) {
          title
          description
          id
          slug
          mainImage {
            url
          }
          brand {
            title
            image {
              url
            }
          }
          imageBlockStyle
          blockPosition
          imageSlantDirection
        }
      }    
    `;

    const result = await request(graphqlAPI, query); // get our response from api call

    return result.news; // return data


}


export const GetSearchData = async (search) => {
    const query = gql`
    
        query GetSearchData($search : String!) {
            newsConnection(
            where: {title_contains: $search, OR: {brand: {title_contains: $search}}}
            ) {
            edges {
                node {
                title
                slug
                }
            }
            }
        }
    `

    const result = await request(graphqlAPI, query, {search});
    return result.newsConnection.edges;
} 

export const GetNewsSlugs = async () => {

    const query = gql`
    
        query NewsSlugs {
            newsConnection {
                edges {
                    node {
                    slug
                    }
                }
            }
        }
       
    `

    const result = await request(graphqlAPI, query);
    return result.newsConnection.edges;

}


export const getNewDetails = async (slug) => {
    const query = gql`
        query GetNewBySlug($slug: String!) {
            new(where: {slug: $slug}) {
            headerImage {
                url
            }
            brand {
                id
                image {
                fileName
                url
                }
                title
            }
            description
            mainImage {
                url
            }
            title
                advertisementDetails {
                    title
                    description
                }
            }
        }
    `;

    const result = await request(graphqlAPI, query, {slug});

    return result.new;
}


export const getAdvertisementPop = async () => {
    
    const query = gql`
        query AdvertisementPops {
            advertisementPops {
            brand {
                title
            }
            popType
            image {
                id
                url
                fileName
            }
            price
            sku
            title
            description
            }
      }      
    `;

    const result = await request(graphqlAPI, query);
    return result.advertisementPops;
}


export const getAdvertisementGraphic = async () => {
    
    const query = gql`
        query AdvertisementGraphic {
            advertisementGraphics {
            brand {
                title
            }
            graphicAsset {
                id
                url
                fileName
                mimeType
            }
            graphicName
            }
      }      
    `;

    const result = await request(graphqlAPI, query);
    return result.advertisementGraphics;
}



export const getProductsBy_Filter_Active_Brand = async (filter, brand) => {

    if(!filter) filter = 'All';
    
    try {

        if(brand !== 'All') {
            const query = gql`
                query GetProductsBy_Filter_Active_Brand($brand: String!) {
                        products(where: {isActive: true, filter_contains_some:` + filter.replace(' ', '_')  +`, brand: {title: $brand}}) {
                        id
                        price
                        title
                        filter
                        slug
                        brand {
                            title
                            image {
                            url
                            }
                        }
                        mainImage {
                            url
                        }
                        description {
                            raw
                        }
                    }
                }
            `;

            const variables = {
                filter,
                brand
            }
    
            const result = await request(graphqlAPI, query, variables);
    
            return result.products;
        }


        const query = gql`
        query GetProductsBy_Filter_Active_Brand() {
                    products(where: {isActive: true, filter_contains_some:` + filter.replace(' ', '_')  +`}) {
                    id
                    price
                    title
                    filter
                    slug
                    brand {
                        title
                        image {
                        url
                        }
                    }
                    mainImage {
                        url
                    }
                    description {
                        raw
                    }
                    images {
                        url
                    }
                }
            }
        `;


        const result = await request(graphqlAPI, query);

        return result.products;



    }catch(error){
        console.log(error);
    }


}


export const GetProductSlugs = async () => {

    const query = gql`
    
        query ProductsSlugs {
            productsConnection {
                edges {
                    node {
                    slug
                    }
                }
            }
        }
       
    `

    const result = await request(graphqlAPI, query);
    return result.productsConnection.edges;

}


export const getProductDetails = async (slug) => {
    const query = gql`
        query GetNewBySlug($slug: String!) {
            product(where: {slug: $slug}){
                title
                price
                brand{
                  title
                  image {
                    url
                  }
                }
                description{
                  raw
                }
                mainImage{
                  url
                }
              }
            }
        `;

    const result = await request(graphqlAPI, query, {slug});

    return result.product;
}



export const getProductsBy_Filter_Active_BrandV2 = async (filter, brand) => {

    if(!filter) filter = 'All';

    try {

        if(brand !== 'All') {


            const filterquery = gql`
            query GetProductsBy_Filter_Active_Brand($brand: String!) {
                        products(where: {isActive: true, brand: {title: $brand}}) {
                        filter
                        brand {
                            title
                        }
                    }
                }
            `;

            const query = gql`
                query GetProductsBy_Filter_Active_Brand($brand: String!) {
                        products(where: {isActive: true, filter_contains_some:` + filter.replace(' ', '_')  +`, brand: {title: $brand}}) {
                        id
                        price
                        title
                        filter
                        slug
                        mainImage {
                            url
                        }
                        brand {
                            title
                        }
                    }
                }
            `;

            const variables = {
                filter,
                brand
            }
    
            const result = await request(graphqlAPI, query, variables);
            const filters = await request(graphqlAPI, filterquery, variables);
    
            return {
                result: result.products,
                filters: filters.products
            }

        }else{


            const filterquery = gql`
            query GetProductsBy_Filter_Active_Brand() {
                        products(where: {isActive: true}) {
                        filter
                        brand {
                            title
                        }
                    }
                }
            `;


            const query = gql`
            query GetProductsBy_Filter_Active_Brand() {
                        products(where: {isActive: true, filter_contains_some:` + filter.replace(' ', '_')  +`}) {
                        id
                        price
                        title
                        filter
                        slug
                        brand {
                            title
                        }
                        mainImage {
                            url
                        }
                    }
                }
            `;


            const result = await request(graphqlAPI, query);
            const filters = await request(graphqlAPI, filterquery);
    
            return {
                result: result.products,
                filters: filters.products
            }
           

        }

    }catch(error){
        console.log(error);
    }


}



export const GetVideos = async (brand) => {

    try {

        if(brand === 'All') {
            const query = gql`
            
                query Videos {
                    videos{
                        title
                        description
                        youtubeVideoUrl
                        thumbnailImage{
                            url
                        }
                        brand{
                            title
                        }
                    }
                }
            
            `
            const result = await request(graphqlAPI, query);
            return result.videos;
        }else{

            const query = gql`
            
            query Videos ($brand: String!) {
                videos(where:{brand: {title: $brand}}){
                    title
                    description
                    youtubeVideoUrl
                    thumbnailImage{
                        url
                    }
                    brand{
                        title
                    }
                }
            }
        
        `
        const result = await request(graphqlAPI, query, {brand});
        return result.videos;
           
        }
    }
    catch(err){
        return console.log(err);
    }

}


export const GetAdvertisementPopsByBrand = async (brand) => {

    if(brand !== 'All'){
        const query = gql`
        query AdvertisementPopsByBrand{
            advertisementPops(where: {brand: {title: $brand}}){
                brand {
                    title
                }
                popType
                image {
                    id
                    url
                    fileName
                }
                price
                sku
                title
                description
                } 
            }
         }      
    `;

    const variables = {
        brand
    }
    const result = await request(graphqlAPI, query, variables);
    return result.advertisementPops;
    }else{
            const query = gql`
            query AdvertisementPops {
                advertisementPops {
                brand {
                    title
                }
                popType
                image {
                    id
                    url
                    fileName
                }
                price
                sku
                title
                description
                }
        }      
        `;

        const result = await request(graphqlAPI, query);

        const validBrands = new Set(result.advertisementPops.map((el) => {
            return el.brand.title
        }));

        

        return {
            result: result.advertisementPops,
            valid : validBrands
        } 
    }


}


export const GetAdvertisementGraphicsByBrand = async (brand) => {
    
    const query = gql`
        query GetAdvertisementByBrand($brand: String!) {
            advertisementGraphics(where:{brand: {title: $brand}}){
                brand {
                    title
                }
                graphicAsset {
                    id
                    url
                    fileName
                    mimeType
                }
                graphicName
            }
        }
    `;

    const result = await request(graphqlAPI, query, {brand});
    return result.advertisementGraphics;

}