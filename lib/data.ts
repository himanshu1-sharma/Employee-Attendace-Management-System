import { Employee, AttendanceRecord } from './types';

// Simulated database
let employees: Employee[] = [
  {
    id: 'emp001',
    name: 'John Doe',
    position: 'Software Engineer',
    department: 'Engineering',
    faceData: 'base64_encoded_face_data_1',
    lastScan: '2024-03-21T09:00:00',
    status: 'active'
  },
  {
    id: 'emp002',
    name: 'Jane Smith',
    position: 'Product Manager',
    department: 'Product',
    faceData: 'base64_encoded_face_data_2',
    lastScan: '2024-03-21T08:45:00',
    status: 'active'
  }
];

let attendanceRecords: AttendanceRecord[] = [];

export const addEmployee = (employee: Omit<Employee, 'id'>) => {
  const id = `emp${(employees.length + 1).toString().padStart(3, '0')}`;
  const newEmployee = { ...employee, id };
  employees = [...employees, newEmployee];
  return newEmployee;
};

export const getEmployees = () => employees;

export const updateEmployee = (id: string, data: Partial<Employee>) => {
  employees = employees.map(emp => 
    emp.id === id ? { ...emp, ...data } : emp
  );
  return employees.find(emp => emp.id === id);
};

export const addAttendanceRecord = (record: Omit<AttendanceRecord, 'id'>) => {
  const id = `att${(attendanceRecords.length + 1).toString().padStart(3, '0')}`;
  const newRecord = { ...record, id };
  attendanceRecords = [...attendanceRecords, newRecord];
  return newRecord;
};

export const getAttendanceRecords = (employeeId?: string) => {
  return employeeId 
    ? attendanceRecords.filter(record => record.employeeId === employeeId)
    : attendanceRecords;
};