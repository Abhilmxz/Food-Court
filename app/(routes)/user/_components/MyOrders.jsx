import GlobalApi from '@/app/_utils/GlobalApi'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
//Shad cn
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  

function MyOrders() {
    const {user}=useUser();
    const [orderList,setOrderList]=useState([]);
    useEffect(()=>{
        user&&GetUserorders();
    },[user])
    const GetUserorders=()=>{
        GlobalApi.GetUserOrders(user?.primaryEmailAddress?.emailAddress).then(resp=>{
            setOrderList(resp?.orders)
    })
}
  return (
    <div>
      <h2 className='text-lg font-bold'>My Orders</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
        {orderList?.map((order,index)=>(
           <div className='p-3 border rounded-lg flex flex-col gap-3'>
            <h2 className='font-bold'>{moment(order?.createdAt).format('DD-MMM-yyyy')}</h2>
            <h2 className='flex justify-between text-sm'>Order Total Amount : <span className='font-bold text-blue-500'><span className='text-lime-500'>$ </span>{(order?.orderAmount).toFixed(2)}</span></h2>
            <h2 className='flex justify-between text-sm'>Address :<span className='font-bold text-red-500'>{order?.address},{order?.zipCode}</span></h2>
            

            <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
            <AccordionTrigger><h2 className='text-primary underline text-sm cursor-pointer'>View Order Detail</h2></AccordionTrigger>
            <AccordionContent>
            <div className='flex flex-col gap-3'>
               {order?.orderDetail?.map((item,index)=>(
                   <div className='flex justify-between'>
                    <h2>{item?.name}</h2>
                    <h2><span className='text-lime-500'>$ </span>{item?.price}</h2>
                   </div>
               ))} 
               <hr></hr>
               <h2 className='flex font-bold text-md mt-2 text-rose-700'>Total Order Amount(including.Taxes):<span className='font-bold text-blue-500'><span className='text-lime-500'>$ </span>{(order?.orderAmount).toFixed(2)}</span></h2>
            </div>
           </AccordionContent>
        </AccordionItem>
     </Accordion>

           </div>  
        ))}
      </div>
    </div>
  )
}

export default MyOrders
