import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const CourseSchedule2 = () => {
  const [edges, setEdges] = useState('');
  const [numNodes, setNumNodes] = useState('');
  const [result, setResult] = useState<number[] | null>(null);

  /*
    You have to take a total of numCourses courses, which are labeled from 0 to numCourses - 1. 
    You are given a list of prerequisites pairs, where prerequisites[i] = [a, b] indicates that you 
    must complete course b before course a.

    Given the total number of courses and a list of prerequisite pairs, write a function to return 
    the ordering of courses you should take to finish all courses.

    If there are multiple valid orderings, return any valid ordering. If it is impossible to finish all 
    courses, return an empty array.
  */

  const canFinish = (numCourses: number, prerequisites: number[][]): number[] => {
    const inDegree = Array(numCourses).fill(0);
    const graph: number[][] = Array.from({ length: numCourses }, () => []);
    const queue: number[] = [];
    let courseTaken = 0;
    const coursesPath: number[] = [];

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
        coursesPath.push(course);
        
        for (const neighbor of graph[course] ) {
            inDegree[neighbor]--;
            if (inDegree[neighbor] === 0) {
                queue.push(neighbor);
            }
        }
    }

    return coursesPath.length === numCourses ? coursesPath : [];
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
       Course Schedule II
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        [[1, 0], [0, 1]], numNodes = 2 → Output []
      </p>
      <p className="text-sm text-gray-600 mb-4">
        [[0,1],[0,3],[1,2],[3,1],[3,5],[3,4],[4,5]], numNodes = 6 → Output [2,5,1,4,3,0]
      </p>
      <p className="text-sm text-gray-600 mb-4">[[1, 0], [0, 1],[1,2]], numNodes = 3 Output: []</p>
      <p className="text-sm text-gray-600 mb-4">[[1,0], [2,0], [3,1], [3,2]] numCourse: 4 Output:  [0, 1, 2, 3] or [0, 2, 1, 3] </p>
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

export default CourseSchedule2;