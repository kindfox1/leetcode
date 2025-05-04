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

const CloneGraph = () => {
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

  function cloneGraph(node: IntGraphNode): Record<number, number[]> {
    const adjList: Record<number, number[]> = {};
    const visited = new Set<number>();
    const queue: IntGraphNode[] = [node];
  
    while (queue.length > 0) {
      const current = queue.shift()!;
      if (visited.has(current.value)) continue;
      visited.add(current.value);
  
      adjList[current.value] = current.neighbors.map(n => n.value);
  
      for (const neighbor of current.neighbors) {
        if (!visited.has(neighbor.value)) {
          queue.push(neighbor);
        }
      }
    }
  
    return adjList;
  }

  const cloneGraph2 = (node: IntGraphNode): Record<number, number[]> => {
    const adjList: Record<number, number[]> = {};
    const visited = new Set();
    const queue: IntGraphNode[] = [node];

    while (queue.length > 0) {
      let currentNode = queue.pop()!;
      visited.add(currentNode.value);
      adjList[currentNode.value]= currentNode.neighbors.map(n => n.value);

      for (const neighbor of currentNode.neighbors) {
        if (!visited.has(neighbor.value)) {
          queue.push(neighbor);
        }
      }
    }


    return adjList;
  };

/**
 * This is for the LeetCode solution
 * Definition for _Node.
 * class _Node {
 *     val: number
 *     neighbors: _Node[]
 * 
 *     constructor(val?: number, neighbors?: _Node[]) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.neighbors = (neighbors===undefined ? [] : neighbors)
 *     }
 * }
 * 
 */
class _Node {
  val: number
  neighbors: _Node[]
  constructor(val?: number, neighbors?: _Node[]) {
    this.val = (val===undefined ? 0 : val)
    this.neighbors = (neighbors===undefined ? [] : neighbors)
  }
}
function cloneGraphLeetCode(node: _Node | null): _Node | null {
  if (!node) return null;

  const visited = new Map<number, _Node>();

  const dfs = (n: _Node): _Node => {
      if (visited.has(n.val)) {
          return visited.get(n.val)!;
      }

      const copy = new _Node(n.val);
      visited.set(n.val, copy);

      for (const neighbor of n.neighbors) {
          copy.neighbors.push(dfs(neighbor));
      }

      return copy;
  };

  return dfs(node);
};

  const handleClone = () => {
    //test 1
    const node1 = new IntGraphNode(1);
    const node2 = new IntGraphNode(2);
    const node3 = new IntGraphNode(3);

    node1.neighbors.push(node2, node3);
    node2.neighbors.push(node1);
    node3.neighbors.push(node1);

    //test 2
    // const n1 = new IntGraphNode(1);
    // const n2 = new IntGraphNode(2);
    // const n3 = new IntGraphNode(3);
    // const n4 = new IntGraphNode(4);

    // n1.neighbors.push(n2, n4);
    // n2.neighbors.push(n1, n3);
    // n3.neighbors.push(n2, n4);
    // n4.neighbors.push(n1, n3);

    // test 3
    const n1 = new IntGraphNode(1);
    const n2 = new IntGraphNode(2);
    const n3 = new IntGraphNode(3);
    const n4 = new IntGraphNode(4);

    n1.neighbors.push(n2);
    n2.neighbors.push(n1, n3);
    n3.neighbors.push(n2, n4);
    n4.neighbors.push(n3);
    //try {
      // const edges = JSON.parse(input);
      // const graph = buildGraph(Number(numNodes), edges);
      // //const cloned = cloneGraph(graph);
      //console.log(JSON.stringify(graph));

      const adj = cloneGraph2(n1);
      console.log(JSON.stringify(adj)); // { 1: [2, 3], 2: [1], 3: [1] }

      setResult(JSON.stringify(adj));
    // } catch (error) {
    //   console.error('Invalid input');
    // }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Clone Graph
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        See code and console for output
      </p>
      {/* <TextField
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
      /> */}
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
          <Typography variant="body1">
            {result}
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default CloneGraph;