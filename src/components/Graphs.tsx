import React from 'react';
import { Typography } from '@mui/material';
import KahnsAlgorithm from './graphs/KahnsAlgorithm';
import CourseSchedule from './graphs/CourseSchedule';
import CourseSchedule2 from './graphs/CourseSchedule2';

const Graphs = () => {
  return (
    <main className="flex-1 overflow-y-auto bg-gray-100">
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <Typography variant="h2" component="h1" gutterBottom>
            Graphs
        </Typography>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <KahnsAlgorithm />
          <CourseSchedule />
          <CourseSchedule2 />
        </div>
      </div>
    </main>
  );
};

export default Graphs;