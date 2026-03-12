"use client";

import { motion } from "framer-motion";
import { Bot } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-background overflow-hidden relative">
      {/* Dynamic Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[80px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center"
      >
        <div className="relative mb-8">
          {/* Outer Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-4 rounded-3xl border-2 border-primary/20 border-t-primary/60 border-l-primary/60"
          />

          {/* Bot Container */}
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-24 h-24 rounded-2xl bg-primary/20 flex items-center justify-center shadow-2xl shadow-primary/20 backdrop-blur-sm border border-primary/30"
          >
            <Bot className="w-12 h-12 text-primary" />
          </motion.div>
        </div>

        {/* Loading Text */}
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xl font-bold tracking-tight text-foreground">
            Botix<span className="text-primary">AI</span>
          </span>
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                className="w-1.5 h-1.5 rounded-full bg-primary"
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
