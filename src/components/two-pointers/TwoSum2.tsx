import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const TwoSum2 = () => {
  const [array, setArray] = useState('');
  const [target, setTarget] = useState('');
  const [result, setResult] = useState('');

  const handleArrayChange = (event) => {
    setArray(event.target.value);
  };

  const handleTargetChange = (event) => {
    setTarget(event.target.value);
  };

  const handleSubmit = () => {
    const nums = array.split(',').map(Number);
    const targetNum = Number(target);
    const indices = twoSumII3(nums, targetNum);
    setResult(indices.length ? `Indices: ${indices.join(', ')}` : 'No solution found');
  };

  /*
  Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number.
  [2, 7, 11, 15], target = 9 , output [0, 1]
  */
  const twoSumII = (nums, target) => {
    let left = 0;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[left] + nums[right];
      if (sum === target) {
        return [left + 1, right + 1]; // 1-based indices
      } else if (sum < target) {
        left++;
      } else {
        right--;
      }
    }
    return [];
  };

  const twoSumII2 = (nums, target) => {
    let left = 0;
    let right = nums.length -1;

    while (left < right) {
      let sum = nums[left] + nums[right];
      if (sum === target) {
        return [left, right];
      } else if ( sum > target ) {
        right--;
      } else {
        left++;
      }
    }
  };

  const twoSumII3 = (nums: number[], target: number) => {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
      let sum = nums[left] + nums[right];
      if (sum === target) {
        return [left, right];
      } else if (sum < target) {
        left++;
      } else if (sum > target) {
        right--;
      }


    }

  };

  return (
    <Container className="bg-white rounded-lg shadow p-6">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h6" gutterBottom>
          Two Sum II Problem Solver
        </Typography>
        <p>2, 7, 11, 15 Target: 9</p> 
        <TextField
          label="Array (comma-separated, sorted)"
          variant="outlined"
          value={array}
          onChange={handleArrayChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Target Sum"
          variant="outlined"
          value={target}
          onChange={handleTargetChange}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ marginTop: 2 }}>
          Find Indices
        </Button>
        {result && (
          <Typography variant="h6" color="textSecondary" sx={{ marginTop: 2 }}>
            {result}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default TwoSum2;