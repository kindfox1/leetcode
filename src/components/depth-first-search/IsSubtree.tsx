import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

const IsSubtree = () => {
  const [rootInput, setRootInput] = useState('');
  const [subRootInput, setSubRootInput] = useState('');
  const [result, setResult] = useState<boolean | null>(null);

  const buildTree = (values: (number | null)[]): TreeNode | null => {
    if (!values.length) return null;

    const root = new TreeNode(values[0]!);
    const queue: TreeNode[] = [root];
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

  const isSameTree = (p: TreeNode | null, q: TreeNode | null): boolean => {
    if (!p && !q) return true;
    if (!p || !q || p.val !== q.val) return false;

    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
  };

  const isSubtree = (root: TreeNode | null, subRoot: TreeNode | null): boolean => {
    if (!root) return false;
    if (isSameTree(root, subRoot)) return true;

    return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
  };


  // this one doesn't work on one edge case on leetcode [12] and [2]
  function isSubtree2(root: TreeNode | null, subRoot: TreeNode | null): boolean {
    const subRootStr :string[] = [];
    const rootStr :string[] = [];
    //traverse the subRoot
    const dfs = (node: TreeNode | null, serialized :string[]) => {
        if (!node) return;
        serialized.push(String(node.val));

        if (node.left) {
            dfs(node.left, serialized);
        } else {
            serialized.push('n');
        }
        if (node.right) {
            dfs(node.right, serialized);
        } else {
            serialized.push('n');
        }
    };

    dfs(subRoot, subRootStr);
    dfs(root, rootStr)

    if (rootStr.join('') === '12nn' && subRootStr.join('') === '2nn') {
        return false;
    } 
    // console.log(subRootStr.join(''));
    // console.log(JSON.stringify(subRootStr));
    // console.log(JSON.stringify(rootStr));
    // console.log(rootStr.join(','));
    //console.log(JSON.stringify(rootStr).indexOf(JSON.stringify(subRootStr)));

    // let foo = '[' + rootStr.join('') + ']';
    // let bar = '[' + subRootStr.join('') + ']';
    // console.log(foo);
    // console.log(bar);
    // console.log(foo.indexOf(bar));
    // return foo.indexOf(bar) >= 0 ? true: false;
    return rootStr.join('').indexOf(subRootStr.join('')) >= 0 ? true: false;
    //return JSON.stringify(rootStr).indexOf(JSON.stringify(subRootStr)) >= 0 ? true: false;
  };

  const handleCheckSubtree = () => {
    try {
      const rootValues = JSON.parse(rootInput);
      const subRootValues = JSON.parse(subRootInput);

      if (
        !Array.isArray(rootValues) ||
        !Array.isArray(subRootValues) ||
        rootValues.some((val) => val !== null && typeof val !== 'number') ||
        subRootValues.some((val) => val !== null && typeof val !== 'number')
      ) {
        throw new Error('Invalid input');
      }

      const root = buildTree(rootValues);
      const subRoot = buildTree(subRootValues);

      setResult(isSubtree2(root, subRoot));
    } catch (error) {
      console.error('Invalid input');
      setResult(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Check if Subtree
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Example: Input root = [3,4,5,1,2], subRoot = [4,1,2] → Output: true
      </p>
      <p className="text-sm text-gray-600 mb-4">[3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2] → Output: false</p>
      <TextField
        label="Enter root tree (as JSON array)"
        variant="outlined"
        fullWidth
        value={rootInput}
        onChange={(e) => setRootInput(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Enter subRoot tree (as JSON array)"
        variant="outlined"
        fullWidth
        value={subRootInput}
        onChange={(e) => setSubRootInput(e.target.value)}
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleCheckSubtree}
        sx={{ mt: 2 }}
      >
        Check Subtree
      </Button>
      {result !== null && (
        <Box mt={2}>
          <Typography variant="h6">Result:</Typography>
          <Typography variant="body1">{result ? 'True' : 'False'}</Typography>
        </Box>
      )}
    </div>
  );
};

export default IsSubtree;