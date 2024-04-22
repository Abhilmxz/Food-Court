import React,{useEffect, useState} from 'react';
import Image from 'next/image';
import { MapPin } from 'lucide-react';


function Intro({restaurant}) {

 const [totalReview,setTotalReview] = useState();
 const [avgRating,setAvgRating] = useState();
 useEffect(()=>{
   restaurant&&CalculateRating();
 },[restaurant])
  const CalculateRating=()=>{
    let total=0;
    let count=0;
    restaurant?.review?.forEach((item)=>{
      total=total+item.star;
      count++;
    })
    setTotalReview(count)
    const result=total/count;
    setAvgRating(result?result.toFixed(1):4.5);
  }


  return (
    <div>
{/* ADDING RESTAURANT BANNER AND LOADING SKELTON */}
      {restaurant?.banner?.url? <div>
        <Image src={restaurant?.banner?.url}
        width={1000} height={300} alt='banner'
        className='w-full h-[220px] object-cover rounded-xl'/>
      </div>:
      <div className='h-[220px] w-full bg-slate-200 animate-pulse rounded-xl'>
      </div>}
      {/* ADDING TEXTS LIKE TITLE AND DESCRIPTION AND RATING */}

      <h2 className='text-3xl font-bold mt-2'>{restaurant?.name}</h2>
      <div className='flex items-center gap-2 mt-2'>
        <Image src={'/star.png'} alt='star' width={20} height={20}/>
        <label className=' text-gray-500'>{avgRating}({totalReview})</label>
      </div>
      <h2 className='text-gray-500 mt-2 flex gap-2 items-center'>
        <MapPin/>
        {restaurant.address}</h2>
    </div>
  )
};

export default Intro;
