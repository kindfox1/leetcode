import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';



const DecodeString = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const isNumber = (s: string): boolean => {
    const n = Number(s);
    return s.trim() !== '' && Number.isFinite(n);
  };

  const decodeString = (s: string): string => {
    const stack: (string | number)[] = [];
    let currentString = '';
    let currentNumber = 0;

    for (let char of s) {
      if (char >= '0' && char <= '9') {
        currentNumber = currentNumber * 10 + parseInt(char);
      } else if (char === '[') {
        stack.push(currentNumber);
        stack.push(currentString);
        currentNumber = 0;
        currentString = '';
        console.log(stack);
      } else if (char === ']') {
        const prevString = stack.pop() as string;
        const num = stack.pop() as number;
        currentString = prevString + currentString.repeat(num);
      } else {
        currentString += char;
      }
    }

    return currentString;
  };

  // 3[a]2[bc]
  const decodeString2 = (s: string): string => {
    const stack: (string | number)[] = [];
    let currentString: string = '';
    let currentNumber: number = 0;

    for (let i=0; i<s.length; i++) {
      let char = s[0];
      if (char >= "0" && char <= "9") {
        currentNumber = currentNumber * 10 + Number(char);
      } else if (char === '[') {
        stack.push(currentNumber);
        stack.push(currentString);
        currentNumber = 0;
        currentString = '';
      } else if (char === ']') {
        const prevString = stack.pop() as string;
        const prevNumber = stack.pop() as number;
        currentString = prevString + currentString.repeat(prevNumber);
      } else { // character
        currentString = currentString + char;
      }
    }
    

    return currentString;
  };

  const handleDecode = () => {
    setResult(decodeString(input));
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Decode String
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        3[a]2[bc] = aaabcbc
      </p>
      <p className="text-sm text-gray-600 mb-4">3[a2[c]] = accaccacc</p>
      <TextField
        label="Enter encoded string"
        variant="outlined"
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
        margin="normal"
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleDecode}
        sx={{ mt: 2 }}
      >
        Decode
      </Button>
      {result !== null && (
        <Box mt={2}>
          <Typography variant="subtitle1" color="primary">
            Decoded Result:
          </Typography>
          <Typography variant="h6">
            {result}
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default DecodeString;