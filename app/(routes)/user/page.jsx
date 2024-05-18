"use client"
import { UserButton, UserProfile } from '@clerk/nextjs'
import { ShoppingBag } from 'lucide-react'
import React from 'react'
import MyOrders from './_components/MyOrders'


function User() {
  return (
    <div className='flex justify-center items-center'>
      <UserProfile>
        <UserButton.UserProfilePage
        label="My Orders"
        labelIcon={<ShoppingBag className='w-4 h-4'/>}
        url="my-orders">
            <MyOrders/>
            {/* <div>
                <h1>order list</h1>
                <p>this is order list</p>
            </div> */}
        </UserButton.UserProfilePage>

        {/* <UserButton.UserProfilePage
        label="Logout"
        labelIcon={<ShoppingBag className='w-4 h-4'/>}
        url="logout">
            <div>
                <h1>order list</h1>
                <p>this is order list</p>
            </div>
        </UserButton.UserProfilePage> */}
      </UserProfile>
    </div>
  )
}

export default User
