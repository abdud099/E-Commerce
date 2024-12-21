"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu } from "lucide-react";
import { useShoppingCart } from "use-shopping-cart";
import MobileNav from "./MobileNav";

const links = [
  { name: "Home", href: "/" },
  { name: "Men", href: "/Men" },
  { name: "Women", href: "/Women" },
  { name: "Teens", href: "/Teens" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { handleCartClick } = useShoppingCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const openNav = () => setIsMobileMenuOpen(true);
  const closeNav = () => setIsMobileMenuOpen(false);

  return (
    <header className="mb-8 border-b">
      <div className="flex items-center justify-between mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/">
            <h1 className="text-5xl md:text-3xl sm:text-2xl font-bold hidden md:block sm:block lg:block">
              Next<span className="text-primary">Commerce</span>
            </h1>
          </Link>
          {/* Mobile Menu Button */}
          <div className="flex md:hidden sm:hidden lg:hidden">
            <Button
              variant="outline"
              onClick={openNav}
              className="p-2 rounded-md"
            >
              <Menu size={24} />
            </Button>
          </div>{" "}
        </div>
        {/* Desktop Navigation */}
        <nav className="hidden gap-12 lg:flex 2xl:ml-16">
          {links.map((link, idx) => (
            <div key={idx}>
              {pathname === link.href ? (
                <Link
                  className="text-lg font-semibold text-primary"
                  href={link.href}
                >
                  {link.name}
                </Link>
              ) : (
                <Link
                  href={link.href}
                  className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-primary"
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Shopping Cart */}
        <div className="lg:flex divide-x border-r sm:border-l">
          <Button
            variant={"outline"}
            onClick={() => handleCartClick()}
            className="flex flex-col gap-y-1.5 h-12 w-12 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-none"
          >
            <ShoppingBag />
            <span className="hidden text-xs font-semibold text-gray-500 sm:block">
              Cart
            </span>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <MobileNav nav={isMobileMenuOpen} closeNav={closeNav} />
    </header>
  );
}
