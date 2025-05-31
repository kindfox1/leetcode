import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

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

const maxPathSum = (root: TreeNode | null): number => {
  let maxSum = -Infinity;

  const dfs = (node: TreeNode | null): number => {
    if (!node) return 0;

    // Calculate the maximum path sum for the left and right subtrees
    const leftMax = Math.max(dfs(node.left), 0); // Ignore negative paths
    const rightMax = Math.max(dfs(node.right), 0);

    // Update the global maximum path sum
    maxSum = Math.max(maxSum, node.val + leftMax + rightMax);

    // Return the maximum path sum including the current node
    return node.val + Math.max(leftMax, rightMax);
  };

  dfs(root);
  return maxSum;
};

const maxPathSum2 = (root: TreeNode | null): number => {
    let maxSum = -Infinity;

    const dfs = (node: TreeNode | null): number => {
        if (!node) return 0;
        

        let maxLeft = Math.max(dfs(node.left), 0);
        let maxRight = Math.max(dfs(node.right), 0);

        let currPathSum = maxLeft + maxRight + node.val;
        maxSum = Math.max(maxSum, currPathSum);

        return Math.max(maxLeft, maxRight) + node.val;
    };

    dfs(root);
    return maxSum;
};

const MaxPathSum = () => {
  const [treeInput, setTreeInput] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = () => {
    try {
      const treeArray = JSON.parse(treeInput);
      const tree = buildTree(treeArray);
      const maxSum = maxPathSum(tree);
      setResult(maxSum);
    } catch (error) {
      console.error('Invalid input format');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Maximum Path Sum in Binary Tree
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Example: Input tree = [1,2,3] → Output: 6
      </p>
      <p className="text-sm text-gray-600 mb-4">
        [-10,9,20,null,null,15,7] → Output: 42
      </p>
      <TextField
        label="Enter Tree (JSON array)"
        variant="outlined"
        fullWidth
        value={treeInput}
        onChange={(e) => setTreeInput(e.target.value)}
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleCalculate}
        sx={{ mt: 2 }}
      >
        Calculate Maximum Path Sum
      </Button>
      {result !== null && (
        <Box mt={2}>
          <Typography variant="h6">Maximum Path Sum:</Typography>
          <Typography>{result}</Typography>
        </Box>
      )}
    </div>
  );
};

export default MaxPathSum;