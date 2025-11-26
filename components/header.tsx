"use client";

import { ChevronDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import NavItem from "./NavItem";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-2">
      <div className="flex items-center justify-between gap-4">
        {/* Logo and Search */}
        <div className="flex items-center gap-3 flex-1">
          <Image src="/icons/logo.svg" alt="Logo" width={40} height={40} />

          {/* Search Input */}
          <div className="relative w-62">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-3 py-2 bg-gray-100 rounded-md text-sm placeholder-gray-500"
            />
          </div>
        </div>

        {/* Navigation Icons */}
        <div className="flex items-center gap-2">
          <NavItem href="/" icon="/icons/House.svg" label="Home" />
          <NavItem
            href="/dashboard"
            icon="/icons/ChartPieSlice.svg"
            label="Dashboard"
          />
          <NavItem href="/wallet" icon="/icons/Wallet.svg" label="Wallet" />
          <NavItem
            href="/plan-trip"
            icon="/icons/ListChecks.svg"
            label="Plan Trip"
          />
          <NavItem
            href="/commission"
            icon="/icons/HandCoins.svg"
            label="Commission for life"
          />
        </div>

        <div className="h-10 w-px bg-[#98A2B3] mx-2"></div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <Button className="bg-[#0D6EFD] hover:bg-[#0D6EFD] text-white rounded-sm">
            Subscribe
          </Button>

          <NavItem
            href="/notifications"
            icon="/icons/Bell.svg"
            label="Notification"
          />
          <NavItem href="/cart" icon="/icons/Basket.svg" label="Cart" />
          <NavItem href="/create" icon="/icons/PlusSquare.svg" label="Create" />

          <button className="flex items-center gap-2">
            <Image
              src="/images/avatar.svg"
              alt="User"
              width={32}
              height={32}
              // className="w-8 h-8 rounded-full"
            />
            <ChevronDown size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}
