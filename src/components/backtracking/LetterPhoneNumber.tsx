import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const LetterPhoneNumber = () => {
  const [digits, setDigits] = useState('');
  const [result, setResult] = useState<string[]>([]);

  /*
    Given a string containing digits from 2-9 inclusive, return all possible letter combinations 
    that the number could represent. Return an empty array if no digits are provided.

    Time Complexity: O(4^n), where n is the length of the input digits.
    Space Complexity: O(n), for the recursion stack.
  */

  const letterCombinations = (digits: string): string[] => {
    if (!digits) return [];

    const phoneMap: Record<string, string[]> = {
      '2': ['a', 'b', 'c'],
      '3': ['d', 'e', 'f'],
      '4': ['g', 'h', 'i'],
      '5': ['j', 'k', 'l'],
      '6': ['m', 'n', 'o'],
      '7': ['p', 'q', 'r', 's'],
      '8': ['t', 'u', 'v'],
      '9': ['w', 'x', 'y', 'z'],
    };

    const combinations: string[] = [];
    const backtrack = (index: number, path: string) => {
      if (path.length === digits.length) {
        combinations.push(path);
        return;
      }

      const letters = phoneMap[digits[index]];
      for (const letter of letters) {
        backtrack(index + 1, path + letter);
      }
    };

    backtrack(0, '');
    return combinations;
  };

  const handleGenerate = () => {
    try {
      const combinations = letterCombinations(digits);
      setResult(combinations);
    } catch (error) {
      console.error('Invalid input');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Letter Combinations of a Phone Number
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Example: Input "23" → Output ["ad","ae","af","bd","be","bf","cd","ce","cf"]
      </p>
      <TextField
        label="Enter digits (2-9)"
        variant="outlined"
        fullWidth
        value={digits}
        onChange={(e) => setDigits(e.target.value)}
        margin="normal"
        type="text"
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

export default LetterPhoneNumber;