import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

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

const findLCA = (root: TreeNode | null, p: TreeNode, q: TreeNode): TreeNode | null => {
  if (!root) return null;

  // If both p and q are smaller than root, LCA lies in the left subtree
  if (p.val < root.val && q.val < root.val) {
    return findLCA(root.left, p, q);
  }

  // If both p and q are greater than root, LCA lies in the right subtree
  if (p.val > root.val && q.val > root.val) {
    return findLCA(root.right, p, q);
  }

  // If one of p or q is on one side and the other is on the other side, root is the LCA
  return root;
};

const findLCA2 = (root: TreeNode | null, p: TreeNode, q: TreeNode): TreeNode | null => {
    if (!root) return null;
    //let lcpNode = root;

    // if ((p.val < root.val && root.val > q.val) || (p.val > root.val && root.val < q.val)) return root;

    // if (p.val === root.val || q.val=== root.val) {
    //     return root;
    // }

    if (p.val < root.val && q.val < root.val) { //both p q are on left subtree
        return findLCA2(root.left, p, q);
    } 
    
    if (p.val > root.val && q.val > root.val) { // both p q are in right subtree
        return findLCA2(root.right, p, q);
    }


    return root;

};

const LowestCommonAncestor = () => {
  const [treeInput, setTreeInput] = useState('');
  const [pInput, setPInput] = useState('');
  const [qInput, setQInput] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const handleFindLCA = () => {
    try {
      const treeArray = JSON.parse(treeInput);
      const tree = buildTree(treeArray);
      const pValue = JSON.parse(pInput);
      const qValue = JSON.parse(qInput);

      const pNode: TreeNode = { val: pValue, left: null, right: null };
      const qNode: TreeNode = { val: qValue, left: null, right: null };

      const lcaNode = findLCA(tree, pNode, qNode);
      setResult(lcaNode ? lcaNode.val : null);
    } catch (error) {
      console.error('Invalid input format');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Lowest Common Ancestor in BST
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Example: Tree: [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8. Output: 6
      </p>
      <TextField
        label="Enter Tree (JSON array)"
        variant="outlined"
        fullWidth
        value={treeInput}
        onChange={(e) => setTreeInput(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Enter Node p (value)"
        variant="outlined"
        fullWidth
        value={pInput}
        onChange={(e) => setPInput(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Enter Node q (value)"
        variant="outlined"
        fullWidth
        value={qInput}
        onChange={(e) => setQInput(e.target.value)}
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleFindLCA}
        sx={{ mt: 2 }}
      >
        Find LCA
      </Button>
      {result !== null && (
        <Box mt={2}>
          <Typography variant="h6">Lowest Common Ancestor:</Typography>
          <Typography>{result}</Typography>
        </Box>
      )}
    </div>
  );
};

export default LowestCommonAncestor;