import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

const LevelOrderSum = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<number[]>([]);

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

  const levelOrderSum = (root: TreeNode | null): number[] => {
    if (!root) return [];
    
    const result: number[] = [];
    const queue: TreeNode[] = [root];
    
    while (queue.length > 0) {
      const levelSize = queue.length;
      let levelSum = 0;
      
      for (let i = 0; i < levelSize; i++) {
        const node = queue.shift()!;
        levelSum += node.val;
        
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }
      
      result.push(levelSum);
    }
    
    return result;
  };

  const handleCalculate = () => {
    try {
      const values = input.split(',').map(val => 
        val.trim() === 'null' ? null : Number(val)
      );
      const tree = buildTree(values);
      setResult(levelOrderSum(tree));
    } catch (error) {
      console.error('Invalid input format');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Level Order Sum
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Example: 3,9,20,null,null,15,7
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
        Calculate Level Sums
      </Button>
      {result.length > 0 && (
        <Box mt={2}>
          <Typography variant="h6">
            Level-wise sums:
          </Typography>
          {result.map((sum, index) => (
            <Typography key={index} variant="body1">
              Level {index}: {sum}
            </Typography>
          ))}
        </Box>
      )}
    </div>
  );
};

export default LevelOrderSum;