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

const ReverseLinkedList = () => {
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

  const reverseList = (head: ListNode | null): ListNode | null => {
    let prev: ListNode | null = null;
    let current: ListNode | null = head;

    while (current) {
      const next = current.next; // Save the next node
      current.next = prev; // Reverse the link
      prev = current; // Move prev to the current node
      current = next; // Move to the next node
    }

    return prev; // New head of the reversed list
  };

  const reverseList2 = (head: ListNode | null): ListNode | null => {
    let prev: ListNode | null = null;
    let curr: ListNode | null = head;

    while (curr) {
        const next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }

    return curr;
  };

  const handleReverse = () => {
    try {
      const nums = input.split(',').map(Number);
      const head = createLinkedList(nums);
      const reversedHead = reverseList(head);
      setResult(linkedListToArray(reversedHead));
    } catch (error) {
      console.error('Invalid input');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Reverse Linked List
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Example: Input: 1,2,3,4 → Output: 4,3,2,1
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
        onClick={handleReverse}
        sx={{ mt: 2 }}
      >
        Reverse List
      </Button>
      {result !== null && (
        <Box mt={2}>
          <Typography variant="h6">Reversed List:</Typography>
          <Typography variant="body1">{JSON.stringify(result)}</Typography>
        </Box>
      )}
    </div>
  );
};

export default ReverseLinkedList;