import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const Matrix01 = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<number[][]>([]);

  const updateMatrix = (mat: number[][]): number[][] => {
    const rows = mat.length;
    const cols = mat[0].length;
    const queue: [number, number][] = [];
    const result = Array.from({ length: rows }, () => 
      Array(cols).fill(Number.MAX_SAFE_INTEGER)
    );
    
    // Add all 0s to queue and mark their distances as 0
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (mat[i][j] === 0) {
          result[i][j] = 0;
          queue.push([i, j]);
        }
      }
    }
    
    const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    
    while (queue.length > 0) {
      const [row, col] = queue.shift()!;
      
      for (const [dx, dy] of directions) {
        const newRow = row + dx;
        const newCol = col + dy;
        
        if (
          newRow >= 0 && newRow < rows &&
          newCol >= 0 && newCol < cols &&
          result[newRow][newCol] > result[row][col] + 1
        ) {
          result[newRow][newCol] = result[row][col] + 1;
          queue.push([newRow, newCol]);
        }
      }
    }
    
    return result;
  };

  const handleCalculate = () => {
    try {
      const matrix = input.split(';').map(row => 
        row.split(',').map(Number)
      );
      setResult(updateMatrix(matrix));
    } catch (error) {
      console.error('Invalid input format');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        01 Matrix
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Example: 0,0,0;0,1,0;1,1,1
      </p>
      <TextField
        label="Enter matrix (format: row1;row2;row3)"
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
        Calculate Distances
      </Button>
      {result.length > 0 && (
        <Box mt={2}>
          <Typography variant="h6">
            Distance Matrix:
          </Typography>
          {result.map((row, index) => (
            <Typography key={index} variant="body1">
              [{row.join(', ')}]
            </Typography>
          ))}
        </Box>
      )}
    </div>
  );
};

export default Matrix01;