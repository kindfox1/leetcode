import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

const WordSearch = () => {
  const [input, setInput] = useState('');
  const [word, setWord] = useState('');
  const [result, setResult] = useState<string | null>('');

  /*
    Given an m x n grid of characters board and a string word, return true if word exists in the grid.

    The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. 
    The same letter cell may not be used more than once.

    Time: O(m * n * 4L) L is the length of the target word
    Space: O(L)
  */

  // HellowInterview version
  function exist(board: string[][], word: string): boolean {
    const rows = board.length;
    const cols = board[0].length;
  
    function dfs(r: number, c: number, index: number): boolean {
      if (index === word.length) return true;
  
      if (
        r < 0 || c < 0 ||
        r >= rows || c >= cols ||
        board[r][c] !== word[index]
      ) {
        return false;
      }
  
      const temp = board[r][c];
      board[r][c] = "#"; // mark as visited
  
      const found =
        dfs(r + 1, c, index + 1) ||
        dfs(r - 1, c, index + 1) ||
        dfs(r, c + 1, index + 1) ||
        dfs(r, c - 1, index + 1);
  
      board[r][c] = temp; // backtrack
      return found;
    }
  
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (board[row][col] === word[0]) {
          if (dfs(row, col, 0)) {
            return true;
          }
        }
      }
    }
  
    return false;
  }
  

  const wordSearch = (mat: string[][], word: string): boolean => {
    if (!mat || !mat.length) return false;
    let wordLength = word.length;
    const queue: number[][] = [];
    const rows = mat.length;
    const cols = mat[0].length;
    let wordFound = false;

    for (let i=0; i<mat.length; i++) {
        for (let j=0; j<mat[0].length; j++) {
            if (word[0] === mat[i][j]) {
                queue.push([i,j]);
            }
        }
    }

    const dfs = (x: number, y: number, windex: number) => {
        if (x<0 || y<0 || x>=rows || y>=cols) return;
        console.log('****************DFS**********');
        console.log('x:', x, 'y:', y, 'windex:', windex);
        console.log('Matix cell: ', mat[x][y]);
        console.log('word char: ', word[windex]);

        if (mat[x][y] !== word[windex]) {
            return;
        }

        if (windex+1 === wordLength) {
            console.log('Word found');
            wordFound = true;
            return;
        }

        const temp = mat[x][y];
        mat[x][y] = "#"; // mark as visited

        dfs(x-1, y, windex+1);
        dfs(x+1, y, windex+1);
        dfs(x, y-1, windex+1);
        dfs(x, y+1, windex+1);

        mat[x][y] = temp;
    };

    while (queue.length > 0) {
        const [r, c] = queue.shift()!;
        dfs(r, c, 0);
    }

    return wordFound;
  };

  const handleCheck = () => {
    try {
    //   const values = input.split(',').map(val => 
    //     val.trim() === 'null' ? null : Number(val)
    //   );
      const matrix = JSON.parse(input);
      setResult(JSON.stringify(wordSearch(matrix, word)));
    } catch (error) {
      console.error('Invalid input');
    }
  };
 

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Word search
      </Typography>
    <p className="text-sm text-gray-600 mb-4">
      [["B", "L", "C", "H"],["D", "E", "L", "T"],["D", "A", "K", "A"]] search: BLEAK Output: true
    </p>
    <p className="text-sm text-gray-600 mb-4">[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED" Output: true</p>
      <p className="text-sm text-gray-600 mb-4">
        4,7,2,1,3,6,1 Target:7 Ouput [[4,2,1]]
      </p>
      <TextField
        label="Enter tree values (comma-separated)"
        variant="outlined"
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Enter target sum"
        variant="outlined"
        fullWidth
        value={word}
        onChange={(e) => setWord(e.target.value)}
        margin="normal"
        type="text"
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleCheck}
        sx={{ mt: 2 }}
      >
        Check Path Sum
      </Button>
      {result !== null && (
        <Box mt={2}>
          <Typography 
            variant="h6" 
            color={result ? 'success.main' : 'error.main'}
          >
            {result}
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default WordSearch;