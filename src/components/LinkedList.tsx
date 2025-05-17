import React from 'react';
import { Typography } from '@mui/material';
import LinkedListCycle from './linked-list/LinkedListCycle';
import PalindromeLinkedList from './linked-list/PalindromeLinkedList';
import SwapNodes from './linked-list/SwapNodes';
import ReorderList from './linked-list/ReorderList';
import RemoveNthNode from './linked-list/RemoveNthNode';
import MergeSortedLists from './linked-list/MergeSortedLists';
import MergeKSortedLists from './linked-list/MergeKSortedLists';
import ReverseLinkedList from './linked-list/ReverseLinkedList';

const LinkedList = () => {
  return (
    <main className="flex-1 overflow-y-auto bg-gray-100">
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <Typography variant="h2" component="h1" gutterBottom>
          Linked List Problems
        </Typography>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <LinkedListCycle />
          <PalindromeLinkedList />
          <SwapNodes />
          <ReorderList />
          <RemoveNthNode />
          <MergeSortedLists />
          <MergeKSortedLists />
          <ReverseLinkedList />
        </div>
      </div>
    </main>
  );
};

export default LinkedList;