import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

const PathSum = () => {
  const [input, setInput] = useState('');
  const [targetSum, setTargetSum] = useState('');
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

  const hasPathSum = (root: TreeNode | null, targetSum: number): boolean => {
    if (!root) return false;
    
    if (!root.left && !root.right) {
      return root.val === targetSum;
    }
    
    return hasPathSum(root.left, targetSum - root.val) || 
           hasPathSum(root.right, targetSum - root.val);
  };

  const handleCheck = () => {
    try {
      const values = input.split(',').map(val => 
        val.trim() === 'null' ? null : Number(val)
      );
      const tree = buildTree(values);
      const sum = parseInt(targetSum);
      if (!isNaN(sum)) {
        setResult(hasPathSum(tree, sum));
      }
    } catch (error) {
      console.error('Invalid input');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Path Sum
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Example: 5,4,8,11,null,13,4,7,2,null,null,null,1
      </p>
      <TextField
        label="Enter tree values (comma-separated)"
        variant="outlined"
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Enter target sum"
        variant="outlined"
        fullWidth
        value={targetSum}
        onChange={(e) => setTargetSum(e.target.value)}
        margin="normal"
        type="number"
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleCheck}
        sx={{ mt: 2 }}
      >
        Check Path Sum
      </Button>
      {result !== null && (
        <Box mt={2}>
          <Typography 
            variant="h6" 
            color={result ? 'success.main' : 'error.main'}
          >
            {result ? 'Path exists!' : 'No such path exists'}
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default PathSum;