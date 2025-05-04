import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const AppleHarvest = () => {
  const [input, setInput] = useState('');
  const [k, setK] = useState('');
  const [result, setResult] = useState<number | null>(null);

  /*
  Bobby has an orchard of apple trees, and each tree has a certain number of apples on it.
  Bobby wants to collect all the apples by the end of the day by collecting a fixed number of apples per hour. 
  He can only harvest apples from one tree per hour - if he finishes collecting apples from a tree before the hour is up, 
  he must wait until the next hour to move to the next tree.

  For example, if there are 3 apples on a tree and Bobby collects 1 apple per hour, it will take him 3 hours to finish collecting the apples on 
  that tree.
  If he harvests 2 apples per hour, it will take him 2 hours to finish collecting all the apples on that tree (he waits until the hour is up even 
  though he finishes early).
  Write a function to determine the slowest rate of apples Bobby can harvest per hour to finish the job in at most 'h' hours. The input to the 
  function is an array of integers representing the number of apples on each tree and an integer 'h' representing the number of hours Bobby has to 
  finish the job within.
  apples = [3, 6, 7], h = 8; output = 3
  apples = [25, 9, 23, 8, 3], h = 5; output = 25

  Time Complexity: O(log m * n)
  Space Complexity: O(1)
  */
  const minEatingSpeed = (piles: number[], h: number): number => {
    let left = 1;
    let right = Math.max(...piles);
    
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      let hours = 0;
      
      for (const pile of piles) {
        hours += Math.ceil(pile / mid);
      }
      
      if (hours <= h) {
        right = mid;
      } else {
        left = mid + 1;
      }
    }
    
    return left;
  };

  const minEatingSpeed2 = (piles: number[], h: number): number => {
    let left = 1;
    let right = Math.max(...piles);

    const getTime = (rate: number) :number => {
      let hours =0;
      for (const pile of piles) {
        hours += Math.ceil(pile / rate);
      }

      return hours;
    };
    
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      
      if (getTime(mid) <= h) {
        right = mid;
      } else {
        left = mid + 1;
      }
    }
    
    return left;
  };

  const minEatingSpeed3 = (piles: number[], h: number): number => {
    let left: number = 1;
    let right: number = Math.max(...piles);

    const getTime = (numPerHour: number): number => {
      let numHours = 0;
      
      for (let i=0; i<piles.length; i++) {
        numHours += Math.ceil(piles[i] / numPerHour);
      }

      return numHours;
    };

    while (left < right) {
      let mid = Math.floor((right + left) /2);
      let hours = getTime(mid);

      if (hours <= h) {
        
        right = mid;
      } else {
        left = mid + 1;
      }
    }
    
    return left;
  };

  const handleCalculate = () => {
    try {
      //const piles = input.split(',').map(Number);
      const piles = JSON.parse(input);
      const hours = parseInt(k);
      setResult(minEatingSpeed3(piles, hours));
    } catch (error) {
      console.error('Invalid input format');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Apple Harvest (Koko Eating Bananas)
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        apples: [3,6,7,11] Hours: 8; output: 4
      </p>
      <p className="text-sm text-gray-600 mb-4">apples = [3, 6, 7], h = 8; output = 3</p>
      <p className="text-sm text-gray-600 mb-4">apples = [25, 9, 23, 8, 3], h = 5; output = 25</p>
      <TextField
        label="Enter apple piles (comma-separated)"
        variant="outlined"
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Enter hours available"
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
        Calculate Minimum Speed
      </Button>
      {result !== null && (
        <Box mt={2}>
          <Typography variant="h6">
            Minimum eating speed: {result} apples/hour
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default AppleHarvest;