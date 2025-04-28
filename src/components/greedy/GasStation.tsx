import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const GasStation = () => {
  const [gas, setGas] = useState('');
  const [cost, setCost] = useState('');
  const [result, setResult] = useState<number | null>(null);

  /*
    Given two integer arrays gas and cost, return the starting gas station's index if you can travel 
    around the circuit once in the clockwise direction; otherwise, return -1.

    Time Complexity: O(n), where n is the length of the gas and cost arrays.
    Space Complexity: O(1), as we use constant space.
  */

  const canCompleteCircuit = (gas: number[], cost: number[]): number => {
    let totalGas = 0;
    let totalCost = 0;
    let startIndex = 0;
    let currentGas = 0;

    for (let i = 0; i < gas.length; i++) {
      totalGas += gas[i];
      totalCost += cost[i];
      currentGas += gas[i] - cost[i];

      if (currentGas < 0) {
        // If currentGas is negative, reset the start index to the next station
        startIndex = i + 1;
        currentGas = 0;
      }
    }

    return totalGas >= totalCost ? startIndex : -1;
  };

  //[5,2,0,3,3]  [1,5,5,1,1] 

  const canCompleteCircuit2 = (gas: number[], cost: number[]): number => {
    let startStation = 0;
    let currentGas = 0;
    let totalGas = 0;
    let totalCost = 0;

    for (let i=0; i < gas.length; i++) {
        totalGas += gas[i];
        totalCost += cost[i];
        currentGas += gas[i] - cost[i];
        if (currentGas < 0) {
            currentGas = 0;
            startStation = i+1;
        }
    }

    return totalGas >= totalCost ? startStation : -1;
  }

  const handleCalculate = () => {
    try {
      const gasArray = JSON.parse(gas);
      const costArray = JSON.parse(cost);

      if (
        !Array.isArray(gasArray) ||
        !Array.isArray(costArray) ||
        gasArray.some(isNaN) ||
        costArray.some(isNaN) ||
        gasArray.length !== costArray.length
      ) {
        throw new Error('Invalid input');
      }

      const startIndex = canCompleteCircuit2(gasArray, costArray);
      setResult(startIndex);
    } catch (error) {
      console.error('Invalid input');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Gas Station
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Example: Input gas = [5,2,0,3,3], cost = [1,5,5,1,1] → Output: 3
      </p>
      <TextField
        label="Enter gas array (as JSON array)"
        variant="outlined"
        fullWidth
        value={gas}
        onChange={(e) => setGas(e.target.value)}
        margin="normal"
        type="text"
      />
      <TextField
        label="Enter cost array (as JSON array)"
        variant="outlined"
        fullWidth
        value={cost}
        onChange={(e) => setCost(e.target.value)}
        margin="normal"
        type="text"
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleCalculate}
        sx={{ mt: 2 }}
      >
        Calculate Starting Gas Station
      </Button>
      {result !== null && (
        <Box mt={2}>
          <Typography variant="h6">
            Starting Gas Station Index:
          </Typography>
          <Typography variant="body1">
            {result}
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default GasStation;