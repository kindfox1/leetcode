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

const RemoveNthNode = () => {
  const [input, setInput] = useState('');
  const [n, setN] = useState('');
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

  const removeNthFromEnd = (head: ListNode | null, n: number): ListNode | null => {
    const dummy = new ListNode(0, head); // Dummy node to handle edge cases
    let slow: ListNode | null = dummy;
    let fast: ListNode | null = dummy;

    // Move the fast pointer n+1 steps ahead
    for (let i = 0; i <= n; i++) {
      if (fast) fast = fast.next;
    }

    // Move both pointers until fast reaches the end
    while (fast) {
      slow = slow!.next;
      fast = fast.next;
    }

    // Remove the nth node
    slow!.next = slow!.next!.next;

    return dummy.next; // Return the new head
  };

  const removeNthFromEnd2 = (head: ListNode | null, n: number): ListNode | null => {
    let dummy :ListNode | null = new ListNode(0, head); // Dummy node to handle edge cases
    let i = 1;
    let curr = dummy;
    let fast = dummy;
    while (i <= n && fast && fast.next) {
        fast = fast.next;
        i++;
    }

    while (fast && fast.next) {
        if (curr && curr.next) {
            curr = curr.next;
        }
        fast = fast.next;
    }

    curr.next = curr!.next!.next;

    return dummy.next;
  };

  const handleRemove = () => {
    try {
      const nums = input.split(',').map(Number);
      const nth = parseInt(n, 10);

      if (isNaN(nth) || nth <= 0) {
        throw new Error('Invalid value for n');
      }

      const head = createLinkedList(nums);
      const newHead = removeNthFromEnd2(head, nth);
      setResult(linkedListToArray(newHead));
    } catch (error) {
      console.error('Invalid input');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Remove Nth Node from End of List
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Example: Input: 1,2,3,4,5 and n = 2 → Output: 1,2,3,5
      </p>
      <TextField
        label="Enter values (comma-separated)"
        variant="outlined"
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Enter n"
        variant="outlined"
        fullWidth
        value={n}
        onChange={(e) => setN(e.target.value)}
        margin="normal"
        type="number"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleRemove}
        sx={{ mt: 2 }}
      >
        Remove Nth Node
      </Button>
      {result !== null && (
        <Box mt={2}>
          <Typography variant="h6">Modified List:</Typography>
          <Typography variant="body1">{JSON.stringify(result)}</Typography>
        </Box>
      )}
    </div>
  );
};

export default RemoveNthNode;