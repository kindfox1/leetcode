import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const WordBreak = () => {
  const [s, setS] = useState('');
  const [wordDict, setWordDict] = useState('');
  const [result, setResult] = useState<boolean | null>(null);

  /*
    Given a string s and a dictionary of strings wordDict, return true if s can be segmented into 
    a space-separated sequence of one or more dictionary words.

    Time Complexity: O(n^2), where n is the length of the string s.
    Space Complexity: O(n), for the dp array.
    https://www.hellointerview.com/learn/code/dynamic-programming/word-break
    https://www.youtube.com/watch?v=Sx9NNgInc3A 
  */

  const wordBreak = (s: string, wordDict: string[]): boolean => {
    const wordSet = new Set(wordDict);
    const dp = Array(s.length + 1).fill(false);
    dp[0] = true; // Base case: empty string can always be segmented

    for (let i = 1; i <= s.length; i++) {
      for (let j = 0; j < i; j++) {
        if (dp[j] && wordSet.has(s.slice(j, i))) {
          dp[i] = true;
          break;
        }
      }
    }

    return dp[s.length];
  };


  // alternate solution, this one is easier to understand
  function wordBreak2(s: string, wordDict: string[]): boolean {
    const dp: boolean[] = new Array(s.length + 1).fill(false);
    dp[0] = true; // Empty string is a valid break

    for (let i = 1; i <= s.length; i++) {
        for (const word of wordDict) {
            if (i >= word.length && dp[i - word.length]) {
                const sub = s.slice(i - word.length, i);
                if (sub === word) {
                    dp[i] = true;
                    break;
                }
            }
        }
    }

    return dp[s.length];
}


  const handleCalculate = () => {
    try {
      const wordArray = JSON.parse(wordDict);

      if (!Array.isArray(wordArray) || wordArray.some(word => typeof word !== 'string')) {
        throw new Error('Invalid word dictionary input');
      }

      const canSegment = wordBreak(s, wordArray);
      setResult(canSegment);
    } catch (error) {
      console.error('Invalid input');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Word Break
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Example: Input s = "leetcode", wordDict = ["leet", "code"] → Output: true
      </p>
      <TextField
        label="Enter string (s)"
        variant="outlined"
        fullWidth
        value={s}
        onChange={(e) => setS(e.target.value)}
        margin="normal"
        type="text"
      />
      <TextField
        label="Enter word dictionary (as JSON array)"
        variant="outlined"
        fullWidth
        value={wordDict}
        onChange={(e) => setWordDict(e.target.value)}
        margin="normal"
        type="text"
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleCalculate}
        sx={{ mt: 2 }}
      >
        Check Word Break
      </Button>
      {result !== null && (
        <Box mt={2}>
          <Typography variant="h6">
            Can the string be segmented?:
          </Typography>
          <Typography variant="body1">
            {result ? 'Yes' : 'No'}
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default WordBreak;