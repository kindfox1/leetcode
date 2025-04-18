import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import Heap from 'heap-js';

const PassingValues = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const connectSticks = (sticks: number[]): number => {
    const minHeap = new Heap<number>((a, b) => a - b);
    let totalCost = 0;
    
    // Add all sticks to min heap
    for (const stick of sticks) {
      minHeap.push(stick);
    }
    
    // Connect sticks until only one remains
    while (minHeap.length > 1) {
      const first = minHeap.pop()!;
      const second = minHeap.pop()!;
      const cost = first + second;
      totalCost += cost;
      minHeap.push(cost);
    }
    
    return totalCost;
  };

  const handleCalculate = () => {
    try {
      const sticks = input.split(',').map(Number);
      setResult(connectSticks(sticks));
    } catch (error) {
      console.error('Invalid input');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Minimum Cost to Connect Sticks
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Example: 2,4,3
      </p>
      <TextField
        label="Enter stick lengths (comma-separated)"
        variant="outlined"
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
        margin="normal"
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleCalculate}
        sx={{ mt: 2 }}
      >
        Calculate Cost
      </Button>
      {result !== null && (
        <Box mt={2}>
          <Typography variant="h6">
            Minimum cost to connect sticks: {result}
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default PassingValues;