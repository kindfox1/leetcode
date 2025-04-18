import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

const PathSum2 = () => {
  const [input, setInput] = useState('');
  const [targetSum, setTargetSum] = useState('');
  const [result, setResult] = useState<number[][]>([]);

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

  const pathSum = (root: TreeNode | null, targetSum: number): number[][] => {
    const result: number[][] = [];
    
    const dfs = (node: TreeNode | null, remaining: number, path: number[]) => {
      if (!node) return;
      
      const newPath = [...path, node.val];
      
      if (!node.left && !node.right && remaining === node.val) {
        result.push(newPath);
        return;
      }
      
      dfs(node.left, remaining - node.val, newPath);
      dfs(node.right, remaining - node.val, newPath);
    };
    
    dfs(root, targetSum, []);
    return result;
  };

  const handleFind = () => {
    try {
      const values = input.split(',').map(val => 
        val.trim() === 'null' ? null : Number(val)
      );
      const tree = buildTree(values);
      const sum = parseInt(targetSum);
      if (!isNaN(sum)) {
        setResult(pathSum(tree, sum));
      }
    } catch (error) {
      console.error('Invalid input');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Path Sum II
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Example: 5,4,8,11,null,13,4,7,2,null,null,5,1
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
        onClick={handleFind}
        sx={{ mt: 2 }}
      >
        Find Paths
      </Button>
      {result.length > 0 && (
        <Box mt={2}>
          <Typography variant="h6">
            Paths found:
          </Typography>
          {result.map((path, index) => (
            <Typography key={index}>
              Path {index + 1}: [{path.join(' → ')}]
            </Typography>
          ))}
        </Box>
      )}
    </div>
  );
};

export default PathSum2;