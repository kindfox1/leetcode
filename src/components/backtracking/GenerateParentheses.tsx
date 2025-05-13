import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const GenerateParentheses = () => {
  const [n, setN] = useState('');
  const [result, setResult] = useState<string[]>([]);

  /*
    Given an integer n, return all well-formed (valid) expressions that can be made using n pairs of parentheses.

    Time Complexity: O(4^n / sqrt(n)), Catalan number growth.
    Space Complexity: O(n), for the recursion stack.
  */

  const generateParentheses = (n: number): string[] => {
    const result: string[] = [];
    const backtrack = (current: string, open: number, close: number) => {
      if (current.length === n * 2) {
        result.push(current);
        return;
      }

      if (open < n) {
        backtrack(current + '(', open + 1, close);
      }
      if (close < open) {
        backtrack(current + ')', open, close + 1);
      }
    };

    backtrack('', 0, 0);
    return result;
  };

  const generateParentheses2 = (n: number): string[] => {
    const result: string[] = [];

    const dfs = (current: string, open: number, close: number) => {
        if (current.length === n * 2) {
            result.push(current);
            return;
        }

        if (open < n) {
            dfs( current+"(", open+1, close)
        }
        
        if (open > close) {
            dfs( current+")", open, close+1)
        }

    };

    dfs("", 0, 0);
    return result;
  };

  const generateParentheses3 = (n: number): string[] => {
    const result :string[] = [];

    const backtrack = (s: string, left: number, right: number) => {
      if (s.length === n * 2) {
        result.push(s);
        return;
      }

      if (left < n) {
        backtrack(s+'(', left+1, right);
      }

      if (left > right) {
        backtrack(s+')', left, right+1)
      }
    };


    backtrack('', 0, 0);
    return result;
  };

  // no recursion solution by copilot
  const generateParenthesesIterative = (n: number): string[] => {
    const result: string[] = [];
    const stack: { current: string; open: number; close: number }[] = [];
  
    // Start with an empty string and 0 open/close parentheses
    stack.push({ current: '', open: 0, close: 0 });
  
    while (stack.length > 0) {
      const { current, open, close } = stack.pop()!;
  
      // If the current string is valid and complete, add it to the result
      if (current.length === n * 2) {
        result.push(current);
        continue;
      }
  
      // Add a '(' if we haven't used all open parentheses
      if (open < n) {
        stack.push({ current: current + '(', open: open + 1, close });
      }
  
      // Add a ')' if the number of close parentheses is less than open
      if (close < open) {
        stack.push({ current: current + ')', open, close: close + 1 });
      }
    }
  
    return result;
  };

  const generateParenthesesIterative2 = (n: number): string[] => {
    const result: string[] = [];
    const stack: { current: string; open: number; close: number }[] = [];

    stack.push({current: '', open: 0, close: 0});
    while (stack.length > 0) {
      const curr = stack.pop()!;
      if (curr.current.length === n*2) {
        result.push(curr.current);
        continue;
      }

      if (curr.open < n) {
        stack.push({current: curr.current+'(', open: curr.open+1, close: curr.close});
      }

      if (curr.open > curr.close) {
        stack.push({current: curr.current+')', open: curr.open, close: curr.close+1});
      }
    }
  
    return result;
  };

  const handleGenerate = () => {
    //try {
      const num = parseInt(n, 10);  
      if (isNaN(num) || num < 0) {
        throw new Error('Invalid input');
      }
      const combinations = generateParenthesesIterative2(num);
      setResult(combinations);
    // } catch (error) {
    //   console.error('Invalid input');
    // }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Generate Well-Formed Parentheses
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Example: Input n = 3 → Output ["((()))","(()())","(())()","()(())","()()()"]
      </p>
      <TextField
        label="Enter number of pairs (n)"
        variant="outlined"
        fullWidth
        value={n}
        onChange={(e) => setN(e.target.value)}
        margin="normal"
        type="number"
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleGenerate}
        sx={{ mt: 2 }}
      >
        Generate Parentheses
      </Button>
      {result.length > 0 && (
        <Box mt={2}>
          <Typography variant="h6">
            Parentheses Combinations:
          </Typography>
          <Typography variant="body1">
            {JSON.stringify(result)}
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default GenerateParentheses;