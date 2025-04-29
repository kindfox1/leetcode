import React, { useState } from 'react';
import { Button, Container, Typography, Box, TextField } from '@mui/material';

const RevertString = () => {
  const [nums, setNums] = useState([]);
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  /* Given an integer array nums, write a function to rearrange the array by moving all zeros to the end 
  while keeping the order of non-zero elements unchanged. Perform this operation in-place without creating
  a copy of the array.
  [2,0,4,0,9] => [2,4,9,0,0]
  */
  const revert = (text: string): string => {
    let left = 0;
    let right = text.length - 1;
    const textArray = text.split('');

    while (left < right) {
      [textArray[left],textArray[right]] = [textArray[right],textArray[left]];
      left++;
      right--;
    }
    console.log(textArray);
    return textArray.join();
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleMoveZeroes = () => {
    const revertedString = revert(input);
    setResult(revertedString);
  };

  return (
    <Container maxWidth="sm" className="bg-white rounded-lg shadow p-6">
      <Box>
        <Typography variant="h6" component="h1" gutterBottom>
            Revert String
        </Typography>
        <p margin="normal">abcde Output: edcba</p>
        <TextField
          label="Enter string"
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
            Revert
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

export default RevertString;

// END GENAI