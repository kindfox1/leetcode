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

  const pacificAtlantic2 = (heights: number[][]): number[][] => {
    if (!heights.length) return [];

    const result :number[][]= [];
    
    const rows = heights.length;
    const cols = heights[0].length;
    const pacific = Array.from({ length: rows }, () => new Array(cols).fill(false));
    const atlantic = Array.from({ length: rows }, () => new Array(cols).fill(false));
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

    const dfs = (row: number, col: number, ocean: boolean[][]) => {
      if (row < 0 || col < 0 || row >= rows || col >= cols) return; // out of bound
      ocean[row][col] = true;
      for (const [r, c] of directions) {
        let nextRow = row + r;
        let nextCol = col + c;

        // if next cell at the boundry
        if (nextRow >= 0 && nextRow < rows && nextCol >= 0 && nextCol < cols) {
          if (!ocean[nextRow][nextCol] && heights[row][col] <= heights[nextRow][nextCol]) {
            dfs(nextRow, nextCol, ocean);
          }
        }
      }
    };

    for (let i = 0; i < rows; i++) {
      dfs(i, 0, pacific); //left
      dfs(i, cols-1, atlantic); //right
    }

    for (let j = 0; j < cols; j++) {
      dfs(0, j, pacific); //up
      dfs(rows-1, j, atlantic); //down
    }

    //check if each cell, if it can flow to both Pac and Atl, push to result[]
    for (let i=0; i<rows; i++) {
      for (let j=0; j<cols; j++) {
        if (pacific[i][j] && atlantic[i][j]) {
          result.push([i, j]);
        }
      }
    }
    return result;
  };

  const pacificAtlantic3 = (heights: number[][]): number[][] => {
    const rows = heights.length;
    const cols = heights[0].length;
    const atlantic = Array.from({length: rows }, () => new Array(cols).fill(false));
    const pacific = Array.from({ length: rows }, () => new Array(cols).fill(false));

    const dfs = (r: number, c: number) => {
      if (r<0 || c<0 || r>=rows || c>= cols) return;

      if (heights[r][c] === -1) return;
console.log(r, c);
      if (r-1>=0 && heights[r][c] >= heights[r-1][c]) { //up
        atlantic[r][c] = atlantic[r-1][c];
        pacific[r][c] = pacific[r-1][c];
      }

      if (r+1<rows && heights[r][c] >= heights[r+1][c] ) { //down
        atlantic[r][c] = atlantic[r+1][c];
        pacific[r][c] = pacific[r+1][c];
      } 

      if (c-1>=0 && heights[r][c] >= heights[r][c-1]) { //left
        atlantic[r][c] = atlantic[r][c-1];
        pacific[r][c] = pacific[r][c-1];
      } 

      if (c+1<cols && heights[r][c] >= heights[r][c+1]) { //right
        atlantic[r][c] = atlantic[r][c+1];
        pacific[r][c] = pacific[r][c+1];
      }

      heights[r][c] = -1; //mark it as visited

      dfs(r-1, c);
      dfs(r+1, c);
      dfs(r, c-1);
      dfs(r, c+1);

    };

    for (let i=0; i<cols; i++) {//up and bottom
      pacific[0][i] = true;
      atlantic[rows-1][i] = true;
      heights[0][i] = -1;
      heights[rows-1][i] = -1;
    }

    for (let j=0; j<rows; j++) {//left and right
      pacific[j][0] = true;
      atlantic[j][cols-1] = true;
      heights[j][0] = -1;
      heights[j][cols-1] = -1;
    }

    for (let r=1; r<rows-1; r++) {
      for (let c=1; c<cols-1; c++) {
        dfs(r, c);
      }
    }

    console.log(pacific);
    console.log(atlantic);

    return heights;
  };

  const handleCalculate = () => {
    //try {
      const heights = JSON.parse(input);
      setResult(pacificAtlantic3(heights));
    // } catch (error) {
    //   console.error('Invalid input');
    // }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Pacific Atlantic Water Flow
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        input: [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]</p>
      <p className="text-sm text-gray-600 mb-4">
        output: [[0, 4],[1, 3],[1, 4],[2, 2],[3, 0],[3, 1],[4, 0]]
      </p>
      <p className="text-sm text-gray-600 mb-4">
        input: [[1,2,3],[4,5,6],[7,8,9]]</p>
      <p className="text-sm text-gray-600 mb-4">
        output: [[0, 2],[1, 2],[2, 0],[2, 1],[2, 2]]
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