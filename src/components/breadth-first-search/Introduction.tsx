import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const Introduction = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<number[]>([]);

  const bfs = (root: number, graph: Map<number, number[]>): number[] => {
    const visited = new Set<number>();
    const queue: number[] = [root];
    const result: number[] = [];

    while (queue.length > 0) {
      const current = queue.shift()!;
      if (!visited.has(current)) {
        visited.add(current);
        result.push(current);
        const neighbors = graph.get(current) || [];
        queue.push(...neighbors);
      }
    }

    return result;
  };

  const handleCalculate = () => {
    try {
      const edges = input.split(';').map(pair => pair.split(',').map(Number));
      const graph = new Map<number, number[]>();
      
      for (const [from, to] of edges) {
        if (!graph.has(from)) graph.set(from, []);
        if (!graph.has(to)) graph.set(to, []);
        graph.get(from)!.push(to);
      }

      setResult(bfs(edges[0][0], graph));
    } catch (error) {
      console.error('Invalid input format');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        BFS Introduction
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Example: 1,2;1,3;2,4;2,5;3,6
      </p>
      <TextField
        label="Enter edges (format: from,to;from,to)"
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
        Run BFS
      </Button>
      {result.length > 0 && (
        <Box mt={2}>
          <Typography variant="h6">
            BFS Traversal Order:
          </Typography>
          <Typography variant="body1">
            [{result.join(' → ')}]
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default Introduction;