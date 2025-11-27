"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils"; // Standard Shadcn utility for class merging

interface CategoryCardProps {
  title: string;
  description: string;
  buttonText: string;
  /** Background color class for the card (e.g., "bg-[#000031]") */
  bgColor: string;
  /** Text color class for the card content (e.g., "text-white") */
  textColor: string;
  /** Background color class for the button */
  btnBgColor: string;
  /** Text color class for the button */
  btnTextColor: string;
  onClick?: () => void;
}

export default function CategoryCard({
  title,
  description,
  buttonText,
  bgColor,
  textColor,
  btnBgColor,
  btnTextColor,
  onClick,
}: CategoryCardProps) {
  return (
    <Card className={cn("border-none flex flex-col justify-between h-full gap-0  rounded-sm", bgColor, textColor )}>
      <CardHeader className="">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
      </CardHeader>
      
      <CardContent className="pb-7">
        <p className="text-xs opacity-90 leading-relaxed">
          {description}
        </p>
      </CardContent>

      <CardFooter>
        <Button
          onClick={onClick}
          className={cn("w-full font-medium h-10 hover:opacity-90 transition-opacity rounded-sm", btnBgColor, btnTextColor)}
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
}