import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Plane, Hotel, Ticket } from "lucide-react";

type EmptyRequestCardProps = {
  title?: string;
  buttonText: string;
  type?: "flight" | "hotel" | "activity";
  image?: string;
  className?: string;
  onClick?: () => void;
};

const ICON_MAP = {
  flight: Plane,
  hotel: Hotel,
  activity: Ticket,
} as const;

export default function EmptyRequestCard({
  title = "No Request yet",
  buttonText,
  type,
  image,
  className = "",
  onClick,
}: EmptyRequestCardProps) {

  // Get Lucide icon component
  const IconComponent = type ? ICON_MAP[type] : null;

  return (
    <div
      className={`flex flex-col items-center justify-center py-10 px-8 bg-white rounded-sm ${className}`}
    >
      {/* PRIORITY: custom image → type icon → fallback box */}
      {image ? (
        <Image
          src={image}
          alt={title}
          width={64}
          height={64}
          className="w-16 h-16 object-contain"
        />
      ) : IconComponent ? (
        <IconComponent className="w-16 h-16 text-gray-600" strokeWidth={1.5} />
      ) : (
        <div className="w-16 h-16 bg-gray-200 rounded-sm" />
      )}

      <p className="text-base text-black font-medium mt-2">{title}</p>

      <Button
        className="mt-2 bg-[#0054E4] text-white font-medium px-8 py-4 rounded-sm"
        onClick={onClick}
      >
        {buttonText}
      </Button>
    </div>
  );
}
