"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CustomButtonProps {
  text: string;
  href: string;
}

export const CustomButton = ({ text, href }: CustomButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Button
      asChild
      className={cn(
        "group relative flex w-full items-center justify-center overflow-hidden rounded-full border-2 border-white px-5 py-6 font-medium text-white sm:w-auto",
        isHovered && "rounded-lg"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      variant="outline"
    >
      <Link
        className="inline-flex items-center justify-center gap-2"
        href={href}
      >
        <motion.span
          animate={isHovered ? { x: 20 } : { x: 0 }}
          className="relative z-10 group-hover:text-black"
          initial={{ x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {text}
        </motion.span>
        <motion.div
          animate={isHovered ? { x: 20, opacity: 1 } : { x: 0, opacity: 1 }}
          className="relative h-4 w-4"
          initial={false}
          transition={{ duration: 0.3 }}
        >
          <ArrowRight className="absolute inset-0 z-50 group-hover:text-black" />
        </motion.div>
        <motion.div
          animate={isHovered ? { x: 14, opacity: 1 } : { x: -20, opacity: 0 }}
          className="absolute left-1 z-10"
          initial={{ x: -20, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowRight className="z-10 h-4 w-4 group-hover:text-black" />
        </motion.div>
        <div
          className="absolute inset-0 z-0 bg-white transition-all duration-500 ease-in-out"
          style={{
            clipPath: isHovered
              ? "circle(100% at 50% 50%)"
              : "circle(0% at 50% 50%)",
          }}
        />
      </Link>
    </Button>
  );
};
