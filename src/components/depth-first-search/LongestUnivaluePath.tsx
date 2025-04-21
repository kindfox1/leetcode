import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

const LongestUnivaluePath = () => {
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
  Given the root of the binary tree, find the longest path where all nodes along the path have the same value. 
  This path doesn't have to include the root node. Return the number of edges on that path, not the number of nodes.
  Input [1,4,5,4,4,5] Output: 2
  Time: O(n), Space: O(n) n is number of nodes on tree
  */
  const longestUnivaluePath = (root: TreeNode | null): number => {
    let maxLength = 0;
    
    const dfs = (node: TreeNode | null, parentVal: number): number => {
      if (!node) return 0;
      
      const left = dfs(node.left, node.val);
      const right = dfs(node.right, node.val);
      
      maxLength = Math.max(maxLength, left + right);
      
      return node.val === parentVal ? Math.max(left, right) + 1 : 0;
    };
    
    if (root) dfs(root, root.val);
    return maxLength;
  };

  const longestUnivaluePath2 = (root: TreeNode | null): number => {
    let maxLength = 0;
    
    const dfs = (node: TreeNode | null, parentVal: number): number => {
      if (!node) return 0;

      const left = dfs(node.left, node.val);
      const right = dfs(node.right, node.val);

      maxLength = Math.max(left + right, maxLength);
      console.log('maxlength', maxLength);

      if (node.val === parentVal) {
        return Math.max(left + 1, right + 1);
      }

      return 0;

    };
    
    if (root) dfs(root, root.val);
    return maxLength;
  };

  const handleCalculate = () => {
    try {
      const values = input.split(',').map(val => 
        val.trim() === 'null' ? null : Number(val)
      );
      const tree = buildTree(values);
      setResult(longestUnivaluePath2(tree));
    } catch (error) {
      console.error('Invalid input');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Longest Univalue Path
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        5,4,5,1,1,5 = 2
      </p>
      <p className="text-sm text-gray-600 mb-4">
        1,4,5,4,4,5 = 2
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
        Calculate Path Length
      </Button>
      {result !== null && (
        <Box mt={2}>
          <Typography variant="h6">
            Longest univalue path length: {result}
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default LongestUnivaluePath;