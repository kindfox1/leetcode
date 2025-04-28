import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const DecodeWays = () => {
  const [s, setS] = useState('');
  const [result, setResult] = useState<number | null>(null);

  /*
    Given a string s containing only digits, return the number of ways to decode it using the mapping:
    '1' -> "A", '2' -> "B", ..., '26' -> "Z".

    Time Complexity: O(n), where n is the length of the string.
    Space Complexity: O(1), as we use constant space for the calculations.
  */

  const numDecodings = (s: string): number => {
    if (s.length === 0 || s[0] === '0') return 0;

    let prev1 = 1; // Ways to decode up to the previous character
    let prev2 = 1; // Ways to decode up to the character before the previous one

    for (let i = 1; i < s.length; i++) {
      const current = parseInt(s[i], 10);
      const twoDigit = parseInt(s.slice(i - 1, i + 1), 10);

      console.log('************************** i=',i);
      console.log('current', current);
      console.log('two-dig', twoDigit);

      let currentWays = 0;

      // Check if the current digit is valid
      if (current >= 1 && current <= 9) {
        currentWays += prev1;
      }

      // Check if the two-digit number is valid
      if (twoDigit >= 10 && twoDigit <= 26) {
        currentWays += prev2;
      }

      prev2 = prev1;
      prev1 = currentWays;
      console.log('currentWays', currentWays);
      console.log('prev1', prev1);
      console.log('prev2', prev2);
    }

    return prev1;
  };

    //ChatGPT inter HelloInterview
    function numDecodings2(s: string): number {
        if (!s || s[0] === '0') {
            return 0;
        }

        const n = s.length;
        const dp: number[] = new Array(n + 1).fill(0);
        dp[0] = 1;
        dp[1] = 1;

        for (let i = 2; i <= n; i++) {
            const oneDigit = parseInt(s[i - 1], 10);
            const twoDigits = parseInt(s.slice(i - 2, i), 10);

            if (oneDigit !== 0) {
                dp[i] += dp[i - 1];
            }

            if (twoDigits >= 10 && twoDigits <= 26) {
                dp[i] += dp[i - 2];
            }
        }

        return dp[n];
    }

    // Use memory cache to remember the subset way, but it require recursive calls
    function numDecodings3(s: string): number {
        const dp: { [key: number]: number } = { [s.length]: 1 }; //all single digit has 1 way to decode
    
        function dfs(i: number): number {
            if (i in dp) {
                return dp[i];
            }
    
            if (s[i] === "0") {
                return 0;
            }
    
            // one digit
            let res = dfs(i + 1);
    
            // 2 digits
            if (
                i + 1 < s.length &&
                (s[i] === "1" || (s[i] === "2" && "0123456".includes(s[i + 1])))
            ) {
                res += dfs(i + 2);
            }
    
            dp[i] = res;
            return res;
        }
    
        return dfs(0);
    }
    


  const handleCalculate = () => {
    try {
      if (!/^\d*$/.test(s)) {
        throw new Error('Invalid input');
      }

      const ways = numDecodings(s);
      setResult(ways);
    } catch (error) {
      console.error('Invalid input');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Decode Ways
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Example: Input s = "101" → Output: 1
      </p>
      <TextField
        label="Enter a string of digits (s)"
        variant="outlined"
        fullWidth
        value={s}
        onChange={(e) => setS(e.target.value)}
        margin="normal"
        type="text"
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleCalculate}
        sx={{ mt: 2 }}
      >
        Calculate Ways
      </Button>
      {result !== null && (
        <Box mt={2}>
          <Typography variant="h6">
            Number of Ways:
          </Typography>
          <Typography variant="body1">
            {result}
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default DecodeWays;