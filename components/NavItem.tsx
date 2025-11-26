import Image from "next/image";
import Link from "next/link";

interface NavItemProps {
  href: string;
  icon: string;
  label: string;
}

export default function NavItem({ href, icon, label }: NavItemProps) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center gap-1 px-[6px] py-2 text-xs text-gray-600 hover:text-gray-900"
    >
      <Image src={icon} alt={label} width={20} height={20} />
      <span className="text-xs">{label}</span>
    </Link>
  );
}
