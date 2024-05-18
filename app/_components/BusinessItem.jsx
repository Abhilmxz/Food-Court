import React from 'react'
import Image from 'next/image'
import Link from 'next/link'


// BANNER SECTION AND RESTAURANT LIST AND REVIEWS


//BANNER IMAGE API CALLING

function BusinessItem  ({business}) {

  // Adding new method for review view
    const CalculateRating=()=>{
      let total=0;
      let count=0;
      console.log(business,"================")
      if (business?.review){

        business?.review.forEach(item=>{
          total=total+item.star;
          count++;
        })
      } 
      const result=total/count;
      return result?result.toFixed(1):5;
    }


  return (

    //hover bug on here
    <Link href={'/restaurant/'+business?.slug} className='p-3 hover:border rounded-xl cursor-pointer hover:border-primary hover:bg-orange-50 block'>
      <Image src={business.banner?.url} alt={business.name} 
      width={500} 
      height={130}
      className='h-[130px] rounded-xl object-cover'/>
      <div className='mt-2'>
        <h2 className='font-bold text-lg'>{business.name}</h2>


      
{/* BANNER REVIEWS AND RATINGS */}
        <div className='flex justify-between items-center'>
            <div className='flex gap-2 items-center'>
              <Image src="/star.png" alt="star" width={14} height={14}/>  
              <label className='text-gray-400 text-sm'>{CalculateRating()}</label>
              <h2 className='text-gray-400 text-sm'>{business?.restroType[0]}</h2>
            </div>
            <h2 className='text-primary text-sm'>{business.categories[0].name}</h2>
        </div>
      </div>
    </Link>
  )
}

export default BusinessItem;
