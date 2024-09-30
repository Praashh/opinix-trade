"use client"
import Link from "next/link";
import React from "react";
import { NavigationMenu } from "./Navmenu";
import ProfileHeader from "./ProfileHeader";

interface navMenutItemType {
  title: string;
  link: string;
}

export default function Appbar() {

  const navMenutItem: Array<navMenutItemType> = [{ title: "Trading", link: "/trading" }, { title: "Potfolio", link: "/potfolio" }, { title: "Read", link: "/read" }]

  return (
    <nav className="inset-x-0 top-0 backdrop-blur-2xl z-50 border-y-2 shadow-md sticky">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-20 items-center">
          {/* LeftNav */}
          <Link className="flex items-center text-4xl font-bold text-white group" href={"/"}>
            <span>opini</span>
            <span className="duration-700 group-hover:-rotate-180">X</span>
          </Link>

          {/* NavMenu */}
          <nav className="hidden md:flex gap-10">
            {
              navMenutItem.map((item, index) => (
                <NavigationMenu title={item.title} link={item.link} key={index} />
              ))
            }
          </nav>
          {/* ProfileHeader */}
          <div className="flex gap-3 items-center">
            <ProfileHeader />
          </div>
        </div>
      </div>
    </nav>
  );
}