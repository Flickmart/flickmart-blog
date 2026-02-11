"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import type React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const PinContainer = ({
  children,
  title,
  href,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  title?: string;
  href?: string;
  className?: string;
  containerClassName?: string;
}) => {
  const [transform, setTransform] = useState(
    "translate(-50%,-50%) rotateX(0deg)"
  );

  const onMouseEnter = () => {
    setTransform("translate(-50%,-50%) rotateX(40deg) scale(0.8)");
  };
  const onMouseLeave = () => {
    setTransform("translate(-50%,-50%) rotateX(0deg) scale(1)");
  };

  return (
    <Link
      className={cn(
        "group/pin relative z-50 cursor-pointer",
        containerClassName
      )}
      href={href || "/"}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        className="relative size-16"
        style={{
          perspective: "1000px",
          transform: "rotateX(70deg) translateZ(0deg)",
        }}
      >
        <div
          className="absolute top-1/2 left-1/2 flex items-start justify-start overflow-hidden p-4 transition duration-700 group-hover/pin:border-white/[0.2]"
          style={{
            transform,
          }}
        >
          <div className={cn("relative z-50", className)}>{children}</div>
        </div>
      </div>
      <PinPerspective href={href} title={title} />
    </Link>
  );
};

export const PinPerspective = ({
  title,
  href,
}: {
  title?: string;
  href?: string;
}) => {
  return (
    <motion.div className="pointer-events-none z-[40] flex items-center justify-center opacity-0 transition duration-500 group-hover/pin:opacity-100">
      <div className="inset-0 -mt-7 h-full w-full flex-none">
        {/* <div className="absolute top-0 inset-x-0  flex justify-center">
          <a
            href={href}
            target={"_blank"}
            className="relative flex space-x-2 items-center z-50 rounded-ful py-0.5 px-4 ring-1 ring-white/10 text-muted-foreground bg-background"
          >
            <span className="relative z-100  text-xs font-bold inline-block py-0.5">
              {title}
            </span>

            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover/btn:opacity-40"></span>
          </a>
        </div> */}

        <div
          className="absolute top-1/2 left-1/2 mt-4 ml-[0.09375rem] -translate-x-1/2 -translate-y-1/2"
          style={{
            perspective: "1000px",
            transform: "rotateX(70deg) translateZ(0)",
          }}
        >
          <>
            <motion.div
              animate={{
                opacity: [0, 1, 0.5, 0],
                scale: 1,

                z: 0,
              }}
              className="absolute top-1/2 left-1/2 h-[11.25rem] w-[11.25rem] rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
              initial={{
                opacity: 0,
                scale: 0,
                x: "-50%",
                y: "-50%",
              }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                delay: 0,
              }}
            />
            <motion.div
              animate={{
                opacity: [0, 1, 0.5, 0],
                scale: 1,

                z: 0,
              }}
              className="absolute top-1/2 left-1/2 h-[11.25rem] w-[11.25rem] rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
              initial={{
                opacity: 0,
                scale: 0,
                x: "-50%",
                y: "-50%",
              }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                delay: 2,
              }}
            />
            <motion.div
              animate={{
                opacity: [0, 1, 0.5, 0],
                scale: 1,

                z: 0,
              }}
              className="absolute top-1/2 left-1/2 h-[11.25rem] w-[11.25rem] rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
              initial={{
                opacity: 0,
                scale: 0,
                x: "-50%",
                y: "-50%",
              }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                delay: 4,
              }}
            />
          </>
        </div>

        <>
          <motion.div className="absolute right-1/2 bottom-1/2 h-20 w-px translate-y-[14px] bg-gradient-to-b from-transparent to-cyan-500 blur-[2px] group-hover/pin:h-40" />
          <motion.div className="absolute right-1/2 bottom-1/2 h-20 w-px translate-y-[14px] bg-gradient-to-b from-transparent to-cyan-500 group-hover/pin:h-40" />
          <motion.div className="absolute right-1/2 bottom-1/2 z-40 h-[4px] w-[4px] translate-x-[1.5px] translate-y-[14px] rounded-full bg-cyan-600 blur-[3px]" />
          <motion.div className="absolute right-1/2 bottom-1/2 z-40 h-[2px] w-[2px] translate-x-[0.5px] translate-y-[14px] rounded-full bg-cyan-300" />
        </>
      </div>
    </motion.div>
  );
};
