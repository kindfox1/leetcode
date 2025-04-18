import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import Heap from 'heap-js';

const ReturnValues = () => {
  const [input, setInput] = useState('');
  const [k, setK] = useState('');
  const [result, setResult] = useState<number[]>([]);

  const findTopKFrequent = (nums: number[], k: number): number[] => {
    const frequency = new Map<number, number>();
    
    // Count frequency of each number
    for (const num of nums) {
      frequency.set(num, (frequency.get(num) || 0) + 1);
    }
    
    // Create min heap based on frequency
    const minHeap = new Heap<[number, number]>((a, b) => a[1] - b[1]);
    
    // Add elements to heap
    for (const [num, freq] of frequency.entries()) {
      minHeap.push([num, freq]);
      if (minHeap.length > k) {
        minHeap.pop();
      }
    }
    
    // Extract top k frequent elements
    return minHeap.toArray().map(([num]) => num).reverse();
  };

  const handleCalculate = () => {
    try {
      const nums = input.split(',').map(Number);
      const kValue = parseInt(k);
      if (!isNaN(kValue) && kValue > 0) {
        setResult(findTopKFrequent(nums, kValue));
      }
    } catch (error) {
      console.error('Invalid input');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Top K Frequent Elements
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Example: 1,1,1,2,2,3 k=2
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
        Find Top K Frequent
      </Button>
      {result.length > 0 && (
        <Box mt={2}>
          <Typography variant="h6">
            Top {k} frequent elements: [{result.join(', ')}]
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default ReturnValues;