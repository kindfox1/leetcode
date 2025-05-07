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
  const [result, setResult] = useState<string | null>('');

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

  const hasPathSum2 = (root: TreeNode | null, targetSum: number): boolean => {
    if (!root) return false;
    if (!root.left && !root.right) return root.val === targetSum;

    return (hasPathSum2(root.left, targetSum - root.val)) || 
      (hasPathSum2(root.right, targetSum  - root.val));
  };

  const pathSum = (tree: TreeNode, target: number): number[][] => {
    const result: number[][] = [];

    if (tree===null) return result;

    const backtracking = (node: TreeNode, path: number[], total: number) => {
        const newPath = [...path, node.val];
        total += node.val;

        console.log('============ node', node.val);
        console.log('total', total);

        if (total > target) {
            return;
        }

        if (!node.left && !node.right) { //reach the leaf
            if (total === target) {
                result.push(newPath);
                return;
            }
        }

        if (node.left) {
            backtracking(node.left, newPath, total);
        }

        if (node.right) {
            backtracking(node.right, newPath, total);
        }


    }



    backtracking(tree, [], 0);
    return result;
  }

  //hellointerview this is the proper way for backtracking technic
  function pathSumHi(root: TreeNode | null, target: number): number[][] {
    const result: number[][] = [];
  
    function backtrack(node: TreeNode | null, path: number[], total: number): void {
      if (!node) return;
  
      path.push(node.val);
      total += node.val;
  
      // If current sum exceeds target, backtrack
      if (total > target) {
        path.pop();
        return;
      }
  
      if (!node.left && !node.right) {
        if (total === target) {
          result.push([...path]); // Make a copy of the path
        }
      } else {
        backtrack(node.left, path, total);
        backtrack(node.right, path, total);
      }
  
      // Backtrack: remove current node
      path.pop();
    }
  
    backtrack(root, [], 0);
    return result;
  }

  const pathSum2 = (tree: TreeNode | null, target: number): number[][] => {
    const result :number[][] = [];
    if (!tree) return result;

    const backtracking = (node: TreeNode, path: number[], remain: number) => {
      if (!node) return;
      
      const newPath = [...path, node.val];

      if (node.val > remain) {
        //path.pop();
        return;
      }

      if (!node.left && !node.right) {
        if (remain === node.val) {
          result.push(newPath);
        } else {
          path.pop();
        }
      } else {
        //path.push(node.val);

        if (node.left) backtracking(node.left, newPath, remain - node.val);
        if (node.right) backtracking(node.right, newPath, remain - node.val);

      }

    };

    backtracking(tree, [], target);



    return result;
  }

  const handleCheck = () => {
    try {
      const values = input.split(',').map(val => 
        val.trim() === 'null' ? null : Number(val)
      );
      const tree = buildTree(values);
      const sum = parseInt(targetSum);

        setResult(JSON.stringify(pathSumHi(tree, sum)));
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
        4,2,2,1,8,3,null,2,5,4,3,2,8 Target:11 Ouput [[4,2,3,2]]
      </p>
      <p className="text-sm text-gray-600 mb-4">
        4,7,2,1,3,6,1 Target:7 Ouput [[4,2,1]]
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
            {result}
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default PathSum;