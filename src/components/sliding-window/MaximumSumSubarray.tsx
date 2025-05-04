import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const MaximumSumSubarray = () => {
  const [input, setInput] = useState('');
  const [k, setK] = useState('');
  const [result, setResult] = useState(null);

  // 2,1,5,1,3,2 with k=3 ouput: 9
  const findMaxSum = (arr: number[], k: number) => {
    if (arr.length < k) return 0;
    
    let maxSum = 0;
    let windowSum = 0;
    
    // Calculate sum of first window
    for (let i = 0; i < k; i++) {
      windowSum += arr[i];
    }
    
    maxSum = windowSum;
    
    // Slide window and update maxSum
    for (let i = k; i < arr.length; i++) {
      windowSum = windowSum - arr[i - k] + arr[i];
      maxSum = Math.max(maxSum, windowSum);
    }
    
    return maxSum;
  };

  const findMaxSum2 = (arr: number[], k: number) => {
    if (arr.length == 0) {
      return 0;
    }

    let start = 0;
    let maxSum = 0;
    let currentSum = 0;

    for (let end = 0; end < arr.length; end++) {

      if (k >= end - start + 1) {
        console.log('arr[end]', arr[end]);
        //maxSum = Math.max(maxSum, maxSum + arr[end]);
        console.log('maxSum', maxSum);
        maxSum += arr[end];
        currentSum += arr[end];
        
        console.log(end, maxSum, currentSum);
      } else {
        currentSum = currentSum - arr[start] + arr[end];
        maxSum = Math.max(maxSum, currentSum);
        start++;
      }
      
    } 
    
    return maxSum;
  };

  const findMaxSum3 = (arr: number[], k: number) => {

    let maxSum = 0;
    let start = 0;
    let windowSum = 0;
    for (let x=0; x<k; x++) {
        windowSum += arr[x];
    }

    maxSum = windowSum

    for (let i=k; i<arr.length; i++) {
      windowSum = windowSum + arr[i] - arr[start]; //shift window to right and get the windowSum
      maxSum = Math.max(maxSum, windowSum);
      start++;
    }
    return maxSum;
  };

  const handleCalculate = () => {
    const numbers = input.split(',').map(Number);
    const size = parseInt(k);
    if (!isNaN(size) && size > 0) {
      const maxSum = findMaxSum3(numbers, size);
      setResult(maxSum);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Maximum Sum of Subarray of Size K
      </Typography>
      <p>2,1,5,1,3,2 with k=3 ouput: 9</p>
      <TextField
        label="Enter numbers (comma-separated)"
        variant="outlined"
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Enter K (subarray size)"
        variant="outlined"
        fullWidth
        value={k}
        onChange={(e) => setK(e.target.value)}
        margin="normal"
        type="number"
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleCalculate}
        sx={{ mt: 2 }}
      >
        Calculate Maximum Sum
      </Button>
      {result !== null && (
        <Typography variant="h6" sx={{ mt: 2 }}>
          Maximum Sum: {result}
        </Typography>
      )}
    </div>
  );
};

export default MaximumSumSubarray;