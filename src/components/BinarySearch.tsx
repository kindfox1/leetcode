import React from 'react';
import { Typography } from '@mui/material';
import AppleHarvest from './binary-search/AppleHarvest';
import SearchRotatedArray from './binary-search/SearchRotatedArray';
import BinSearth from './binary-search/BinarySearch';
import DeleteNodeBST from './binary-search/DeleteNodeBST';

const BinarySearch = () => {
  return (
    <main className="flex-1 overflow-y-auto bg-gray-100">
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <Typography variant="h2" component="h1" gutterBottom>
          Binary Search Problems
        </Typography>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <BinSearth />
          <AppleHarvest />
          <SearchRotatedArray />
          <DeleteNodeBST />
        </div>
      </div>
    </main>
  );
};

export default BinarySearch;