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

const MergeSortedLists = () => {
  const [list1Input, setList1Input] = useState('');
  const [list2Input, setList2Input] = useState('');
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

  /*
    Since current starts at dummy, all updates to current.next are reflected in dummy.next.
    By the end of the process, dummy.next points to the head of the merged list.
  */
  const mergeTwoLists = (list1: ListNode | null, list2: ListNode | null): ListNode | null => {
    const dummy = new ListNode(0);
    let current = dummy;

    while (list1 && list2) {
      if (list1.val <= list2.val) {
        current.next = list1;
        list1 = list1.next;
      } else {
        current.next = list2;
        list2 = list2.next;
      }
      current = current.next;
    }

    // Append the remaining nodes from either list1 or list2
    current.next = list1 || list2;

    return dummy.next;
  };

  const mergeTwoLists2 = (list1: ListNode | null, list2: ListNode | null): ListNode | null => {
    const dummy = new ListNode(0);
    let current = dummy;

    while (list1 && list2) {
        if (list1.val <= list2.val) {
            current.next = list1;
            list1 = list1.next;

        } else {
            current.next = list2;
            list2 = list2.next;
        }
        current = current.next;
    }

    current.next = list1 || list2;

    return dummy.next;
  };

  const handleMerge = () => {
    //try {
      const nums1 = list1Input.split(',').map(Number);
      const nums2 = list2Input.split(',').map(Number);

      const list1 = createLinkedList(nums1);
      const list2 = createLinkedList(nums2);

      const mergedHead = mergeTwoLists2(list1, list2);
      setResult(linkedListToArray(mergedHead));
    // } catch (error) {
    //   console.error('Invalid input');
    // }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Merge Two Sorted Linked Lists
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Example: Input: list1 = [1,2,4], list2 = [1,3,4] → Output: [1,1,2,3,4,4]
      </p>
      <TextField
        label="Enter values for list1 (comma-separated)"
        variant="outlined"
        fullWidth
        value={list1Input}
        onChange={(e) => setList1Input(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Enter values for list2 (comma-separated)"
        variant="outlined"
        fullWidth
        value={list2Input}
        onChange={(e) => setList2Input(e.target.value)}
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleMerge}
        sx={{ mt: 2 }}
      >
        Merge Lists
      </Button>
      {result !== null && (
        <Box mt={2}>
          <Typography variant="h6">Merged List:</Typography>
          <Typography variant="body1">{JSON.stringify(result)}</Typography>
        </Box>
      )}
    </div>
  );
};

export default MergeSortedLists;