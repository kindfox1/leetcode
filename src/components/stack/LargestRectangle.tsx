import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const LargestRectangle = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const largestRectangleArea = (heights: number[]): number => {
    const stack: number[] = [];
    let maxArea = 0;
    let i = 0;

    while (i <= heights.length) {
      const height = i === heights.length ? 0 : heights[i];

      if (stack.length === 0 || height >= heights[stack[stack.length - 1]]) {
        stack.push(i);
        i++;
      } else {
        const top = stack.pop()!;
        const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
        maxArea = Math.max(maxArea, heights[top] * width);
      }
    }

    return maxArea;
  };

  // const largestRectangleArea2 = (heights: number[]): number => {
  //   let maxArea = 0;
  //   const stack :number[][] = [];
  //   const copy = [...heights];
  //   console.log(copy);

  //   for (let i =0; i<heights.length; i++) {
  //     stack.push([...copy]);
  //     copy.shift();
  //   }
  //   console.log(JSON.stringify(stack));

  //   for (let i =0; i<stack.length; i++) {
  //     maxArea = Math.max(maxArea, getMaxArea(stack[i]));
  //   }

  //   console.log('maxArea', maxArea);
  //   return maxArea;
  // };

  // const getMaxArea = (nums: number[]): number => {
  //   let maxArea = 0;
  //   const stack: number[] = [];
  //   console.log('nums', nums);

  //   for (let i=0; i<nums.length; i++) {
  //     while (stack.length > 0 && nums[i] < nums[stack[stack.length-1]]) {

  //     }
  //     stack.push(nums[i]);
  //   }


  //   return maxArea;
  // }

  const handleCalculate = () => {
    //const heights = input.split(',').map(Number);
    const heights = JSON.parse(input);
    setResult(largestRectangleArea(heights));
    //largestRectangleArea2(heights)
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 hard">
      <Typography variant="h6" gutterBottom>
        Largest Rectangle in Histogram
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Example: 2,1,5,6,2,3
      </p>
      <TextField
        label="Enter heights"
        variant="outlined"
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
        margin="normal"
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleCalculate}
        sx={{ mt: 2 }}
      >
        Calculate
      </Button>
      {result !== null && (
        <Box mt={2}>
          <Typography variant="h6">
            Largest rectangle area: {result}
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default LargestRectangle;