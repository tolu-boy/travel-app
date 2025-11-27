"use client";
import { ChevronsUpDown } from "lucide-react";
import SidebarItem from "./SidebarItem";

const items = [
  { icon: "/icons/RoadHorizon.svg", label: "Activities", href: "/activities" },
  { icon: "/icons/Buildings.svg", label: "Hotels", href: "/hotels" },
  { icon: "/icons/AirplaneTilt.svg", label: "Flights", href: "/flights" },
  { icon: "/icons/Student.svg", label: "Study", href: "/study" },
  { icon: "/icons/NewspaperClipping.svg", label: "Visa", href: "/visa" },
  {
    icon: "/icons/SuitcaseRolling.svg",
    label: "Immigration",
    href: "/immigration",
  },
  { icon: "/icons/SuitcaseRolling.svg", label: "Medical", href: "/medical" },
  {
    icon: "/icons/Package.svg",
    label: "Vacation Packages",
    href: "/vacations",
  },
];

export default function Sidebar() {
  return (
    <aside className="w-64 shrink-0 h-[calc(100vh-2rem)] sticky top-4 bg-white border-r m-4 px-4 py-6 flex flex-col gap-5 rounded-sm overflow-y-auto">
      {/* Menu */}
      <nav className="flex flex-col gap-2">
        {items.map((item, idx) => (
          <SidebarItem
            key={idx}
            icon={item.icon}
            label={item.label}
            href={item.href}
          />
        ))}
      </nav>

      {/* Bottom button */}
      <div className="mt-auto mb-10 py-5 px-3 bg-gray-100 rounded-md flex items-center gap-3 cursor-pointer">
        <div className="p-2 bg-blue-500 text-white rounded">Go</div>
        <span className="text-sm font-medium text-[#647995]">
          Personal Account
        </span>
        <ChevronsUpDown className="text-[#647995]" />
      </div>
    </aside>
  );
}
