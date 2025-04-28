import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const MaximalSquare = () => {
  const [matrix, setMatrix] = useState('');
  const [result, setResult] = useState<number | null>(null);

  /*
    Given an m x n 2D matrix with only 0's and 1's, return the area of the largest square containing only 1's.

    Time Complexity: O(m * n), where m is the number of rows and n is the number of columns.
    Space Complexity: O(m * n), for the dp array.
  */

  const maximalSquare = (matrix: number[][]): number => {
    if (matrix.length === 0 || matrix[0].length === 0) return 0;

    const rows = matrix.length;
    const cols = matrix[0].length;
    const dp: number[][] = Array.from({ length: rows }, () => Array(cols).fill(0));
    let maxSide = 0;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (matrix[i][j] === 1) {
          if (i === 0 || j === 0) {
            dp[i][j] = 1; // First row or column
          } else {
            dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
          }
          maxSide = Math.max(maxSide, dp[i][j]);
        }
      }
    }

    return maxSide * maxSide; // Area of the largest square
  };

  const handleCalculate = () => {
    try {
      const parsedMatrix = JSON.parse(matrix);

      if (
        !Array.isArray(parsedMatrix) ||
        parsedMatrix.some(row => !Array.isArray(row) || row.some(cell => cell !== 0 && cell !== 1))
      ) {
        throw new Error('Invalid input');
      }

      const area = maximalSquare(parsedMatrix);
      setResult(area);
    } catch (error) {
      console.error('Invalid input');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Maximal Square
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Example: Input matrix = [[0,0,1,0,0],[1,1,1,0,1],[0,1,1,0,0]] → Output: 4
      </p>
      <TextField
        label="Enter matrix (as JSON array)"
        variant="outlined"
        fullWidth
        value={matrix}
        onChange={(e) => setMatrix(e.target.value)}
        margin="normal"
        type="text"
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleCalculate}
        sx={{ mt: 2 }}
      >
        Calculate Maximal Square
      </Button>
      {result !== null && (
        <Box mt={2}>
          <Typography variant="h6">
            Largest Square Area:
          </Typography>
          <Typography variant="body1">
            {result}
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default MaximalSquare;