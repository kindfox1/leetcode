import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const LongestIncreasingSubsequence = () => {
  const [nums, setNums] = useState('');
  const [result, setResult] = useState<number | null>(null);

  /*
    Given an integer array nums, return the length of the longest increasing subsequence.

    Time Complexity: O(n^2), where n is the length of the array.
    Space Complexity: O(n), for the dp array.
  */

  const lengthOfLIS = (nums: number[]): number => {
    if (nums.length === 0) return 0;

    const dp = Array(nums.length).fill(1); // dp[i] represents the length of the LIS ending at index i

    for (let i = 1; i < nums.length; i++) {
      for (let j = 0; j < i; j++) {
        if (nums[i] > nums[j]) {
          dp[i] = Math.max(dp[i], dp[j] + 1);
        }
      }
    }

    return Math.max(...dp); // The longest increasing subsequence
  };

  const lengthOfLIS2 = (nums: number[]): number => {
    if (nums.length === 0) return 0;

    const dp = Array(nums.length).fill(1);

    for (let i=1; i<nums.length; i++) {
        for (let j=0; j<i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j]+1);
            }
        }
    }

    return Math.max(...dp);
  };

  const handleCalculate = () => {
    try {
      const numsArray = JSON.parse(nums);

      if (!Array.isArray(numsArray) || numsArray.some(isNaN)) {
        throw new Error('Invalid input');
      }

      const lisLength = lengthOfLIS(numsArray);
      setResult(lisLength);
    } catch (error) {
      console.error('Invalid input');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Longest Increasing Subsequence
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Example: Input nums = [8,2,4,3,6,12] → Output: 4
      </p>
      <TextField
        label="Enter array of numbers (comma-separated)"
        variant="outlined"
        fullWidth
        value={nums}
        onChange={(e) => setNums(e.target.value)}
        margin="normal"
        type="text"
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleCalculate}
        sx={{ mt: 2 }}
      >
        Calculate LIS Length
      </Button>
      {result !== null && (
        <Box mt={2}>
          <Typography variant="h6">
            Length of Longest Increasing Subsequence:
          </Typography>
          <Typography variant="body1">
            {result}
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default LongestIncreasingSubsequence;