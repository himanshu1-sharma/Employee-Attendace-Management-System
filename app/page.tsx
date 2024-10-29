"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import AttendanceStatus from "@/components/AttendanceStatus";
import FaceScanner from "@/components/FaceScanner";
import AttendanceRecord from "@/components/AttendanceRecord";
import EmployeeTable from "@/components/EmployeeTable";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Camera, Users } from "lucide-react";
import { addAttendanceRecord, getEmployees, updateEmployee } from "@/lib/data";

export default function Home() {
  const [scanning, setScanning] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [showEmployees, setShowEmployees] = useState(false);
  const { toast } = useToast();

  const handleStartScan = () => {
    setScanning(true);
  };

  const handleScanComplete = (success: boolean) => {
    setScanning(false);
    if (success) {
      setAuthenticated(true);
      // Simulate updating the last employee scan
      const employees = getEmployees();
      if (employees.length > 0) {
        updateEmployee(employees[0].id, {
          lastScan: new Date().toISOString()
        });
        
        // Add attendance record
        addAttendanceRecord({
          employeeId: employees[0].id,
          timestamp: new Date().toISOString(),
          type: 'check-in',
          status: new Date().getHours() > 9 ? 'late' : 'present'
        });
      }

      toast({
        title: "Face Verification Successful",
        description: "Your attendance has been recorded for today.",
      });
    } else {
      toast({
        title: "Face Verification Failed",
        description: "Please try again or contact your administrator.",
        variant: "destructive",
      });
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          className="max-w-4xl mx-auto space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">Employee Attendance</h1>
            <p className="text-gray-400">Verify your identity using face recognition</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 bg-gray-800 border-gray-700">
              <div className="space-y-6">
                <FaceScanner scanning={scanning} onScanComplete={handleScanComplete} />
                {!scanning && !authenticated && (
                  <Button 
                    className="w-full"
                    onClick={handleStartScan}
                  >
                    <Camera className="mr-2 h-4 w-4" />
                    Start Face Scan
                  </Button>
                )}
                <AttendanceStatus authenticated={authenticated} />
              </div>
            </Card>

            {authenticated && <AttendanceRecord />}
          </div>

          <div className="flex justify-center">
            <Button
              variant="outline"
              onClick={() => setShowEmployees(!showEmployees)}
              className="group"
            >
              <Users className="mr-2 h-4 w-4 group-hover:text-blue-400" />
              {showEmployees ? 'Hide' : 'Show'} Employee Data
            </Button>
          </div>

          {showEmployees && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <EmployeeTable />
            </motion.div>
          )}

          <div className="text-center text-sm text-gray-400">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </motion.div>
      </div>
    </main>
  );
}