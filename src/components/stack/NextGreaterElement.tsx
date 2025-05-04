import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const NextGreaterElement = () => {
  const [input, setInput] = useState('[]');
  const [result, setResult] = useState<number[]>([]);


  /**
   * Given an array of integers, find the next greater element for each element in the array. The next greater element of 
   * an element x is the first element to the right of x that is greater than x. If there is no such element, then the next greater element is -1.
   [2, 1, 3, 4] = [3, 3, 4, -1]
   [2, 1, 3, 2, 4, 3] = [3, 3, 4, 4, -1, -1]

   Time: O(n)
   Space: O(n)
   */
   const nextGreaterElement = (arr: number[]): number[] => {
    const stack: number[] = []; // [[value, index] ...]
    let result :number[]= [];

    for (let i=0; i<arr.length; i++) {
        result.push(-1);
    }

    for (let i=0; i<arr.length; i++) {
        while (stack.length > 0 && arr[i] > arr[stack[stack.length-1]]) {
            let index = stack.pop();
            if (index !== undefined)
                result[index] = arr[i];
        }
        stack.push(i);
    }

    return result;
  };

  const nextGreaterElement3 = (arr: number[]): number[] => {
    const stack: number[] = []; // [[value, index] ...]
    let result = Array(arr.length).fill(-1); 

    for (let i=0; i<arr.length; i++) {
      while (stack.length > 0 && arr[i] > arr[stack[stack.length-1]]) {
        let index = stack.pop();
        if (index !== undefined)
          result[index] = arr[i];
      }

      stack.push(i);
    }


    return result;
  };


  const nextGreaterElement2 = (arr: number[]): number[] => {
    const stack: number[][] = []; // [[value, index] ...]
    const map = new Map();
    let result :number[]= [];

    for (let i=0; i<arr.length; i++) {
        //map.set(arr[i], i);
        result.push(-1);
    }
    
    //console.log(map);
    console.log(result);

    for (let i=0; i<arr.length; i++) {
        if (stack.length === 0) {
            stack.push([arr[i], i]);
            console.log('stack 0:', JSON.stringify(stack));
        } else if (stack.length > 0 && stack[stack.length-1][0] >= arr[i]) {
            stack.push([arr[i], i]);
            console.log('stack 1:', JSON.stringify(stack));
        } else if (stack.length > 0 && stack[stack.length-1][0] < arr[i]) {
            while (stack.length > 0 && arr[i] > stack[stack.length-1][0]) {
                //let index = stack.length -1;
                let value = stack.pop();
                
                if (value) {
                    result[value[1]] = arr[i];
                }
            }
            stack.push([arr[i], i]);
            console.log('stack 2:', JSON.stringify(stack));
        }
    }

    return result;
  };

  const handleCalculate = () => {
    const numArray = JSON.parse(input);
    setResult(nextGreaterElement(numArray));
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Next Greater Element
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Example: [2, 1, 3, 2, 4, 3] = [3, 3, 4, 4, -1, -1]
      </p>
      <p className="text-sm text-gray-600 mb-4">[2, 1, 3, 4] = [3, 3, 4, -1]</p>
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
            Result: {result}
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default NextGreaterElement;