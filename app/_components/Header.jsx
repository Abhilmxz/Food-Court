"use client";
import Image from 'next/image';
import React, {useState, useEffect,useContext } from 'react';
import {Search, ShoppingCart} from 'lucide-react';
import {SignInButton, SignOutButton} from '@clerk/nextjs';
import{SignUpButton} from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { UserButton } from '@clerk/nextjs';
import { useUser } from '@clerk/nextjs';
import { CartUpdateContext } from '@/app/_context/CartUpdateContext';
import GlobalApi from '../_utils/GlobalApi';
import Link from 'next/link';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Cart from './Cart';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"




function Header() {

const {user,isSignedIn} = useUser();
const {updateCart,setUpdateCart}=useContext(CartUpdateContext);
const [cart,setCart]=useState([]);

useEffect(()=>{
  console.log("Execute Me!");
  user&&GetUserCart()
},[updateCart||user])

// adding cart details view in email

const GetUserCart=()=>{
  GlobalApi.GetUserCart(user?.primaryEmailAddress?.emailAddress).then(resp=>{
    console.log(resp)
    setCart(resp?.userCarts);
  })
}

  return (
    <div className='flex justify-between 
    items-center  
    md:px-20 shadow-sm mr-50'>
      <Image src='/logo.png' 
      alt="logo" 
      width={80} 
      height={80}/>

      <div className='hidden md:flex border p-2 rounded-lg bg-gray-200 w-96'>
        <input type="text" className='bg-transparent w-full outline-none'/>
        <Search/>
      </div>


      {isSignedIn?
      // adding cart and user button
      <div className='flex gap-3 items-center'>
        
      {/* Adding display to card option */}
      <Popover>
      <PopoverTrigger asChild><div className='flex gap-2 items-center cursor-pointer'>
      <ShoppingCart/>
      <label className='p-1 px-3 rounded-full bg-slate-200'>{cart?.length}</label>
      </div></PopoverTrigger>
      <PopoverContent className="w-full"><Cart cart={cart}/></PopoverContent>
      </Popover>

      
      {/* <UserButton/> */}
      
      <DropdownMenu>
    <DropdownMenuTrigger>
    <Image src={user?.imageUrl} alt='user' width={30} height={30} className='rounded-full'/>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <Link href={'/user'}> <DropdownMenuItem>Profile</DropdownMenuItem></Link>
    <Link href={'/user#/my-orders'}><DropdownMenuItem>My Orders</DropdownMenuItem></Link>
    <SignOutButton><DropdownMenuItem>Logout</DropdownMenuItem></SignOutButton>
  </DropdownMenuContent>
</DropdownMenu>

      </div>
      :<div className='flex gap-5'>
        <SignInButton mode='modal'>

        <Button variant='outline'>Login</Button>
        </SignInButton>
        <SignUpButton mode='modal'>
        <Button>Sign Up</Button>
        </SignUpButton>
      </div>}
    </div>
  );
};

export default Header;
