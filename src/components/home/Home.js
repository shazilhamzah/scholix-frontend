"use client";
import React, { useState } from "react";
import { ShootingStars } from "src/lib/ShootingStar";
import StarsBackground from "src/lib/StarsBackground";
import { TypewriterEffectSmooth } from "src/lib/TypeWriter Effect";
import { Link } from "react-router-dom";
import { HoveredLink, Menu, MenuItem, ProductItem } from "../../lib/NavBar";
import { cn } from "../../lib/utils";

function Navbar({ className }) {
  const [active, setActive] = useState(null);

  return (
    <div className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}>
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Features">
          <div className="flex flex-col space-y-4 text-sm">
            <Link to="/"><HoveredLink href="/web-dev">Web Development</HoveredLink></Link>
            <Link to="/"><HoveredLink href="/interface-design">Interface Design</HoveredLink></Link>
            <Link to="/"><HoveredLink href="/seo">Search Engine Optimization</HoveredLink></Link>
          </div>
        </MenuItem>
        <Link to="/about">
        <MenuItem setActive={setActive}  item="About">
        </MenuItem>
        </Link>
        {/* <MenuItem setActive={setActive} active={active} item="Products">
          <div className="text-sm grid grid-cols-2 gap-10 p-4">
            <ProductItem
              title="Algochurn"
              href="https://algochurn.com"
              src="https://assets.aceternity.com/demos/algochurn.webp"
              description="Prepare for tech interviews like never before."
            />
            <ProductItem
              title="Tailwind Master Kit"
              href="https://tailwindmasterkit.com"
              src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
              description="Production ready Tailwind css components for your next project"
            />
            <ProductItem
              title="Moonbeam"
              href="https://gomoonbeam.com"
              src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
              description="Never write from scratch again. Go from idea to blog in minutes."
            />
            <ProductItem
              title="Rogue"
              href="https://userogue.com"
              src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
              description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
            />
          </div>
        </MenuItem> */}
      </Menu>
    </div>
  );
}


export const Home = () => {
  const words = [
    {
      text: "Grade",
    },
    {
      text: "better",
    },
    {
      text: "with",
    },
    {
      text: "Scholix.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div
      className="h-screen bg-neutral-900 flex flex-col items-center justify-center "
      style={{ backgroundColor: "#171717" }}
    >
      <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
    </div>
      <h2
        className="relative flex-col md:flex-row z-10 text-3xl md:text-5xl md:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white flex items-center gap-2 md:gap-8"
        style={{ color: "white" }}
      >
        <div className="flex flex-col items-center justify-center h-[40rem]  ">
          <TypewriterEffectSmooth words={words} />
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
            <Link to="/login">
            <button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
              Join now
            </button>
            </Link>
            <Link to="/signup">
            <button className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm">
              Signup
            </button>
            </Link>
          </div>
        </div>
      </h2>
      <StarsBackground />
      <ShootingStars />
    </div>
  );
};