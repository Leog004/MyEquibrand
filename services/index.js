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