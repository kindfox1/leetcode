import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

const CalculateTilt = () => {
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
  Given the root node of a binary tree, write a recursive function to return the sum of each node's tilt.
  The tilt of a node is the absolute difference between the sum of its left subtree and the sum of its right 
  subtree. If a node has an empty left or subtree, the sum of the empty subtree is 0.
  [5, 1, 3] => 2
  [4, 2, 7, 1, 3, 6, 9] => 21
        4
      /   \
     2     7
    / \   / \
   1   3 6   9
  - The leaf nodes 1, 3, 6, 9 have tilts of 0 (their left and right subtrees are empty)
  - Node 2 has a tilt of |1 - 3| = 2
  - Node 7 has a tilt of |6 - 9| = 3
  - Node 4 has a tilt of |6 - 22] = 16
  - 2 + 3 + 16 = 21

  */
  const findTilt = (root: TreeNode | null): number => {
    let totalTilt = 0;
    
    const dfs = (node: TreeNode | null): number => {
      if (!node) return 0;
      
      const leftSum = dfs(node.left);
      const rightSum = dfs(node.right);
      
      totalTilt += Math.abs(leftSum - rightSum);
      
      return leftSum + rightSum + node.val;
    };
    
    dfs(root);
    return totalTilt;
  };

  const findTilt2 = (root: TreeNode | null): number => {
    let totalTilt = 0;
    
    const dfs = (node: TreeNode | null): number => {
      if (!node) return 0;

      const leftSum = dfs(node.left);
      const rightSum = dfs(node.right);

      totalTilt += Math.abs(leftSum - rightSum);

      return node.val + rightSum + leftSum;

    }

    totalTilt = dfs(root);
    return totalTilt;
  };

  const findTilt3 = (root: TreeNode | null): number => {
    let totalTilt = 0;
    
    const dfs = (node: TreeNode | null): number => {
      if (!node) return 0;

      const leftSum = dfs(node.left);
      const rightSum = dfs(node.right);

      totalTilt += Math.abs(leftSum - rightSum);

      return leftSum + rightSum + node.val;
    };

    
    dfs(root);
    return totalTilt;
  };

  const handleCalculate = () => {
    try {
      const values = input.split(',').map(val => 
        val.trim() === 'null' ? null : Number(val)
      );
      const tree = buildTree(values);
      setResult(findTilt3(tree));
    } catch (error) {
      console.error('Invalid input');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Binary Tree Tilt
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Example: 1,2,3 output: 1
      </p>
      <p className="text-sm text-gray-600 mb-4">[4, 2, 7, 1, 3, 6, 9] output: 21</p>
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
        Calculate Tilt
      </Button>
      {result !== null && (
        <Box mt={2}>
          <Typography variant="h6">
            Total tilt: {result}
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default CalculateTilt;