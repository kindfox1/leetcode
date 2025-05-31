import React from 'react';
import { Typography } from '@mui/material';
import CountingBits from './dynamic-programming/CountingBits';
import TreasureHunt from './dynamic-programming/TreasureHunt';
import ClimbingStairs from './dynamic-programming/ClimbingStairs';
import DecodeWays from './dynamic-programming/DecodeWays';
import MaximalSquare from './dynamic-programming/MaximalSquare';
import UniquePaths from './dynamic-programming/UniquePaths';
import LongestIncreasingSubsequence from './dynamic-programming/LongestIncreasingSubsequence';
import WordBreak from './dynamic-programming/WordBreak';
// import MaximumProfitJobScheduling from './dynamic-programming/MaximumProfitJobScheduling';
import MaximumProfitJobScheduling from './dynamic-programming/MaximumProfitJobScheduling';
import RobHousesCircular from './dynamic-programming/RobHouseCircular';
import MinEditDistance from './dynamic-programming/MinEditDistance';
import PaintWalls from './dynamic-programming/PaintWalls';

const Backtracking = () => {
  return (
    <main className="flex-1 overflow-y-auto bg-gray-100">
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <Typography variant="h2" component="h1" gutterBottom>
            Dynamic Programming
        </Typography>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ClimbingStairs />
            <CountingBits />
            <TreasureHunt />
            <RobHousesCircular />
            <DecodeWays/>
            <MaximalSquare/>
            <UniquePaths />
            <LongestIncreasingSubsequence/>
            <WordBreak/>
            <MaximumProfitJobScheduling />
            <MinEditDistance />
            <PaintWalls />
        </div>
      </div>
    </main>
  );
};

export default Backtracking;