import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

const TreeDiameter = () => {
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
    }
    
    return root;
  };

  /*
  Given the root of a binary tree, write a recursive function to find the diameter of the tree. The diameter of a binary 
  tree is the length of the longest path (# of edges) between any two nodes in a tree. This path may or may not pass through the root.
  [3, 9, 2, 1, 4, null, null, null, 5] => 4
  */

  const diameterOfBinaryTree = (root: TreeNode | null): number => {
    let maxDiameter = 0;
    
    const dfs = (node: TreeNode | null): number => {
      if (!node) return 0;
      
      const leftHeight = dfs(node.left);
      const rightHeight = dfs(node.right);
      
      maxDiameter = Math.max(maxDiameter, leftHeight + rightHeight);
      
      return Math.max(leftHeight, rightHeight) + 1;
    };
    
    dfs(root);
    return maxDiameter;
  };

  const diameterOfBinaryTree2 = (root: TreeNode | null): number => {
    let maxDiameter = 0;
    
    const dfs = (node: TreeNode | null): number => {
      if (!node) return 0;

      const leftEdge = dfs(node.left);
      const rightEdge = dfs(node.right);
      maxDiameter = Math.max(maxDiameter, leftEdge + rightEdge);

      return Math.max(leftEdge, rightEdge) + 1;
    };
    
    dfs(root);
    return maxDiameter;
  };

  const diameterOfBinaryTree3 = (root: TreeNode | null): number => {
    let maxDiameter = 0;

    const dfs = (node: TreeNode | null): number => {
      if (!node) return 0;
      const leftDepth = dfs(node.left);
      const rightDepth = dfs(node.right);

      maxDiameter = Math.max(maxDiameter, leftDepth + rightDepth);
      return Math.max(leftDepth, rightDepth) +1;
    }

    dfs(root);

    return maxDiameter;
  };

  const handleCalculate = () => {
    try {
      const values = input.split(',').map(val => 
        val.trim() === 'null' ? null : Number(val)
      );
      const tree = buildTree(values);
      setResult(diameterOfBinaryTree(tree));
    } catch (error) {
      console.error('Invalid input');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Binary Tree Diameter
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Example: 1,2,3,4,5 output: 3
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
        Calculate Diameter
      </Button>
      {result !== null && (
        <Box mt={2}>
          <Typography variant="h6">
            Tree diameter: {result}
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default TreeDiameter;