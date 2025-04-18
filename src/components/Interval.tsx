import React from 'react';
import { Typography } from '@mui/material';
import CanAttendMeeting from './interval/CanAttendMeeting';
import InsertInterval from './interval/InsertInterval';
import NonOverlappingIntervals from './interval/NonOverlappingIntervals';
import MergeIntervals from './interval/MergeIntervals';
import EmployeeFreeTime from './interval/EmployeeFreeTime';

const Interval = () => {
  return (
    <main className="flex-1 overflow-y-auto bg-gray-100">
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <Typography variant="h2" component="h1" gutterBottom>
          Interval Problems
        </Typography>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CanAttendMeeting />
          <InsertInterval />
          <NonOverlappingIntervals />
          <MergeIntervals />
          <EmployeeFreeTime />
        </div>
      </div>
    </main>
  );
};

export default Interval;