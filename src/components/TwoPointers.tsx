import React from 'react';
import StatCard from './StatCard';
import ThreeSum from './two-pointers/ThreeSum';
import ContainerWithMostWater from './two-pointers/ContainerWithMostWater';
import TriangleTripletCounter from './two-pointers/TriangleTripletCounter';
import MoveZero from './two-pointers/MoveZero';
import SortColors from './two-pointers/SortColors';
import TrappingRainWater from './two-pointers/TrappingRainWater';
import TwoSum from './two-pointers/TwoSum'
import TwoSum2 from './two-pointers/TwoSum2'
import RevertString from './two-pointers/RevertString';
//import { Users, DollarSign, ShoppingCart, TrendingUp } from 'lucide-react';
import { Typography } from '@mui/material';

export default function TwoPointers() {
  return (
    <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
      <Typography variant="h2" component="h1" gutterBottom>Two Pointer problems</Typography>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <TwoSum />
        <TwoSum2 />
        <ThreeSum />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <ContainerWithMostWater />
        <TriangleTripletCounter />
        <MoveZero />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <SortColors />
        <TrappingRainWater />
        <RevertString />
      </div>
    </main>
  );
}