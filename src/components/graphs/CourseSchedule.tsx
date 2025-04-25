import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const CourseSchedule = () => {
  const [edges, setEdges] = useState('');
  const [numNodes, setNumNodes] = useState('');
  const [result, setResult] = useState<boolean | null>(null);

  /*
    You have to take a total of numCourses courses, which are labeled from 0 to numCourses - 1. 
    You are given a list of prerequisites pairs, where prerequisites[i] = [a, b] indicates that you must 
    complete course b before course a.

    Given the total number of courses and a list of prerequisite pairs, write a function to determine if 
    it is possible to finish all courses.
  */

  const canFinish = (numCourses: number, prerequisites: number[][]): boolean => {
    const inDegree = Array(numCourses).fill(0);
    const graph: number[][] = Array.from({ length: numCourses }, () => []);
    const queue: number[] = [];
    let courseTaken = 0;

    for (const [destination, source] of prerequisites ) {
        graph[source].push(destination);
        inDegree[destination]++;
    }

    //add all node to queue if it's inDegree is 0
    for (let i=0; i< numCourses; i++) {
        if (inDegree[i]===0) {
            queue.push(i);
        }
    }

    while (queue.length > 0) {
        let course = queue.shift()!;
        courseTaken++;
        
        for (const neighbor of graph[course] ) {
            inDegree[neighbor]--;
            if (inDegree[neighbor] === 0) {
                queue.push(neighbor);
            }
        }
    }

    return courseTaken === numCourses;
  };

  const handleGenerate = () => {
    //try {
      const edgesArray = JSON.parse(edges);
      const nodes = parseInt(numNodes, 10);

      if (
        !Array.isArray(edgesArray) ||
        edgesArray.some(edge => !Array.isArray(edge) || edge.length !== 2 || edge.some(isNaN)) ||
        isNaN(nodes) ||
        nodes <= 0
      ) {
        throw new Error('Invalid input');
      }

      const result = canFinish(nodes, edgesArray);
      setResult(result);
    // } catch (error) {
    //   console.error('Invalid input');
    // }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
       Course Schedule
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Input edges = [[0,1],[1,2],[2,3]], numNodes = 4 → Output true
      </p>
      <p className="text-sm text-gray-600 mb-4">
        Input edges = [[0,1],[0,3],[1,2],[3,1],[3,5],[3,4],[4,5]], numNodes = 6 → Output True
      </p>
      <p className="text-sm text-gray-600 mb-4">[[1, 0], [0, 1],[1,2]], numNodes = 3 Output: Fasle</p>
      <TextField
        label="Enter edges (as JSON array)"
        variant="outlined"
        fullWidth
        value={edges}
        onChange={(e) => setEdges(e.target.value)}
        margin="normal"
        type="text"
      />
      <TextField
        label="Enter number of nodes"
        variant="outlined"
        fullWidth
        value={numNodes}
        onChange={(e) => setNumNodes(e.target.value)}
        margin="normal"
        type="number"
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleGenerate}
        sx={{ mt: 2 }}
      >
        Generate Topological Order
      </Button>
      {result !== null && (
        <Box mt={2}>
          <Typography variant="h6">
            Topological Order:
          </Typography>
          <Typography variant="body1">
            {result ? JSON.stringify(result) : 'Graph has a cycle (no valid topological order)'}
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default CourseSchedule;