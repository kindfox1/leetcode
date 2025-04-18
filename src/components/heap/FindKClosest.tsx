import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import Heap from 'heap-js';

const FindKClosest = () => {
  const [numbers, setNumbers] = useState('');
  const [target, setTarget] = useState('');
  const [k, setK] = useState('');
  const [result, setResult] = useState<number[]>([]);

  const findClosestElements = (arr: number[], k: number, x: number): number[] => {
    const maxHeap = new Heap((a: number, b:number) => {
      const diffA = Math.abs(a - x);
      const diffB = Math.abs(b - x);
      return diffB - diffA || a - b;
    });
    
    for (const num of arr) {
      maxHeap.push(num);
      if (maxHeap.length > k) {
        maxHeap.pop();
      }
    }
    
    return maxHeap.toArray().sort((a, b) => a - b);
  };

  const handleCalculate = () => {
    try {
      const nums = numbers.split(',').map(Number);
      const kNum = parseInt(k);
      const targetNum = parseInt(target);
      if (!isNaN(kNum) && kNum > 0 && !isNaN(targetNum)) {
        setResult(findClosestElements(nums, kNum, targetNum));
      }
    } catch (error) {
      console.error('Invalid input');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Find K Closest ElementsXXX
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Example: 1,2,3,4,5 k=4 x=3
      </p>
      <TextField
        label="Enter numbers (comma-separated)"
        variant="outlined"
        fullWidth
        value={numbers}
        onChange={(e) => setNumbers(e.target.value)}
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
      <TextField
        label="Enter target (x)"
        variant="outlined"
        fullWidth
        value={target}
        onChange={(e) => setTarget(e.target.value)}
        margin="normal"
        type="number"
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleCalculate}
        sx={{ mt: 2 }}
      >
        Find K Closest Elements
      </Button>
      {result.length > 0 && (
        <Box mt={2}>
          <Typography variant="h6">
            K closest elements: [{result.join(', ')}]
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default FindKClosest;