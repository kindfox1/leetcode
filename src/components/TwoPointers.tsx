import React from 'react';
import StatCard from './StatCard';
import ThreeSum from './two-pointers/ThreeSum';
import ContainerWithMostWater from './two-pointers/ContainerWithMostWater';
import TriangleTripletCounter from './two-pointers/TriangleTripletCounter';
import MoveZero from './two-pointers/MoveZero';
import SortColors from './two-pointers/SortColors';
import TrappingRainWater from './two-pointers/TrappingRainWater';
import LongestSubstring from './sliding-window/LongestSubstring'
import TwoSum from './two-pointers/TwoSum'
import TwoSum2 from './two-pointers/TwoSum2'
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
      </div>

      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Recent ActivityXX</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <Users className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">New user registered</p>
                  <p className="text-xs text-gray-500">{i} hour ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Stats</h2>
          <div className="space-y-4">
            {[
              { label: 'Active Users', value: '1,234' },
              { label: 'Total Sales', value: '$12,345' },
              { label: 'Pending Orders', value: '23' },
            ].map((stat) => (
              <div key={stat.label} className="flex justify-between items-center">
                <span className="text-gray-600">{stat.label}</span>
                <span className="font-semibold">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
        
      </div> */}
    </main>
  );
}