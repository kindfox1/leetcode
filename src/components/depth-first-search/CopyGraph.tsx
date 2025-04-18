import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

interface Node {
  val: number;
  neighbors: Node[];
}

const CopyGraph = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string[]>([]);

  const buildGraph = (adjList: number[][]): Node => {
    const nodes = new Map<number, Node>();
    
    // Create all nodes first
    for (let i = 0; i < adjList.length; i++) {
      nodes.set(i + 1, { val: i + 1, neighbors: [] });
    }
    
    // Add neighbors
    for (let i = 0; i < adjList.length; i++) {
      const node = nodes.get(i + 1)!;
      for (const neighborVal of adjList[i]) {
        node.neighbors.push(nodes.get(neighborVal)!);
      }
    }
    
    return nodes.get(1)!;
  };

  const cloneGraph = (node: Node | null): Node | null => {
    if (!node) return null;
    
    const visited = new Map<Node, Node>();
    
    const dfs = (curr: Node): Node => {
      if (visited.has(curr)) return visited.get(curr)!;
      
      const copy = { val: curr.val, neighbors: [] };
      visited.set(curr, copy);
      
      for (const neighbor of curr.neighbors) {
        copy.neighbors.push(dfs(neighbor));
      }
      
      return copy;
    };
    
    return dfs(node);
  };

  const serializeGraph = (node: Node | null): string[] => {
    if (!node) return [];
    
    const result: string[] = [];
    const visited = new Set<Node>();
    
    const dfs = (curr: Node) => {
      if (visited.has(curr)) return;
      
      visited.add(curr);
      result.push(`Node ${curr.val}: [${curr.neighbors.map(n => n.val).join(', ')}]`);
      
      for (const neighbor of curr.neighbors) {
        dfs(neighbor);
      }
    };
    
    dfs(node);
    return result;
  };

  const handleClone = () => {
    try {
      const adjList = input.split(';').map(row => 
        row.split(',').map(Number)
      );
      const graph = buildGraph(adjList);
      const cloned = cloneGraph(graph);
      setResult(serializeGraph(cloned));
    } catch (error) {
      console.error('Invalid input');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Clone Graph
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Example: 2,4;1,3;2,4;1,3
      </p>
      <TextField
        label="Enter adjacency list (format: neighbors;neighbors)"
        variant="outlined"
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
        margin="normal"
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleClone}
        sx={{ mt: 2 }}
      >
        Clone Graph
      </Button>
      {result.length > 0 && (
        <Box mt={2}>
          <Typography variant="h6">
            Cloned Graph Structure:
          </Typography>
          {result.map((node, index) => (
            <Typography key={index} variant="body1">
              {node}
            </Typography>
          ))}
        </Box>
      )}
    </div>
  );
};

export default CopyGraph;