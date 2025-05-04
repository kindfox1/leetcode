import React from 'react';
import { Typography } from '@mui/material';
import FindKClosest from './heap/FindKClosest';
import KClosesPoints from './heap/FindKClosest';
import KClosestPoints from './heap/KClosestPoints';
import KthLargest from './heap/KthLargest';
import MergeKSorted from './heap/MergeKSorted';
import FindTopKFrequent from './heap/FindTopKFrequent';
import ConnectSticks from './heap/ConnectSticks';

const Heap = () => {
  return (
    <main className="flex-1 overflow-y-auto bg-gray-100">
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <Typography variant="h2" component="h1" gutterBottom>
          Heap Problems
        </Typography>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* <FindKClosest />
          <KClosesPoints /> */}
          <KClosestPoints />
          <KthLargest />
          <MergeKSorted />
          <FindKClosest />
          <FindTopKFrequent />
          <ConnectSticks />
        </div>
      </div>
    </main>
  );
};

export default Heap;