import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/Loader.css";

const name = "Shreyash Swami".split("");

const letterVariants = {
  hidden: { opacity: 0 },
  visible: i => ({
    opacity: 1,
    transition: {
      delay: i * 0.1,
    },
  }),
};

const Loader = ({ onFinish }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const totalDuration = name.length * 100 + 1000; 
    const fadeTimeout = setTimeout(() => {
      setFadeOut(true);
    }, totalDuration);

    const finishTimeout = setTimeout(() => {
      if (onFinish) onFinish();
    }, totalDuration + 1000); 

    return () => {
      clearTimeout(fadeTimeout);
      clearTimeout(finishTimeout);
    };
  }, [onFinish]);

  return (
    <AnimatePresence>
      {!fadeOut && (
        <motion.div
          className="loader-screen"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div className="loader-text-wrapper">
            {name.map((letter, i) => (
              <motion.span
                key={i}
                className="loader-letter"
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
