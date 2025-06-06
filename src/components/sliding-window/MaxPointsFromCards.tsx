import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const MaxPointsFromCards = () => {
  const [input, setInput] = useState('');
  const [k, setK] = useState('');
  const [result, setResult] = useState(null);

  const maxScore = (cardPoints: number[], k: number): number => {
    const n = cardPoints.length;
    let totalSum = 0;
    for (let i = 0; i < k; i++) {
      totalSum += cardPoints[i];
    }
    
    let maxSum = totalSum;
    let right = n - 1;
    let currentSum = totalSum;
    
    for (let left = k - 1; left >= 0; left--) {
      currentSum = currentSum - cardPoints[left] + cardPoints[right];
      maxSum = Math.max(maxSum, currentSum);
      right--;
    }
    
    return maxSum;
  };


  const maxScore2 = (cardPoints: number[], k: number): number => {
    const size = cardPoints.length;
    if (size < k) {
      return 0;
    }
    let right = size - k;
    let rightSum = 0;
    let leftSum = 0;
    let maxSum = 0;
    let temp = 0

    // compute the sum on all right
    for (let i=right; i<size; i++) {
      rightSum += cardPoints[i];
    }

    maxSum = Math.max(maxSum, rightSum);

    // left end
    for (let left = 0; left < k; left++) {
      leftSum += cardPoints[left];
      rightSum -= cardPoints[right];
      temp = leftSum + rightSum;
      maxSum = Math.max(maxSum, temp);
      right++;
    }
    
    return maxSum;
  };

  const maxScore3 = (cardPoints: number[], k: number): number => {
    const n = cardPoints.length;
    let winSum = 0;
    let maxSum = 0;

    // imagine a window size of n - k, moving from most left to right, 
    // calculate the cards outside of that windows and keep track for the maxSum

    for (let i=n-k; i<n; i++) {
      winSum += cardPoints[i];
    }

    // now move that window to right step by step
    let start = 0;
    let end = n-k-1;
    maxSum = winSum;

    while (end+1 < n) {
      winSum = winSum - cardPoints[end+1] + cardPoints[start];
      maxSum = Math.max(maxSum, winSum)
      start++;
      end++;
    }
    return maxSum;
  };

  const handleCalculate = () => {
    const numbers = input.split(',').map(Number);
    const size = parseInt(k);
    if (!isNaN(size) && size > 0) {
      const maxPoints = maxScore3(numbers, size);
      setResult(maxPoints);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Maximum Points from Cards
      </Typography>
      <p>1,2,3,4,5,6,1 with k=3, output: 12</p>
      <p>2,11,4,5,3,9,2 with k=3, output: 17</p>
      <TextField
        label="Enter card points (comma-separated)"
        variant="outlined"
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Enter K (number of cards to pick)"
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
        Calculate Maximum Points
      </Button>
      {result !== null && (
        <Typography variant="h6" sx={{ mt: 2 }}>
          Maximum Points: {result}
        </Typography>
      )}
    </div>
  );
};

export default MaxPointsFromCards;