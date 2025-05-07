import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import Heap from 'heap-js';

const Matrices = () => {
  const [input, setInput] = useState('');
  const [k, setK] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const kthSmallest = (matrix: number[][], k: number): number => {
    const n = matrix.length;
    const minHeap = new Heap<[number, number, number]>((a, b) => a[0] - b[0]);
    
    // Add first element from each row
    for (let i = 0; i < n; i++) {
      minHeap.push([matrix[i][0], i, 0]);
    }
    
    // Find kth element
    for (let i = 1; i < k; i++) {
      const [val, row, col] = minHeap.pop()!;
      
      if (col + 1 < n) {
        minHeap.push([matrix[row][col + 1], row, col + 1]);
      }
    }
    
    return minHeap.peek()![0];
  };


  const kthSmallest2 = (matrix: number[][], k: number): number => {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const minHeap = new Heap((a: number, b: number) => a - b);

    for (let r=0; r<rows; r++) {
      for (let c=0; c<cols; c++) {
        minHeap.push(matrix[r][c]);
      }
    }

    for (let i=0; i<k-1; i++) {
      minHeap.pop();
    }

    return minHeap.peek()!;
  };

  const handleCalculate = () => {
    try {
      // const matrix = input.split(';').map(row => 
      //   row.split(',').map(Number)
      // );
      const matrix = JSON.parse(input);
      const kValue = parseInt(k);
      if (!isNaN(kValue) && kValue > 0) {
        setResult(kthSmallest2(matrix, kValue));
      }
    } catch (error) {
      console.error('Invalid input');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Kth Smallest Element in Sorted Matrix
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        [[1,5,9],[10,11,13],[12,13,15]] k=8, 13
      </p>
      <TextField
        label="Enter matrix (format: row1;row2;row3)"
        variant="outlined"
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Enter k"
        variant="outlined"
        fullWidth
        value={k}
        onChange={(e) => setK(e.target.value)}
        margin="normal"
        type="number"
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleCalculate}
        sx={{ mt: 2 }}
      >
        Find Kth Smallest
      </Button>
      {result !== null && (
        <Box mt={2}>
          <Typography variant="h6">
            {k}th smallest element: {result}
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default Matrices;