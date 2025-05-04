import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const InsertInterval = () => {
  const [intervals, setIntervals] = useState('');
  const [newInterval, setNewInterval] = useState('');
  const [result, setResult] = useState<number[][]>([]);

  const insert = (intervals: number[][], newInterval: number[]): number[][] => {
    const result: number[][] = [];
    let i = 0;
    const n = intervals.length;
    
    // Add all intervals that end before newInterval starts
    while (i < n && intervals[i][1] < newInterval[0]) {
      result.push(intervals[i]);
      i++;
    }
    
    // Merge overlapping intervals
    while (i < n && intervals[i][0] <= newInterval[1]) {
      newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
      newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
      i++;
    }
    result.push(newInterval);
    
    // Add remaining intervals
    while (i < n) {
      result.push(intervals[i]);
      i++;
    }
    
    return result;
  };

  const insert3 = (intervals: number[][], newInterval: number[]): number[][] => {
    const result: number[][] = [];
    let i = 0;
    const n = intervals.length;

    while (i < n && intervals[i][1] < newInterval[0]) {
      result.push(intervals[i]);
      i++
    }

    while (i < n && intervals[i][0] <= newInterval[1]) {
      newInterval[0] = Math.min(intervals[i][0], newInterval[0]);
      newInterval[1] = Math.max(intervals[i][1], newInterval[1]);
      i++;
    }

    result.push(newInterval);

    for (j=i; j < n; j++) {
      console.log(intervals[j]);
      result.push(intervals[j]);
    }
    // while (i < n) {
    //   result.push(intervals[i]);
    //   i++;
    // }
    
    
    return result;
  };

  const insert2 = (intervals: number[][], newInterval: number[]): number[][] => {
    intervals.sort((a, b) => a[0] - b[0]);
    let inserted = false;

    // merge new interval to the list
    for (let i=0; i<intervals.length; i++) {
      if (intervals[i][0] > newInterval[0]) { //merge
        intervals.splice(i, 0, newInterval);
        inserted = true;
        break;
      }
    }

    if (!inserted) {
      intervals.push(newInterval);
    }

    for(let i=1; i<intervals.length; i++) {
      if (intervals[i-1][1] > intervals[i][0]) { //merge
        if (intervals[i-1][1] <= intervals[i][1]) { //prev absort the next
          //the next interval end becomes the ned of the new interval,
          //otherwise prev absort the next
          intervals[i-1][1] = intervals[i][1];
        }
        intervals.splice(i, 1);
        break;
      }
    }
    
    return intervals;
  };

  const insert4 = (intervals: number[][], newInterval: number[]): number[][] => {
    let result: number[][] = [];
    const n: number = intervals.length;
    let i=0;

    while (i < n && intervals[i][1] < newInterval[0]) {
      result.push(intervals[i]);
      i++;
    }

    while (i<n && intervals[i][0] <= newInterval[1] ) {
      newInterval[0] = Math.min(intervals[i][0], newInterval[0]);
      newInterval[1] = Math.max(intervals[i][1], newInterval[1]);
      i++;
    }
    result.push(newInterval);
    while (i<n) {
      result.push(intervals[i]);
      i++;
    }
  
    return result;
  };

  

  const handleInsert = () => {
    try {
      // const intervalList = intervals.split(';').map(interval => 
      //   interval.split(',').map(Number)
      // );
      // const newIntervalArr = newInterval.split(',').map(Number);

      const intervalList = JSON.parse(intervals);
      const newIntervalArr = JSON.parse(newInterval);
      setResult(insert4(intervalList, newIntervalArr));
    } catch (error) {
      console.error('Invalid input format');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Insert Interval
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Example Intervals: [[1,3],[6,9]]
        New Interval: [2,5]
        Result: [[1,5],[6,9]]
      </p>
      <p className="text-sm text-gray-600 mb-4">
        Example Intervals: [[1,3],[4,6],[6,7],[8,10],[11,15]]
        New Interval: [5,8]
        Result: [[1,5],[6,9]]
      </p>
      <TextField
        label="Enter intervals (format: start,end;start,end)"
        variant="outlined"
        fullWidth
        value={intervals}
        onChange={(e) => setIntervals(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Enter new interval (format: start,end)"
        variant="outlined"
        fullWidth
        value={newInterval}
        onChange={(e) => setNewInterval(e.target.value)}
        margin="normal"
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleInsert}
        sx={{ mt: 2 }}
      >
        Insert Interval
      </Button>
      {result.length > 0 && (
        <Box mt={2}>
          <Typography variant="h6">
            Result:
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

export default InsertInterval;