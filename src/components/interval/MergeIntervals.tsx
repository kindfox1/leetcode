import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const MergeIntervals = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<number[][]>([]);

  const merge = (intervals: number[][]): number[][] => {
    if (intervals.length <= 1) return intervals;
    
    // Sort by start time
    intervals.sort((a, b) => a[0] - b[0]);
    
    const result: number[][] = [intervals[0]];
    
    for (let i = 1; i < intervals.length; i++) {
      const currentInterval = intervals[i];
      const lastMergedInterval = result[result.length - 1];
      
      if (currentInterval[0] <= lastMergedInterval[1]) {
        lastMergedInterval[1] = Math.max(lastMergedInterval[1], currentInterval[1]);
      } else {
        result.push(currentInterval);
      }
    }
    
    return result;
  };

  const merge2 = (intervals: number[][]): number[][] => {
    const result: number[][] = [];

    intervals.sort((a,b) => a[0] - b[0]);
    result.push(intervals[0]);
    
    for (let i=1; i<intervals.length; i++) {
      let currentInterval = intervals[i];
      let lastMerged = result[result.length - 1];

      if (lastMerged[1] >= currentInterval[0]) { //overlap
        lastMerged[1] = Math.max(currentInterval[1], lastMerged[1]);
      } else {  
        result.push(currentInterval);
      }
    }
    
    return result;
  };

  const handleMerge = () => {
    try {
      // const intervals = input.split(';').map(interval => 
      //   interval.split(',').map(Number)
      // );
      const intervals = JSON.parse(input);
      setResult(merge2(intervals));
    } catch (error) {
      console.error('Invalid input format');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Merge Intervals
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        [[1,3],[2,6],[8,10],[15,18]] = [1, 6],[8, 10],[15, 18]
      </p>
      <p className="text-sm text-gray-600 mb-4">[[4,6],[11,17],[2,18],[7,10]] = [2,18]</p>
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
        onClick={handleMerge}
        sx={{ mt: 2 }}
      >
        Merge Intervals
      </Button>
      {result.length > 0 && (
        <Box mt={2}>
          <Typography variant="h6">
            Merged Intervals:
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

export default MergeIntervals;