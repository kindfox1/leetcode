import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const SetMatrixZeroes = () => {
  const [matrix, setMatrix] = useState('');
  const [result, setResult] = useState<number[][] | null>(null);

  /*
    Modify the matrix in-place such that if any element is 0, its entire row and column are set to 0.

    Time Complexity: O(m * n), where m is the number of rows and n is the number of columns.
    Space Complexity: O(1), as the transformation is done in-place.
  */

    // Copilot version
  const setZeroes = (matrix: number[][]): void => {
    const rows = matrix.length;
    const cols = matrix[0].length;
    let firstRowHasZero = false;
    let firstColHasZero = false;

    // Check if the first row has any zero
    for (let j = 0; j < cols; j++) {
      if (matrix[0][j] === 0) {
        firstRowHasZero = true;
        break;
      }
    }

    // Check if the first column has any zero
    for (let i = 0; i < rows; i++) {
      if (matrix[i][0] === 0) {
        firstColHasZero = true;
        break;
      }
    }

    // Use first row and column to mark zeroes
    for (let i = 1; i < rows; i++) {
      for (let j = 1; j < cols; j++) {
        if (matrix[i][j] === 0) {
          matrix[i][0] = 0;
          matrix[0][j] = 0;
        }
      }
    }

    // Nullify rows based on markers
    for (let i = 1; i < rows; i++) {
      if (matrix[i][0] === 0) {
        for (let j = 1; j < cols; j++) {
          matrix[i][j] = 0;
        }
      }
    }

    // Nullify columns based on markers
    for (let j = 1; j < cols; j++) {
      if (matrix[0][j] === 0) {
        for (let i = 1; i < rows; i++) {
          matrix[i][j] = 0;
        }
      }
    }

    // Nullify the first row if needed
    if (firstRowHasZero) {
      for (let j = 0; j < cols; j++) {
        matrix[0][j] = 0;
      }
    }

    // Nullify the first column if needed
    if (firstColHasZero) {
      for (let i = 0; i < rows; i++) {
        matrix[i][0] = 0;
      }
    }
  };

  // my version inspired by HelloInterview
  const setZeroes2 = (matrix: number[][]): void => {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const rowSet = new Set<number>();
    const colSet = new Set<number>();

    for (let i=0; i<rows; i++) {
        for (let j=0; j<cols; j++) {
            if (matrix[i][j] === 0) {
                rowSet.add(i);
                colSet.add(j);
            }
        }
    }

    //rowSet.forEach((r: number) => {
    for (const r of rowSet) {
        for (let i=0; i<cols; i++) {
            matrix[r][i] = 0;
        }
    }

    //colSet.forEach((c: number)=>{
    for (const c of colSet) {
        for (let i=0; i<cols; i++) {
            matrix[i][c] = 0;
        }
    }
  };

  // GhatGPT convert hellointerview
  function setZeroes3(matrix: number[][]): void {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const zeroRows = new Set<number>();
    const zeroCols = new Set<number>();
  
    // First pass: identify rows and columns to zero
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (matrix[i][j] === 0) {
          zeroRows.add(i);
          zeroCols.add(j);
        }
      }
    }
  
    // Second pass: set rows to zero
    for (const row of zeroRows) {
      for (let col = 0; col < cols; col++) {
        matrix[row][col] = 0;
      }
    }
  
    // Third pass: set columns to zero
    for (const col of zeroCols) {
      for (let row = 0; row < rows; row++) {
        matrix[row][col] = 0;
      }
    }
  }
  

  const handleSetZeroes = () => {
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

      setZeroes2(parsedMatrix);
      setResult(parsedMatrix);
    } catch (error) {
      console.error('Invalid input');
      setResult(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Set Matrix Zeroes
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        matrix = [[0,2,3],[4,5,6],[7,8,9]] → Output: [[0,0,0],[0,5,6],[0,8,9]]
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
        onClick={handleSetZeroes}
        sx={{ mt: 2 }}
      >
        Set Zeroes
      </Button>
      {result !== null && (
        <Box mt={2}>
          <Typography variant="h6">
            Modified Matrix:
          </Typography>
          <Typography variant="body1">
            {JSON.stringify(result)}
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default SetMatrixZeroes;