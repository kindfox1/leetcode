import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const NumberOfIslands = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const numIslands = (grid: string[][]): number => {
    if (!grid.length) return 0;
    
    const rows = grid.length;
    const cols = grid[0].length;
    let count = 0;
    
    const dfs = (row: number, col: number) => {
      if (row < 0 || row >= rows || col < 0 || col >= cols) return;
      if (grid[row][col] !== '1') return;
      
      grid[row][col] = '#'; // mark as visited
      
      dfs(row + 1, col);
      dfs(row - 1, col);
      dfs(row, col + 1);
      dfs(row, col - 1);
    };
    
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (grid[i][j] === '1') {
          count++;
          dfs(i, j);
        }
      }
    }
    
    return count;
  };

  const handleCalculate = () => {
    try {
      const grid = input.split(';').map(row => 
        row.split(',')
      );
      setResult(numIslands(grid));
    } catch (error) {
      console.error('Invalid input');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Number of Islands
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Example: 1,1,0;1,1,0;0,0,1
      </p>
      <TextField
        label="Enter grid (format: row1;row2;row3)"
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
        Count Islands
      </Button>
      {result !== null && (
        <Box mt={2}>
          <Typography variant="h6">
            Number of islands: {result}
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default NumberOfIslands;