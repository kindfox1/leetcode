import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

const buildTree = (preorder: number[], inorder: number[]): TreeNode | null => {
  if (!preorder.length || !inorder.length) return null;

  const rootVal = preorder[0];
  const root = { val: rootVal, left: null, right: null };

  const rootIndex = inorder.indexOf(rootVal);

  root.left = buildTree(preorder.slice(1, rootIndex + 1), inorder.slice(0, rootIndex));
  root.right = buildTree(preorder.slice(rootIndex + 1), inorder.slice(rootIndex + 1));

  return root;
};

// preorder = current node -> left node -> right node
// inorder = left node -> current node -> right node
const buildTree2 = (preorder: number[], inorder: number[]): TreeNode | null => {
    if (!preorder.length || !inorder.length) return null;
    //const root: TreeNode | null;

    const rootValue: number = preorder[0];
    const root = {val: rootValue, left: null, right: null};
    const rootIndex = inorder.indexOf(rootValue);

    root.left = buildTree2(preorder.slice(1, rootIndex + 1), inorder.slice(0, rootIndex));
    root.right = buildTree2(preorder.slice(rootIndex+1), inorder.slice(rootIndex+1));

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

  // Remove trailing nulls for a cleaner output
  while (result[result.length - 1] === null) {
    result.pop();
  }

  return result;
};

const ConstructBinaryTree = () => {
  const [preorder, setPreorder] = useState('');
  const [inorder, setInorder] = useState('');
  const [result, setResult] = useState<(number | null)[] | null>(null);

  const handleBuildTree = () => {
    try {
      const preorderArray = JSON.parse(preorder);
      const inorderArray = JSON.parse(inorder);
      const tree = buildTree(preorderArray, inorderArray);
      const resultArray = treeToArray(tree);
      setResult(resultArray);
    } catch (error) {
      console.error('Invalid input format');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Construct Binary Tree from Preorder and Inorder Traversal
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Example: Preorder: [3,9,20,15,7], Inorder: [9,3,15,20,7]
      </p>
      <TextField
        label="Enter Preorder (JSON array)"
        variant="outlined"
        fullWidth
        value={preorder}
        onChange={(e) => setPreorder(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Enter Inorder (JSON array)"
        variant="outlined"
        fullWidth
        value={inorder}
        onChange={(e) => setInorder(e.target.value)}
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleBuildTree}
        sx={{ mt: 2 }}
      >
        Build Tree
      </Button>
      {result && (
        <Box mt={2}>
          <Typography variant="h6">Constructed Tree as Array:</Typography>
          <Typography>{JSON.stringify(result)}</Typography>
        </Box>
      )}
    </div>
  );
};

export default ConstructBinaryTree;