import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

const ValidateBST = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<boolean | null>(null);

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
  Given the root of a binary, write a recursive function to determine if it is a valid binary search tree.

  EXAMPLES
  Given the root of a binary tree, determine if it is a valid binary search tree (BST).

  A tree is a BST if the following conditions are met:

  - Every node on the left subtree has a value less than the value of the current node.
  - Every node on the right subtree has a value greater than the value of the current node.
  - The left and right subtrees must also be valid BSTs.
  */
  const isValidBST = (root: TreeNode | null): boolean => {
    const validate = (node: TreeNode | null, min: number, max: number): boolean => {
      if (!node) return true;
      
      if (node.val <= min || node.val >= max) return false;
      
      return validate(node.left, min, node.val) && 
             validate(node.right, node.val, max);
    };
    
    return validate(root, -Infinity, Infinity);
  };

  const isValidBST2 = (root: TreeNode | null): boolean => {
    const validate = (node: TreeNode | null, min: number, max: number): boolean => {
      if(!node) return true;

      if (node.val < min || node.val >= max) {
        return false;
      }

      return validate(node.left, min, node.val) && 
        validate(node.right, node.val, max);
    }

    return validate(root, -Infinity, Infinity);
  };

  const isValidBST3 = (root: TreeNode | null): boolean => {
    const dfs = (node: TreeNode | null, min: number, max: number): boolean => {
      if (!node) return true;

      if (node.val > min && node.val < max) {
        return dfs(node.left, min, node.val) && dfs(node.right, node.val, max);
      } else {
        return false;
      }
    };

    return dfs(root, -Infinity, Infinity);
  };

  const handleValidate = () => {
    try {
      const values = input.split(',').map(val => 
        val.trim() === 'null' ? null : Number(val)
      );
      const tree = buildTree(values);
      setResult(isValidBST3(tree));
    } catch (error) {
      console.error('Invalid input');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Validate Binary Search Tree
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        2,1,3 output: true
      </p>
      <p className="text-sm text-gray-600 mb-4">4,1,5,null,null,3,6 Output: false</p>
      <p className="text-sm text-gray-600 mb-4">4,2,7,1,3,6,9 Output: true</p>
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
        onClick={handleValidate}
        sx={{ mt: 2 }}
      >
        Validate BST
      </Button>
      {result !== null && (
        <Box mt={2}>
          <Typography 
            variant="h6" 
            color={result ? 'success.main' : 'error.main'}
          >
            {result ? 'Valid BST!' : 'Not a valid BST'}
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default ValidateBST;