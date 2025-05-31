import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val ?? 0;
    this.left = left ?? null;
    this.right = right ?? null;
  }
}

const buildTree = (values: (number | null)[]): TreeNode | null => {
  if (!values.length) return null;
  const root = new TreeNode(values[0]!);
  const queue = [root];
  let i = 1;
  while (queue.length && i < values.length) {
    const node = queue.shift()!;
    if (i < values.length && values[i] !== null) {
      node.left = new TreeNode(values[i]!);
      queue.push(node.left);
    }
    i++;
    if (i < values.length && values[i] !== null) {
      node.right = new TreeNode(values[i]!);
      queue.push(node.right);
    }
    i++;
  }
  return root;
};

const treeToArray = (root: TreeNode | null): (number | null)[] => {
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
  // Remove trailing nulls
  while (result.length && result[result.length - 1] === null) {
    result.pop();
  }
  return result;
};

const deleteNode = (root: TreeNode | null, key: number): TreeNode | null => {
  if (!root) return null;
  if (key < root.val) {
    root.left = deleteNode(root.left, key);
  } else if (key > root.val) {
    root.right = deleteNode(root.right, key);
  } else {
    // Node found
    if (!root.left) return root.right;
    if (!root.right) return root.left;
    // Node with two children: Get inorder successor (smallest in right subtree)
    let successor = root.right;
    while (successor.left) successor = successor.left;
    root.val = successor.val;
    root.right = deleteNode(root.right, successor.val);
  }
  return root;
};

const DeleteNodeBST = () => {
  const [treeInput, setTreeInput] = useState('');
  const [target, setTarget] = useState('');
  const [result, setResult] = useState<(number | null)[] | null>(null);

  const handleDelete = () => {
    try {
      const treeArray = JSON.parse(treeInput);
      const root = buildTree(treeArray);
      const targetVal = parseInt(target, 10);
      const newRoot = deleteNode(root, targetVal);
      setResult(treeToArray(newRoot));
    } catch (error) {
      setResult(null);
      console.error('Invalid input');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Delete Node in BST
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Enter BST as JSON array (e.g. [5,3,6,2,4,null,7]) and a target value to delete.
      </p>
      <TextField
        label="BST (JSON array)"
        variant="outlined"
        fullWidth
        value={treeInput}
        onChange={(e) => setTreeInput(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Target Value"
        variant="outlined"
        fullWidth
        value={target}
        onChange={(e) => setTarget(e.target.value)}
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleDelete}
        sx={{ mt: 2 }}
      >
        Delete Node
      </Button>
      {result && (
        <Box mt={2}>
          <Typography variant="h6">BST after deletion (level order):</Typography>
          <Typography>{JSON.stringify(result)}</Typography>
        </Box>
      )}
    </div>
  );
};

export default DeleteNodeBST;