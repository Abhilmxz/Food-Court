"use client";
import Image from 'next/image';
import React from 'react';
import {Search} from 'lucide-react';
import {SignInButton} from '@clerk/nextjs';
import{SignUpButton} from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { UserButton } from '@clerk/nextjs';
import { useUser } from '@clerk/nextjs';

function Header() {

const {user,isSignedIn} = useUser();



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
      <UserButton/>
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
