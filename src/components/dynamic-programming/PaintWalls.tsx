import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

// DP solution for the Paint Walls problem
function paintWalls(cost: number[], time: number[]): number {
  const n = cost.length;
  // dp[i]: minimum cost to paint i walls
  const dp = new Array(n + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 0; i < n; i++) {
    // Traverse backwards to avoid overwriting needed states
    for (let j = n; j >= 0; j--) {
      // If we pay for wall i, we can paint (time[i] + 1) walls (including this one)
      const next = Math.min(n, j + time[i] + 1);
      dp[next] = Math.min(dp[next], dp[j] + cost[i]);
    }
  }
  return dp[n];
}

const PaintWalls = () => {
  const [costInput, setCostInput] = useState('');
  const [timeInput, setTimeInput] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = () => {
    try {
      const cost = JSON.parse(costInput);
      const time = JSON.parse(timeInput);
      const minCost = paintWalls(cost, time);
      setResult(minCost);
    } catch (error) {
      setResult(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Paint Walls - Minimum Cost
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Enter cost and time arrays as JSON. Example:<br />
        cost: [1,2,3,2]<br />
        time: [1,2,3,2]
      </p>
      <TextField
        label="Cost (JSON array)"
        variant="outlined"
        fullWidth
        value={costInput}
        onChange={(e) => setCostInput(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Time (JSON array)"
        variant="outlined"
        fullWidth
        value={timeInput}
        onChange={(e) => setTimeInput(e.target.value)}
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleCalculate}
        sx={{ mt: 2 }}
      >
        Calculate Minimum Cost
      </Button>
      {result !== null && (
        <Box mt={2}>
          <Typography variant="h6">Minimum Cost:</Typography>
          <Typography>{result}</Typography>
        </Box>
      )}
    </div>
  );
};

export default PaintWalls;