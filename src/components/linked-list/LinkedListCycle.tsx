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

const LinkedListCycle = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<boolean | null>(null);

  const createLinkedList = (nums: number[], pos: number): ListNode | null => {
    if (nums.length === 0) return null;
    
    const nodes: ListNode[] = nums.map(num => new ListNode(num));
    for (let i = 0; i < nodes.length - 1; i++) {
      nodes[i].next = nodes[i + 1];
    }
    
    if (pos >= 0 && pos < nodes.length) {
      nodes[nodes.length - 1].next = nodes[pos];
    }
    console.log(nodes);
    return nodes[0];
  };

  /*
  Write a function that takes in a parameter head of type ListNode that is a reference to the head of a linked list. 
  The function should return True if the linked list contains a cycle, and False otherwise, without modifying the linked list in any way.
  */
  const hasCycle = (head: ListNode | null): boolean => {
    if (!head || !head.next) return false;
    
    let slow = head;
    let fast = head;
    
    while (fast.next && fast.next.next) {
      slow = slow.next!;
      fast = fast.next.next;
      if (slow === fast) return true;
    }
    
    return false;
  };

  const hasCycle2 = (head: ListNode | null): boolean => {
    if (head === null || head.next === null) {
      return false;
    }

    let fast = head;
    let slow = head;

    while (fast.next && fast.next.next) {
      fast = fast.next.next;
      slow = slow.next!;

      if (fast === slow) {
        return true;
      }

      
    }
    
    return false;
  };

  const hasCycle3 = (head: ListNode | null): boolean => {
    if (head === null || head.next === null) {
      return false;
    }

    let fast = head;
    let slow = head;

    while (fast.next && fast.next.next) {
      slow = slow.next!;
      fast = fast.next.next;
      if (slow === fast) {
        return true;
      }
    }
    
    return false;
  };

  const handleCheck = () => {
    try {
      const [nums, pos] = input.split(';').map(part => 
        part.trim().split(',').map(Number)
      );
      const head = createLinkedList(nums, pos[0]);
      setResult(hasCycle2(head));
    } catch (error) {
      console.error('Invalid input format');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Linked List Cycle Detection
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Example: 3,2,0,-4;1 (numbers;position) = true
      </p>
      <p className="text-sm text-gray-600 mb-4">
        Example: 3,2,0,-4;null (numbers;position) = false
      </p>
      <TextField
        label="Enter values and cycle position"
        variant="outlined"
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
        margin="normal"
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleCheck}
        sx={{ mt: 2 }}
      >
        Check for Cycle
      </Button>
      {result !== null && (
        <Box mt={2}>
          <Typography 
            variant="h6" 
            color={result ? 'success.main' : 'error.main'}
          >
            {result ? 'Cycle detected!' : 'No cycle found'}
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default LinkedListCycle;