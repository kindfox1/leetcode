import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const AssignCookies = () => {
  const [greeds, setGreeds] = useState('');
  const [cookies, setCookies] = useState('');
  const [result, setResult] = useState<number | null>(null);

  /*
    Given two integer arrays greeds and cookies, return the maximum number of children that can be satisfied.

    Time Complexity: O(n log n + m log m), where n is the size of greeds and m is the size of cookies (due to sorting).
    Space Complexity: O(1), as we use constant space.
  */

  const findContentChildren = (greeds: number[], cookies: number[]): number => {
    greeds.sort((a, b) => a - b); // Sort greeds in ascending order
    cookies.sort((a, b) => a - b); // Sort cookies in ascending order

    let i = 0; // Pointer for greeds
    let j = 0; // Pointer for cookies
    let satisfied = 0;

    while (i < greeds.length && j < cookies.length) {
      if (cookies[j] >= greeds[i]) {
        satisfied++; // A child is satisfied
        i++; // Move to the next child
      }
      j++; // Move to the next cookie
    }

    return satisfied;
  };

  const findContentChildren2 = (greeds: number[], cookies: number[]): number => {
    greeds.sort((a, b) => a - b); // Sort greeds in ascending order
    cookies.sort((a, b) => a - b); // Sort cookies in ascending order
    let satisfied = 0;

    let i = 0;
    let j = 0;

    while (i < greeds.length && j < cookies.length) {
        if (greeds[i] <= cookies[j]) {
            i++;
            satisfied++;
        }
        j++;
    }

    return satisfied;
  };

  const handleCalculate = () => {
    try {
      const greedsArray = JSON.parse(greeds);
      const cookiesArray = JSON.parse(cookies);

      if (
        !Array.isArray(greedsArray) ||
        !Array.isArray(cookiesArray) ||
        greedsArray.some(isNaN) ||
        cookiesArray.some(isNaN)
      ) {
        throw new Error('Invalid input');
      }

      const maxSatisfied = findContentChildren2(greedsArray, cookiesArray);
      setResult(maxSatisfied);
    } catch (error) {
      console.error('Invalid input');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Assign Cookies
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        greeds = [1, 2, 3], cookies = [1, 1] → Output: 1
      </p>
      <p className="text-sm text-gray-600 mb-4">greeds = [1, 3, 3, 4], cookies = [2, 2, 3, 3] → Output: 3</p> 
      <TextField
        label="Enter greeds (as JSON array)"
        variant="outlined"
        fullWidth
        value={greeds}
        onChange={(e) => setGreeds(e.target.value)}
        margin="normal"
        type="text"
      />
      <TextField
        label="Enter cookies (as JSON array)"
        variant="outlined"
        fullWidth
        value={cookies}
        onChange={(e) => setCookies(e.target.value)}
        margin="normal"
        type="text"
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleCalculate}
        sx={{ mt: 2 }}
      >
        Calculate Maximum Satisfied Children
      </Button>
      {result !== null && (
        <Box mt={2}>
          <Typography variant="h6">
            Maximum Satisfied Children:
          </Typography>
          <Typography variant="body1">
            {result}
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default AssignCookies;