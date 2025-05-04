import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

const GoodNodes = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [nodes, setNodes] = useState<number[]>([]);

  const buildTree = (values: (number | null)[]): TreeNode | null => {
    if (!values.length) return null;
    
    const root = { val: values[0] as number, left: null, right: null };
    const queue = [root];
 
    let i = 1;
    
    while (queue.length && i < values.length) {
      const node = queue.shift()!;
      
      if (i < values.length && values[i] !== null) {
        node.left = { val: values[i] as number, left: null, right: null };
        queue.push(node.left);
      }
      i++;
      
      if (i < values.length && values[i] !== null) {
        node.right = { val: values[i] as number, left: null, right: null };
        queue.push(node.right);
      }
      i++;
    }
    return root;
  };

  // A good node is defined as a node that is greater than or equal to all the nodes along the path from the root to that node
  const countGoodNodes = (root: TreeNode | null, maxVal: number): number => {
    if (!root) return 0;

    let count = 0;


    if (root.val >= maxVal) {
        maxVal = root.val;
        count = 1;
        nodes.push(root.val);
    }

    let leftCount = countGoodNodes(root.left, maxVal);
    let rightCount = countGoodNodes(root.right, maxVal);

    return leftCount + rightCount + count;
  };

  const countGoodNodes2 = (root: TreeNode | null, maxVal: number): number => {
    if (!root) return 0;
    
    let count = 0;

    if (root.val >= maxVal) {
      maxVal = root.val;
      count = 1;
    }

    return countGoodNodes2(root.left, maxVal) + countGoodNodes2(root.right, maxVal) + count;
  };


  const handleCalculate = () => {
    try {
      const values = input.split(',').map(val => 
        val.trim() === 'null' ? null : Number(val)
      );
      const tree = buildTree(values);
      setResult(countGoodNodes2(tree, -Infinity));
    } catch (error) {
      console.error('Invalid input');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Count Good Nodes 
      </Typography>
      <p>A good node is defined as a node that is greater than or equal to all the nodes along the path from the root to that node</p>
      <p className="text-sm text-gray-600 mb-4">
        4, 2, 7, 1, 3, 6, 9 output: 3 e.g. [4,7,9]
      </p>
      <TextField
        label="Enter tree values (comma-separated)"
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
        Calculate Good Nodes
      </Button>
      {result !== null && (
        <Box mt={2}>
          <Typography variant="h6">
            Good nodes count: {result}
          </Typography>
          {/* <Typography variant="h6">
            Good nodes: {JSON.stringify(nodes)}
          </Typography> */}
          
        </Box>
      )}
    </div>
  );
};

export default GoodNodes;