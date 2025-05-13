import React from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const Blind75 = () => {
    const handleExecute = () => {
        try {
            maxProduct([0,2]);
        } catch (error) {
          console.error('Invalid input');
        }
      };
  return (
    <main className="flex-1 overflow-y-auto bg-gray-100">
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <Typography variant="h2" component="h1" gutterBottom>
            Blind 75
        </Typography>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Button 
        variant="contained" 
        color="primary" 
        onClick={handleExecute}
        sx={{ mt: 2 }}
      >
        Execute Commands
      </Button>
        </div>
      </div>
    </main>
  );
};

export default Blind75;
/*
Given a string s, return the number of palindromic substrings in it.

A string is a palindrome when it reads the same backward as forward.

A substring is a contiguous sequence of characters within the string.

 

Example 1:

Input: s = "abc"
Output: 3
Explanation: Three palindromic strings: "a", "b", "c".
Example 2:

Input: s = "aaa"
Output: 6
Explanation: Six palindromic strings: "a", "a", "a", "aa", "aa", "aaa".
*/
function countSubstrings(s: string): number {
    let count = 0;

    const expandFromCenter = (left: number, right: number) => {
        while (left >=0 && right < s.length && s[left] === s[right]) {
            count++;
            left--;
            right++;
        }
    };

    for (let i=0; i<s.length; i++) {
        expandFromCenter(i, i); //odd number
        expandFromCenter(i, i+1);
    }
    return count;
};

// leetcode 11
function maxArea(height: number[]): number {
    let left = 0;
    let right = height.length-1;
    let maxValue = 0;

    while (left < right) {
        if (height[left] < height[right]) {
            maxValue = Math.max(maxValue, (right - left) * height[left]);
            left++;
        } else {
            maxValue = Math.max(maxValue, (right - left) * height[right]);
            right--;
        }
    }

    return maxValue;
};

function threeSum(nums: number[]): number[][] {
    if (nums.length < 3) return [];
    const result :number[][] = [];
    nums.sort((a, b) => a - b);

    for (let i=0; i<nums.length-2; i++) {
        if (i>0 && nums[i] === nums[i-1]) continue;

        let left = i+1;
        let right = nums.length -1;

        while (left < right) {
            let sum = nums[i] + nums[left] + nums[right];

            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);
                while (left < right && nums[left] === nums[left+1]) { left++; }
                while (left < right && nums[right] === nums[right-1]) { right--; }
                left++;
                right--;
            }

            if (sum > 0) {
                right--;
            }

            if (sum < 0) {
                left++;
            }


        }
    }
    
    return result;

};

/* #152 Maximum Product Subarray
Given an integer array nums, find a subarray that has the largest product, and return the product.

The test cases are generated so that the answer will fit in a 32-bit integer.

 

Example 1:

Input: nums = [2,3,-2,4]
Output: 6
Explanation: [2,3] has the largest product 6.
Example 2:

Input: nums = [-2,0,-1]
Output: 0
Explanation: The result cannot be 2, because [-2,-1] is not a subarray.
*/
function maxProduct(nums: number[]): number {
    if (nums.length === 1) return nums[0]; 
    let maxProduct = -Infinity;
    let product = 0;
    //while (left < right && right < nums.length) {
    for(let left=0; left<nums.length; left++) {
        product = nums[left];
        for (let right=left; right<nums.length; right++) {
            if (left === right) {
                product = nums[right];
            } else {
                product = product * nums[right];
            }
            
            maxProduct = Math.max(maxProduct, product);
        }
        maxProduct = Math.max(maxProduct, product);
    }
    console.log('maxproduct', maxProduct)
    return maxProduct;
};