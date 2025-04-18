import React, { useState } from 'react';
import { Button, TextField, Typography, Box, Container } from '@mui/material';

const MeetingConflictChecker = () => {
  const [intervals, setIntervals] = useState('');
  const [result, setResult] = useState(null);

  const checkConflicts = (intervals) => {
    // Parse the input intervals
    const meetings = intervals.split(';').map(interval => {
      const [start, end] = interval.split(',').map(Number);
      return [start, end];
    });

    // Sort meetings by start time
    meetings.sort((a, b) => a[0] - b[0]);

    // Check for conflicts
    for (let i = 1; i < meetings.length; i++) {
      if (meetings[i][0] < meetings[i - 1][1]) {
        return false;
      }
    }
    return true;
  };

  const handleCheck = () => {
    const isConflictFree = checkConflicts(intervals);
    setResult(isConflictFree);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Meeting Conflict Checker
        </Typography>
        <p>1,5;3,9;6,8</p>
        <TextField
          label="Enter intervals (e.g. 1,5;3,9;6,8)"
          variant="outlined"
          fullWidth
          value={intervals}
          onChange={(e) => setIntervals(e.target.value)}
        />
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={handleCheck}>
            Check for Conflicts
          </Button>
        </Box>
        {result !== null && (
          <Box mt={2}>
            <Typography variant="h6" color={result ? 'green' : 'red'}>
              {result ? 'No conflicts found' : 'Conflicts detected'}
            </Typography>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default MeetingConflictChecker;