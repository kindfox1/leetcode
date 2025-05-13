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

const ReorderList = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<number[] | null>(null);

  const createLinkedList = (nums: number[]): ListNode | null => {
    if (nums.length === 0) return null;

    const nodes: ListNode[] = nums.map(num => new ListNode(num));
    for (let i = 0; i < nodes.length - 1; i++) {
      nodes[i].next = nodes[i + 1];
    }
    return nodes[0];
  };

  const linkedListToArray = (head: ListNode | null): number[] => {
    const result: number[] = [];
    while (head) {
      result.push(head.val);
      head = head.next;
    }
    return result;
  };

  const reorderList = (head: ListNode | null): void => {
    if (!head || !head.next) return;

    // Step 1: Find the middle of the list
    let slow: ListNode | null = head;
    let fast: ListNode | null = head;
    while (fast && fast.next) {
      slow = slow!.next;
      fast = fast.next.next;
    }

    // Step 2: Reverse the second half of the list
    let prev: ListNode | null = null;
    let curr: ListNode | null = slow;
    while (curr) {
      const next = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next;
    }

    // Step 3: Merge the two halves
    let first: ListNode | null = head;
    let second: ListNode | null = prev;
    while (second && second.next) {
      const temp1 = first!.next;
      const temp2 = second.next;

      first!.next = second;
      second.next = temp1;

      first = temp1;
      second = temp2;
    }
  };

  const handleReorder = () => {
    try {
      const nums = input.split(',').map(Number);
      const head = createLinkedList(nums);
      reorderList(head);
      setResult(linkedListToArray(head));
    } catch (error) {
      console.error('Invalid input');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Reorder Linked List
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Example: Input: 1,2,3,4 → Output: 1,4,2,3
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
        onClick={handleReorder}
        sx={{ mt: 2 }}
      >
        Reorder List
      </Button>
      {result !== null && (
        <Box mt={2}>
          <Typography variant="h6">Reordered List:</Typography>
          <Typography variant="body1">{JSON.stringify(result)}</Typography>
        </Box>
      )}
    </div>
  );
};

export default ReorderList;