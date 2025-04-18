import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const SurroundedRegions = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string[][]>([]);

  const solve = (board: string[][]): void => {
    if (!board.length) return;
    
    const rows = board.length;
    const cols = board[0].length;
    
    const dfs = (row: number, col: number) => {
      if (row < 0 || row >= rows || col < 0 || col >= cols) return;
      if (board[row][col] !== 'O') return;
      
      board[row][col] = '#';
      
      dfs(row + 1, col);
      dfs(row - 1, col);
      dfs(row, col + 1);
      dfs(row, col - 1);
    };
    
    // Check borders
    for (let i = 0; i < rows; i++) {
      dfs(i, 0);
      dfs(i, cols - 1);
    }
    for (let j = 0; j < cols; j++) {
      dfs(0, j);
      dfs(rows - 1, j);
    }
    
    // Convert remaining O's to X's and #'s back to O's
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (board[i][j] === 'O') board[i][j] = 'X';
        if (board[i][j] === '#') board[i][j] = 'O';
      }
    }
  };

  const handleSolve = () => {
    try {
      const board = input.split(';').map(row => 
        row.split(',')
      );
      solve(board);
      setResult(board);
    } catch (error) {
      console.error('Invalid input');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Surrounded Regions
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Example: X,X,X,X;X,O,O,X;X,X,O,X;X,O,X,X
      </p>
      <TextField
        label="Enter board (format: row1;row2;row3)"
        variant="outlined"
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
        margin="normal"
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleSolve}
        sx={{ mt: 2 }}
      >
        Solve Board
      </Button>
      {result.length > 0 && (
        <Box mt={2}>
          <Typography variant="h6">
            Result:
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

export default SurroundedRegions;