import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import Heap from 'heap-js';

interface Edge {
  to: number;
  weight: number;
}

const MinSpanningTree = () => {
  const [vertices, setVertices] = useState('');
  const [edges, setEdges] = useState('');
  const [result, setResult] = useState<number | null>(null);

  /*
  n=4 and edges=[[0,1,10],[1,2,6],[2,3,4],[0,2,6],[0,3,5]]
  output = 15
           5
      0 ------- 3
                |
                | 4
                |
                2
                |
                | 6
                |
                1

  */
  const findMinimumSpanningTree = (n: number, edges: [number, number, number][]): number => {
    // Create adjacency list
    const graph = new Map<number, Edge[]>();
    for (let i = 0; i < n; i++) {
      graph.set(i, []);
    }
    console.log('graph', graph);
    // Add edges to graph
    for (const [from, to, weight] of edges) {
      graph.get(from)!.push({ to, weight });
      graph.get(to)!.push({ to: from, weight });
    }

    
    
    // Prim's algorithm
    const visited = new Set<number>();
    const minHeap = new Heap<[number, number]>((a, b) => a[1] - b[1]); // [vertex, weight] sorted by the weight
    let totalWeight = 0;
    
    // Start from vertex 0
    minHeap.push([0, 0]);
    
    while (minHeap.length > 0 && visited.size < n) {
      const [vertex, weight] = minHeap.pop()!;
      
      if (visited.has(vertex)) continue;
      
      visited.add(vertex);
      totalWeight += weight;
      
      // Add all edges from current vertex
      for (const edge of graph.get(vertex)!) {
        if (!visited.has(edge.to)) {
          minHeap.push([edge.to, edge.weight]);
        }
      }
    }
    
    return visited.size === n ? totalWeight : -1;
  };

  const findMinimumSpanningTree2 = (n: number, edges: [number, number, number][]): number => {
    const graph = new Map<number, [number, number][]>(); // {fromVertex: [toVertex, weight]}
    //const minHeap = new Heap((a: [number, number], b: [number, number]) => a[1] - b[1]);
    const minHeap = new Heap<[number, number]>((a, b) => a[1] - b[1]); 
    const visited = new Set<number>();
    let totalWeight = 0;

    // create a graph with edges
    for (let i=0; i<n; i++) {
      graph.set(i, []);
    }

    console.log(graph);

    // fill the graph and adjacency list
    for (const [from, to, weight] of edges) {
      if (graph.get(from)) {
        graph.get(from)!.push([to, weight]);
        graph.get(to)!.push([from, weight]);
      }
    }

    //prim's algorithm
    minHeap.push([0,0]);
console.log(minHeap.length);
    while (visited.size < n && minHeap.length > 0) {
      console.log('======= while ========');
      const [vertex, weight] = minHeap.pop()!;
      if (visited.has(vertex)) continue;
      totalWeight += weight;
      visited.add(vertex);

      console.log('vertex', vertex);
      console.log('weight', weight);
      console.log('graph.get(vertex)', graph.get(vertex));

      for (const neighbor of graph.get(vertex)!) {
        console.log('neighbor', neighbor);
        if (!visited.has(neighbor[0])) { // make sure to is not visited
          console.log('pushing nei', neighbor);
          minHeap.push(neighbor);
        }
      }
    }

    return visited.size===n ? totalWeight : -1;
  };

  const handleCalculate = () => {
    try {
      const n = parseInt(vertices);
      const edgeList = JSON.parse(edges);
      setResult(findMinimumSpanningTree2(n, edgeList));
    } catch (error) {
      console.error('Invalid input');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Minimum Spanning Tree
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Vertices: 4, Edges: [[0,1,10],[1,2,6],[2,3,4],[0,2,6],[0,3,5]], output: 15
      </p>
      <TextField
        label="Enter number of vertices"
        variant="outlined"
        fullWidth
        value={vertices}
        onChange={(e) => setVertices(e.target.value)}
        margin="normal"
        type="number"
      />
      <TextField
        label="Enter edges (format: from,to,weight;from,to,weight)"
        variant="outlined"
        fullWidth
        value={edges}
        onChange={(e) => setEdges(e.target.value)}
        margin="normal"
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleCalculate}
        sx={{ mt: 2 }}
      >
        Calculate MST
      </Button>
      {result !== null && (
        <Box mt={2}>
          <Typography variant="h6">
            {result === -1 ? 
              'No valid minimum spanning tree found' : 
              `Minimum spanning tree weight: ${result}`}
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default MinSpanningTree;