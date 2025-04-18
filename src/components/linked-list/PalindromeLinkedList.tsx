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

const PalindromeLinkedList = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<boolean | null>(null);

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

  const isPalindrome = (head: ListNode | null): boolean => {
    if (!head || !head.next) return true;

    // Find middle using slow/fast pointer
    let slow = head;
    let fast = head;
    while (fast.next && fast.next.next) {
      slow = slow.next!;
      fast = fast.next.next;
    }

    // Reverse second half
    let prev = null;
    let curr = slow.next;
    while (curr) {
      const next = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next;
    }

    // Compare first half with reversed second half
    let firstHalf = head;
    let secondHalf = prev;
    while (secondHalf) {
      if (firstHalf.val !== secondHalf.val) return false;
      firstHalf = firstHalf.next!;
      secondHalf = secondHalf.next;
    }

    return true;
  };

  const isPalindrome2 = (head: ListNode | null): boolean => {
    if (head === null || head.next === null) {
      return true;
    }

    let fast = head;
    let slow = head;

    while (fast.next && fast.next.next) {
      fast = fast.next.next;
      slow = slow.next!;
    }

    let curr = slow.next;
    let prev = null;

    while (curr) {
      let next = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next!;
    }

    let right = prev;
    let left = head;
    while (right) {
      if (left.val !== right.val) {
        return false;
      }
      right = right.next;
      left = left.next!;
      
    }
    return true;
  };

  const handleCheck = () => {
    try {
      const nums = input.split(',').map(Number);
      const head = createLinkedList(nums);
      setResult(isPalindrome2(head));
    } catch (error) {
      console.error('Invalid input format', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Palindrome Linked List
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Example: 1,2,2,1
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
        onClick={handleCheck}
        sx={{ mt: 2 }}
      >
        Check Palindrome
      </Button>
      {result !== null && (
        <Box mt={2}>
          <Typography 
            variant="h6" 
            color={result ? 'success.main' : 'error.main'}
          >
            {result ? 'Is a palindrome!' : 'Not a palindrome'}
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default PalindromeLinkedList;