import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import Heap from 'heap-js';
import { MinHeap } from './MinHeap';

const MergeKSorted = () => {
  const [lists, setLists] = useState('');
  const [result, setResult] = useState<number[]>([]);

  const mergeKLists = (lists: number[][]): number[] => {
    const minHeap = new Heap((a, b) => a[0] - b[0]);
    const result: number[] = [];
    
    // Initialize heap with first element from each list and its list index
    for (let i = 0; i < lists.length; i++) {
      if (lists[i].length > 0) {
        minHeap.push([lists[i][0], i, 0]);
      }
    }
    
    while (minHeap.length > 0) {
      const [val, listIndex, elementIndex] = minHeap.pop();
      result.push(val);
      
      if (elementIndex + 1 < lists[listIndex].length) {
        minHeap.push([
          lists[listIndex][elementIndex + 1],
          listIndex,
          elementIndex + 1
        ]);
      }
    }
    
    return result;
  };

  const mergeKLists2 = (lists: number[][]): number[] => {
    const minHeap = new Heap((a :number, b :number) => a[0] - b[0]);
    const k = lists.length;
    const result :number[]= [];

    // for (let i=0; i<k; i++) {
    //   minHeap.insert(lists[i][0]);
    //   lists[i].shift();
    // }

    while (minHeap.length > 0) {
      const [val, listIndex, elementIndex] = minHeap.pop()!;
      result.push(val);
      if (elementIndex + 1 < lists[listIndex].length ) {
        minHeap.push([
          lists[listIndex][elementIndex + 1],
          listIndex,
          elementIndex + 1
        ]);
      }
      
    }
    
    return result;
  };

  const handleMerge = () => {
    try {
      const listArray = lists.split(';').map(list => 
        list.split(',').map(Number)
      );
      setResult(mergeKLists(listArray));
    } catch (error) {
      console.error('Invalid input');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Merge K Sorted Lists
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Example: 1,4,5;1,3,4;2,6
      </p>
      <TextField
        label="Enter sorted lists (format: 1,2,3;4,5,6;7,8,9)"
        variant="outlined"
        fullWidth
        value={lists}
        onChange={(e) => setLists(e.target.value)}
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
      {result.length > 0 && (
        <Box mt={2}>
          <Typography variant="h6">
            Merged result: [{result.join(', ')}]
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default MergeKSorted;