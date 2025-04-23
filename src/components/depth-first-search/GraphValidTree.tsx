import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

interface Node {
  val: number;
  neighbors: Node[];
}

class IntGraphNode {
  value: number;
  neighbors: IntGraphNode[];

  constructor(value: number = 0, neighbors: IntGraphNode[] = []) {
    this.value = value;
    this.neighbors = neighbors;
  }
}

const GraphValidTree = () => {
  const [input, setInput] = useState('');
  const [numNodes, setNumNodes] = useState('');
  const [result, setResult] = useState<string>('');

  // const buildGraph = (adjList: number[][]): Node => {
  //   const nodes = new Map<number, Node>();
    
  //   // Create all nodes first
  //   for (let i = 0; i < adjList.length; i++) {
  //     nodes.set(i + 1, { val: i + 1, neighbors: [] });
  //   }
    
  //   // Add neighbors
  //   for (let i = 0; i < adjList.length; i++) {
  //     const node = nodes.get(i + 1)!;
  //     for (const neighborVal of adjList[i]) {
  //       node.neighbors.push(nodes.get(neighborVal)!);
  //     }
  //   }
    
  //   return nodes.get(1)!;
  // };

  const buildGraph = (n: number, edges: number[][]): Record<number, number[]> => {
    const adjList: Record<number, number[]> = {};
  
    for (const [u, v] of edges) {
      if (adjList[u]) {
        adjList[u].push(v);
      } else {
        adjList[u] = [v];
      }

      if (adjList[v]) {
        adjList[v].push(u);
      } else {
        adjList[v] = [u];
      }
    }
  
    return adjList;
  }

  function validateGraph(numNodes: number, edges: number[][]): boolean {
    const adjList: Record<number, number[]> = {};
    const visited = new Set<number>();
    const graph = buildGraph(numNodes, edges);
    const size = Object.keys(graph);
    console.log(size);

    let tempNum = 0

    for (let i=0; i<edges.length; i++) {
        const oneEdge = edges[i];
        const oneGraph = buildGraph(2, [edges[i]]);
        console.log('oneGraph', JSON.stringify(oneGraph));
        tempNum = Object.keys(oneGraph).length;
        console.log('tempNum', tempNum);
    }


   
  
    return true;
  }

  function validTree(n: number, edges: number[][]): boolean {
    const adjList: number[][] = Array.from({ length: n }, () => []);
    
    for (const [u, v] of edges) {
        if (adjList[u]) {
            adjList[u].push(v);
        } else {
            adjList[u] = [v];
        }

        if (adjList[v]) {
            adjList[v].push(u);
        } else {
            adjList[v] = [u];
        }
    }
    console.log('adjList', adjList);
    const visited: boolean[] = Array(n).fill(false);
    if (hasCycle(adjList, 0, visited, -1)) {
        console.log('in has cycle');
      return false;
    }
  
    console.log('check if all visited', visited.every(v => v));
    return visited.every(v => v); //check if all node are visited
  }
  
  function hasCycle(
    adjList: Record<number, number[]>,
    node: number,
    visited: boolean[],
    parent: number
  ): boolean {
    visited[node] = true;
  
    for (const neighbor of adjList[node]) {
      if (visited[neighbor] && neighbor !== parent) {
        return true;
      } else if (!visited[neighbor]) {
        if (hasCycle(adjList, neighbor, visited, node)) {
          return true;
        }
      }
    }
  console.log('return no cycle');
    return false;
  }

  function hasCycle2(
    adjList: Record<number, number[]>,
    node: number,
    visited: boolean[],
    parent: number
  ): boolean {
    visited[node] = true;
  
    for (const neighbor of adjList[node]) {
        if (visited[neighbor] && neighbor !== parent) {
            return true;
        } else {
            if (hasCycle(adjList, neighbor, visited, node)) {
                return true;
            }
        }
    }
    return false;
  }
  

  const handleClone = () => {
    try {
      const edges = JSON.parse(input);
      const isValid = validTree(Number(numNodes), edges);
      console.log('isValid', isValid);
      setResult(isValid? 'true' : 'false');
    } catch (error) {
      console.error('Invalid input');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Graph Valid Tree
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        [[0, 1], [2, 3]], n=4; output = false;
      </p>

      <p className="text-sm text-gray-600 mb-4">
      [[0,1],[1,2],[2,3],[1,3],[1,4]], n=5; output = false
      </p>
      <TextField
        label="Enter adjacency list (format: neighbors;neighbors)"
        variant="outlined"
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Enter number of nodes"
        variant="outlined"
        fullWidth
        value={numNodes}
        onChange={(e) => setNumNodes(e.target.value)}
        margin="normal"
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleClone}
        sx={{ mt: 2 }}
      >
        Validate Graph
      </Button>
        <Box mt={2}>
          <Typography variant="h6">
            Graph is valid:
          </Typography>
          <Typography variant="body1">
            {result}
          </Typography>
        </Box>
    </div>
  );
};

export default GraphValidTree;