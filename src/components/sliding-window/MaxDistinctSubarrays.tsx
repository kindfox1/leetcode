import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const MaxDistinctSubarrays = () => {
  const [input, setInput] = useState('');
  const [k, setK] = useState('');
  const [result, setResult] = useState(null);

  // const maxDistinct = (arr: number[], k: number): number => {
  //   const n = arr.length;
  //   if (n === 0 || k === 0) return 0;
    
  //   let maxLen = 0;
  //   let left = 0;
  //   const freq = new Map<number, number>();
    
  //   for (let right = 0; right < n; right++) {
  //     // Add current element to frequency map
  //     freq.set(arr[right], (freq.get(arr[right]) || 0) + 1);
      
  //     // Shrink window while we have more than k distinct elements
  //     while (freq.size > k) {
  //       freq.set(arr[left], freq.get(arr[left])! - 1);
  //       if (freq.get(arr[left]) === 0) {
  //         freq.delete(arr[left]);
  //       }
  //       left++;
  //     }
      
  //     maxLen = Math.max(maxLen, right - left + 1);
  //   }
    
  //   return maxLen;
  // };
  const maxDistinct = (nums: number[], k: number): number => {
    let maxSum = 0;
    let start = 0;
    const state = new Map<number, number>();
    let currSum = 0;
  
    for (let end = 0; end < nums.length; end++) {
      const num = nums[end];
      currSum += num;
      state.set(num, (state.get(num) || 0) + 1);
  
      if (end - start + 1 === k) {
        if (state.size === k) {
          maxSum = Math.max(maxSum, currSum);
        }
  
        const startNum = nums[start];
        currSum -= startNum;
        const count = state.get(startNum)! - 1;
  
        if (count === 0) {
          state.delete(startNum);
        } else {
          state.set(startNum, count);
        }
  
        start += 1;
      }
  }
  
    return maxSum;
  }


  const maxDistinct2 = (arr: number[], k: number): number => {
    const size = arr.length;
    let start = 0;
    let currSum = 0;
    let map = new Map();
    let maxSum = 0;

    for (let end=0; end < size; end++) {
      if (map.has(arr[end])) {
        if (map.get(arr[end]) > start) {
          start = map.get(arr[end]) + 1;
          currSum = arr[start]; //reset to 0
        } else {
          currSum += arr[end];
        }
        map.set(arr[end], end);
      } else {
        map.set(arr[end], end);
        currSum += arr[end];
      }

      if (end - start + 1 === k) {
        maxSum = Math.max(maxSum, currSum);
        currSum -= arr[start]
        start++;
      }
    }
    return maxSum;
  };

  const handleCalculate = () => {
    const numbers = input.split(',').map(Number);
    const size = parseInt(k);
    if (!isNaN(size) && size > 0) {
      const maxLength = maxDistinct(numbers, size);
      setResult(maxLength);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Maximum Length of Subarray with K Distinct Elements
      </Typography>
      <p>Example: 1,2,1,2,3 with k=2</p>
      <TextField
        label="Enter numbers (comma-separated)"
        variant="outlined"
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Enter K (distinct elements)"
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
        Calculate Maximum Length
      </Button>
      {result !== null && (
        <Typography variant="h6" sx={{ mt: 2 }}>
          Maximum Length: {result}
        </Typography>
      )}
    </div>
  );
};

export default MaxDistinctSubarrays;