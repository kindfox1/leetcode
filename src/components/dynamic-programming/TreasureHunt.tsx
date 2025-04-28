import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const TreasureHunt = () => {
  const [treasure, setTreasure] = useState('');
  const [result, setResult] = useState<number | null>(null);

  /*
    Given an array treasure of non-negative integers, return the maximum amount of treasure you can collect 
    without collecting from two adjacent houses.

    Time Complexity: O(n), where n is the length of the treasure array.
    Space Complexity: O(1), as we use constant space for the calculations.
  */

  const maxTreasure = (treasure: number[]): number => {
    if (treasure.length === 0) return 0;
    if (treasure.length === 1) return treasure[0];

    let prev1 = 0; // Max treasure collected up to the previous house
    let prev2 = 0; // Max treasure collected up to the house before the previous house

    for (const t of treasure) {
      const current = Math.max(prev1, prev2 + t); // Either skip the current house or collect from it
      prev2 = prev1;
      prev1 = current;
    }

    return prev1;
  };

  const handleCalculate = () => {
    try {
      const treasureArray = JSON.parse(treasure);

      if (!Array.isArray(treasureArray) || treasureArray.some(isNaN) || treasureArray.some(t => t < 0)) {
        throw new Error('Invalid input');
      }

      const maxHaul = maxTreasure(treasureArray);
      setResult(maxHaul);
    } catch (error) {
      console.error('Invalid input');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Treasure Hunt
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Example: Input treasure = [3, 1, 4, 1, 5] → Best Haul: 12
      </p>
      <TextField
        label="Enter treasure values (comma-separated)"
        variant="outlined"
        fullWidth
        value={treasure}
        onChange={(e) => setTreasure(e.target.value)}
        margin="normal"
        type="text"
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleCalculate}
        sx={{ mt: 2 }}
      >
        Calculate Best Haul
      </Button>
      {result !== null && (
        <Box mt={2}>
          <Typography variant="h6">
            Best Haul:
          </Typography>
          <Typography variant="body1">
            {result}
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default TreasureHunt;