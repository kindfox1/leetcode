import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const CountingBits = () => {
  const [n, setN] = useState('');
  const [result, setResult] = useState<number[] | null>(null);

  /*
    Given an integer n, return an array dp of size n + 1, where dp[i] stores the count of '1' bits in the binary form of i.

    Time Complexity: O(n), where n is the input number.
    Space Complexity: O(n), for the dp array.
    0 --> 0
    1 --> 1
    2 --> 10
    3 --> 11
    4 --> 100
    5 --> 101
    6 --> 110
  */

  const countBits = (n: number): number[] => {
    const dp = Array(n + 1).fill(0);

    for (let i = 1; i <= n; i++) {
      dp[i] = dp[i >> 1] + (i & 1); // Use bit manipulation to calculate the count of '1' bits

      //i >> 1 === Math.floor(i / 2)
      //i & 1 === i % 2
      // Equivalent code below
      // dp[i] = dp[Math.floor(i / 2)] + (i % 2);
    }

    return dp;
  };

  const countBits2 = (n: number): number[] => {
    const dp = Array(n+1).fill(0);

    for (let i=1; i<=n; i++) {

    }
  };

  const handleGenerate = () => {
    try {
      const num = parseInt(n, 10);

      if (isNaN(num) || num < 0) {
        throw new Error('Invalid input');
      }

      const dp = countBits(num);
      setResult(dp);
    } catch (error) {
      console.error('Invalid input');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Counting Bits
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Example: Input n = 6 → Output [0,1,1,2,1,2,2]
      </p>
      <TextField
        label="Enter a non-negative integer (n)"
        variant="outlined"
        fullWidth
        value={n}
        onChange={(e) => setN(e.target.value)}
        margin="normal"
        type="number"
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleGenerate}
        sx={{ mt: 2 }}
      >
        Generate Count
      </Button>
      {result !== null && (
        <Box mt={2}>
          <Typography variant="h6">
            Result:
          </Typography>
          <Typography variant="body1">
            {JSON.stringify(result)}
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default CountingBits;