import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const BinSearth = () => {
  const [input, setInput] = useState('');
  const [target, setTarget] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const search = (nums: number[], target: number): number => {
    let left = 0;
    let right = nums.length - 1;
    
    while (left <= right) {
        let mid = Math.ceil((left + right) / 2);

        if (nums[mid] === target) {
            return mid;
        } else if (nums[mid] > target) { //left half
            right = mid;
        } else { // right half
            left = mid;
        }
    }
    
    return -1;
  };

  const handleSearch = () => {
    try {
      const nums = input.split(',').map(Number);
      const targetNum = parseInt(target);
      setResult(search(nums, targetNum));
    } catch (error) {
      console.error('Invalid input format');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Binary Search in sorted array
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Example: Array: -1,0,3,5,9,12 Target: 0
      </p>
      <TextField
        label="Enter array (comma-separated)"
        variant="outlined"
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Enter target number"
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
        onClick={handleSearch}
        sx={{ mt: 2 }}
      >
        Search
      </Button>
      {result !== null && (
        <Box mt={2}>
          <Typography variant="h6">
            {result === -1 ? 
              'Target not found' : 
              `Target found at index: ${result}`}
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default BinSearth;