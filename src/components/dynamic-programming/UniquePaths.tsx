import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const UniquePaths = () => {
  const [m, setM] = useState('');
  const [n, setN] = useState('');
  const [result, setResult] = useState<number | null>(null);

  /*
    Given the dimensions of the board m and n, return the number of unique paths the robot can take 
    to reach the bottom-right corner.

    Time Complexity: O(m * n), where m is the number of rows and n is the number of columns.
    Space Complexity: O(m * n), for the dp array.
  */

  const uniquePaths = (m: number, n: number): number => {
    const dp: number[][] = Array.from({ length: m }, () => Array(n).fill(0));

    // Initialize the first row and first column
    for (let i = 0; i < m; i++) dp[i][0] = 1; 
    for (let j = 0; j < n; j++) dp[0][j] = 1;

    // Fill the dp table
    for (let i = 1; i < m; i++) {
      for (let j = 1; j < n; j++) {
        dp[i][j] = dp[i - 1][j] + dp[i][j - 1]; //sum the up and left cell value
      }
    }

    return dp[m - 1][n - 1];
  };

  const handleCalculate = () => {
    try {
      const rows = parseInt(m, 10);
      const cols = parseInt(n, 10);

      if (isNaN(rows) || isNaN(cols) || rows <= 0 || cols <= 0) {
        throw new Error('Invalid input');
      }

      const paths = uniquePaths(rows, cols);
      setResult(paths);
    } catch (error) {
      console.error('Invalid input');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Unique Paths
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Example: Input m = 3, n = 2 → Output: 3
      </p>
      <TextField
        label="Enter number of rows (m)"
        variant="outlined"
        fullWidth
        value={m}
        onChange={(e) => setM(e.target.value)}
        margin="normal"
        type="number"
      />
      <TextField
        label="Enter number of columns (n)"
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
        Calculate Unique Paths
      </Button>
      {result !== null && (
        <Box mt={2}>
          <Typography variant="h6">
            Number of Unique Paths:
          </Typography>
          <Typography variant="body1">
            {result}
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default UniquePaths;