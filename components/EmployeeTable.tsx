"use client";

import { useState } from "react";
import { Employee } from "@/lib/types";
import { getEmployees } from "@/lib/data";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { UserCircle, Search, BadgeCheck, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function EmployeeTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const employees = getEmployees();

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-800 border-gray-700"
          />
        </div>
      </div>

      <div className="rounded-lg border border-gray-700 overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-800">
            <TableRow>
              <TableHead className="text-gray-400">Employee</TableHead>
              <TableHead className="text-gray-400">Department</TableHead>
              <TableHead className="text-gray-400">Position</TableHead>
              <TableHead className="text-gray-400">Last Scan</TableHead>
              <TableHead className="text-gray-400">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.map((employee) => (
              <TableRow key={employee.id} className="border-gray-700">
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-3">
                    <UserCircle className="text-gray-400" size={24} />
                    <span>{employee.name}</span>
                  </div>
                </TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Clock size={16} className="text-gray-400" />
                    <span>{new Date(employee.lastScan).toLocaleString()}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <BadgeCheck size={16} className={employee.status === 'active' ? 'text-green-500' : 'text-gray-400'} />
                    <span className={employee.status === 'active' ? 'text-green-500' : 'text-gray-400'}>
                      {employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
}