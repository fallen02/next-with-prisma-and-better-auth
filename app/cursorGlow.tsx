"use client";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";

export const CursorGlow = ({ children }: { children: React.ReactNode }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const maskImage = useMotionTemplate`radial-gradient(200px at ${mouseX}px ${mouseY}px, white, transparent)`;
  const style = { maskImage, WebkitMaskImage: maskImage };

  const handleMouseMove = ({
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) => {
    // let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX );
    mouseY.set(clientY );

    // console.log(clientX, clientY);
  };
  return (
    <motion.div className="relative group" onMouseMove={handleMouseMove}>
      <motion.div
        style={style}
        className="absolute inset-0 bg-white/5 opacity-0 transition duration-1000 group-hover:opacity-100 -z-5"
      />
      <motion.div className="z-10">
      {children}
      </motion.div>
    </motion.div>
  );
};
