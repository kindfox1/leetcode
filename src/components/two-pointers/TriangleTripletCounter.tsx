// START GENAI
import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box, List, ListItem, ListItemText } from '@mui/material';

const findTriangleTriplets = (nums) => {
  let count = 0;
  let triplets = [];

  // Sort the array in ascending order
  nums.sort((a, b) => a - b);

  // Iterate through each possible first element (i)
  for (let i = 0; i < nums.length - 2; i++) {
    // Iterate through each possible second element (j)
    for (let j = i + 1; j < nums.length - 1; j++) {
      let k = j + 1;  // Start k at the next element after j
      // Use two-pointer technique to find all valid third elements (m)
      while (k < nums.length && nums[i] + nums[j] > nums[k]) {
        triplets.push([nums[i], nums[j], nums[k]]);
        k++;
      }
      // Count valid triplets formed by i and j
      count += k - j - 1;
    }
  }

  return { count, triplets };
};



const triangleNumber = (nums) => {
// Sort the array
  nums.sort((a, b) => a - b);

  let count = 0;
  // Loop backwards from the second-to-last element
  for (let i = nums.length - 1; i > 1; i--) {
    let left = 0;
    let right = i - 1;

    // While loop to check the triangle condition
    while (left < right) {
      if (nums[left] + nums[right] > nums[i]) {
        count = count + (right - left);  // All pairs between left and right are valid
        right--;  // Decrease the right pointer
      } else {
        left++;  // Increase the left pointer
      }
    }
  }
  return count;
};

/*
Write a function to count the number of triplets in an integer array nums that could form the sides of a triangle. The triplets do not need to be unique.
[11,4,9,6,15,18] => 10
*/
const triangleNumber2 = (nums) => {
  nums.sort((a, b) => a - b);
  let count = 0;

  for (let i= nums.length -1; i > 1; i--) {
    let left = 0;
    let right = i - 1;

    while (left < right) {
      if (nums[left] + nums[right] > nums[i]) {
        count = count + (right - left);
        right--;
      } else {
        left ++;
      }
    }
    
  }
  return count;
};

const TriangleTripletCounter = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [numOfTriangles, setNumOfTriangles] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const nums = input.split(',').map(Number);
    const { count, triplets } = findTriangleTriplets(nums);

    setNumOfTriangles(triangleNumber2(nums));
    setResult({ count, triplets });
  };

  return (
    <Container maxWidth="sm" className="bg-white rounded-lg shadow p-6">
      <Box>
        <Typography variant="h6" component="h2" gutterBottom>
          Triangle Triplet Counter
        </Typography>
        <p>[11,4,9,6,15,18]</p>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Enter array of integers (comma-separated)"
            variant="outlined"
            fullWidth
            margin="normal"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary">
            Count Triplets
          </Button>
        </form>
        {result !== null && (
          <Box mt={4}>
            <Typography variant="h6">
              Number of triplets that can form a triangle: {result.count} || {numOfTriangles}
            </Typography>
            <List>
              {result.triplets.map((triplet, index) => (
                <ListItem key={index}>
                  <ListItemText primary={`(${triplet.join(', ')})`} />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default TriangleTripletCounter;

// END GENAI