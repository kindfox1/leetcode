import React from 'react';
import { Typography } from '@mui/material';
import FruitBasket from './sliding-window/FruitBasket';
import LongestSubstring from './sliding-window/LongestSubstring';
import LongestRepeatingReplacement from './sliding-window/LongestRepeatingReplacement';
import MaximumSumSubarray from './sliding-window/MaximumSumSubarray';
import MaxPointsFromCards from './sliding-window/MaxPointsFromCards';
import MaxDistinctSubarrays from './sliding-window/MaxDistinctSubarrays';

const SlidingWindow = () => {
  return (
    <main className="flex-1 overflow-y-auto bg-gray-100">
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <Typography variant="h2" component="h1" gutterBottom>
          Sliding Window Problems
        </Typography>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FruitBasket />
          <LongestSubstring />
          <LongestRepeatingReplacement />
          <MaximumSumSubarray />
          <MaxPointsFromCards />
          <MaxDistinctSubarrays />
        </div>
      </div>
    </main>
  );
};

export default SlidingWindow;
