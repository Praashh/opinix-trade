"use client"
import React from 'react'
import DepositForm from '../../../../components/landing/DepositForm'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

const Page = () => {
  const {data} = useSession();
  console.log(data?.user);
  
  if(!data?.user){
    redirect("/api/auth/signin")
  }
  return (
    <div className='h-[90vh] w-full flex justify-center items-center'>
        <DepositForm/>
    </div>
  )
}

export default Page
