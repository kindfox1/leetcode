import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const NonOverlappingIntervals = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<number | null>(null);


  // This one is easier to understand.
  const eraseOverlapIntervals = (intervals: number[][]): number => {
    if (intervals.length <= 1) return 0;
    
    // Sort by end time
    intervals.sort((a, b) => a[1] - b[1]);
    
    let count = 0;
    let prevEnd = intervals[0][1];
    
    for (let i = 1; i < intervals.length; i++) {
      if (intervals[i][0] < prevEnd) { // overlapping
        count++;
      } else { // because the intervals was sorted by end time, the next interval end always greater than the prev one,
        prevEnd = intervals[i][1];
      }
    }
    
    return count;
  };

  const eraseOverlapIntervals2 = (intervals: number[][]): number => {
    //sort the intervals?
    intervals.sort((a, b) => a[1] - b[1]);
    let count = 0; // this is the count of the overlapping interval need to be removed
    let n = intervals.length;
    let end = intervals[0][1];

    for (let i=1; i<n; i++) {
      if (intervals[i][0] >= end) { //no overlap
        end = intervals[i][1];
      } else { //overlap
        count++;
      }
    }
    return count;
  };

  const eraseOverlapIntervals3 = (intervals: number[][]): number => {
    //sort the intervals?
    intervals.sort((a, b) => a[1] - b[1]);
    console.log(intervals);
    let count = 1; //first one is non-overlap??? this is the count of non-overlap
    let n = intervals.length;
    let end = intervals[0][1];

    for (let i=1; i<n; i++) {
      if (intervals[i][0] >= end) { //no overlap
        count++;
        end = intervals[i][1];
      }
    }
    console.log(n-count);
    return n - count;
  };

  const eraseOverlapIntervals4 = (intervals: number[][]): number => {
    intervals.sort((a, b) => a[1] - b[1]);
    let count = 0;
    let n = intervals.length;
    let i = 1;
    console.log(intervals);
    let end = intervals[0][1];

    while (i < n) {
      if (intervals[i][0] >= end) {
        count++;
        end = intervals[i][1];
      }
      i++;
    }

    return n - count;

  };

  const handleCalculate = () => {
    try {
      // const intervals = input.split(';').map(interval => 
      //   interval.split(',').map(Number)
      // );
      // //setResult(eraseOverlapIntervals(intervals));
      // setResult(eraseOverlapIntervals2(intervals));
    } catch (error) {
      console.error('Invalid input format');
    }
    // const intervals = input.split(';').map(interval => 
    //     interval.split(',').map(Number)
    //   );
      const intervals = JSON.parse(input);
      //setResult(eraseOverlapIntervals(intervals));
      setResult(eraseOverlapIntervals4(intervals));
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Non-overlapping Intervals
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        [[1,3],[5,8],[4,10],[11,13]] Output: 1
      </p>
      <p className="text-sm text-gray-600 mb-4">Example: [[4,6],[11,17],[2,18],[7,10]] Output: 1</p>
      <TextField
        label="Enter intervals (format: start,end;start,end)"
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
        Calculate Removals
      </Button>
      {result !== null && (
        <Box mt={2}>
          <Typography variant="h6">
            Minimum intervals to remove: {result}
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default NonOverlappingIntervals;