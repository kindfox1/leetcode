import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const AdjacencyList = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string[]>([]);

  const buildGraph = (edges: number[][]): Map<number, number[]> => {
    const graph = new Map<number, number[]>();
    
    for (const [u, v] of edges) {
      if (!graph.has(u)) graph.set(u, []);
      if (!graph.has(v)) graph.set(v, []);
      
      graph.get(u)!.push(v);
      graph.get(v)!.push(u);
    }
    
    return graph;
  };

  const dfs = (graph: Map<number, number[]>, start: number): string[] => {
    const visited = new Set<number>();
    const path: string[] = [];
    
    const traverse = (node: number) => {
      visited.add(node);
      path.push(`Visit node ${node}`);
      
      for (const neighbor of graph.get(node) || []) {
        if (!visited.has(neighbor)) {
          path.push(`Edge ${node} -> ${neighbor}`);
          traverse(neighbor);
        }
      }
    };
    
    traverse(start);
    return path;
  };

  const handleTraverse = () => {
    try {
      const edges = input.split(';').map(edge => 
        edge.split(',').map(Number)
      );
      const graph = buildGraph(edges);
      const traversalPath = dfs(graph, edges[0][0]);
      setResult(traversalPath);
    } catch (error) {
      console.error('Invalid input');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        DFS on Adjacency List
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Example: 0,1;1,2;2,0
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
        onClick={handleTraverse}
        sx={{ mt: 2 }}
      >
        Traverse Graph
      </Button>
      {result.length > 0 && (
        <Box mt={2}>
          <Typography variant="h6">
            DFS Traversal:
          </Typography>
          {result.map((step, index) => (
            <Typography key={index} variant="body1">
              {step}
            </Typography>
          ))}
        </Box>
      )}
    </div>
  );
};

export default AdjacencyList;