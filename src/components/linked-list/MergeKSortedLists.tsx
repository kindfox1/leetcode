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

const MergeKSortedLists = () => {
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

    current.next = list1 || list2;

    return dummy.next;
  };

  const mergeKLists = (lists: (ListNode | null)[]): ListNode | null => {
    if (lists.length === 0) return null;

    while (lists.length > 1) {
      const mergedLists: (ListNode | null)[] = [];

      for (let i = 0; i < lists.length; i += 2) {
        const l1 = lists[i];
        const l2 = i + 1 < lists.length ? lists[i + 1] : null;
        mergedLists.push(mergeTwoLists(l1, l2));
      }

      lists = mergedLists;
    }

    return lists[0];
  };

  const mergeKLists2 = (lists: Array<ListNode | null>): ListNode | null => {
    

    return lists[0];
  }

  const handleMerge = () => {
    try {
      const listsInput = JSON.parse(input);
      if (!Array.isArray(listsInput) || listsInput.some(list => !Array.isArray(list))) {
        throw new Error('Invalid input');
      }

      const lists = listsInput.map(createLinkedList);
      const mergedHead = mergeKLists(lists);
      setResult(linkedListToArray(mergedHead));
    } catch (error) {
      console.error('Invalid input');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Merge K Sorted Linked Lists
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Example: Input: [[1,4,5],[1,3,4],[2,6]] → Output: [1,1,2,3,4,4,5,6]
      </p>
      <TextField
        label="Enter k sorted lists (as JSON array)"
        variant="outlined"
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
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

export default MergeKSortedLists;