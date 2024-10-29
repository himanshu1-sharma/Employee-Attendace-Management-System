export interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  faceData: string;
  lastScan: string;
  status: 'active' | 'inactive';
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  timestamp: string;
  type: 'check-in' | 'check-out';
  status: 'present' | 'late' | 'early';
}