import React from 'react';
import { Typography } from '@mui/material';
import Introduction from './breadth-first-search/Introduction';
import LevelOrderSum from './breadth-first-search/LevelOrderSum';
import ZigzagLevelOrder from './breadth-first-search/ZigzagLevelOrder';
import RottenOranges from './breadth-first-search/RottenOranges';
import Matrix01 from './breadth-first-search/Matrix01';
import BusRoutes from './breadth-first-search/BusRoutes';
import InvertBinaryTree from './breadth-first-search/InvertBinaryTree';

const BreadthFirstSearch = () => {
  return (
    <main className="flex-1 overflow-y-auto bg-gray-100">
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <Typography variant="h2" component="h1" gutterBottom>
          Breadth-First Search Problems
        </Typography>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Introduction />
          <LevelOrderSum />
          <ZigzagLevelOrder />
          <RottenOranges />
          <Matrix01 />
          <BusRoutes />
          <InvertBinaryTree />
        </div>
      </div>
    </main>
  );
};

export default BreadthFirstSearch;