import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const MaximumProfitJobScheduling = () => {
  const [jobs, setJobs] = useState('');
  const [result, setResult] = useState<number | null>(null);

  /*
    Given start times, end times, and profits of jobs, return the maximum profit you can achieve 
    by scheduling non-overlapping jobs.

    Time Complexity: O(n log n), where n is the number of jobs (due to sorting).
    Space Complexity: O(n), for the dp array.
  */

  const jobScheduling = (startTime: number[], endTime: number[], profit: number[]): number => {
    const n = startTime.length;
    const jobs = startTime.map((_, i) => ({
      start: startTime[i],
      end: endTime[i],
      profit: profit[i],
    }));

    // Sort jobs by end time
    jobs.sort((a, b) => a.end - b.end);

    const dp = Array(n).fill(0);
    dp[0] = jobs[0].profit;

    const binarySearch = (index: number): number => {
      let low = 0,
        high = index - 1;
      while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (jobs[mid].end <= jobs[index].start) {
          if (jobs[mid + 1]?.end <= jobs[index].start) {
            low = mid + 1;
          } else {
            return mid;
          }
        } else {
          high = mid - 1;
        }
      }
      return -1;
    };

    for (let i = 1; i < n; i++) {
      const includeProfit = jobs[i].profit;
      const lastNonConflict = binarySearch(i);
      const totalProfit = includeProfit + (lastNonConflict !== -1 ? dp[lastNonConflict] : 0);
      dp[i] = Math.max(dp[i - 1], totalProfit);
    }

    return dp[n - 1];
  };

  const handleCalculate = () => {
    try {
      const parsedJobs = JSON.parse(jobs);

      if (
        !Array.isArray(parsedJobs) ||
        parsedJobs.some(
          job =>
            !Array.isArray(job) ||
            job.length !== 3 ||
            job.some(value => typeof value !== 'number' || value < 0)
        )
      ) {
        throw new Error('Invalid input');
      }

      const startTime = parsedJobs.map(job => job[0]);
      const endTime = parsedJobs.map(job => job[1]);
      const profit = parsedJobs.map(job => job[2]);

      const maxProfit = jobScheduling(startTime, endTime, profit);
      setResult(maxProfit);
    } catch (error) {
      console.error('Invalid input');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 hard">
      <Typography variant="h6" gutterBottom>
        Maximum Profit in Job Scheduling
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Example: Input jobs = [[1,2,50],[3,5,20],[6,19,100],[2,10,200]] → Output: 250
      </p>
      <TextField
        label="Enter jobs (as JSON array of [start, end, profit])"
        variant="outlined"
        fullWidth
        value={jobs}
        onChange={(e) => setJobs(e.target.value)}
        margin="normal"
        type="text"
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleCalculate}
        sx={{ mt: 2 }}
      >
        Calculate Maximum Profit
      </Button>
      {result !== null && (
        <Box mt={2}>
          <Typography variant="h6">
            Maximum Profit:
          </Typography>
          <Typography variant="body1">
            {result}
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default MaximumProfitJobScheduling;