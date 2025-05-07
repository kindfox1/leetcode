import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const FloodFill = () => {
  const [input, setInput] = useState('');
  const [sr, setSr] = useState('');
  const [sc, setSc] = useState('');
  const [color, setColor] = useState('');
  const [result, setResult] = useState<number[][]>([]);

  const floodFill = (image: number[][], sr: number, sc: number, newColor: number): number[][] => {
    const oldColor = image[sr][sc];
    if (oldColor === newColor) return image;
    
    const dfs = (row: number, col: number) => {
      if (row < 0 || row >= image.length || col < 0 || col >= image[0].length) return;
      if (image[row][col] !== oldColor) return;
      
      image[row][col] = newColor;
      
      dfs(row + 1, col);
      dfs(row - 1, col);
      dfs(row, col + 1);
      dfs(row, col - 1);
    };
    
    dfs(sr, sc);
    return image;
  };

  const floodFill2 = (image: number[][], sr: number, sc: number, newColor: number): number[][] => {
    const oldColor = image[sr][sc];
    if (oldColor === newColor) {
      return image;
    }

    const dfs = (row: number, col: number) => {
      if (row < 0 || col < 0 || row >= image.length || col >= image[0].length) {
        return;
      }

      if (image[row][col] !== oldColor) { // when the color is not old color, ignore
        return;
      }

      image[row][col] = newColor;
      
      dfs(row - 1, col);
      dfs(row, col + 1);
      dfs(row + 1, col);
      dfs(row, col - 1);
    }

    dfs(sr, sc);

    return image;
  };

  const floodFill3 = (image: number[][], sr: number, sc: number, newColor: number): number[][] => {
    const rows = image.length;
    const cols = image[0].length;
    const directions = [[-1,0],[1,0],[0,-1],[0,1]];
    const oldColor = image[sr][sc];

    const dfs = (r: number, c: number) => {
      if (r < 0 || c < 0 || r >= rows || c >= cols) return;

      if (image[r][c]===oldColor) {
        image[r][c]=-1;

        for (const [x, y] of directions) {
          dfs(r+x, c+y);
        }
      } else {
        return;
      }
      
    };

    dfs(sr, sc);

    console.log(image);
    for (let i=0; i<rows; i++) {
      for (let j=0; j<cols; j++) {
        if (image[i][j] === -1) {
          image[i][j] = newColor;
        }
      }
    }

    return image;
  };

  const handleFill = () => {
    try {
      // const image = input.split(';').map(row => 
      //   row.split(',').map(Number)
      // );
      const image = JSON.parse(input);
      const startRow = parseInt(sr);
      const startCol = parseInt(sc);
      const newColor = parseInt(color);
      
      if (!isNaN(startRow) && !isNaN(startCol) && !isNaN(newColor)) {
        setResult(floodFill3(image, startRow, startCol, newColor));
      }
    } catch (error) {
      console.error('Invalid input');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Flood Fill
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        [[1,1,1],[1,1,0],[1,0,1]] sr=1 sc=1 color=2, output: [2,2,2],[2,2,0],[2,0,1]
      </p>
      <TextField
        label="Enter image (format: row1;row2;row3)"
        variant="outlined"
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Starting row"
        variant="outlined"
        fullWidth
        value={sr}
        onChange={(e) => setSr(e.target.value)}
        margin="normal"
        type="number"
      />
      <TextField
        label="Starting column"
        variant="outlined"
        fullWidth
        value={sc}
        onChange={(e) => setSc(e.target.value)}
        margin="normal"
        type="number"
      />
      <TextField
        label="New color"
        variant="outlined"
        fullWidth
        value={color}
        onChange={(e) => setColor(e.target.value)}
        margin="normal"
        type="number"
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleFill}
        sx={{ mt: 2 }}
      >
        Fill Image
      </Button>
      {result.length > 0 && (
        <Box mt={2}>
          <Typography variant="h6">
            Result:
          </Typography>
          {result.map((row, index) => (
            <Typography key={index} variant="body1">
              [{row.join(', ')}]
            </Typography>
          ))}
        </Box>
      )}
    </div>
  );
};

export default FloodFill;