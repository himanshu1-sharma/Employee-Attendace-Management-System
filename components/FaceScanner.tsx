"use client";

import { useState, useRef, useEffect } from "react";
import { Camera, CheckCircle, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface FaceScannerProps {
  onScanComplete: (success: boolean) => void;
  scanning: boolean;
}

export default function FaceScanner({ onScanComplete, scanning }: FaceScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [scanStatus, setScanStatus] = useState<"idle" | "scanning" | "success" | "failed">("idle");

  useEffect(() => {
    if (scanning && !cameraActive) {
      startCamera();
    }
    if (!scanning && cameraActive) {
      stopCamera();
    }
  }, [scanning]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
        simulateFaceScan();
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      onScanComplete(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setCameraActive(false);
    }
  };

  const simulateFaceScan = () => {
    setScanStatus("scanning");
    // Simulate face detection process
    setTimeout(() => {
      const success = Math.random() > 0.2; // 80% success rate for demo
      setScanStatus(success ? "success" : "failed");
      onScanComplete(success);
      setTimeout(() => {
        setScanStatus("idle");
        stopCamera();
      }, 1500);
    }, 2000);
  };

  return (
    <div className="relative">
      <motion.div
        className="relative w-full aspect-video max-w-sm mx-auto rounded-xl overflow-hidden bg-gray-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`w-full h-full object-cover ${cameraActive ? 'opacity-100' : 'opacity-0'}`}
        />
        
        {!cameraActive && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Camera className="w-12 h-12 text-gray-400" />
          </div>
        )}

        {/* Scanning overlay */}
        {scanStatus === "scanning" && (
          <motion.div
            className="absolute inset-0 border-2 border-blue-500"
            animate={{
              opacity: [1, 0.5, 1],
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}

        {/* Success/Failure indicators */}
        {scanStatus === "success" && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <CheckCircle className="w-16 h-16 text-green-500" />
          </motion.div>
        )}

        {scanStatus === "failed" && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <XCircle className="w-16 h-16 text-red-500" />
          </motion.div>
        )}
      </motion.div>

      <div className="absolute inset-x-0 bottom-4 flex justify-center">
        {scanStatus === "scanning" && (
          <motion.div
            className="px-4 py-2 rounded-full bg-blue-500/20 text-blue-400 text-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Scanning face...
          </motion.div>
        )}
      </div>
    </div>
  );
}