import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

const ZigzagLevelOrder = () => {
  const [input, setInput] = useState('');
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

  const zigzagLevelOrder = (root: TreeNode | null): number[][] => {
    if (!root) return [];
    
    const result: number[][] = [];
    const queue: TreeNode[] = [root];
    let isLeftToRight = true;
    
    while (queue.length > 0) {
      const levelSize = queue.length;
      const currentLevel: number[] = [];
      
      for (let i = 0; i < levelSize; i++) {
        const node = queue.shift()!;
        
        if (isLeftToRight) {
          currentLevel.push(node.val);
        } else {
          currentLevel.unshift(node.val);
        }
        
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }
      
      result.push(currentLevel);
      isLeftToRight = !isLeftToRight;
    }
    
    return result;
  };

  const zigzagLevelOrder2 = (root: TreeNode | null): number[][] => {
    if (!root) return [];
    const queue: TreeNode[] = [root];
    const result: number[][] = [];
    let ltr: boolean = true;

    while (queue.length > 0) {
      const size = queue.length;
      let currentLevel: number[] = [];
      
      for (let i=0; i<size; i++ ) {
        const node = queue.shift()!;
        if (ltr) {
          console.log('left to right');
          currentLevel.push(node.val);
        } else {
          console.log('right to left');
          currentLevel.unshift(node.val);
        }
        
        // const node = queue.shift()!;
        //currentLevel.push(node.val);

        if (node.left) {
          queue.push(node.left);
        }

        if (node.right) {
          queue.push(node.right);
        }
      }
      
      //console.log('currentlevel', currentLevel);
      result.push(currentLevel);
      ltr = !ltr;
      
      
    }
    console.log(result);
    return result;
  };

  const zigzagLevelOrder3 = (root: TreeNode | null): number[][] => {
    const result :number[][] = [];
    let ltr :boolean= true;

    if (!root) {
      return result;
    }

    const queue: TreeNode[] = [root];

    while (queue.length > 0) {
      let size = queue.length;
      //let curr = queue.shift()!;
      let currLevel :number[]= [];

      for (let i=0; i<size; i++) {
        let node = queue.shift()!;
        if (ltr) {
          currLevel.push(node.val);
        } else {
          currLevel.unshift(node.val);
        }

        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }

      result.push(currLevel);
      ltr = !ltr; //toggle left to right
    }


    return result;
  };

  const handleCalculate = () => {
    //try {
      const values = JSON.parse(input);
      const tree = buildTree(values);
      setResult(zigzagLevelOrder3(tree));
    // } catch (error) {
    //   console.error('Invalid input format');
    // }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Zigzag Level Order Traversal
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        [3,9,20,null,null,15,7] output: [[3], [20, 9], [15, 7]]
      </p>
      <p className="text-sm text-gray-600 mb-4">[1, 3, 4, null, 2, 7, null, 8] output: [[1],[4,3],[2,7],[8]]</p>
      <p className="text-sm text-gray-600 mb-4">[4, 2, 7, 1, 3, 6, 9, null, 5, null, 2] ouput: [[4], [7, 2], [1, 3, 6, 9], [2, 5]]</p>
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
        Calculate Zigzag Order
      </Button>
      {result.length > 0 && (
        <Box mt={2}>
          <Typography variant="h6">
            Zigzag level order:
          </Typography>
          {result.map((level, index) => (
            <Typography key={index} variant="body1">
              Level {index}: [{level.join(', ')}]
            </Typography>
          ))}
        </Box>
      )}
    </div>
  );
};

export default ZigzagLevelOrder;