import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import RedoAnimText from "./RedoAnimText";
import CursorBlinker from "./CursorBlinker";

export default function AnimText({ delay }) {
  const [done, setDone] = useState(false);
  const baseText = "Booting up job application protocol...";
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) =>
    baseText.slice(0, latest)
  );

  useEffect(() => {
    const controls = animate(count, baseText.length, {
      type: "tween",
      delay: delay,
      duration: 1,
      ease: "easeInOut",
      onComplete: () => {
        setDone(true);
      }
    });
    return controls.stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {/* First line: Typing Dear Hiring Manager */}
      <div className="flex">
        <span className="text-green-400 flex-shrink-0">
          Shreyash@desktop:~$
        </span>
        <motion.span className="ml-2">{displayText}</motion.span>
      </div>

      {done && (
        <>
          <br />
          {/* Second line: New Terminal Prompt for RedoAnimText */}
          <div className="flex">
            <span className="text-green-400 flex-shrink-0">
              Shreyash@desktop:~$&nbsp;
            </span>
            <RedoAnimText delay={delay + 1} />
            <CursorBlinker />
          </div>

        </>
      )}
    </div>
  );
}
