import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const PacificAtlantic = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<number[][]>([]);

  const pacificAtlantic = (heights: number[][]): number[][] => {
    if (!heights.length) return [];
    
    const rows = heights.length;
    const cols = heights[0].length;
    const pacific = Array.from({ length: rows }, () => new Array(cols).fill(false));
    const atlantic = Array.from({ length: rows }, () => new Array(cols).fill(false));
    
    const dfs = (row: number, col: number, prev: number, ocean: boolean[][]) => {
      if (row < 0 || row >= rows || col < 0 || col >= cols) return;
      if (ocean[row][col] || heights[row][col] < prev) return;
      
      ocean[row][col] = true;
      
      dfs(row + 1, col, heights[row][col], ocean);
      dfs(row - 1, col, heights[row][col], ocean);
      dfs(row, col + 1, heights[row][col], ocean);
      dfs(row, col - 1, heights[row][col], ocean);
    };
    
    // Pacific borders
    for (let i = 0; i < rows; i++) dfs(i, 0, 0, pacific);
    for (let j = 0; j < cols; j++) dfs(0, j, 0, pacific);
    
    // Atlantic borders
    for (let i = 0; i < rows; i++) dfs(i, cols - 1, 0, atlantic);
    for (let j = 0; j < cols; j++) dfs(rows - 1, j, 0, atlantic);
    
    // Find intersection
    const result: number[][] = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (pacific[i][j] && atlantic[i][j]) {
          result.push([i, j]);
        }
      }
    }
    
    return result;
  };

  const handleCalculate = () => {
    try {
      const heights = input.split(';').map(row => 
        row.split(',').map(Number)
      );
      setResult(pacificAtlantic(heights));
    } catch (error) {
      console.error('Invalid input');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Pacific Atlantic Water Flow
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Example: 1,2,2,3,5;3,2,3,4,4;2,4,5,3,1;6,7,1,4,5;5,1,1,2,4
      </p>
      <TextField
        label="Enter heights (format: row1;row2;row3)"
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
        Find Flow Points
      </Button>
      {result.length > 0 && (
        <Box mt={2}>
          <Typography variant="h6">
            Points that can flow to both oceans:
          </Typography>
          {result.map((point, index) => (
            <Typography key={index} variant="body1">
              [{point.join(', ')}]
            </Typography>
          ))}
        </Box>
      )}
    </div>
  );
};

export default PacificAtlantic;