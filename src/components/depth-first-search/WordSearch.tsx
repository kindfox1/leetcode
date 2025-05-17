import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const WordSearch = () => {
  const [boardInput, setBoardInput] = useState('');
  const [wordsInput, setWordsInput] = useState('');
  const [result, setResult] = useState<string[] | null>(null);

  // leetcode 212
  const findWords = (board: string[][], words: string[]): string[] => {
    const result: string[] = [];
    const rows = board.length;
    const cols = board[0].length;
  
    // Build a Trie from the list of words
    const buildTrie = (words: string[]) => {
      const root: Record<string, any> = {};
      for (const word of words) {
        let node = root;
        for (const char of word) {
          if (!node[char]) {
            node[char] = {};
          }
          node = node[char];
        }
        node.word = word; // Mark the end of a word
      }
      return root;
    };
  
    const trie = buildTrie(words);
  
    const dfs = (r: number, c: number, node: Record<string, any>) => {
      if (r < 0 || c < 0 || r >= rows || c >= cols || !node[board[r][c]]) {
        return;
      }
  
      const char = board[r][c];
      const nextNode = node[char];
  
      if (nextNode.word) {
        result.push(nextNode.word);
        delete nextNode.word; // Avoid duplicate results
      }
  
      // Mark the cell as visited by modifying the board temporarily
      board[r][c] = '#';
  
      // Explore all four directions
      dfs(r - 1, c, nextNode);
      dfs(r + 1, c, nextNode);
      dfs(r, c - 1, nextNode);
      dfs(r, c + 1, nextNode);
  
      // Restore the cell after visiting
      board[r][c] = char;
  
      // Optimization: Remove the node if it has no children
      if (Object.keys(nextNode).length === 0) {
        delete node[char];
      }
    };
  
    // Start DFS from each cell
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        dfs(r, c, trie);
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