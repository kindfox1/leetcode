import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const RottenOranges = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const orangesRotting = (grid: number[][]): number => {
    const rows = grid.length;
    const cols = grid[0].length;
    const queue: [number, number, number][] = [];
    let freshOranges = 0;
    let time = 0;
    
    // Find all rotten oranges and count fresh ones
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (grid[i][j] === 2) {
          queue.push([i, j, 0]);
        } else if (grid[i][j] === 1) {
          freshOranges++;
        }
      }
    }
    
    const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    
    while (queue.length > 0 && freshOranges > 0) {
      const [row, col, minutes] = queue.shift()!;
      time = Math.max(time, minutes);
      
      for (const [dx, dy] of directions) {
        const newRow = row + dx;
        const newCol = col + dy;
        
        if (
          newRow >= 0 && newRow < rows &&
          newCol >= 0 && newCol < cols &&
          grid[newRow][newCol] === 1
        ) {
          grid[newRow][newCol] = 2;
          freshOranges--;
          queue.push([newRow, newCol, minutes + 1]);
        }
      }
    }
    
    return freshOranges === 0 ? time : -1;
  };

  const handleCalculate = () => {
    try {
      const grid = input.split(';').map(row => 
        row.split(',').map(Number)
      );
      setResult(orangesRotting(grid));
    } catch (error) {
      console.error('Invalid input format');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Rotting Oranges
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Example: 2,1,1;1,1,0;0,1,1
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
        Calculate Time
      </Button>
      {result !== null && (
        <Box mt={2}>
          <Typography variant="h6">
            {result === -1 ? 
              'Impossible to rot all oranges' : 
              `Time to rot all oranges: ${result} minutes`}
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default RottenOranges;