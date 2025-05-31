import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const minDistance = (word1: string, word2: string): number => {
  const m = word1.length;
  const n = word2.length;

  // Create a 2D DP array
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  // Fill the DP table from top-left to bottom-right.
  for (let i = 0; i <= m; i++) {
    for (let j = 0; j <= n; j++) {
      if (i === 0) {
        dp[i][j] = j; // Insert all characters of word2
      } else if (j === 0) {
        dp[i][j] = i; // Delete all characters of word1
      } else if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1]; // Characters match, no operation needed
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]); // Min of insert, delete, replace
      }
    }
  }
    console.log(dp);
  return dp[m][n];
};

const minDistanceGpt = (word1: string, word2: string): number => {
    const m = word1.length;
    const n = word2.length;
  
    // Build (m + 1) × (n + 1) matrix filled with +∞
    const cache: number[][] = Array.from({ length: m + 1 }, () =>
      new Array(n + 1).fill(Number.POSITIVE_INFINITY)
    );
  
    // Base cases: distance to transform suffix into empty string
    for (let j = 0; j <= n; j++) cache[m][j] = n - j; // deletions in word2
    for (let i = 0; i <= m; i++) cache[i][n] = m - i; // deletions in word1
  
    // Fill from bottom‑right to top‑left
    for (let i = m - 1; i >= 0; i--) {
      for (let j = n - 1; j >= 0; j--) {
        if (word1[i] === word2[j]) {
          cache[i][j] = cache[i + 1][j + 1]; // characters match, no cost
        } else {
            console.log('i, j', i, j);
          cache[i][j] =
            1 +
            Math.min(
              cache[i + 1][j],     // delete from word1
              cache[i][j + 1],     // insert into word1
              cache[i + 1][j + 1]  // substitute
            );
            console.log('cache[i][j]', cache[i][j]);
        }
      }
    }
  console.log(cache);
    return cache[0][0];
  }

const MinEditDistance = () => {
  const [word1, setWord1] = useState('');
  const [word2, setWord2] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = () => {
    try {
      const distance = minDistanceGpt(word1, word2);
      setResult(distance);
    } catch (error) {
      console.error('Error calculating minimum edit distance', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Minimum Edit Distance
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Example: word1 = "horse", word2 = "ros" → Output: 3
      </p>
      <TextField
        label="Enter Word 1"
        variant="outlined"
        fullWidth
        value={word1}
        onChange={(e) => setWord1(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Enter Word 2"
        variant="outlined"
        fullWidth
        value={word2}
        onChange={(e) => setWord2(e.target.value)}
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleCalculate}
        sx={{ mt: 2 }}
      >
        Calculate Minimum Edit Distance
      </Button>
      {result !== null && (
        <Box mt={2}>
          <Typography variant="h6">Minimum Edit Distance:</Typography>
          <Typography>{result}</Typography>
        </Box>
      )}
    </div>
  );
};

export default MinEditDistance;