import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

const SwapNodes = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<number[] | null>(null);

  const createLinkedList = (nums: number[]): ListNode | null => {
    if (nums.length === 0) return null;
    
    const head = new ListNode(nums[0]);
    let current = head;
    
    for (let i = 1; i < nums.length; i++) {
      current.next = new ListNode(nums[i]);
      current = current.next;
    }
    
    return head;
  };

  const linkedListToArray = (head: ListNode | null): number[] => {
    const result: number[] = [];
    let current = head;
    while (current) {
      result.push(current.val);
      current = current.next;
    }
    return result;
  };

  const swapPairs = (head: ListNode | null): ListNode | null => {
    if (!head || !head.next) return head;

    const dummy = new ListNode(0);
    dummy.next = head;
    let prev = dummy;

    while (head && head.next) {
      // Nodes to be swapped
      const first: ListNode = head;
      const second: ListNode = head.next!;

      // Swapping
      prev.next = second;
      first.next = second.next;
      second.next = first;

      // Move pointers
      prev = first;
      head = first.next;
    }

    return dummy.next;
  };

  const swapPairs2 = (head: ListNode | null): ListNode | null => {
    if (head === null || head.next === null) return head;
    let dummy = new ListNode(0, head);
    dummy.next = head;
    let prev = dummy;
    let first = head;
    
    console.log('first', first);
    
    first = prev;
    console.log('first', first);

    while (first && first.next) {
      let second = first.next!;

      prev.next = second;
      first.next = second.next!;
      second.next = first;

      prev = first;
      first = first.next;
    }

    console.log(JSON.stringify(dummy.next));
    return dummy.next;
  };

  const revertLinkList = (head: ListNode | null): ListNode | null => {
    let prev: ListNode | null = null;
    let curr = head;
    while (curr) {
      const next = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next;
    }
    console.log(curr);
    return prev;
  }

  const handleSwap = () => {
    try {
      const nums = input.split(',').map(Number);
      const head = createLinkedList(nums);
      // const swappedHead = swapPairs(head);

      // setResult(linkedListToArray(swappedHead));

      revertLinkList(head);
    } catch (error) {
      console.error('Invalid input format');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Swap Nodes in Pairs
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Example: 1,2,3,4
      </p>
      <TextField
        label="Enter values (comma-separated)"
        variant="outlined"
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
        margin="normal"
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleSwap}
        sx={{ mt: 2 }}
      >
        Swap Pairs
      </Button>
      {result !== null && (
        <Box mt={2}>
          <Typography variant="subtitle1" color="primary">
            Result after swapping:
          </Typography>
          <Typography variant="h6">
            [{result.join(' → ')}]
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default SwapNodes;