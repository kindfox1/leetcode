// START GENAI
import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';

/*
Given an integer input array heights representing the heights of vertical lines, write a function that returns the maximum area of water that can be contained by two of the lines (and the x-axis). The function should take in an array of integers and return an integer.
- [3,4,1,2,2,4,1,3,2] ===> 21
- [1,2,1] ===> 2
*/
const ContainerWithMostWater = () => {
  const [heights, setHeights] = useState([]);
  const [maxArea, setMaxArea] = useState(null);

  const handleInputChange = (event) => {
    const { value } = event.target;
    const array = value.split(',').map(num => parseInt(num.trim(), 10));
    setHeights(array);
  };

  const findMaxArea = () => {
    const area = maxAreaContainer2(heights);
    setMaxArea(area);
  };

  const maxAreaContainer = (heights) => {
    let maxArea = 0;
    let left = 0;
    let right = heights.length - 1;

    while (left < right) {
      const height = Math.min(heights[left], heights[right]);
      const width = right - left;
      const area = height * width;

      maxArea = Math.max(maxArea, area);

      if (heights[left] < heights[right]) {
        left++;
      } else {
        right--;
      }
    }

    return maxArea;
  };

  const maxAreaContainer2 = (heightsX) => {
    let heights = [3,4,1,2,2,4,1,3,2];
    let maxArea = 0;
    let left = 0;
    let right = heights.length -1;
    console.log(right);
    console.log(heights);

    while (left < right) {
      let width = right - left;
      let height = Math.min(heights[left], heights[right]);
      let area = width * height;
      console.log(`${width} x ${height} = ${area}`);
      maxArea = Math.max(maxArea, area);
      console.log('maxArea', maxArea);
      
      if (heights[left] < heights[right]) {
        left++;
      } else {
        right--;
      }
    }
  };

  const maxAreaContainer3 = (heightsX) => {
    let heights = [3,4,1,2,2,4,1,3,2];
    let maxArea = 0;
    let left = 0;
    let right = heights.length -1;

    while (left < right) {
      let height = Math.min(heights[left], heights[right]);
      let width = right - left;
      maxArea = Math.max(maxArea, width * height);
      
      if (heights[left] < heights[right]) {
        left++;
      } else {
        right--;
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom margin="dense">Container with most water</Typography>
      Example: 3,4,1,2,2,4,1,3,2 or 1,2,1
      <TextField
        label="Enter heights separated by commas"
        fullWidth
        onChange={handleInputChange}
        margin="dense"
      />
      <Button variant="contained" color="primary" onClick={findMaxArea} margin="dense">
        Find Max Area
      </Button>
      <div>
        <Typography variant="h6" gutterBottom>
          Max Area: {maxArea !== null ? maxArea : 'N/A'}
        </Typography>
      </div>
    </div>
  );
};

export default ContainerWithMostWater;

// END GENAI