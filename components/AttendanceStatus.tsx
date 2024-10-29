"use client";

import { CheckCircle, Clock, UserCheck } from "lucide-react";
import { motion } from "framer-motion";

interface AttendanceStatusProps {
  authenticated: boolean;
}

export default function AttendanceStatus({ authenticated }: AttendanceStatusProps) {
  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between p-4 rounded-lg bg-gray-700/50">
        <div className="flex items-center gap-3">
          <Clock className="text-gray-400" size={20} />
          <span className="text-sm font-medium">Clock In Time</span>
        </div>
        <span className="text-sm font-bold">{currentTime}</span>
      </div>

      {authenticated && (
        <motion.div
          className="flex items-center justify-center gap-2 text-green-400"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
        >
          <UserCheck size={20} />
          <span className="text-sm font-medium">Identity Verified</span>
        </motion.div>
      )}
    </motion.div>
  );
}