"use client"
import React from 'react'
import { useState } from 'react'
import Header from './_components/Header';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { Toaster } from '@/components/ui/sonner';
import { CartUpdateContext } from './_context/CartUpdateContext';

function Provider({children}) {
  const [updateCart,setUpdateCart] = useState(false);
  return (
    <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}>
    {/* // cart update context from anywhere */}
        <CartUpdateContext.Provider value={{updateCart, setUpdateCart}}>
    <div className='px-10 md:px-20 relative mb-20'>
        <Header />
        <Toaster />
      {children}
    </div>
    </CartUpdateContext.Provider>
    </PayPalScriptProvider>
  )
};

export default Provider;
