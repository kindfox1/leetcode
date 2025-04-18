import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  List, 
  ListItem, 
  Paper
} from '@mui/material';

const MeetingConflictChecker2 = () => {
  const [meetings, setMeetings] = useState([]);
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [result, setResult] = useState(null);

  const addMeeting = () => {
    if (start && end) {
      setMeetings([...meetings, [parseInt(start), parseInt(end)]]);
      setStart('');
      setEnd('');
    }
  };

  const checkConflicts = () => {
    const sortedMeetings = [...meetings].sort((a, b) => a[0] - b[0]);
    
    for (let i = 1; i < sortedMeetings.length; i++) {
      if (sortedMeetings[i][0] < sortedMeetings[i-1][1]) {
        setResult(false);
        return;
      }
    }
    
    setResult(true);
  };

  const clearMeetings = () => {
    setMeetings([]);
    setResult(null);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
    <Box sx={{ maxWidth: 400, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Meeting Conflict Checker
      </Typography>
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <TextField
          label="Start Time"
          type="number"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="End Time"
          type="number"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" onClick={addMeeting} fullWidth sx={{ mt: 2 }}>
          Add Meeting
        </Button>
      </Paper>
      
      <Typography variant="h6" gutterBottom>
        Meetings:
      </Typography>
      <List>
        {meetings.map((meeting, index) => (
          <ListItem key={index}>
            [{meeting[0]}, {meeting[1]}]
          </ListItem>
        ))}
      </List>
      
      <Button 
        variant="contained" 
        onClick={checkConflicts} 
        fullWidth 
        sx={{ mt: 2 }}
        disabled={meetings.length < 2}
      >
        Check Conflicts
      </Button>
      
      <Button 
        variant="outlined" 
        onClick={clearMeetings} 
        fullWidth 
        sx={{ mt: 2 }}
      >
        Clear Meetings
      </Button>
      
      {result !== null && (
        <Typography variant="h6" sx={{ mt: 2 }}>
          Result: {result ? 'No conflicts' : 'Conflicts found'}
        </Typography>
      )}
    </Box>
      </div>
  );
};

export default MeetingConflictChecker2;