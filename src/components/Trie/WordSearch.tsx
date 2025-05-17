import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const WordSearch = () => {
  const [boardInput, setBoardInput] = useState('');
  const [wordsInput, setWordsInput] = useState('');
  const [result, setResult] = useState<string[] | null>(null);

  const findWords = (board: string[][], words: string[]): string[] => {
    const result: string[] = [];
    const rows = board.length;
    const cols = board[0].length;

    const dfs = (
      word: string,
      currIndex: number,
      r: number,
      c: number,
      visited: boolean[][]
    ): boolean => {
      if (currIndex === word.length) return true;
      if (
        r < 0 ||
        c < 0 ||
        r >= rows ||
        c >= cols ||
        visited[r][c] ||
        board[r][c] !== word[currIndex]
      ) {
        return false;
      }

      visited[r][c] = true;

      const found =
        dfs(word, currIndex + 1, r - 1, c, visited) ||
        dfs(word, currIndex + 1, r + 1, c, visited) ||
        dfs(word, currIndex + 1, r, c - 1, visited) ||
        dfs(word, currIndex + 1, r, c + 1, visited);

      visited[r][c] = false; // Backtrack
      return found;
    };

    const search = (word: string): boolean => {
      const visited = Array.from({ length: rows }, () =>
        Array(cols).fill(false)
      );

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (board[r][c] === word[0] && dfs(word, 0, r, c, visited)) {
            return true;
          }
        }
      }

      return false;
    };

    for (const word of words) {
      if (search(word)) {
        result.push(word);
      }
    }

    return result;
  };

  const handleFindWords = () => {
    try {
      const board = JSON.parse(boardInput);
      const words = JSON.parse(wordsInput);

      if (
        !Array.isArray(board) ||
        !Array.isArray(words) ||
        board.some(
          (row) => !Array.isArray(row) || row.some((cell) => typeof cell !== 'string')
        ) ||
        words.some((word) => typeof word !== 'string')
      ) {
        throw new Error('Invalid input');
      }

      const foundWords = findWords(board, words);
      setResult(foundWords);
    } catch (error) {
      console.error('Invalid input');
      setResult(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Word Search
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Example: Input board = [["o","a","b","n"],["o","t","a","e"],["a","h","k","r"],["a","f","l","v"]], words = ["oa","oaa"] → Output: ["oa","oaa"]
      </p>
      <TextField
        label="Enter board (as JSON array)"
        variant="outlined"
        fullWidth
        value={boardInput}
        onChange={(e) => setBoardInput(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Enter words (as JSON array)"
        variant="outlined"
        fullWidth
        value={wordsInput}
        onChange={(e) => setWordsInput(e.target.value)}
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleFindWords}
        sx={{ mt: 2 }}
      >
        Find Words
      </Button>
      {result !== null && (
        <Box mt={2}>
          <Typography variant="h6">Found Words:</Typography>
          <Typography variant="body1">{JSON.stringify(result)}</Typography>
        </Box>
      )}
    </div>
  );
};

export default WordSearch;