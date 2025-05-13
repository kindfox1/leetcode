import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { Trie } from './trie';

// class TrieNode {
//   children: { [key: string]: TrieNode };
//   isEndOfWord: boolean;

//   constructor() {
//     this.children = {};
//     this.isEndOfWord = false;
//   }
// }

// class Trie {
//   root: TrieNode;

//   constructor() {
//     this.root = new TrieNode();
//   }

//   insert(word: string): void {
//     let current = this.root;
//     for (const char of word) {
//       if (!current.children[char]) {
//         current.children[char] = new TrieNode();
//       }
//       current = current.children[char];
//     }
//     current.isEndOfWord = true;
//   }

//   search(word: string): boolean {
//     let current = this.root;
//     for (const char of word) {
//       if (!current.children[char]) {
//         return false;
//       }
//       current = current.children[char];
//     }
//     return current.isEndOfWord;
//   }

//   delete(word: string): void {
//     const deleteHelper = (node: TrieNode, word: string, depth: number): boolean => {
//       if (depth === word.length) {
//         if (!node.isEndOfWord) return false;
//         node.isEndOfWord = false;
//         return Object.keys(node.children).length === 0;
//       }

//       const char = word[depth];
//       if (!node.children[char]) return false;

//       const shouldDeleteChild = deleteHelper(node.children[char], word, depth + 1);

//       if (shouldDeleteChild) {
//         delete node.children[char];
//         return Object.keys(node.children).length === 0 && !node.isEndOfWord;
//       }

//       return false;
//     };

//     deleteHelper(this.root, word, 0);
//   }
// }

const TrieCommands = () => {
  const [initialWords, setInitialWords] = useState('');
  const [commands, setCommands] = useState('');
  const [results, setResults] = useState<(boolean | string)[]>([]);

  const handleExecute = () => {
    try {
      const wordsArray = JSON.parse(initialWords);
      const commandsArray = JSON.parse(commands);

      if (
        !Array.isArray(wordsArray) ||
        !Array.isArray(commandsArray) ||
        commandsArray.some(
          (cmd) => !Array.isArray(cmd) || cmd.length !== 2 || typeof cmd[0] !== 'string' || typeof cmd[1] !== 'string'
        )
      ) {
        throw new Error('Invalid input');
      }

      const trie = new Trie();

      // Insert initial words
      for (const word of wordsArray) {
        trie.insert(word);
      }

      // Execute commands
      const output: (boolean | string)[] = [];
      for (const [command, word] of commandsArray) {
        if (command === 'search') {
          output.push(trie.search(word));
        } else if (command === 'delete') {
          trie.delete(word);
          output.push('Deleted'); // Optional: Indicate deletion
        } else if (command === 'prefix') {
          output.push(JSON.stringify(trie.prefix(word)));
        }
      }

      setResults(output);
    } catch (error) {
      console.error('Invalid input');
      setResults(['Invalid input']);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Trie Commands
      </Typography>
      <p className="text-sm text-gray-600 mb-4">
        Example: Initial Words = ["apple", "app", "apartment"], Commands = [["search", "apple"], ["prefix", "ap"], ["delete", "app"], ["search", "app"]]
      </p>
      <TextField
        label="Enter initial words (as JSON array)"
        variant="outlined"
        fullWidth
        value={initialWords}
        onChange={(e) => setInitialWords(e.target.value)}
        margin="normal"
        type="text"
      />
      <TextField
        label="Enter commands (as JSON array)"
        variant="outlined"
        fullWidth
        value={commands}
        onChange={(e) => setCommands(e.target.value)}
        margin="normal"
        type="text"
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleExecute}
        sx={{ mt: 2 }}
      >
        Execute Commands
      </Button>
      {results.length > 0 && (
        <Box mt={2}>
          <Typography variant="h6">
            Results:
          </Typography>
          <Typography variant="body1">
            {JSON.stringify(results)}
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default TrieCommands;