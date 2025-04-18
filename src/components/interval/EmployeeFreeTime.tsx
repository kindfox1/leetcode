import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const EmployeeFreeTime = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<number[][]>([]);

  const findEmployeeFreeTime = (schedule: number[][][]): number[][] => {
    console.log('schedule', schedule);
    // Flatten and sort all intervals
    const intervals: number[][] = [];
    for (const employee of schedule) {
      intervals.push(...employee);
    }
    intervals.sort((a, b) => a[0] - b[0]);
    
    const result: number[][] = [];
    let prevEnd = intervals[0][1];
    
    for (let i = 1; i < intervals.length; i++) {
      if (intervals[i][0] > prevEnd) {
        result.push([prevEnd, intervals[i][0]]);
      }
      prevEnd = Math.max(prevEnd, intervals[i][1]);
    }
    
    return result;
  };

  const findEmployeeFreeTime2 = (schedule: number[][][]): number[][] => {
    const intervals: number[][] = [];
    const result: number[][] = [];

    for (let i = 0; i<schedule.length; i++ ) {
      intervals.push(...schedule[i]);
    }

    intervals.sort((a, b) => a[0] - b[0]);
     console.log(intervals);
    let prevEnd = intervals[0][1];
      
    for (let i=1; i<intervals.length; i++) {
      console.log('prevEnd', prevEnd);
      console.log('intervals[i][0]', intervals[i][0]);
      if (prevEnd < intervals[i][0]) {
        console.log('here');
        result.push([prevEnd, intervals[i][0]]);
      }
      prevEnd = Math.max(prevEnd, intervals[i][1]);
    } 
console.log('result', result);
    return result;
  };

  const handleCalculate = () => {
    try {
      // Parse input format: [[1,2],[5,6]];[[1,3],[4,10]]
      // const schedule = input.split(';').map(employee => 
      //   employee.slice(1, -1).split('],[').map(interval => 
      //     interval.split(',').map(Number)
      //   )
      // );
      console.log(JSON.parse(input));
      //const schedule = [[[2,4],[7,10]],[[1,5]],[[6,9]]];
      const schedule = JSON.parse(input);
      //setResult(findEmployeeFreeTime(schedule));
      setResult(findEmployeeFreeTime2(schedule));
    } catch (error) {
      console.error('Invalid input format');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Employee Free Time
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Example: [[[2,4],[7,10]],[[1,5]],[[6,9]]] = [5, 6]
      </p>
      <TextField
        label="Enter schedule (format: [[s,e],[s,e]];[[s,e],[s,e]])"
        variant="outlined"
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
        margin="normal"
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleCalculate}
        sx={{ mt: 2 }}
      >
        Find Free Time
      </Button>
      {result.length > 0 && (
        <Box mt={2}>
          <Typography variant="h6">
            Free Time Intervals:
          </Typography>
          {result.map((interval, index) => (
            <Typography key={index}>
              [{interval.join(', ')}]
            </Typography>
          ))}
        </Box>
      )}
    </div>
  );
};

export default EmployeeFreeTime;