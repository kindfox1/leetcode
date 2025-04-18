import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const LongestSubstring = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = () => {
    const length = lengthOfLongestSubstring(input);
    setResult(length);
  };

  return (
    <Container maxWidth="sm" className="bg-white rounded-lg shadow p-6">
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h6" gutterBottom>
          Longest Substring Without Repeating Characters
        </Typography>
        <p>example: eghghhgg</p>
        <TextField
          label="Input String"
          variant="outlined"
          value={input}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Calculate
        </Button>
        {result !== null && (
          <Typography variant="h6" color="textSecondary" mt={2}>
            Length of the longest substring: {result}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

const lengthOfLongestSubstring = (s) => {
  let maxLength = 0;
  let start = 0;
  const seenChars = new Map();

  for (let end = 0; end < s.length; end++) {
    const currentChar = s[end];
    if (seenChars.has(currentChar) && seenChars.get(currentChar) >= start) {
      start = seenChars.get(currentChar) + 1;
    }
    seenChars.set(currentChar, end);
    maxLength = Math.max(maxLength, end - start + 1);
  }

  return maxLength;
};


const lengthOfLongestSubstring2 = (s) => {
  console.log('in lengthOfLongestSubstring2');
  let left = 0;
  let right = 1;
  let maxLength = 0;
  let charMap = new Map();

  if (s === null) {
    return 0;
  }

  if (s.length === 1) {
    return 1;
  }

  while (right < s.length) {
    console.log(s.charAt(0));
    charMap.set(s.charAt(left), left);
    //charMap.set(s.chartAt(right), right);

    
    //if (s.charAt(left) !== s.charAt(right)) {
    if (charMap.has(s.charAt(right))) {
      left = charMap.get(s.charAt(right))+1;
      charMap.set(s.charAt(right), right);
    }
    charMap.set(s.charAt(right), right);
    maxLength = Math.max(maxLength, right - left + 1);
    
    
    right++;
    console.log(charMap);
  }

  return maxLength;
};

export default LongestSubstring;