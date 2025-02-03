/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Minus,
  Plus,
  RotateCcw,
  Sparkles,
  Rocket,
  Zap,
  Sun,
  Moon,
  Star,
} from "lucide-react";

const POWER_LEVELS = [
  { threshold: 0, color: "#4f46e5", name: "Initiate" },
  { threshold: 10, color: "#7c3aed", name: "Adept" },
  { threshold: 20, color: "#db2777", name: "Master" },
  { threshold: 30, color: "#ea580c", name: "Legend" },
  { threshold: 40, color: "#dc2626", name: "Cosmic" },
];

const particlesConfig = {
  0: 20,
  10: 40,
  20: 60,
  30: 80,
  40: 100,
};

export function Counter() {
  const [count, setCount] = useState<number | null>(null);
  const [particles, setParticles] = useState<
    { id: number; x: number; y: number; size: number }[]
  >([]);

  // Load count from localStorage only on the client
  useEffect(() => {
    const savedCount = localStorage.getItem("count");
    setCount(savedCount ? Number.parseInt(savedCount, 10) : 0);
  }, []);

  // Update localStorage when count changes
  useEffect(() => {
    if (count !== null) {
      localStorage.setItem("count", count.toString());
    }
  }, [count]);

  // Handle particle effects
  useEffect(() => {
    if (count === null) return; // Ensure count is not null

    const particleCount = Object.entries(particlesConfig).reduce(
      (acc, [threshold, count]) =>
        Number(threshold) <= Math.abs(count) ? count : acc,
      20
    );

    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
    }));

    setParticles(newParticles);
  }, [count]);

  const currentLevel = POWER_LEVELS.reduce(
    (acc, level) =>
      count !== null && Math.abs(count) >= level.threshold ? level : acc,
    POWER_LEVELS[0]
  );

  const buttonVariants = { hover: { scale: 1.05 }, tap: { scale: 0.95 } };
  const counterVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
  };

  const dayProgress = count !== null ? Math.min(Math.abs(count) / 50, 1) : 0;
  const skyColor = `hsl(220, 60%, ${10 + dayProgress * 70}%)`;
  const sunMoonPosition = `${dayProgress * 100}%`;

  return (
    <Card className="relative overflow-hidden p-6 bg-gradient-to-br from-gray-900 to-gray-800 min-h-[500px]">
      {/* Sky background */}
      <motion.div
        className="absolute inset-0"
        animate={{ backgroundColor: skyColor }}
        transition={{ duration: 0.5 }}
      />

      {/* Sun/Moon */}
      <motion.div
        className="absolute left-0 right-0"
        style={{ top: sunMoonPosition }}
        animate={{ top: sunMoonPosition }}
        transition={{ duration: 0.5 }}
      >
        {dayProgress < 0.5 ? (
          <Moon className="h-12 w-12 text-gray-200" />
        ) : (
          <Sun className="h-12 w-12 text-yellow-400" />
        )}
      </motion.div>

      {/* Stars */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.2, 1] }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          <Star className="w-full h-full text-white" />
        </motion.div>
      ))}

      {/* Main counter display */}
      <div className="relative z-10 space-y-8">
        <div className="text-center space-y-4">
          <motion.div
            className="text-7xl font-bold"
            animate={{ scale: [1, 1.05, 1], color: currentLevel.color }}
            transition={{ duration: 0.3 }}
          >
            <AnimatePresence mode="wait">
              {count !== null ? (
                <motion.span
                  key={count}
                  variants={counterVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {count}
                </motion.span>
              ) : (
                <motion.span>Loading...</motion.span>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            className="text-3xl font-semibold"
            animate={{ color: currentLevel.color }}
          >
            {currentLevel.name} Level
          </motion.div>

          {/* Power indicators */}
          <div className="flex justify-center gap-2">
            {POWER_LEVELS.map((level) => (
              <motion.div
                key={level.threshold}
                className="w-4 h-4 rounded-full"
                animate={{
                  backgroundColor:
                    count !== null && Math.abs(count) >= level.threshold
                      ? level.color
                      : "#374151",
                  scale:
                    count !== null && Math.abs(count) >= level.threshold
                      ? [1, 1.2, 1]
                      : 1,
                }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </div>

        {/* Control buttons */}
        <div className="flex justify-center gap-4">
          {count !== null && (
            <>
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setCount(count - 1)}
                  className="bg-gray-800 border-gray-700 hover:bg-gray-700"
                >
                  <Minus className="h-6 w-6" />
                </Button>
              </motion.div>

              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setCount(0)}
                  className="bg-gray-800 border-gray-700 hover:bg-gray-700"
                >
                  <RotateCcw className="h-6 w-6" />
                </Button>
              </motion.div>

              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setCount(count + 1)}
                  className="bg-gray-800 border-gray-700 hover:bg-gray-700"
                >
                  <Plus className="h-6 w-6" />
                </Button>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </Card>
  );
}
