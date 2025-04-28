import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const SubarraySumEqualsK = () => {
  const [nums, setNums] = useState('');
  const [k, setK] = useState('');
  const [result, setResult] = useState<number | null>(null);

  /*
    Given an integer array nums and an integer k, return the total number of contiguous subarrays 
    whose elements sum up to k.

    Time Complexity: O(n), where n is the length of the nums array.
    Space Complexity: O(n), for the hash map storing prefix sums.
  */

  const subarraySum = (nums: number[], k: number): number => {
    const prefixSumCount = new Map<number, number>();
    prefixSumCount.set(0, 1); // Base case: a prefix sum of 0 occurs once
    let currentSum = 0;
    let count = 0;

    for (const num of nums) {
      currentSum += num;

      // Check if there is a prefix sum that satisfies the condition
      if (prefixSumCount.has(currentSum - k)) {
        count += prefixSumCount.get(currentSum - k)!;
      }

      // Update the prefix sum count
      prefixSumCount.set(currentSum, (prefixSumCount.get(currentSum) || 0) + 1);
    }

    //console.log('prefixSumCount', prefixSumCount);

    return count;
  };

  //[3, 4, 7, 2, -3, 1, 4, 2], k = 7
  const subarraySum2 = (nums: number[], k: number): number => {
    const prefixSum = new Map<number, number>();

    prefixSum.set(0, 1); //currentSum of 0 occurses once
    let count = 0;
    let currentSum = 0;

    for (let i=0; i<nums.length; i++) {
        currentSum += nums[i];
        if (prefixSum.has(currentSum - k)) {
            count += prefixSum.get(currentSum - k)!;
        }
        console.log(prefixSum.has(currentSum-k));
        prefixSum.set(currentSum, prefixSum.has(currentSum) ? prefixSum.get(currentSum)! + 1 : 1);
    }

    return count;
  };

  const handleCalculate = () => {
    try {
      const numsArray = JSON.parse(nums);
      const targetK = parseInt(k, 10);

      if (!Array.isArray(numsArray) || numsArray.some(isNaN) || isNaN(targetK)) {
        throw new Error('Invalid input');
      }
      //subarraySum(numsArray, targetK);
      const totalSubarrays = subarraySum2(numsArray, targetK);
      setResult(totalSubarrays);
    } catch (error) {
      console.error('Invalid input');
      setResult(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Subarray Sum Equals K
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Example: Input nums = [3, 4, 7, 2, -3, 1, 4, 2], k = 7 → Output: 4
      </p>
      <TextField
        label="Enter array of numbers (as JSON array)"
        variant="outlined"
        fullWidth
        value={nums}
        onChange={(e) => setNums(e.target.value)}
        margin="normal"
        type="text"
      />
      <TextField
        label="Enter target sum (k)"
        variant="outlined"
        fullWidth
        value={k}
        onChange={(e) => setK(e.target.value)}
        margin="normal"
        type="number"
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleCalculate}
        sx={{ mt: 2 }}
      >
        Calculate Subarrays
      </Button>
      {result !== null && (
        <Box mt={2}>
          <Typography variant="h6">
            Total Subarrays:
          </Typography>
          <Typography variant="body1">
            {result}
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default SubarraySumEqualsK;