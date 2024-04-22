import React, { useEffect } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Rating as ReactRating } from '@smastrom/react-rating'
import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import GlobalApi from '../_utils/GlobalApi'
import { toast } from 'sonner'
import ReviewList from './ReviewList'


// ADDING REVIEW SECTION AND RATING BOX
function ReviewSection({restaurant}) {
    const [rating, setRating] = useState(0)

// ADDING FUCTION FOR SUBMITTING REVIEW STORED IN DATABASE

   const [reviewText, setReviewText] = useState();
   const {user}=useUser();
   const [reviewList,setReviewList]=useState();

   useEffect(()=>{
    restaurant&&getReviewList();
   },[restaurant])

   const handleSubmit=()=>{
    const data={
        email:user?.primaryEmailAddress?.emailAddress,
        profileImage:user?.ImageUrl,
        userName:user?.fullName,
        star:rating,
        reviewText:reviewText,
        RestroSlug:restaurant?.slug
    };
    GlobalApi.AddNewReview(data).then(resp=>{console.log(resp)
    toast ('Review Added!!')
    resp&&getReviewList();
    });
   }
// Adding   review list view

   const getReviewList=()=>{
    GlobalApi.getRestaurantReviews(restaurant?.slug).then(resp=>{
        console.log(resp)
        setReviewList(resp?.reviews)
    })
   }

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 mt-10 gap-10'>
        <div className='flex flex-col gap-2 p-5 border rounded-lg shadow-lg'>
            <h2 className='font-bold text-lg'>Add Your Review</h2>
            <ReactRating style={{ maxWidth: 100 }} value={rating} onChange={setRating} />
            <Textarea onChange={(e)=>setReviewText(e.target.value)}/>
            <Button disabled={rating==0||!reviewText}
             onClick={()=>handleSubmit()}
            >Submit</Button>
        </div>
        <div className='col-span-2'>
           <ReviewList reviewList={reviewList}/>
      
        </div>
    </div>
  )
}

export default ReviewSection;
