import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
} from '@mui/material';

const FruitBasket = () => {
  const [fruits, setFruits] = useState('');
  const [maxFruits, setMaxFruits] = useState(0);

  const handleInputChange = (e) => {
    setFruits(e.target.value);
  };

  const handleCalculate = () => {
    const fruitsArray = fruits.split(',').map((fruit) => fruit.trim());
    setMaxFruits(maxFruitsInBaskets3(fruitsArray));
  };

  const maxFruitsInBaskets = (fruits: number[]) => {
    let left = 0;
    let right = 0;
    let maxFruits = 0;
    const basket = new Map();

    while (right < fruits.length) {
      const fruit = fruits[right];
      basket.set(fruit, (basket.get(fruit) || 0) + 1);

      // If the number of different fruit types in the basket exceeds two, the window needs
      // to be shrunk by moving the left pointer to the right until the basket contains at most two types of fruits.
      while (basket.size > 2) {
        const leftFruit = fruits[left];
        basket.set(leftFruit, basket.get(leftFruit) - 1);
        if (basket.get(leftFruit) === 0) {
          basket.delete(leftFruit);
        }
        left++;
      }

      maxFruits = Math.max(maxFruits, right - left + 1);
      right++;
    }

    return maxFruits;
  };

  const maxFruitsInBaskets2 = (fruits: number[]) => {
    let left = 0;
    let right = 0;
    let maxFruits = 0;
    let baskets = new Map();

    while (right < fruits.length) {
      baskets.set(fruits[right], (baskets.get(fruits[right]) || 0) + 1);
      //baskets.set(fruits[right], baskets.get(fruits[right])? 0 : baskets.get(fruits[right]) + 1);

      while (baskets.size > 2) {
        const leftFruit = fruits[left];
        baskets.set(leftFruit, baskets.get(leftFruit) - 1);
        baskets.delete(fruits[left]);
        left++;
      }

      maxFruits = Math.max(maxFruits, right - left + 1);
      right++;
    }

    return maxFruits;
  };

  const maxFruitsInBaskets3 = (fruits: number[]): number => {
    console.log('maxFruitsInBaskets3');
    let left = 0;
    let right = 0;
    let maxFruits = 0;
    const basket = new Map();

    while (right < fruits.length) {
      

      if (basket.size > 2) {
        if (basket.get(fruits[left]) > 1) {
          basket.set(fruits[left], basket.get(fruits[left])-1); 
        } else { // delete the element if it is 0
          basket.delete(fruits[left]);
        }
        
        left++;
      } else {
        

        if (basket.has(fruits[right])) {
          basket.set(fruits[right], basket.get(fruits[right]) + 1)
        } else {
          basket.set(fruits[right], 1);
        }

        if (basket.size <= 2) {
          maxFruits = Math.max(maxFruits, right - left + 1);
         
        }
        right++;
      }
    }

    console.log('maxFruits', maxFruits);

    return maxFruits;
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Fruit into Basket Problem
      </Typography>
      <p>Example: [3, 3, 2, 1, 2, 1, 0], output: 4</p>
      <TextField
        label="Enter fruits"
        variant="outlined"
        fullWidth
        value={fruits}
        onChange={handleInputChange}
        helperText="Enter fruits separated by commas (e.g., apple, banana, apple, orange)"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleCalculate}
        style={{ marginTop: '1rem' }}
      >
        Calculate Max Fruits
      </Button>
      {maxFruits > 0 && (
        <Typography variant="h6" style={{ marginTop: '1rem' }}>
          Maximum number of fruits in two baskets: {maxFruits}
        </Typography>
      )}
    </div>
  );
};

export default FruitBasket;
