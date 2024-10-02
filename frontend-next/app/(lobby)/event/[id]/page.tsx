"use client"
import Event from '@/app/components/Event'
import { useParams } from 'next/navigation'
/*
  TODO: 
    1. server actiosn to fetch the event from the event id (not sure but for now).
    2. Add sources of truth.
    3. Add event details like name and all.
*/
export default function Page() {
  const router = useParams()
  console.log(router);
  return <div>
    <Event/>
  </div>
}