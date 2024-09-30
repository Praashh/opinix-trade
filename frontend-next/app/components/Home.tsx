import React from 'react'
import {Hero} from '../../components/landing/Hero'
import { ModeToggle } from '@/components/ui/mode-toggle'
import Appbar from "../../components/landing/Appbar"
import TakesCareWrapper from "../../components/landing/TakesCare"
import FAQS from "../../components/landing/FAQs"

export const HomeComponent = () => {
  return (
    <div>
      <Appbar/>
      <Hero/>
      <div className='w-full flex justify-center items-center '>
      <TakesCareWrapper/>
      </div>
      <FAQS/>
    </div>
  )
}

