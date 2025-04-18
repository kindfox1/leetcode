import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const LongestRepeatingReplacement = () => {
  const [input, setInput] = useState('');
  const [k, setK] = useState('');
  const [result, setResult] = useState(null);


  function characterReplacement(s, k) {
    const state = {};
    let maxFreq = 0;
    let maxLength = 0;
    let start = 0;
  
    for (let end = 0; end < s.length; end++) {
      const char = s[end];
      state[char] = (state[char] || 0) + 1;
      maxFreq = Math.max(maxFreq, state[char]);
      if (k + maxFreq < end - start + 1) {
        state[s[start]] -= 1;
        start += 1;
      }
  
      maxLength = Math.max(maxLength, end - start + 1);
    }
    return maxLength;
  }
  
  const characterReplacement2 = (s: string, k: number): number => {
    console.log('characterReplacement2');
    const state = {};
    let maxFreq = 0;
    let maxLength = 0;
    let start = 0;
    
    for (let end = 0; end < s.length; end++) {
      const char = s[end];
      //console.log('char', char);
      //map.set(char, map.get(char) ? map.get(char) + 1 : 1);
      state[char] = (state[char] || 0) + 1;
      console.log('map', state, maxFreq);
      maxFreq = Math.max(maxFreq, state[char]);

      if (k + maxFreq < end - start + 1) {
         console.log(maxFreq + k, end - start + 1);
        //map.set(char, map.get(char)-1);
        state[s[start]] -= 1;
        start+=1;
      }

      maxLength = Math.max(maxLength, end - start + 1);

    }
    console.log('maxLength', maxLength);
    return maxLength;
  };

  


  const handleCalculate = () => {
    const size = parseInt(k);
    if (!isNaN(size) && size >= 0) {
      const maxLen = characterReplacement(input, size);
      const maxLen2 = characterReplacement2(input, size);
      setResult(maxLen);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Longest Repeating Character Replacement
      </Typography>
      <p>Example: ABAB with k=2</p>
      <TextField
        label="Enter string"
        variant="outlined"
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value.toUpperCase())}
        margin="normal"
      />
      <TextField
        label="Enter K (replacements allowed)"
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
        Calculate Longest Length
      </Button>
      {result !== null && (
        <Typography variant="h6" sx={{ mt: 2 }}>
          Longest Length: {result}
        </Typography>
      )}
    </div>
  );
};

export default LongestRepeatingReplacement;