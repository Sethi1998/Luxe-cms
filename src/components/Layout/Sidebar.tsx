import React, { useState } from "react";
import Container from "../common/Container";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

const listing = [
  {
    name: "Dashboard",
    link: "/",
  },
  {
    name: "User",
    link: "/users",
  },
  {
    name: "Vehicle Type",
    link: "/types",
  },
  {
    name: "Categories",
    link: "/categories",
  },
];

const Sidebar = () => {
  const router = useRouter();
  return (
    <div className="bg-black h-screen text-white">
      <div className="flex justify-center">
        <div className="flex flex-col gap-2 items-center">
          <Image
            src="/img/logo.png"
            alt="logo"
            width="40"
            height="40"
            className="mt-10"
          />
          <h1 className="font-bold text-2xl">LuxeRide</h1>
        </div>
      </div>
      <Container>
        <ul className="flex flex-col gap-4 items-center">
          {listing.map((item, i) => (
            <li
              key={item.link}
              className={twMerge(
                router.asPath === item.link
                  ? "border-b w-full text-[#D9ED82]"
                  : "w-full",
                "hover:border-b border-[#D9ED82]"
              )}
            >
              <Link href={item.link}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
};

export default Sidebar;
