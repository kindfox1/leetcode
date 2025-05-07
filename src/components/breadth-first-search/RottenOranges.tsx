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

  const orangesRotting2 = (grid: number[][]): number => {
    if (!grid || !grid.length) return -1;
    const rotten: number[][] = [];
    let freshNum = 0;
    let time = 0;
    const rows = grid.length;
    const cols = grid[0].length;

    for (let i=0; i<rows; i++) {
      for (let j=0; j<cols; j++) {
        if (grid[i][j]===2) {
          rotten.push([i,j]);
        } else if (grid[i][j]===1) {
          freshNum++;
        }
      }
    }

    while (rotten.length > 0 && freshNum > 0) {
      const size = rotten.length;
      console.log("= while ================", size);
      console.log(size, freshNum);
      
      for (let i=0; i<size; i++) { //the size could change every while loop
        const [x, y] = rotten.shift()!;
        if (x-1 >= 0 && grid[x-1][y] === 1) { //up
          grid[x-1][y] = 2;
          rotten.push([x-1, y]);
          freshNum--;
        }
  
        if (x+1 < rows && grid[x+1][y] === 1) { //down
          grid[x+1][y] = 2;
          rotten.push([x+1, y]);
          freshNum--;
        }
  
        if (y-1 >= 0 && grid[x][y-1] === 1) { //left
          grid[x][y-1] = 2;
          rotten.push([x, y-1]);
          freshNum--;
        }
  
        if (y+1 < cols && grid[x][y+1] === 1) { //right
          grid[x][y+1] = 2;
          rotten.push([x, y+1]);
          freshNum--;
        }
      }
      
      time++;
      console.log('time=',time);
    }
    
    return freshNum === 0 ? time : -1; 
  };

  const orangesRotting3 = (grid: number[][]): number => {
    if (!grid || !grid.length) return -1;
    let time = 0;
    const queue: number[][] = [];
    let freshNum = 0;
    const rows = grid.length;
    const cols = grid[0].length;

    const rot = (r: number, c: number) => {
      if (r<0 || c<0 || r>=rows || c>=cols) return;

      if (grid[r][c] === 1) {
        grid[r][c] = 2;
        queue.push([r, c]);
        freshNum--;
      }

    };

    for (let i=0; i<rows; i++) {
      for (let j=0; j<cols; j++) {
        if (grid[i][j]===2) {
          queue.push([i, j]);
        } else if (grid[i][j]===1) {
          freshNum++;
        }
      }
    }


    while (queue.length > 0) {
    //while (queue.length > 0  && freshNum > 0) {
      const n = queue.length;
      console.log("= while ================", n);
      console.log(n, freshNum);
      for (let i=0; i<n; i++) {
        const [r, c] = queue.shift()!;
        rot(r-1, c);
        rot(r+1, c);
        rot(r, c-1);
        rot(r, c+1);
      }
      time++;
      console.log('time=',time);
    }

    console.log('final time', time);
    return freshNum===0? time-1: -1;

  };

  const handleCalculate = () => {
    try {
      // const grid = input.split(';').map(row => 
      //   row.split(',').map(Number)
      // );
      const grid = JSON.parse(input);
      const grid2 = [...grid];
      //orangesRotting2(grid);
      console.log("===========================");
      setResult(orangesRotting3(grid));
    } catch (error) {
      console.error('Invalid input format');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Rotting Oranges 2: rotten, 1: fresh, 0: no orange
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        [[2,1,1],[1,1,0],[0,1,1]] output: 4
      </p>
      <p className="text-sm text-gray-600 mb-4">
        [[2,1],[1,1]] output: 2
      </p>
      <p className="text-sm text-gray-600 mb-4">
        [[2,0],[0,1]] output: -1
      </p>
      <p className="text-sm text-gray-600 mb-4">
        [[2,1,1,1],[1,1,1,2],[0,0,1,1]] output: 2
      </p>
      <p className="text-sm text-gray-600 mb-4">[[0]] oupt: 0</p>
      <p className="text-sm text-gray-600 mb-4">[[2]] oupt: 0</p>
      <p className="text-sm text-gray-600 mb-4">[[1]] oupt: -1</p>
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