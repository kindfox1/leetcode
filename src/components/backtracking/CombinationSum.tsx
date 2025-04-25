import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const CombinationSum = () => {
  const [candidates, setCandidates] = useState('');
  const [target, setTarget] = useState('');
  const [result, setResult] = useState<number[][]>([]);

  /*
    Given an array of distinct integers candidates and a target integer target, 
    generate all unique combinations of candidates which sum to target. 
    The same number may be chosen from candidates an unlimited number of times.

    Time Complexity: O(2^t), where t is the target value.
    Space Complexity: O(t), for the recursion stack.
  */

  const combinationSum = (candidates: number[], target: number): number[][] => {
    const result: number[][] = [];
    const backtrack = (start: number, current: number[], remaining: number) => {
      if (remaining === 0) {
        result.push([...current]);
        return;
      }

      if (remaining < 0) return;

      for (let i = start; i < candidates.length; i++) {
        current.push(candidates[i]);
        backtrack(i, current, remaining - candidates[i]); // Allow reuse of the same element
        current.pop(); // Backtrack
      }
    };

    backtrack(0, [], target);
    return result;
  };

  const combinationSum2 = (candidates: number[], target: number): number[][] => {
    const result: number[][] = [];

    const backtracking = (start: number, current: number[], remaining: number) => {
        if (0 === remaining) {
            result.push(current);
            return;
        }

        if (0 > remaining) {
            return;
        }

        for (let i=start; i< candidates.length; i++) {
            current.push(candidates[i]);
            backtracking(i, current, remaining - candidates[i]);
            current.pop();
        }
        backtracking(start+1, [...current, candidates[start]], remaining-candidates[start] );
    };


    backtracking(0, [], target);
    return result;
  };

  const handleGenerate = () => {
    try {
      const candidatesArray = JSON.parse(candidates);
      const targetValue = parseInt(target, 10);

      if (
        !Array.isArray(candidatesArray) ||
        candidatesArray.some(isNaN) ||
        isNaN(targetValue) ||
        targetValue < 0
      ) {
        throw new Error('Invalid input');
      }

      const combinations = combinationSum(candidatesArray, targetValue);
      setResult(combinations);
    } catch (error) {
      console.error('Invalid input');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Generate Combination Sum
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Example: Input candidates = [2,3,6,7], target = 7 → Output [[2,2,3],[7]]
      </p>
      <TextField
        label="Enter candidates (comma-separated)"
        variant="outlined"
        fullWidth
        value={candidates}
        onChange={(e) => setCandidates(e.target.value)}
        margin="normal"
        type="text"
      />
      <TextField
        label="Enter target"
        variant="outlined"
        fullWidth
        value={target}
        onChange={(e) => setTarget(e.target.value)}
        margin="normal"
        type="number"
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleGenerate}
        sx={{ mt: 2 }}
      >
        Generate Combinations
      </Button>
      {result.length > 0 && (
        <Box mt={2}>
          <Typography variant="h6">
            Combinations:
          </Typography>
          <Typography variant="body1">
            {JSON.stringify(result)}
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default CombinationSum;