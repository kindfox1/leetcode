import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

const MaximumDepth = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<number | null>(null);

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
      console.log('queue', queue);
      return;
    }
    return root;
  };

  const maxDepth = (root: TreeNode | null): number => {
    if (!root) return 0;
    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
  };

  const maxDepth2 = (root: TreeNode | null): number => {
    if (root === null) return 0;
    return Math.max(maxDepth2(root.left), maxDepth2(root.right)) +1;
  };

  const handleCalculate = () => {
    try {
      const values = input.split(',').map(val => 
        val.trim() === 'null' ? null : Number(val)
      );
      const tree = buildTree(values);
      setResult(maxDepth(tree));
    } catch (error) {
      console.error('Invalid input');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Maximum Depth of Binary Tree
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Example: 3,9,20,null,null,15,7
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
        Calculate Maximum Depth
      </Button>
      {result !== null && (
        <Box mt={2}>
          <Typography variant="h6">
            Maximum depth: {result}
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default MaximumDepth;