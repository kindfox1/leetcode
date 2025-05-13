import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const KahnsAlgorithm = () => {
  const [edges, setEdges] = useState('');
  const [numNodes, setNumNodes] = useState('');
  const [result, setResult] = useState<number[] | null>(null);

  /*
    Kahn's Algorithm for Topological Sorting:
    Given a directed acyclic graph (DAG) represented as a list of edges and the number of nodes, 
    return a topological ordering of the nodes.

    Time Complexity: O(V + E), where V is the number of vertices and E is the number of edges.
    Space Complexity: O(V + E), for storing the graph and in-degree array.
  */

  const kahnsAlgorithm = (numNodes: number, edges: number[][]): number[] | null => {
    const inDegree = Array(numNodes).fill(0);
    const graph: number[][] = Array.from({ length: numNodes }, () => []);

    // Build the graph and calculate in-degrees
    for (const [u, v] of edges) {
      graph[u].push(v);
      inDegree[v]++;
    }

    const queue: number[] = [];
    const topologicalOrder: number[] = [];

    // Add all nodes with in-degree 0 to the queue
    for (let i = 0; i < numNodes; i++) {
      if (inDegree[i] === 0) queue.push(i);
    }

    while (queue.length > 0) {
      const node = queue.shift()!;
      topologicalOrder.push(node);

      for (const neighbor of graph[node]) {
        inDegree[neighbor]--;
        if (inDegree[neighbor] === 0) queue.push(neighbor);
      }
    }

    // If the topological order doesn't include all nodes, the graph has a cycle
    return topologicalOrder.length === numNodes ? topologicalOrder : null;
  };

  const kahnsAlgorithm2 = (numNodes: number, edges: number[][]): number[] | null => {
    const inDegree = Array(numNodes).fill(0);
    const graph: number[][] = Array.from({ length: numNodes }, () => []);
    const topologicalOrder :number[] = [];
    const queue :number[] = [];

    // build adjacency list
    for (const [u, v] of edges) {
      graph[u].push(v);
      inDegree[v] += 1;
    }
    console.log(graph);
    console.log(inDegree);

    //find all node with 0 inDegree, and push to the queue
    for (let i=0; i<inDegree.length; i++) {
      if (inDegree[i]===0) queue.push(i);
    }

    //khan's algorithm
    while (queue.length > 0) {
      const node = queue.shift()!;
      topologicalOrder.push(node);
      for (const neighbor of graph[node]) {
        inDegree[neighbor] -= 1;
        if (inDegree[neighbor] === 0) {
          queue.push(neighbor);
        }
      }
    }
console.log(topologicalOrder);
    // If the topological order doesn't include all nodes, the graph has a cycle
    return topologicalOrder.length === numNodes ? topologicalOrder : null;
  };

  const handleGenerate = () => {
    //try {
      const edgesArray = JSON.parse(edges);
      const nodes = parseInt(numNodes, 10);

      if (
        !Array.isArray(edgesArray) ||
        edgesArray.some(edge => !Array.isArray(edge) || edge.length !== 2 || edge.some(isNaN)) ||
        isNaN(nodes) ||
        nodes <= 0
      ) {
        throw new Error('Invalid input');
      }

      const topologicalOrder = kahnsAlgorithm2(nodes, edgesArray);
      setResult(topologicalOrder);
    // } catch (error) {
    //   console.error('Invalid input');
    // }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Kahn's Algorithm for Topological Sorting
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Input edges = [[0,1],[1,2],[2,3]], numNodes = 4 → Output [0,1,2,3]
      </p>
      <p className="text-sm text-gray-600 mb-4">
        Input edges = [[0,1],[0,3],[1,2],[3,1],[3,5],[3,4],[4,5]], numNodes = 6 → Output [0,3,1,4,2,5]
      </p>
      <TextField
        label="Enter edges (as JSON array)"
        variant="outlined"
        fullWidth
        value={edges}
        onChange={(e) => setEdges(e.target.value)}
        margin="normal"
        type="text"
      />
      <TextField
        label="Enter number of nodes"
        variant="outlined"
        fullWidth
        value={numNodes}
        onChange={(e) => setNumNodes(e.target.value)}
        margin="normal"
        type="number"
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleGenerate}
        sx={{ mt: 2 }}
      >
        Generate Topological Order
      </Button>
      {result !== null && (
        <Box mt={2}>
          <Typography variant="h6">
            Topological Order:
          </Typography>
          <Typography variant="body1">
            {result ? JSON.stringify(result) : 'Graph has a cycle (no valid topological order)'}
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default KahnsAlgorithm;