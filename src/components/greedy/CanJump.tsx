import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const CanJump = () => {
  const [nums, setNums] = useState('');
  const [result, setResult] = useState<boolean | null>(null);

  /*
    Given an array nums where each number specifies the maximum distance you can jump from that index, 
    return true if you can reach the last index, otherwise return false.

    Time Complexity: O(n), where n is the length of the nums array.
    Space Complexity: O(1), as we use constant space.
  */

  const canJump = (nums: number[]): boolean => {
    let maxReach = 0;

    for (let i = 0; i < nums.length; i++) {
      if (i > maxReach) return false; // If the current index is beyond the maximum reachable index
      maxReach = Math.max(maxReach, i + nums[i]); // Update the maximum reachable index
    }

    return true;
  };

  const canJump2 = (nums: number[]): boolean => {
    let maxReach = 0;

    for (let i=0; i<nums.length; i++) {
        if (i > maxReach) {
          return false;
        }
        maxReach = Math.max(i + nums[i], maxReach);
    }
    return true;
  };

  // [1, 2, 0, 1, 4]
  // lastValidIndex = 1
  // i = 1
  // [2,2,1,0,5,1,1]
  // nums.length = 6
  // edge case [0], [2,0,0]
 // THIS doesn't work for some edge case
  const canJump3 = (nums: number[]): boolean => {
    let lastValidIndex = 0;
    let i=0;
    if (nums.length === 1 && nums[0] === 0) {
      return false;
    }
    while (i < nums.length) {
      let maxDistance = nums[i];
      if (i + maxDistance < nums.length && nums[i + maxDistance] === 0) {
        if (i + maxDistance >= nums.length-1) return true;
        if ( i=== lastValidIndex) return false;
        i = lastValidIndex + 1;
        lastValidIndex = i;
      // } else if (i+maxDistance >= nums.length-1) {
      //   return true;
      } else {
        lastValidIndex = i;
        i += maxDistance;
      }
    }
    return true;
  }

  const handleCalculate = () => {
    try {
      const numsArray = JSON.parse(nums);

      if (!Array.isArray(numsArray) || numsArray.some(isNaN)) {
        throw new Error('Invalid input');
      }

      const canReach = canJump3(numsArray);
      setResult(canReach);
    } catch (error) {
      console.error('Invalid input');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Can Jump
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Example: Input nums = [1, 3, 0, 1, 4] → Output: true
      </p>
      <p className="text-sm text-gray-600 mb-4">[2,2,1,0,5,1,1] → Output: false</p>
      <TextField
        label="Enter array of numbers (as JSON array)"
        variant="outlined"
        fullWidth
        value={nums}
        onChange={(e) => setNums(e.target.value)}
        margin="normal"
        type="text"
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleCalculate}
        sx={{ mt: 2 }}
      >
        Check If Can Jump
      </Button>
      {result !== null && (
        <Box mt={2}>
          <Typography variant="h6">
            Can Reach Last Index:
          </Typography>
          <Typography variant="body1">
            {result ? 'Yes' : 'No'}
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default CanJump;