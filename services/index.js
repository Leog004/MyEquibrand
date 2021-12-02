import {request, gql} from 'graphql-request'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getAdvertisements = async () => {

    // Setting our query to get all of our advertisement content from graphcms
    const query = gql`
    query GetAdvertisements {
        advertisements(locales: en) {
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

    return result.advertisements; // return data


}


export const GetSearchData = async (search) => {
    const query = gql`
    
        query GetSearchData($search : String!) {
            advertisementsConnection(
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
    return result.advertisementsConnection.edges;
} 

export const GetAdvertisementsSlug = async () => {

    const query = gql`
    
        query AdvertisementSlugs {
            advertisementsConnection {
            edges {
                node {
                slug
                }
            }
            }
        }
       
    `

    const result = await request(graphqlAPI, query);
    return result.advertisementsConnection.edges;

}


export const getAdvertisementDetails = async (slug) => {
    const query = gql`
        query GetAdvertisementBySlug($slug: String!) {
            advertisement(where: {slug: $slug}) {
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
            }
        }
    `;

    const result = await request(graphqlAPI, query, {slug});

    return result.advertisement;
}