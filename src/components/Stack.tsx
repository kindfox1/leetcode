import React from 'react';
import { Typography } from '@mui/material';
import ValidParentheses from './stack/ValidParentheses';
import DecodeString from './stack/DecodeString';
import LongestValidParentheses from './stack/LongestValidParentheses';
import DailyTemperatures from './stack/DailyTemperatures';
import LargestRectangle from './stack/LargestRectangle';
import NextGreaterElement from './stack/NextGreaterElement';

const Stack = () => {
  return (
    <main className="flex-1 overflow-y-auto bg-gray-100">
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <Typography variant="h2" component="h1" gutterBottom>
          Stack Problems
        </Typography>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ValidParentheses />
          <DecodeString />
          <LongestValidParentheses />
          <NextGreaterElement />
          <DailyTemperatures />
          <LargestRectangle />
        </div>
      </div>
    </main>
  );
};

export default Stack;