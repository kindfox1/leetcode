import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const ValidParentheses = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<boolean | null>(null);

  const isValid = (s: string): boolean => {
    const stack: string[] = [];
    const pairs: { [key: string]: string } = {
      ')': '(',
      '}': '{',
      ']': '['
    };

    for (const char of s) {
      if (!pairs[char]) {
        stack.push(char);
      } else if (stack.pop() !== pairs[char]) {
        return false;
      }
    }

    return stack.length === 0;
  };

  const isValid2 = (s: string): boolean => {
    const stack: string[] = [];
    const pairs: { [key: string]: string } = {
      ')': '(',
      '}': '{',
      ']': '['
    };

    for (let i=0; i<s.length; i++) {
      stack.push(s[i]);
      let stackSize = stack.length;
      if (!pairs[s[i]]) {
        stack.push(s[i]);
      } else if (stack.pop() !== pairs[s[i]]) {
         return false;
      }
    }

    return stack.length === 0;
  };

  const isValid3 = (s: string): boolean => {
    const stack: string[] = [];
    const pairs: { [key: string]: string } = {
      ')': '(',
      '}': '{',
      ']': '['
    };

    for (let i=0; i<s.length; i++) {
      if (pairs[s[i]]) {
        if (stack.pop() !== pairs[s[i]]) {
          return false;
        }
      } else {
        stack.push(s[i]);
      }
    }

    return stack.length === 0;
  };

  const handleCheck = () => {
    setResult(isValid3(input));
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Valid Parentheses
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Example: {'{[()]}'}
      </p>
      <TextField
        label="Enter string"
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
        Check Validity
      </Button>
      {result !== null && (
        <Typography 
          variant="h6" 
          sx={{ mt: 2 }} 
          color={result ? 'success.main' : 'error.main'}
        >
          {result ? 'Valid parentheses!' : 'Invalid parentheses!'}
        </Typography>
      )}
    </div>
  );
};

export default ValidParentheses;