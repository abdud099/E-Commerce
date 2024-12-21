"use client";

import Link from "next/link";
import { XMarkIcon } from "@heroicons/react/24/solid";

interface Props {
  nav: boolean;
  closeNav: () => void;
}

const MobileNav = ({ nav, closeNav }: Props) => {
  const navAnimation = nav ? "translate-x-0" : "translate-x-[-100%]";

  const links = [
    { name: "Home", href: "/" },
    { name: "Men", href: "/Men" },
    { name: "Women", href: "/Women" },
    { name: "Teens", href: "/Teens" },
  ];

  return (
    <div
      className={`fixed ${navAnimation} md:hidden transform transition-transform duration-300 top-0 left-0 right-0 bottom-0 z-[10000] bg-white`}
    >
      <div className="w-full h-full flex flex-col items-center justify-center">
        {links.map((link, idx) => (
          <Link key={idx} href={link.href}>
            <div
              className="nav-link-mobile uppercase text-black text-lg mb-4"
              onClick={closeNav}
            >
              {link.name}
            </div>
          </Link>
        ))}
      </div>
      <div
        onClick={closeNav}
        className="absolute top-[2rem] right-[2rem] w-[2rem] h-[2rem] text-primary cursor-pointer"
      >
        <XMarkIcon className="w-full h-full" />
      </div>
    </div>
  );
};

export default MobileNav;
