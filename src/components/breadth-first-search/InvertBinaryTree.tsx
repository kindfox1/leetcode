import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

const InvertBinaryTree = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<number[] | null>(null);

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

  const invertTree = (root: TreeNode | null): TreeNode | null => {
    if (!root) return null;

    const left = invertTree(root.left);
    const right = invertTree(root.right);

    root.left = right;
    root.right = left;

    return root;
  };

  const invertTree2 = (root: TreeNode | null): TreeNode | null => {
    if (!root) return null; 
    const left = invertTree(root.left);
    const right = invertTree(root.right);

    root.left = right;
    root.right = left;
    return root;

  }

  const treeToArray = (root: TreeNode | null): number[] => {
    if (!root) return [];
    const result: (number | null)[] = [];
    const queue: (TreeNode | null)[] = [root];

    while (queue.length) {
      const node = queue.shift();
      if (node) {
        result.push(node.val);
        queue.push(node.left);
        queue.push(node.right);
      } else {
        result.push(null);
      }
    }

    // Remove trailing nulls for a cleaner output
    while (result[result.length - 1] === null) {
      result.pop();
    }

    return result as number[];
  };

  const handleInvert = () => {
    try {
      const values = JSON.parse(input);
      const tree = buildTree(values);
      const invertedTree = invertTree(tree);
      const resultArray = treeToArray(invertedTree);
      setResult(resultArray);
    } catch (error) {
      console.error('Invalid input format');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Invert Binary Tree
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Example: [4,2,7,1,3,6,9] output: [4,7,2,9,6,3,1]
      </p>
      <TextField
        label="Enter tree values (JSON array)"
        variant="outlined"
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleInvert}
        sx={{ mt: 2 }}
      >
        Invert Tree
      </Button>
      {result && (
        <Box mt={2}>
          <Typography variant="h6">Inverted Tree as Array:</Typography>
          <Typography>{JSON.stringify(result)}</Typography>
        </Box>
      )}
    </div>
  );
};

export default InvertBinaryTree;