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


  // use max heap instead of Maxheap
  const findClosestElements2 = (arr: number[], k: number, x: number): number[] => {
    // min heap
    const minHeap = new Heap<number>((a: number, b: number) => {
      const diffA = Math.abs(a -x);
      const diffB = Math.abs(b -x);

      return diffB - diffA; 
    });

    for (let i=0; i<arr.length; i++) {
      minHeap.push(arr[i]);

      if (minHeap.length > k) {
        minHeap.pop();
      }
    }
    console.log(result);
    return minHeap.toArray().sort();
  }

  const handleCalculate = () => {
    try {
      //const nums = numbers.split(',').map(Number);
      const nums = JSON.parse(numbers);
      const kNum = parseInt(k);
      const targetNum = parseInt(target);
      if (!isNaN(kNum) && kNum > 0 && !isNaN(targetNum)) {
        setResult(findClosestElements2(nums, kNum, targetNum));
      }
    } catch (error) {
      console.error('Invalid input');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Find K Closest Elements
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        [1,2,3,4,5] k=4 x=3, output: [1, 2, 3, 4]
      </p>
      <p className="text-sm text-gray-600 mb-4">
        [-1, 0, 1, 4, 6] k=3 x=1, output: [-1, 0, 1]
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