import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const RotateMatrix = () => {
  const [matrix, setMatrix] = useState('');
  const [result, setResult] = useState<number[][] | null>(null);

  /*
    Given an n x n matrix, rotate it 90 degrees clockwise in-place.

    Time Complexity: O(n^2), where n is the number of rows/columns in the matrix.
    Space Complexity: O(1), as the rotation is done in-place.
  */

  const rotate = (matrix: number[][]): void => {
    const n = matrix.length;
    let count = 0;

    // Transpose the matrix
    for (let i = 0; i < n; i++) {
      for (let j = i +1; j < n; j++) {
        count++;
        [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
      }
    }

    // Reverse each row
    for (let i = 0; i < n; i++) {
      matrix[i].reverse();
    }
  };

  const handleRotate = () => {
    try {
      const parsedMatrix = JSON.parse(matrix);

      if (
        !Array.isArray(parsedMatrix) ||
        parsedMatrix.some(
          (row) => !Array.isArray(row) || row.some((value) => typeof value !== 'number')
        ) ||
        parsedMatrix.length !== parsedMatrix[0].length
      ) {
        throw new Error('Invalid input');
      }

      rotate(parsedMatrix);
      setResult(parsedMatrix);
    } catch (error) {
      console.error('Invalid input');
      setResult(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Rotate Matrix 90 Degrees Clockwise
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        matrix = [[1,4,7],[2,5,8],[3,6,9]] → Output: [[3,2,1],[6,5,4],[9,8,7]]
      </p>
      <p className="text-sm text-gray-600 mb-4">
        matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]] → Output: [[13,9,5,1],[14,10,6,2],[15,11,7,3],[16,12,8,4]]
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
        onClick={handleRotate}
        sx={{ mt: 2 }}
      >
        Rotate Matrix
      </Button>
      {result !== null && (
        <Box mt={2}>
          <Typography variant="h6">
            Rotated Matrix:
          </Typography>
          <Typography variant="body1">
            {JSON.stringify(result)}
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default RotateMatrix;