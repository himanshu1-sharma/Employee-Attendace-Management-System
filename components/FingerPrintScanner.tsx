"use client";

import { Fingerprint } from "lucide-react";
import { motion } from "framer-motion";

interface FingerPrintScannerProps {
  scanning: boolean;
  onScan: () => void;
}

export default function FingerPrintScanner({ scanning, onScan }: FingerPrintScannerProps) {
  return (
    <div className="relative flex justify-center">
      <motion.div
        className="absolute inset-0 bg-blue-500/20 rounded-full"
        animate={scanning ? {
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.2, 0.5]
        } : {}}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.button
        className={`relative p-8 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors ${
          scanning ? 'cursor-wait' : 'cursor-pointer'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onScan}
        disabled={scanning}
      >
        <Fingerprint
          size={48}
          className={`${scanning ? 'text-blue-400 animate-pulse' : 'text-gray-300'}`}
        />
      </motion.button>
    </div>
  );
}