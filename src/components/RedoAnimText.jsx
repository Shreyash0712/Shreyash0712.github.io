"use client";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

export default function RedoAnimText({ delay }) {
  const textIndex = useMotionValue(0);
  const texts = [
    "sudo apply --position Software_Engineer",
    "git clone https://github.com/my-resume",
    "npm install dedication passion hardwork",
    "cd /career/opportunities && ls -al",
    "echo 'Eager to join your mission-driven team!'",
    "ssh hiring.manager@dreamcompany.com",
    "cat cover_letter.txt | grep 'innovation'",
    "python3 -m job_application --apply-now",
    "curl -X POST -d 'resume.pdf' https://careers.company.com/apply"
  ];

  const baseText = useTransform(textIndex, (latest) => texts[latest] || "");
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) =>
    baseText.get().slice(0, latest)
  );
  const updatedThisRound = useMotionValue(true);

  useEffect(() => {
    animate(count, 60, {
      type: "tween",
      delay: delay,
      duration: 1,
      ease: "easeIn",
      repeat: Infinity,
      repeatType: "reverse",
      repeatDelay: 1,
      onUpdate(latest) {
        if (updatedThisRound.get() === true && latest > 0) {
          updatedThisRound.set(false);
        } else if (updatedThisRound.get() === false && latest === 0) {
          if (textIndex.get() === texts.length - 1) {
            textIndex.set(0);
          } else {
            textIndex.set(textIndex.get() + 1);
          }
          updatedThisRound.set(true);
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <motion.span className="inline">{displayText}</motion.span>;
}
