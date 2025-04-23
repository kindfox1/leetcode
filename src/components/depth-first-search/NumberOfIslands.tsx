import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const NumberOfIslands = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const numIslands = (grid: number[][]): number => {
    if (!grid.length) return 0;
    
    const rows = grid.length;
    const cols = grid[0].length;
    let count = 0;
    
    const dfs = (row: number, col: number) => {
      if (row < 0 || row >= rows || col < 0 || col >= cols) return;
      if (grid[row][col] !== 1) return;
      
      grid[row][col] = 9; // mark as visited
      
      dfs(row + 1, col);
      dfs(row - 1, col);
      dfs(row, col + 1);
      dfs(row, col - 1);
    };
    
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (grid[i][j] === 1) {
          count++;
          dfs(i, j);
        }
      }
    }
    
    return count;
  };

  const numIslands2 = (grid: number[][]): number => {
    if (!grid || !grid.length) return 0;
    let count = 0;
    const visited = new Set();

    const dfs = (row: number, col: number) => {
      if (row < 0 || col < 0 || row >= grid.length || col >= grid[0].length) {
        return;
      }
      
      if (visited.has(`${row}${col}`)) {
        console.log('visited has ', `${row}${col}`);
        return;
      } else if (grid[row][col] === 1) {
        console.log('### set=', `${row}${col}`);
        visited.add(`${row}${col}`);
        dfs(row-1, col); //up
        dfs(row+1, col); //down
        dfs(row, col-1); //left
        dfs(row, col+1); //right
      }
    };

    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
        console.log('===', row, col);
        if (grid[row][col] === 1) {
          console.log('found land!');
          console.log('visited', visited);
          if (!visited.has(`${row}${col}`)) {
            console.log('not visited ... traverse..');
            dfs(row, col);
            count++;
            console.log('count=', count);
          }
        }
      }
    }
    
    
    return count;
  };

  const handleCalculate = () => {
    try {
      // const grid = input.split(';').map(row => 
      //   row.split(',')
      // );
      const grid = JSON.parse(input);
      setResult(numIslands2(grid));
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
      <p className="text-sm text-gray-600 mb-4">[[1,1,0],[1,1,0],[0,0,1]]; output = 2</p>
      <p className="text-sm text-gray-600 mb-4">[[1, 1, 0, 1],[1, 1, 0, 1],[1, 1, 0, 0]] output = 2</p>
      <p className="text-sm text-gray-600 mb-4">[[0, 0, 0, 1],[0, 0, 0, 1],[0, 0, 0, 0]] output = 1</p>
      <p className="text-sm text-gray-600 mb-4">
        [[0, 1, 0, 0, 0, 0],[0, 1, 1, 0, 1, 0],[0, 0, 0, 1, 1, 0],[1, 1, 0, 0, 0, 1],[1, 1, 0, 0, 0, 1]] output = 4</p>
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