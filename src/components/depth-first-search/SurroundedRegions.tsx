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
      dfs(i, 0); //left
      dfs(i, cols - 1); //right
    }
    for (let j = 0; j < cols; j++) {
      dfs(0, j); //top
      dfs(rows - 1, j); //bottom
    }
    
    // Convert remaining O's to X's and #'s back to O's
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (board[i][j] === 'O') board[i][j] = 'X';
        if (board[i][j] === '#') board[i][j] = 'O';
      }
    }
  };

  const solve3 = (board: string[][]): void => {
    if (!board || !board.length) return;
    const visited = new Set();

    const dfs = (row: number, col: number) => {
      // console.log(
      //   'visiting ....', `${row}${col}`
      // );
      
      if (row < 0 || col < 0 || row >= board.length || col >= board[0].length) {
        return;
      }

      if (board[row][col] !== 'O' || visited.has(`${row}-${col}`)) {
        return;
      }

      // if (row===11) {
      //   console.log('BEFORE SET!!!', row, col);
      // }
      visited.add(`${row}-${col}`);
      dfs(row-1, col); //up
      dfs(row+1, col); //down
      dfs(row, col-1); //left
      dfs(row, col+1); //right
    };

    const lastRow = board.length - 1;
    const colSize = board[0].length;

    for (let i = 0; i < colSize; i++) { //top border
      if (board[0][i] === 'O') {
        dfs(0, i);
        //visited.add(`0${i}`);
      }
    }

    for (let i = 0; i < colSize; i++) { //bottom border
      if (board[lastRow][i] === 'O') {
        dfs(lastRow, i);
        //visited.add(`${lastRow}${i}`);
      }
    }

    for (let i = 0; i < board.length; i++) { //left border
      if (board[i][0] === 'O') {
        dfs(i, 0);
        //visited.add(`${lastRow}${i}`);
      }
    }

    for (let i = 0; i < board.length; i++) { //right border
      if (board[i][colSize-1] === 'O') {
        dfs(i, colSize-1);
        //visited.add(`${lastRow}${i}`);
      }
    }
//console.log('visited', visited);
    //change all inner O to X if it never got visited
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[0].length; col++) {
        // if (row===11 && (col === 7 || col === 8 || col ===9)) {
        //   console.log('index=', col);
        //   console.log('is  O=', board[row][col] === 'O');
        //   console.log('is visited:', visited)
        // }
        if (board[row][col] === 'O') {


          if (!visited.has(`${row}-${col}`)) {
            board[row][col] = 'X';
          }
        }
      }
    }
  };

  const handleSolve = () => {
    //try {
      // const board = input.split(';').map(row => 
      //   row.split(',')
      // );
      //solve(board);
      const board = JSON.parse(input);
      solve3(board);
      
      setResult(board);
    // } catch (error) {
    //   console.error('Invalid input');
    // }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Surrounded Regions
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Example: X,X,X,X;X,O,O,X;X,X,O,X;X,O,X,X
      </p>
      <p className="text-sm text-gray-600 mb-4">
        Example: [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]
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