// components/EmptyRequestCard.tsx
import Image from "next/image";
import { Button } from "@/components/ui/button";

type EmptyRequestCardProps = {
  title?: string;
  buttonText: string;
  image?: string; // local (/public/...) or external (https://...)
  className?: string;
};

export default function EmptyRequestCard({
  title = "No Request yet",
  buttonText,
  image,
  className = "",
}: EmptyRequestCardProps) {
  const isLocal = !!image && image.startsWith("/");

  return (
    <div className={`flex flex-col items-center justify-center py-10 px-8 bg-white rounded-sm ${className}`}>
      {/* Image or fallback icon */}
      {image ? (
        isLocal ? (
          <Image
            src={image}
            alt={title}
            width={64}
            height={64}
            className="w-16 h-16 object-contain"
          />
        ) : (
          // External images: use plain img to avoid next/image domain config issues
          <Image
            src={image}
            alt={title}
            width={64}
            height={64}
            className="w-16 h-16 object-contain"
          />
        )
      ) : (
        <div className="w-16 h-16 bg-gray-200 rounded-sm" />
      )}

      <p className="text-base text-black font-medium mt-2">{title}</p>

      <Button className="mt-2 bg-[#0054E4] text-white font-medium px-8 py-4 rounded-sm">
        {buttonText}
      </Button>
    </div>
  );
}
