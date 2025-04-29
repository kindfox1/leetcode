import React, { useState } from 'react';
import { Button, Container, Typography, Box, TextField, Card } from '@mui/material';

const SortColors = () => {
  const [nums, setNums] = useState([]);
  const [input, setInput] = useState('');
  const [result, setResult] = useState([]);

  /*
  Write a function to sort a given integer array nums in-place (and without the built-in sort function), where the array contains n integers 
  that are either 0, 1, and 2 and represent the colors red, white, and blue. Arrange the objects so that same-colored ones are adjacent, 
  in the order of red, white, and blue (0, 1, 2).
  [2,1,2,0,1,0,1,0,1] => [0,0,0,1,1,1,1,2,2]
  */
  const sortColors = (nums) => {
    let low = 0;
    let mid = 0;
    let high = nums.length - 1;

    while (mid <= high) {
      if (nums[mid] === 0) {
        [nums[low], nums[mid]] = [nums[mid], nums[low]];
        low++;
        mid++;
      } else if (nums[mid] === 1) {
        mid++;
      } else {
        [nums[mid], nums[high]] = [nums[high], nums[mid]];
        high--;
      }
    }
    return nums;
  };

  const sortColors2 = (nums) => {
    let left = 0;
    let mid = 0;
    let right = nums.length-1;

    while (mid <= right) {
      if (nums[mid]===0) {
        [nums[left], nums[mid]] = [nums[mid], nums[left]];
        left++;
        mid++;
      } else if (nums[mid]===1) {
        mid++;
      } else {
        [nums[right], nums[mid]] = [nums[mid], nums[right]];
        right--;
      }
    }
    return nums;
  };

  const sortColors3 = (nums) => {
    let left = 0;
    let mid = 0;
    let right = nums.length-1;

    while (mid < high) {
     if (nums[mid] === 0) {
       [nums[left], nums[mid]] = [nums[mid], nums[left]];
       left++;
       mid++;
     } else if (nums[mid]===1) {
       mid++;
     } else {
       [nums[right], nums[mid]] = [nums[mid], nums[right]];
       right--; 
     }
    }
    return nums;
  };

  const sortColors4 = (nums) => {
    let left = 0;
    let mid = 0;
    let right = nums.length-1;

    while (mid < right) {
      if (nums[mid] === 0) {
        [nums[left], nums[mid]] = [nums[mid], nums[left]];
        left++;
        mid++;
      } else if (nums[mid]===1) {
        mid++
      } else {
        [nums[right], nums[mid]] = [nums[mid], nums[right]];
        right--;
      }
    }



    return nums;
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSortColors = () => {
    //const numsArray = input.split(',').map(Number);
    const numsArray = JSON.parse(input);
    setNums(numsArray);
    const sortedArray = sortColors4([...numsArray]);
    setResult(sortedArray);
  };

  return (
   <div className="bg-white rounded-lg shadow p-6">
      <Box>
        <Typography variant="h6" component="h1" gutterBottom>
          Sort Colors Component
        </Typography>
        <p>[2,1,2,0,1,0,1,0,1] Ouput: [0,0,0,1,1,1,1,2,2]</p>
        <TextField
          label="Enter array elements separated by commas"
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
            onClick={handleSortColors}
          >
            Sort ColorsX
          </Button>
        </Box>
        {nums.length > 0 && (
          <>
            <Typography variant="body1" component="p">
              Original Array: {JSON.stringify(nums)}
            </Typography>
            <Typography variant="body1" component="p">
              Sorted Array: {JSON.stringify(result)}
            </Typography>
          </>
        )}
      </Box>
    </div>
  );
};

export default SortColors;