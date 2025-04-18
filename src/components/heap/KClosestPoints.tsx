import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import Heap from 'heap-js';
import { MinHeap } from './MinHeap';

const KClosestPoints = () => {
  const [points, setPoints] = useState('');
  const [k, setK] = useState('');
  const [result, setResult] = useState<number[][]>([]);

  /*
  Given a list of points in the form [[x1, y1], [x2, y2], ... [xn, yn]] and an integer k, find the k closest points to the origin (0, 0) on the 2D plane.
  The distance between two points (x, y) and (a, b) is calculated using the formula:
  √(x1 - a2)2 + (y1 - b2)2
  Return the k closest points in any order.
  points = [[3,4],[2,2],[1,1],[0,0],[5,5]]; k = 3
  Output: [[2,2],[1,1],[0,0]]

  Use MaxHeap
  */
  const kClosest = (points: number[][], k: number): number[][] => {
    const maxHeap = new Heap((a: number[], b: number[]) => {
      const distA = a[0] * a[0] + a[1] * a[1];
      const distB = b[0] * b[0] + b[1] * b[1];
      return distB - distA;
    });
    
    for (const point of points) {
      maxHeap.push(point);
      if (maxHeap.length > k) {
        maxHeap.pop();
      }
    }
    
    return maxHeap.toArray();
  };

  const handleCalculate = () => {
    try {
      const pointsList = JSON.parse(points);
      const kNum = parseInt(k);
      if (!isNaN(kNum) && kNum > 0) {
        setResult(kClosest(pointsList, kNum));
      }
    } catch (error) {
      console.error('Invalid input');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        K Closest Points to Origin
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Example: 1,3;-2,2 k=1
      </p>
      <TextField
        label="Enter points (format: x,y;x,y)"
        variant="outlined"
        fullWidth
        value={points}
        onChange={(e) => setPoints(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Enter k"
        variant="outlined"
        fullWidth
        value={k}
        onChange={(e) => setK(e.target.value)}
        margin="normal"
        type="number"
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleCalculate}
        sx={{ mt: 2 }}
      >
        Find K Closest Points
      </Button>
      {result.length > 0 && (
        <Box mt={2}>
          <Typography variant="h6">
            Closest points:
          </Typography>
          {result.map((point, index) => (
            <Typography key={index}>
              Point {index + 1}: [{point.join(', ')}]
            </Typography>
          ))}
        </Box>
      )}
    </div>
  );
};

export default KClosestPoints;