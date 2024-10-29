"use client";

import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";

interface AttendanceEntry {
  date: string;
  clockIn: string;
  clockOut: string;
  status: "present" | "late" | "early";
}

const recentAttendance: AttendanceEntry[] = [
  {
    date: "2024-03-20",
    clockIn: "09:00 AM",
    clockOut: "05:00 PM",
    status: "present"
  },
  {
    date: "2024-03-19",
    clockIn: "09:15 AM",
    clockOut: "05:00 PM",
    status: "late"
  },
  {
    date: "2024-03-18",
    clockIn: "08:45 AM",
    clockOut: "04:30 PM",
    status: "early"
  }
];

const statusColors = {
  present: "text-green-400",
  late: "text-yellow-400",
  early: "text-blue-400"
};

export default function AttendanceRecord() {
  return (
    <Card className="p-6 bg-gray-800 border-gray-700">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent Attendance</h2>
          <Calendar className="text-gray-400" size={20} />
        </div>
        
        <div className="space-y-3">
          {recentAttendance.map((entry, index) => (
            <motion.div
              key={entry.date}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-3 rounded-lg bg-gray-700/50 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  {new Date(entry.date).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
                <span className={`text-sm font-medium capitalize ${statusColors[entry.status]}`}>
                  {entry.status}
                </span>
              </div>
              
              <div className="flex items-center justify-between text-gray-400">
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span className="text-xs">In: {entry.clockIn}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span className="text-xs">Out: {entry.clockOut}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Card>
  );
}