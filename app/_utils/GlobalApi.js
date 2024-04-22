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
    const result =await request(MASTER_URL,query);
      return result;
}

//RESTAURANT DETAILS
const GetBusinessDetail=async(businessSlug)=>{
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


// calling add to cart api from hygraph
const AddToCart=async(data)=>{
  const query=gql`
  mutation AddToCart {
    createUserCart(
      data: {email: "`+data?.email+`", price: `+data?.price+`, 
      productDescription: "`+data?.description+`", productImage: "`+data?.productImage+`", productName: "`+data?.name+`" 
      restaurant: {connect: {slug: "`+data.restaurantSlug+`"}}}
    ) {
      id
    }
    publishManyUserCarts(to: PUBLISHED) {
      count
    }
  }
  `
  const result=await request(MASTER_URL,query);
    return result;
}

// Adding new query for getting cart email  details
const GetUserCart=async(userEmail)=>{
  const query=gql`
  query GetUserCart {
    userCarts(where: {email: "`+userEmail+`"}) {
      id
      price
      productDescription
      productImage
      productName
      restaurant {
        name
        banner {
          url
        }
        slug
      }
    }
  }
  `
  const result=await request(MASTER_URL,query);
    return result;
}

// Cart item deleting and adding
  const DisconnectRestroFromUserCartItem=async(id)=>{
    const query=gql`
    mutation DisconnectRestaurantFromCartItem {
      updateUserCart(data: {restaurant: {disconnect: true}}, where: {id: "`+id+`"})
      {
        id
      }
      publishManyUserCarts(to: PUBLISHED) {
        count
      }
    }`;

    const result=await request(MASTER_URL,query);
      return result;

  }

  // adding deletation Api

  const DeleteItemFromCart=async(id)=>{
    console.log(id,"[[[[[[[[[id---DeleteItemFromCart")
    const query=gql`
    mutation DeleteCartItem {
      deleteUserCart(where: {id: "${id}"}) 
      {
        id
      }
    }
    `
// A issue showing on this line
    const result=await request(MASTER_URL,query);
      return result;
  }

  // Adding review api from hygraph
  const AddNewReview=async(data)=>{
    const query=gql`
    mutation AddNewReview {
      createReview(
        data: {email: "`+data.email+`", 
        profileImage: "`+data.profileImage+`", 
        reviewText: "`+data.reviewText+`", 
        star: `+data.star+`, 
        userName: "`+data.userName+`", 
        restaurant: {connect: {slug: "`+data.RestroSlug+`"}}}
      ) {
        id
      }
      publishManyReviews(to: PUBLISHED) {
        count
      }
    }
    `
    const result=await request(MASTER_URL,query);
      return result;

  }

  // new api for review list viewing

  const getRestaurantReviews=async(slug)=>{
    const query=gql`
    query RestaurantReviews {
      reviews(where: {restaurant: {slug: "`+slug+`"}},orderBy: publishedAt_DESC) {
        email
        id
        profileImage
        publishedAt
        userName
        star
        reviewText
      }
    }
    `
    const result=await request(MASTER_URL,query);
      return result;
  }

export default{
    GetCategory,
    GetBusiness,
    GetBusinessDetail,
    AddToCart,
    GetUserCart,
    DisconnectRestroFromUserCartItem,
    DeleteItemFromCart,
    AddNewReview,
    getRestaurantReviews,
};