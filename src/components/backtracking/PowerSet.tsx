import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const PowerSet = () => {
  const [nums, setNums] = useState('');
  const [result, setResult] = useState<number[][]>([]);

  /*
    Given a set of distinct integers, nums, return all possible subsets (the power set), without duplicates.

    Time Complexity: O(2^n), where n is the length of the input array.
    Space Complexity: O(n), for the recursion stack.

    https://www.hellointerview.com/learn/code/backtracking/solution-space-trees#solution-space-tree-examples
  */

  const subsets = (nums: number[]): number[][] => {
    const result: number[][] = [];
    const backtrack = (index: number, current: number[]) => {
      if (index === nums.length) {
        result.push([...current]);
        return;
      }

      // Exclude the current number
      backtrack(index + 1, current);

      // Include the current number
      current.push(nums[index]);
      backtrack(index + 1, current);
      current.pop(); // Backtrack
    };

    backtrack(0, []);
    return result;
  };

  const subsets2 = (nums: number[]): number[][] => {
    const result :number[][] = [];

    const backtracking = (idx: number, path: number[]) => {
      if (idx === nums.length) {
        result.push([...path]);
        return;
      }

      //exclude the current number
      backtracking(idx+1, path);

      const digit = nums[idx];
      path.push(digit);
      backtracking(idx+1, path);
      path.pop(); //backtracking
    };

    backtracking(0, []);

    return result;
  };

  const handleGenerate = () => {
    try {
      const numsArray = JSON.parse(nums);
      if (!Array.isArray(numsArray) || numsArray.some(isNaN)) {
        throw new Error('Invalid input');
      }
      const powerSet = subsets2(numsArray);
      setResult(powerSet);
    } catch (error) {
      console.error('Invalid input');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Generate all subset
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        [1,2,3] = [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
      </p>
      <p className="text-sm text-gray-600 mb-4">[0] = [[],[0]]</p>
      <p className="text-sm text-gray-600 mb-4">[1,2] = [[],[1],[2],[1,2]]</p>
      <TextField
        label="Enter numbers (comma-separated)"
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
        onClick={handleGenerate}
        sx={{ mt: 2 }}
      >
        Generate Subsets
      </Button>
      {result.length > 0 && (
        <Box mt={2}>
          <Typography variant="h6">
            Subsets:
          </Typography>
          <Typography variant="body1">
            {JSON.stringify(result)}
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default PowerSet;