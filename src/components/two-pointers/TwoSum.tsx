// START GENAI
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const TwoSum = () => {
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
    const indices = twoSum(nums, targetNum);
    setResult(indices.length ? `Indices: ${indices.join(', ')}` : 'No solution found');
  };

  /*
  Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
  [2, 7, 11, 15], target = 9 , output [0, 1]
  */
  const twoSum = (nums, target) => {
    const numMap = new Map();
    for (let i = 0; i < nums.length; i++) {
      const complement = target - nums[i];
      if (numMap.has(complement)) {
        return [numMap.get(complement), i];
      }
      numMap.set(nums[i], i);
    }
    return [];
  };

  const twoSum2 = (nums, target) => {
    console.log('in here');
    const numMaps = new Map();
    for (let i=0; i < nums.length; i++) {
      let foo = target - nums[i];
      if (numMaps.has(foo)) {
        return [numMaps.get(foo), i];
      }
      numMaps.set(nums[i], i);
    }

    
  };

  return (
    <Container className="bg-white rounded-lg shadow p-6">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h6" gutterBottom>
          2-Sum Problem Solver
        </Typography>
        <p>2, 7, 11, 15 Target: 9</p>
        <TextField
          label="Array (comma-separated)"
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

export default TwoSum;