import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import Heap from 'heap-js';
import { MinHeap } from './MinHeap';

const KthLargest = () => {
  const [input, setInput] = useState('');
  const [k, setK] = useState('');
  const [result, setResult] = useState<number | null>(null);

  /*
  Write a function that takes an array of unsorted integers nums and an integer k, and returns the kth largest element in the array. 
  This function should run in O(n log k) time, where n is the length of the array.
  Inputs: nums = [5, 3, 2, 1, 4] k = 2
  Output: 4
  */
  const findKthLargest = (nums: number[], k: number): number => {
    const minHeap = new Heap((a, b) => a - b);
    
    for (const num of nums) {
      minHeap.push(num);
      if (minHeap.length > k) {
        minHeap.pop();
      }
    }
    
    return minHeap.peek() as number;
  };

  const findKthLargest2 = (nums: number[], k: number): number => {
    const minHeap = new MinHeap();
    
    for (const num of nums) {
      minHeap.insert(num);
      if (minHeap.length() > k) {
        minHeap.pop();
      }
    }
    
    return minHeap.peek() as number;
  };


  // This used MaxHeap, but MinHeap can do the job better, just keep the size of the minHeap to K, pop if it is greater than K
  const findKthLargest3 = (nums: number[], k: number): number => {
    const size = nums.length;
    const minHeap = new MinHeap();

    for (let i=0; i<size; i++) {
      minHeap.insert(-nums[i]);
    }
    for (let j=0; j < k-1; j++) {
      minHeap.pop();
    }
    console.log(minHeap.peek());
    return minHeap.peek()! * -1;
    
    
  };
  const handleCalculate = () => {
    try {
      //const nums = input.split(',').map(Number);
      const nums = JSON.parse(input);
      const kNum = parseInt(k);
      if (!isNaN(kNum) && kNum > 0) {
        setResult(findKthLargest3(nums, kNum));
      }
    } catch (error) {
      console.error('Invalid input');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Kth Largest Element
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Example: 3,2,1,5,6,4 k=2
      </p>
      <TextField
        label="Enter numbers (comma-separated)"
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
        Find Kth Largest
      </Button>
      {result !== null && (
        <Box mt={2}>
          <Typography variant="h6">
            {k}th largest element: {result}
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default KthLargest;