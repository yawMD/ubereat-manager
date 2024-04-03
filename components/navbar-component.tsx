import React from "react";
import Image from "next/image";

export const NavBar = () => {
  return (
    <div className="bg-black flex justify-between text-white w-11/12 m-auto items-center p-4 text-sm">
      <div className="flex items-center">
        <Image
          src="https://www.uber-assets.com/image/upload/v1661822765/assets/43/8d2672-1ac9-4e71-8186-76983b9831c3/original/Uber-Eats-for-Merchants---web_logo-HALF-clrspc.svg"
          alt=""
          width={100}
          height={60}
        />

        <ul className="flex px-8">
          <li className="px-4">Services</li>
          <li className="px-4">Technologies</li>
          <li className="px-4">Who we serve</li>
          <li className="px-4">more</li>
        </ul>
      </div>

      <div className="flex items-center">
        <div className="px-2">EN</div>
        <div className="px-2">Get Support</div>
        <div className="px-2">Login</div>
        <div className="p-2 rounded-3xl bg-white text-black mx-2">Get started</div>
      </div>
    </div>
  );
};
