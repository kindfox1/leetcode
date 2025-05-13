import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const ClimbingStairs = () => {
  const [n, setN] = useState('');
  const [result, setResult] = useState<number | null>(null);

  /*
    Given n steps in a staircase, return the number of distinct ways to climb to the top step.
    You can take either 1 or 2 steps at a time.

    Time Complexity: O(n), where n is the number of steps.
    Space Complexity: O(1), as we use constant space for the calculations.
  */

  const climbStairs = (n: number): number => {
    if (n <= 1) return 1;

    let prev1 = 1; // Ways to climb 1 step
    let prev2 = 1; // Ways to climb 0 steps

    for (let i = 2; i <= n; i++) {
      const current = prev1 + prev2; // Ways to climb i steps
      prev2 = prev1;
      prev1 = current;
    }

    return prev1;
  };

  // use memory, space complexity O(n) which is less effecient than the first one.
  const climbStairsMem = (n: number): number => {
    const mem = new Map<number, number>();
    const dp = (i: number): number => {
      if (i <= 1) return 1;
      if (mem.has(i)) {
        return mem.get(i)!;
      }

      mem.set(i, dp(i-1) + dp(i-2));
      return mem.get(i)!;
    }
    return dp(n);
  };

  const handleCalculate = () => {
    //try {
      const steps = parseInt(n, 10);

      if (isNaN(steps) || steps < 0) {
        throw new Error('Invalid input');
      }

      const ways = climbStairsMem(steps);
      setResult(ways);
    // } catch (error) {
    //   console.error('Invalid input');
    // }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Climbing Stairs
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Example: Input n = 3 → Output: 3
      </p>
      <TextField
        label="Enter number of steps (n)"
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
        onClick={handleCalculate}
        sx={{ mt: 2 }}
      >
        Calculate Ways
      </Button>
      {result !== null && (
        <Box mt={2}>
          <Typography variant="h6">
            Number of Ways:
          </Typography>
          <Typography variant="body1">
            {result}
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default ClimbingStairs;