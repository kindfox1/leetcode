import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const SearchRotatedArray = () => {
  const [input, setInput] = useState('');
  const [target, setTarget] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const search = (nums: number[], target: number): number => {
    let left = 0;
    let right = nums.length - 1;
    
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      
      if (nums[mid] === target) {
        return mid;
      }
      
      // Left half is sorted
      if (nums[left] <= nums[mid]) {
        if (target >= nums[left] && target < nums[mid]) {
          right = mid - 1;
        } else {
          left = mid + 1;
        }
      }
      // Right half is sorted
      else {
        if (target > nums[mid] && target <= nums[right]) {
          left = mid + 1;
        } else {
          right = mid - 1;
        }
      }
    }
    
    return -1;
  };

  const search2 = (nums: number[], target: number): number => {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
      let mid = Math.floor((left + right)/2);
      if (nums[mid]===target) {
        return mid;
      } 
      //<= is very import below, it will cover edge case like [1, 2]
      else if (nums[left] < nums[mid]) { //sort half on left and target is in left half 
        // use binary search to get the target index
        if (nums[left] <= target && target < nums[mid]) {
          right = mid - 1;
        } else { // else try right half
          left = mid + 1
        }
        
      } else { //sorted half on right
        if (nums[mid] < target && target <= nums[right]) { //target is in right half
          left = mid + 1;
        } else { // else try left half
          right = mid - 1;
        }
      }
    }

    
    return -1;
  };

  const handleSearch = () => {
    try {
      const nums = input.split(',').map(Number);
      const targetNum = parseInt(target);
      setResult(search2(nums, targetNum));
    } catch (error) {
      console.error('Invalid input format');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Search in Rotated Sorted Array
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Example: Array: 4,5,6,7,0,1,2 Target: 0
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

export default SearchRotatedArray;