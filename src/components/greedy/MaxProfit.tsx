import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const MaxProfit = () => {
  const [prices, setPrices] = useState('');
  const [result, setResult] = useState<number | null>(null);

  /*
    Given an array prices where prices[i] represents the stock price on the ith day, 
    return the maximum profit you can achieve by buying and selling the stock once.

    Time Complexity: O(n), where n is the length of the prices array.
    Space Complexity: O(1), as we use constant space.
  */

  const maxProfit = (prices: number[]): number => {
    let minPrice = Infinity;
    let maxProfit = 0;

    for (const price of prices) {
      if (price < minPrice) {
        minPrice = price; // Update the minimum price
      } else if (price - minPrice > maxProfit) {
        maxProfit = price - minPrice; // Update the maximum profit
      }
    }

    return maxProfit;
  };

  const maxProfit2 = (prices: number[]): number => {
    let maxProfit = 0;
    let minPrice = Infinity;

    for (const price of prices) {
        if (price < minPrice) {
            minPrice = price;
        } else if (price - minPrice >  maxProfit) {
            maxProfit = price - minPrice;
        }
    }

    return maxProfit;
  };

  const maxProfit3 = (prices: number[]): number => {
    let profit = 0;
    let minPrice = Infinity;

    for (const price of prices) {
      if (minPrice > price) {
        minPrice = price;
      } else if (price - minPrice > profit) {
        profit = price - minPrice;
      }
    }
    return profit;
  };

  const handleCalculate = () => {
    try {
      const pricesArray = JSON.parse(prices);

      if (!Array.isArray(pricesArray) || pricesArray.some(isNaN)) {
        throw new Error('Invalid input');
      }

      const profit = maxProfit2(pricesArray);
      setResult(profit);
    } catch (error) {
      console.error('Invalid input');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Maximum Profit from Stock Prices
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Example: Input prices = [3,4,6,2,5,8] → Output: 6
      </p>
      <TextField
        label="Enter stock prices (as JSON array)"
        variant="outlined"
        fullWidth
        value={prices}
        onChange={(e) => setPrices(e.target.value)}
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

export default MaxProfit;