"use client";
import { motion } from "framer-motion";
import AnimText from "./AnimText"; // assuming you still want to animate text

const containerVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
      delayChildren: 0.3,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 15,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

export default function A4Animation() {
  return (
    <motion.div className="flex w-full select-none items-center justify-center">
      <motion.div
        variants={containerVariants}
        animate="visible"
        initial="hidden"
        className="flex h-[400px] md:h-[450px] w-[672px] flex-col rounded-md bg-gray-900 p-6 font-mono text-green-400 shadow-lg overflow-hidden border-2 border-gray-900"
      >
        {/* Terminal top bar with fake buttons */}
        <motion.div
          variants={itemVariants}
          className="mb-4 flex items-center space-x-2"
        >
          <span className="h-3 w-3 rounded-full bg-red-500"></span>
          <span className="h-3 w-3 rounded-full bg-yellow-500"></span>
          <span className="h-3 w-3 rounded-full bg-green-500"></span>
        </motion.div>

        {/* Terminal content */}
        <motion.div variants={itemVariants} className="flex flex-col">
          <div className="flex items-center space-x-2 text-lg">
            <span className="text-gray-100">
              <AnimText delay={1} />
            </span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
