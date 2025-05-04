import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const CanAttendMeeting = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<boolean | null>(null);

  const canAttendMeetings = (intervals: number[][]): boolean => {
    // Sort meetings by start time
    intervals.sort((a, b) => a[0] - b[0]);
    
    // Check for any overlap
    for (let i = 1; i < intervals.length; i++) {
      if (intervals[i][0] < intervals[i-1][1]) {
        return false;
      }
    }
    
    return true;
  };

  const canAttendMeetings2 = (intervals: number[][]): boolean => {
    //sort intervals
    intervals.sort((a,b) => a[0] - b[0]);
    console.log(intervals);

    for (let i=1; i<intervals.length; i++) {
      if (intervals[i][0] < intervals[i-1][1]) {
        console.log('returning false');
        return false;
      }
    }
    console.log('returning true');
    return true;
  };

  const canAttendMeetings3 = (intervals: number[][]): boolean => {
    //sort intervals
    intervals.sort((a,b) => a[0] - b[0]);
    
    for (let i=1; i< intervals.length; i++) {
      if (intervals[i][0] < intervals[i-1][1]) {
        return false;
      }
    }

    return true;
  };

  const handleCheck = () => {
    try {
      // const intervals = input.split(';').map(interval => 
      //   interval.split(',').map(Number)
      // );
      const intervals = JSON.parse(input);
      setResult(canAttendMeetings(intervals));
      canAttendMeetings2(intervals)
    } catch (error) {
      console.error('Invalid input format');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Can Attend All Meetings
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Example: [[0,30],[5,10],[15,20]] = false; [[10,12],[6,9],[13,15]] = true
        
      </p>
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
        onClick={handleCheck}
        sx={{ mt: 2 }}
      >
        Check Meetings
      </Button>
      {result !== null && (
        <Box mt={2}>
          <Typography 
            variant="h6" 
            color={result ? 'success.main' : 'error.main'}
          >
            {result ? 'Can attend all meetings!' : 'Cannot attend all meetings'}
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default CanAttendMeeting;