import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';

const ThreeSum = () => {
  const [nums, setNums] = useState([]);
  const [result, setResult] = useState('');

  const handleInputChange = (event) => {
    const { value } = event.target;
    //const array = value.split(',').map((num) => parseInt(num.trim(), 10));
    const nums = JSON.parse(value);
    setNums(nums);
    
  };

  const findThreeSum = () => {
    const triplets = threeSum(nums);
    setResult(JSON.stringify(triplets));
  };

  /*
  Given an input integer array nums, write a function to find all unique triplets [nums[i], nums[j], nums[k]] such that i, j, 
  and k are distinct indices, and the sum of nums[i], nums[j], and nums[k] equals zero. Ensure that the resulting list does not contain any duplicate triplets.
  [-1,0,1,2,-1,-1] => [[-1,-1,2],[-1,0,1]]
  */

  const threeSum = (nums) => {
    nums.sort((a, b) => a - b);
    const triplets = [];

    for (let i = 0; i < nums.length - 2; i++) {
      if (i > 0 && nums[i] === nums[i - 1]) continue; // skip duplicates, meaning the thread go back to the for loop skip all code below

      let left = i + 1;
      let right = nums.length - 1;

      while (left < right) {
        const sum = nums[i] + nums[left] + nums[right];

        if (sum === 0) {
          triplets.push([nums[i], nums[left], nums[right]]);
          while (left < right && nums[left] === nums[left + 1]) left++; // skip duplicates
          while (left < right && nums[right] === nums[right - 1]) right--; // skip duplicates
          left++;
          right--;
        } else if (sum < 0) {
          left++;
        } else {
          right--;
        }
      }
    }

    return triplets;
  };

  const threeSum3 = (nums: number[]): number[][]  => {
    const triplets: number[][] = [];
    nums.sort((a,b) => a - b);
    console.log(nums);


    for (let i=0; i<nums.length-2; i++) {
      if (i > 0 && nums[i] === nums[i - 1]) continue;
      let left = i+1;
      let right = nums.length - 1;
      while (left < right) {
        let sum = nums[0] + nums[left] + nums[right];
        if (sum === 0) {
          triplets.push([nums[0], nums[left], nums[right]]);
          while(left < right && nums[left]===nums[left+1]) {
            left++;
          }
          while(left < right && nums[right]===nums[right-1]) {
            right--;
          }
          left++;
          right--;
        } else if (sum > 0) {
          right--;
        } else {
          left++;
        }
      }
    }
    

    return triplets;
  };


  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6">Three Sum Problem</Typography>
      <p>[-1,0,1,2,-1,-1] output: [[-1,-1,2],[-1,0,1]]</p>
      <TextField
        label="Enter numbers separated by commas"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={handleInputChange}
      />
      <Button variant="contained" onClick={findThreeSum}>
        Find Three Sum
      </Button>
      <div>
        <Typography variant="subtitle1" gutterBottom>
          Result: { result }
        </Typography>
        {/* <ul>
          {result.map((triplet, index) => (
            <li key={index}>[{triplet.join(', ')}]</li>
          ))}
        </ul> */}
      </div>
    </div>
  );
};

export default ThreeSum;
