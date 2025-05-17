import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const RobHousesCircular = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const rob = (nums: number[]): number => {
    if (nums.length === 1) return nums[0];

    // Helper function to calculate the maximum amount for a linear arrangement
    const robLinear = (houses: number[]): number => {
      let prev1 = 0; // Max amount robbed up to the previous house
      let prev2 = 0; // Max amount robbed up to the house before the previous house

      for (const amount of houses) {
        const temp = Math.max(prev1, prev2 + amount);
        prev2 = prev1;
        prev1 = temp;
      }

      return prev1;
    };

    // Since the houses are in a circle, we have two cases:
    // 1. Rob houses from index 0 to n-2 (exclude the last house)
    // 2. Rob houses from index 1 to n-1 (exclude the first house)
    return Math.max(robLinear(nums.slice(0, nums.length - 1)), robLinear(nums.slice(1)));
  };

  const handleRob = () => {
    try {
      const nums = JSON.parse(input);

      if (!Array.isArray(nums) || nums.some((num) => typeof num !== 'number')) {
        throw new Error('Invalid input');
      }

      const maxAmount = rob(nums);
      setResult(maxAmount);
    } catch (error) {
      console.error('Invalid input');
      setResult(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Rob Houses in a Circle
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Example: Input: [2,3,2] → Output: 3
      </p>
      <TextField
        label="Enter house values (as JSON array)"
        variant="outlined"
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleRob}
        sx={{ mt: 2 }}
      >
        Calculate Maximum Robbery
      </Button>
      {result !== null && (
        <Box mt={2}>
          <Typography variant="h6">Maximum Amount:</Typography>
          <Typography variant="body1">{result}</Typography>
        </Box>
      )}
    </div>
  );
};

export default RobHousesCircular;