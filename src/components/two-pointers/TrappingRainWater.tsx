import React, { useState } from 'react';
import {
  Button,
  Container,
  Typography,
  Box,
  TextField,
  Card,
} from '@mui/material';

const TrappingRainWater = () => {
  const [heights, setHeights] = useState([]);
  const [input, setInput] = useState('');
  const [result, setResult] = useState(0);

  const trap = (height) => {
    if (height.length === 0) return 0;

    let left = 0;
    let right = height.length - 1;
    let leftMax = 0;
    let rightMax = 0;
    let water = 0;

    while (left < right) {
      if (height[left] < height[right]) {
        if (height[left] >= leftMax) {
          leftMax = height[left];
        } else {
          water += leftMax - height[left];
        }
        left++;
      } else {
        if (height[right] >= rightMax) {
          rightMax = height[right];
        } else {
          water += rightMax - height[right];
        }
        right--;
      }
    }

    return water;
  };

  const trap2 = (height: number[]) => {
    let water = 0;

    if (height.length === 0) {
      return water;
    }
    let left = 0;
    let right = height.length - 1;
    let leftMax = height[left];
    let rightMax = height[right];

    while (left + 1 < right) {
      if (leftMax > rightMax) {
        right--;
        if (height[right] < rightMax) {
          water += rightMax - height[right];
        } else {
          rightMax = height[right];
        }
      } else {
        left++;
        if (leftMax > height[left]) {
          water += leftMax - height[left];
        } else {
          leftMax = height[left];
        }
      }
    }

    return water;
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleCalculateWater = () => {
    const heightsArray = input.split(',').map(Number);
    setHeights(heightsArray);
    const totalWater = trap2(heightsArray);
    setResult(totalWater);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Box>
        <Typography variant="h6" component="h1" gutterBottom>
          Trapping Rain Water
        </Typography>
        <p>[3, 4, 1, 2, 2, 5, 1, 0, 2]</p>
        <TextField
          label="Enter heights separated by commas"
          variant="outlined"
          fullWidth
          value={input}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <Box my={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCalculateWater}
          >
            Calculate Water
          </Button>
        </Box>
        {heights.length > 0 && (
          <>
            <Typography variant="body1" component="p">
              Heights: {JSON.stringify(heights)}
            </Typography>
            <Typography variant="body1" component="p">
              Total Water Trapped: {result}
            </Typography>
          </>
        )}
      </Box>
    </div>
  );
};

export default TrappingRainWater;
