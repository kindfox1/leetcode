import React, { useState } from 'react';
import { Button, Container, Typography, Box, TextField } from '@mui/material';

const MoveZero = () => {
  const [nums, setNums] = useState([]);
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  /* Given an integer array nums, write a function to rearrange the array by moving all zeros to the end 
  while keeping the order of non-zero elements unchanged. Perform this operation in-place without creating
  a copy of the array.
  [2,0,4,0,9] => [2,4,9,0,0]
  */
  const moveZeroes = (nums) => {
    let lastNonZeroFoundAt = 0;

    for (let i = 0; i < nums.length; i++) {
      if (nums[i] !== 0) {
        [nums[lastNonZeroFoundAt], nums[i]] = [nums[i], nums[lastNonZeroFoundAt]];
        lastNonZeroFoundAt++;
      }
    }
    
    return nums;
  };

  const moveZeroes4 = (nums: number[]): number[] => {
    let lastNoneZeroIndex = 0;
    for (let i=0; i< nums.length; i++) {
      if (nums[i]!==0) {
        [nums[lastNoneZeroIndex], nums[i]] = [nums[i], nums[lastNoneZeroIndex]];
        lastNoneZeroIndex++;
      }
    }
    
    return nums;
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleMoveZeroes = () => {
    const numsArray = JSON.parse(input);
    setNums(numsArray);
    const rearrangedArray = moveZeroes4(numsArray);
    setResult(JSON.stringify(rearrangedArray));
  };

  return (
    <Container maxWidth="sm" className="bg-white rounded-lg shadow p-6">
      <Box>
        <Typography variant="h6" component="h1" gutterBottom>
          Move Zero Component
        </Typography>
        <p margin="normal">[2,0,4,0,9] Output: [2,4,9,0,0]</p>
        <TextField
          label="Enter array elements separated by commas"
          variant="outlined"
          fullWidth
          value={input}
          margin="normal"
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <Box my={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleMoveZeroes}
          >
            Move Zeroes
          </Button>
        </Box>
        {nums.length > 0 && (
          <>
            <Typography variant="body1" component="p">
              Rearranged Array: {JSON.stringify(result)}
            </Typography>
          </>
        )}
      </Box>
    </Container>
  );
};

export default MoveZero;

// END GENAI