"use client"
import Event from '@/app/components/Event'
import { useParams } from 'next/navigation'
 
export default function Page() {
  const router = useParams()
  console.log(router.id);
  
  return <div>
    <Event/>
  </div>
}