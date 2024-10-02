"use client"
import React from 'react'
import ReturnsDashboard from '../../../components/landing/Portfolio'
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const Page = () => {
    const {data} = useSession();
    console.log(data?.user);
    
    if(!data?.user){
      redirect("/api/auth/signin")
    }
    const event = [{
        type: "youtube",
        title: "Will Harkirat Singh reach 1 Million Subscriber in 2024?",
        investment: 5,
        returns: 10
    },
    {
        type:"sport",
        title: "Will India win 2025 companion trophy?",
        investment: 8.5,
        returns: 2
    }
    ]
    return (
        <div className='w-full h-screen'>
            <ReturnsDashboard totalReturns={19} events={event} rank={1} todayReturns={10} totalInvestment={20} />
        </div>
    )
}

export default Page
