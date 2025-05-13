export class TrieNode {
  children: { [key: string]: TrieNode };
  isEndOfWord: boolean;

  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}
  
export class Trie {
    root: TrieNode;
  
    constructor() {
      this.root = new TrieNode();
    }
  
    insert(word: string): void {
      let current = this.root;
      for (const char of word) {
        if (!current.children[char]) {
          current.children[char] = new TrieNode();
        }
        current = current.children[char];
      }
      current.isEndOfWord = true;
    }
  
    search(word: string): boolean {
      let current = this.root;
      for (const char of word) {
        if (!current.children[char]) {
          return false;
        }
        current = current.children[char];
      }
      return current.isEndOfWord;
    }
  
    delete(word: string): void {
      const deleteHelper = (node: TrieNode, word: string, depth: number): boolean => {
        if (depth === word.length) {
          if (!node.isEndOfWord) return false;
          node.isEndOfWord = false;
          return Object.keys(node.children).length === 0;
        }
  
        const char = word[depth];
        if (!node.children[char]) return false;
  
        const shouldDeleteChild = deleteHelper(node.children[char], word, depth + 1);
  
        if (shouldDeleteChild) {
          delete node.children[char]; ////////////////////////// !!!!!!!!!!!!!!!!!!!!!!!!!
          return Object.keys(node.children).length === 0 && !node.isEndOfWord;
        }
  
        return false;
      };
  
      deleteHelper(this.root, word, 0);
    }

    prefix(word: string): string[] {
        const result: string[] = [];

        const prefixHelper = (node: TrieNode, currentWord: string): void => {
            if (node.isEndOfWord) {
                result.push(currentWord);
            }

            for (const char of Object.keys(node.children)) {
                prefixHelper(node.children[char], currentWord + char);
            }
        }

        let current = this.root;
        for (const char of word) {
            if (!current.children[char]) {
                return [];
            }
            current = current.children[char];
        }
        prefixHelper(current, word);
        return result;
    }
  }
  
//   // Example usage:
//   const trie = new Trie();    b
//   const initialWords = ["apple", "app", "apartment"];
//   const commands = [
//     ["search", "apple"],
//     ["search", "apartment"],
//     ["search", "appl"],
//     ["delete", "app"],
//     ["search", "app"],
//   ];
  
//   // Insert initial words
//   for (const word of initialWords) {
//     trie.insert(word);
//   }
  
//   // Execute commands
//   const results: boolean[] = [];
//   for (const [command, word] of commands) {
//     if (command === "search") {
//       results.push(trie.search(word));
//     } else if (command === "delete") {
//       trie.delete(word);
//     }
//   }
  
//   console.log(results); // Output: [true, true, false, false]