import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const SpiralOrder = () => {
  const [matrix, setMatrix] = useState('');
  const [result, setResult] = useState<number[] | null>(null);

  /*
    Given an m x n matrix, return all elements in spiral order.

    Time Complexity: O(m * n), where m is the number of rows and n is the number of columns.
    Space Complexity: O(1), excluding the output list.
  */

  const spiralOrder = (matrix: number[][]): number[] => {
    const result: number[] = [];
    if (matrix.length === 0) return result;

    let top = 0;
    let bottom = matrix.length - 1;
    let left = 0;
    let right = matrix[0].length - 1;

    while (top <= bottom && left <= right) {
      // Traverse from left to right along the top row
      for (let i = left; i <= right; i++) {
        result.push(matrix[top][i]);
      }
      top++;

      // Traverse from top to bottom along the right column
      for (let i = top; i <= bottom; i++) {
        result.push(matrix[i][right]);
      }
      right--;

      if (top <= bottom) {
        // Traverse from right to left along the bottom row
        for (let i = right; i >= left; i--) {
          result.push(matrix[bottom][i]);
        }
        bottom--;
      }

      if (left <= right) {
        // Traverse from bottom to top along the left column
        for (let i = bottom; i >= top; i--) {
          result.push(matrix[i][left]);
        }
        left++;
      }
    }

    return result;
  };

  const spiralOrder2 = (matrix: number[][]): number[] => {
    const result: number[] = [];
    const rows = matrix.length;
    const cols = matrix[0].length;
    const visited: boolean[][] = Array.from({ length: rows }, () => 
        Array(cols).fill(false)
    );

    console.log(visited);

    let count = 0;
    const totalNodes = rows * cols;
    let currRow = 0;
    let currCol = 0;
    const directions: [number, number][] = [[0,1],[1,0],[0,-1],[-1,0]]; //right, down, left, up
    let currDir = 0;

    const canMove = (r: number, c: number, dir: number): boolean => {
        let newRow = r + directions[dir][0];
        let newCol = c + directions[dir][1];

        if (newRow < 0 || newCol < 0 || newRow >= rows || newCol >= cols || visited[newRow][newCol]) {
            return false;
        }
        return true;
    }

    while (count < totalNodes) {
        result.push(matrix[currRow][currCol]);
        visited[currRow][currCol] = true;

        if (currDir === 0) { // move right
            console.log('moving right');
            if (canMove(currRow, currCol, currDir)) {
                currRow = currRow + directions[currDir][0];
                currCol = currCol + directions[currDir][1];
            } else if (canMove(currRow, currCol, 1)) { // then go down
                currDir = 1;
                currRow = currRow + directions[currDir][0];
                currCol = currCol + directions[currDir][1];
            }
        }else if (currDir === 1) { // move down
            console.log('moving down');
            if (canMove(currRow, currCol, currDir)) {
                currRow = currRow + directions[currDir][0];
                currCol = currCol + directions[currDir][1];
            } else if (canMove(currRow, currCol, 2)) { // then go down
                currDir = 2;
                currRow = currRow + directions[currDir][0];
                currCol = currCol + directions[currDir][1];
            }
        } else if (currDir === 2) { // move left
            console.log('moving left');
            if (canMove(currRow, currCol, currDir)) {
                currRow = currRow + directions[currDir][0];
                currCol = currCol + directions[currDir][1];
            } else if (canMove(currRow, currCol, 3)) { // then go down
                currDir = 3;
                currRow = currRow + directions[currDir][0];
                currCol = currCol + directions[currDir][1];
            }
        } else if (currDir === 3) { // move up
            console.log('moving up');
            if (canMove(currRow, currCol, currDir)) {
                currRow = currRow + directions[currDir][0];
                currCol = currCol + directions[currDir][1];
            } else if (canMove(currRow, currCol, 0)) { // then go down
                currDir = 0;
                currRow = currRow + directions[currDir][0];
                currCol = currCol + directions[currDir][1];
            }
        }

        count++;
    }

    return result;
  };

  const handleCalculate = () => {
    try {
      const parsedMatrix = JSON.parse(matrix);

      if (
        !Array.isArray(parsedMatrix) ||
        parsedMatrix.some(
          (row) => !Array.isArray(row) || row.some((value) => typeof value !== 'number')
        )
      ) {
        throw new Error('Invalid input');
      }

      const spiralResult = spiralOrder2(parsedMatrix);
      setResult(spiralResult);
    } catch (error) {
      console.error('Invalid input');
      setResult(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Spiral Order Traversal
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Example: Input matrix = [[0,1,2],[3,4,5],[6,7,8]] → Output: [0,1,2,5,8,7,6,3,4]
      </p>
      <TextField
        label="Enter matrix (as JSON array)"
        variant="outlined"
        fullWidth
        value={matrix}
        onChange={(e) => setMatrix(e.target.value)}
        margin="normal"
        type="text"
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleCalculate}
        sx={{ mt: 2 }}
      >
        Calculate Spiral Order
      </Button>
      {result !== null && (
        <Box mt={2}>
          <Typography variant="h6">
            Spiral Order:
          </Typography>
          <Typography variant="body1">
            {JSON.stringify(result)}
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default SpiralOrder;