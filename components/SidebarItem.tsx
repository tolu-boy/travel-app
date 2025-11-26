"use client";

import Image from "next/image";
import Link from "next/link";

interface SidebarItemProps {
  icon: string;
  label: string;
  href: string;
}

export default function SidebarItem({ icon, label, href }: SidebarItemProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md transition"
    >
      <Image src={icon} alt={label} width={22} height={22} />
      <span className="text-sm font-medium text-[#647995]">{label}</span>
    </Link>
  );
}
