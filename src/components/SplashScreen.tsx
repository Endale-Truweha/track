"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish(); // Hide splash screen after 5 seconds
    }, 1000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/frea.jpg')" }} // Set background image
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1, delay: 4 }} // Fade out after 4 sec, takes 1 sec to disappear
    />
  );
}
