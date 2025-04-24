import React from 'react';
import { Typography } from '@mui/material';
import PathSum from './backtracking/PathSum';
import WordSearch from './backtracking/WordSearch';

const Backtracking = () => {
  return (
    <main className="flex-1 overflow-y-auto bg-gray-100">
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <Typography variant="h2" component="h1" gutterBottom>
            Backtracking Search Problems
        </Typography>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PathSum />
          <WordSearch />
        </div>
      </div>
    </main>
  );
};

export default Backtracking;