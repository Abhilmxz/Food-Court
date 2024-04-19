import React from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import {Button} from '@/components/ui/button'
import GlobalApi from '@/app/_utils/GlobalApi';
import { toast } from 'sonner';

function Cart({ cart }) {
// fuction of cart total amount calculation function
    const CalculateCartAmount=()=>{
        let total=0;
        cart.forEach((item)=>{
            total=total+item.price;
        })
        return total.toFixed(2);
    }

    const RemoveItemFromCart=(id)=>{
        GlobalApi.DisconnectRestroFromUserCartItem(id).then(resp=>{
            console.log(resp);
            if(resp)
            {
              GlobalApi.DeleteItemFromCart(id).then(resp=>{
                console.log(resp);  
                toast('Item Removed!')
              })  
            }
        })
        
    }

  return (
    <div>
      <h1 className='text-lg font-bold'>{cart[0]?.restaurant?.name}</h1>
      <div className='mt-5 flex flex-col gap-3'>
        <h2 className='font-bold'>My Order</h2>
        {cart&&cart.map((item, index) => (
            <div key={index} className='flex justify-between gap-8 items-center'>
                <div className='flex items-center gap-2'>
                <Image src={item.productImage} 
                alt={item.productName} width={40} height={40}
                className='h-[40px] w-[40px] rounded-lg object-cover'/>
                <h2 className='font-sm'>{item.productName}</h2>
                </div>
                <h2 className='font-bold flex gap-2'>${item.price}</h2>
                <X className='h-4 w-4 text-red-500' onClick={()=>RemoveItemFromCart(item.id)}
                />
           </div>
        ))}
        {/* adding checkout button and total amount */}
        <Button>Checkout ${CalculateCartAmount()}</Button>
      </div>
    </div>
  )
}

export default Cart;
