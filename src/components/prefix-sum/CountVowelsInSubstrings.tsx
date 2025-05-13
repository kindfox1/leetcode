import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const CountVowelsInSubstrings = () => {
  const [word, setWord] = useState('');
  const [queries, setQueries] = useState('');
  const [results, setResults] = useState<number[]>([]);

  /*
    Given a string word and a list of queries [left, right], return a list of integers where each integer 
    represents the count of vowels in the substring word[left:right + 1].

    Time Complexity: O(n + q), where n is the length of the word and q is the number of queries.
    Space Complexity: O(n), for the prefix sum array.
  */

  const countVowels = (word: string, queries: number[][]): number[] => {
    const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
    const prefixSum = Array(word.length + 1).fill(0);

    // Build the prefix sum array
    for (let i = 0; i < word.length; i++) {
      prefixSum[i + 1] = prefixSum[i] + (vowels.has(word[i]) ? 1 : 0);
    }

    // Process each query
    const results: number[] = [];
    for (const [left, right] of queries) {
      results.push(prefixSum[right + 1] - prefixSum[left]);
    }

    return results;
  };

  const countVowels2 = (word: string, queries: number[][]): number[] => {
    const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
    const prefixSum = Array(word.length + 1).fill(0);
    const results: number[] = [];

    for (let i=0; i < word.length; i++) {
        if (vowels.has(word[i])) {
            prefixSum[i+1] = prefixSum[i] + 1;
        } else {
            prefixSum[i+1] = prefixSum[i];
        }
    }

    for (const [start, end] of queries) {
        results.push(prefixSum[end+1] - prefixSum[start]);
    }

    return results;
  };

  // prefixsum
  const countVowels3 = (word: string, queries: number[][]): number[] => {
    const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
    const prefixSum = Array(word.length + 1).fill(0);
    const results: number[] = [];

    // build the prefix
    for (let i=1; i<=word.length; i++) {
      const char = word[i-1];
      if (vowels.has(char)) {
        prefixSum[i] = prefixSum[i-1] + 1;
      } else {
        prefixSum[i] = prefixSum[i-1];
      }
    }

    for (const query of queries) {
      let count = prefixSum[query[1]+1] - prefixSum[query[0]+1];
      results.push(count);
    }

    console.log(prefixSum);

    return results;
  };

  const handleCalculate = () => {
    try {
      const queriesArray = JSON.parse(queries);

      if (
        !Array.isArray(queriesArray) ||
        queriesArray.some(
          (query) =>
            !Array.isArray(query) ||
            query.length !== 2 ||
            query.some((index) => typeof index !== 'number' || index < 0 || index >= word.length)
        )
      ) {
        throw new Error('Invalid input');
      }

      const results = countVowels3(word, queriesArray);
      setResults(results);
    } catch (error) {
      console.error('Invalid input');
      setResults([]);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Count Vowels in Substrings
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Example: Input word = "prefixsum", queries = [[0, 2], [1, 4], [3, 5]] → Output: [1, 2, 1]
      </p>
      <TextField
        label="Enter word"
        variant="outlined"
        fullWidth
        value={word}
        onChange={(e) => setWord(e.target.value)}
        margin="normal"
        type="text"
      />
      <TextField
        label="Enter queries (as JSON array)"
        variant="outlined"
        fullWidth
        value={queries}
        onChange={(e) => setQueries(e.target.value)}
        margin="normal"
        type="text"
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleCalculate}
        sx={{ mt: 2 }}
      >
        Calculate Vowel Counts
      </Button>
      {results.length > 0 && (
        <Box mt={2}>
          <Typography variant="h6">
            Results:
          </Typography>
          <Typography variant="body1">
            {JSON.stringify(results)}
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default CountVowelsInSubstrings;