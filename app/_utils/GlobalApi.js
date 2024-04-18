const { gql,default: request } = require("graphql-request");

const MASTER_URL=process.env.NEXT_PUBLIC_BACKEND_API_URL;


//adding slide category list api
const GetCategory=async()=>{
    
    const query=gql `
    query Categories {
      categories(first: 50) {
        id
        slug
        name
        icon {
          url
        }
      }
    }
      `

      const result=await request(MASTER_URL,query);
      return result;

}

//ADDING RESTAURANT LIST AND DETAILS
const GetBusiness=async(category)=>{
    const query=gql`
    query GetBusiness {
      restaurants(where: {categories_some: {slug: "`+category+`"}}) {
        aboutUs
        address
        banner {
          url
        }
        categories {
          name
        }
        id
        name
        restroType
        slug
        workingHours
      }
    }
    `
    const result=await request(MASTER_URL,query);
      return result;
}

//RESTAURANT DETAILS
const GetBusinessDetails=async(businessSlug)=>{
    const query=gql`
    query RestaurantDetail {
      restaurant(where: {slug: "`+businessSlug+`"}) {
        aboutUs
        address
        banner {
          url
        }
        categories {
          name
        }
        id
        name
        restroType
        slug
        workingHours
        menu {
          ... on Menu {
            id
            category
            menuItem {
              ... on MenuItem {
                id
                name
                description
                price
                productImage {
                  url
                }
              }
            }
          }
        }
      }
    }`
    const result=await request(MASTER_URL,query);
      return result;
} 
  

export default{
    GetCategory,
    GetBusiness,
    GetBusinessDetails,
};