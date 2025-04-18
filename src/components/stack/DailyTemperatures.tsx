import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const DailyTemperatures = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<number[] | null>(null);

  /**
   Given an integer array temps representing daily temperatures, write a function to calculate the number of days one has to wait for a warmer 
   temperature after each given day. The function should return an array answer where answer[i] represents the wait time for a warmer day after the ith day. 
   If no warmer day is expected in the future, set answer[i] to 0.
    [73,74,75,71,69,72,76,73] = [1, 1, 4, 2, 1, 1, 0, 0]
    [65, 70, 68, 60, 55, 75, 80, 74] = [1,4,3,2,1,1,0,0]
    Time: O(n), Space: O(n)
   */
  const findWarmerTemperatures = (temperatures: number[]): number[] => {
    const n = temperatures.length;
    const result = new Array(n).fill(0);
    const stack: number[] = [];

    for (let i = n - 1; i >= 0; i--) {
      while (
        stack.length > 0 && 
        temperatures[i] >= temperatures[stack[stack.length - 1]]
      ) {
        stack.pop();
      }
      if (stack.length > 0) {
        result[i] = stack[stack.length - 1] - i;
      }
      stack.push(i);
    }

    return result;
  };

  const findWarmerTemperatures2 = (temp: number[]): number[] => {
    const n = temp.length;
    const result = new Array(n).fill(0);
    const stack: number[] = [];

    for (let i=0; i<temp.length; i++) {
      while (stack.length > 0 && temp[i] > temp[stack[stack.length-1]]) {
        
        const index = stack.pop();
        if (index !== undefined) {
          const value = i - index;
          result[index] = value;
        }
      }
      stack.push(i);
    }
    
    return result;
  };

  const handleCalculate = () => {
    const temperatures = input.split(',').map(Number);
    setResult(findWarmerTemperatures(temperatures));
    findWarmerTemperatures2(temperatures)
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Daily Temperatures
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Example: 73,74,75,71,69,72,76,73 = [1, 1, 4, 2, 1, 1, 0, 0]</p>
      
      <p className="text-sm text-gray-600 mb-4">[65, 70, 68, 60, 55, 75, 80, 74] = [1,4,3,2,1,1,0,0]</p>
      <TextField
        label="Enter temperatures"
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
        Calculate
      </Button>
      {result !== null && (
        <Box mt={2}>
          <Typography variant="subtitle1" color="primary">
            Days until warmer temperature:
          </Typography>
          <Typography variant="body1">
            [{result.join(', ')}]
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default DailyTemperatures;