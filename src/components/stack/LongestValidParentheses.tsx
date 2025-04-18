import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const LongestValidParentheses = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<number | null>(null);

  /*
  Given a string containing just the characters '(' and ')', find the length of the longest valid (well-formed) parentheses substring. A well-formed 
  parentheses string is one that follows these rules: open brackets must be closed by a matching pair in the correct order.
  ()))) => 2 ; )()()) = 4; ((()()()) = 8; ())(()) = 4;
  */
  const findLongestValidParentheses = (s: string): number => {
    const stack: number[] = [-1];
    let maxLength = 0;

    for (let i = 0; i < s.length; i++) {
      if (s[i] === '(') {
        stack.push(i);
      } else {
        stack.pop();
        if (stack.length === 0) {
          stack.push(i);
        } else {
          maxLength = Math.max(maxLength, i - stack[stack.length - 1]);
        }
      }
    }

    return maxLength;
  };

  const findLongestValidParentheses2 = (s: string): number => {
    const stack: number[] = [-1];
    let maxLength = 0;

    for (let i=0; i<s.length; i++) {
      let char = s[i];
      if (char === '(') {
        stack.push(i);
      } else {
        stack.pop();
        if (stack.length === 0) {
          stack.push(i);
        } else {
          console.log(stack[-1]);
          maxLength = Math.max(maxLength, i - stack[stack.length - 1]);
        }
      }

      console.log(stack);
    }

  
    return maxLength;
  };


  // it is ok solution but cannot handle ()(()
  // const findLongestValidParentheses2 = (s: string): number => {
  //   //const stack: number[] = [-1];
  //   const stack: string[] = [];
  //   let maxLength = 0;
  //   let currentMax = 0;

  //   for (let i=0; i<s.length; i++) {
  //     let char = s[i];
  //     if (char === '(') {
  //       stack.push(char);
  //     } else if (char === ')') {
  //       let foo = stack.pop();
  //       console.log('foo', foo);
  //       if (foo === '(') {
  //         console.log('matched');
  //         maxLength = Math.max(currentMax+2, maxLength);
  //         currentMax = maxLength;
  //         console.log(maxLength);
  //       } else { // empty
  //         currentMax = 0;
  //       }
  //     }
  //     console.log('stack', stack);
  //   }

  //   console.log('maxLength', maxLength);
  //   return maxLength;
  // };

  const handleCalculate = () => {
    //setResult(findLongestValidParentheses(input));
    setResult(findLongestValidParentheses2(input));
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Longest Valid Parentheses
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Example: ")()())" = 4
      </p>
      <TextField
        label="Enter string"
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
            Longest valid parentheses length: {result}
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default LongestValidParentheses;