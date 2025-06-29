'use client'

import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import clsx from "clsx"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="w-full shadow-sm bg-white border-b sticky top-0 z-50">
      <div className="flex justify-between items-center px-6 py-3 max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-black">Inventory</Link>

        {/* Desktop Nav Links */}
        <NavigationMenu>
          <NavigationMenuList className="hidden md:flex gap-4">
            <NavigationMenuItem>
              <Link href="/" className="text-sm font-medium hover:underline">Home</Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/products" className="text-sm font-medium hover:underline">Products</Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/add-product" className="text-sm font-medium hover:underline">Add Product</Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/add-category" className="text-sm font-medium hover:underline">Add Category</Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Menu Icon */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Nav Dropdown (outside NavigationMenu) */}
      <div className={clsx("md:hidden px-6 pb-4", isOpen ? "block" : "hidden")}>
        <div className="flex flex-col gap-2">
          <Link href="/" className="text-sm font-medium hover:underline">Home</Link>
          <Link href="/products" className="text-sm font-medium hover:underline">Products</Link>
          <Link href="/add-product" className="text-sm font-medium hover:underline">Add Product</Link>
          <Link href="/add-category" className="text-sm font-medium hover:underline">Add Category</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
