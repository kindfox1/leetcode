import React from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const Blind75 = () => {
    const handleExecute = () => {
        try {
            maxProduct([0,2]);
        } catch (error) {
          console.error('Invalid input');
        }
      };
  return (
    <main className="flex-1 overflow-y-auto bg-gray-100">
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <Typography variant="h2" component="h1" gutterBottom>
            Blind 75
        </Typography>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Button 
        variant="contained" 
        color="primary" 
        onClick={handleExecute}
        sx={{ mt: 2 }}
      >
        Execute Commands
      </Button>
        </div>
      </div>
    </main>
  );
};

export default Blind75;
/*
Given a string s, return the number of palindromic substrings in it.

A string is a palindrome when it reads the same backward as forward.

A substring is a contiguous sequence of characters within the string.

 

Example 1:

Input: s = "abc"
Output: 3
Explanation: Three palindromic strings: "a", "b", "c".
Example 2:

Input: s = "aaa"
Output: 6
Explanation: Six palindromic strings: "a", "a", "a", "aa", "aa", "aaa".
*/
function countSubstrings(s: string): number {
    let count = 0;

    const expandFromCenter = (left: number, right: number) => {
        while (left >=0 && right < s.length && s[left] === s[right]) {
            count++;
            left--;
            right++;
        }
    };

    for (let i=0; i<s.length; i++) {
        expandFromCenter(i, i); //odd number
        expandFromCenter(i, i+1);
    }
    return count;
};

// leetcode 11
function maxArea(height: number[]): number {
    let left = 0;
    let right = height.length-1;
    let maxValue = 0;

    while (left < right) {
        if (height[left] < height[right]) {
            maxValue = Math.max(maxValue, (right - left) * height[left]);
            left++;
        } else {
            maxValue = Math.max(maxValue, (right - left) * height[right]);
            right--;
        }
    }

    return maxValue;
};

function threeSum(nums: number[]): number[][] {
    if (nums.length < 3) return [];
    const result :number[][] = [];
    nums.sort((a, b) => a - b);

    for (let i=0; i<nums.length-2; i++) {
        if (i>0 && nums[i] === nums[i-1]) continue;

        let left = i+1;
        let right = nums.length -1;

        while (left < right) {
            let sum = nums[i] + nums[left] + nums[right];

            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);
                while (left < right && nums[left] === nums[left+1]) { left++; }
                while (left < right && nums[right] === nums[right-1]) { right--; }
                left++;
                right--;
            }

            if (sum > 0) {
                right--;
            }

            if (sum < 0) {
                left++;
            }


        }
    }
    
    return result;

};

/* #152 Maximum Product Subarray
Given an integer array nums, find a subarray that has the largest product, and return the product.

The test cases are generated so that the answer will fit in a 32-bit integer.

 

Example 1:

Input: nums = [2,3,-2,4]
Output: 6
Explanation: [2,3] has the largest product 6.
Example 2:

Input: nums = [-2,0,-1]
Output: 0
Explanation: The result cannot be 2, because [-2,-1] is not a subarray.
*/
function maxProduct(nums: number[]): number {
    if (nums.length === 1) return nums[0]; 
    let maxProduct = -Infinity;
    let product = 0;
    //while (left < right && right < nums.length) {
    for(let left=0; left<nums.length; left++) {
        product = nums[left];
        for (let right=left; right<nums.length; right++) {
            if (left === right) {
                product = nums[right];
            } else {
                product = product * nums[right];
            }
            
            maxProduct = Math.max(maxProduct, product);
        }
        maxProduct = Math.max(maxProduct, product);
    }
    console.log('maxproduct', maxProduct)
    return maxProduct;
};

// This one is better since time complexity is O(n)
function maxProductChatGPT(nums: number[]): number {
    if (nums.length === 0) return 0;

    let maxSoFar = nums[0];
    let minSoFar = nums[0];
    let result = nums[0];

    for (let i = 1; i < nums.length; i++) {
        const num = nums[i];
        const tempMax = Math.max(num, maxSoFar * num, minSoFar * num);
        const tempMin = Math.min(num, maxSoFar * num, minSoFar * num);

        maxSoFar = tempMax;
        minSoFar = tempMin;

        result = Math.max(result, maxSoFar);
    }

    return result;
}

// LeetCode 153.
  function findMin(nums: number[]): number { //binary search
    if (nums.length === 1) return nums[0];
      let result = Infinity;
      let left = 0;
      let right = nums.length-1;
      
    while (left < right) {
      let mid = Math.floor((right + left) / 2);

      if (left === mid) {
        result = Math.min(result, nums[left]);
        left++;
      }
      // sorted half on left, min on right, unless it never rotated, so nums[left] could be the min
      if (nums[left] < nums[mid]) {
        result = Math.min(result, nums[left]);
        left = mid + 1;

      } else { // sorted half on right, min is on left
        result = Math.min(result, nums[right]);
        right = mid-1;
      }
    }
    return result;
  };

  //ChatGPT version 153
  function findMinGpt(nums: number[]): number {
    let left = 0;
    let right = nums.length - 1;

    while (left < right) {
        const mid = Math.floor((left + right) / 2);

        if (nums[mid] > nums[right]) {
            // Minimum is in the right half
            left = mid + 1;
        } else {
            // Minimum is at mid or in the left half
            right = mid;
        }
    }

    return nums[left];
}

/*
295. Find Median from Data Stream
*/
class MedianFinder {
    nums: number[];
    
    constructor() {
        this.nums = [];
    }

    addNum(num: number): void {
        this.nums.push(num);
        
        this.nums.sort((a, b) => a - b); //shall use binary search to avoid timeout
        console.log(this.nums);
    }

    findMedian(): number {
        let median = 0;
        if (this.nums.length % 2 === 0) { //even length
            let mid = Math.floor(this.nums.length / 2);
            median = (this.nums[mid] + this.nums[mid-1])/2;

        } else { //odd length
            let mid = Math.floor(this.nums.length / 2);
            median = this.nums[mid];
        }
        console.log(median);
        return median;
    }
}

/*
295. Find Median from Data Stream this one has no time out
*/
class MedianFinderGpt {
    private nums: number[];

    constructor() {
        this.nums = [];
    }

    addNum(num: number): void {
        // Binary search to find the correct insertion index
        let left = 0;
        let right = this.nums.length;

        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (this.nums[mid] < num) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }

        // Insert at the correct index to keep the array sorted
        this.nums.splice(left, 0, num);
    }

    findMedian(): number {
        const n = this.nums.length;
        const mid = Math.floor(n / 2);

        if (n % 2 === 0) {
            return (this.nums[mid - 1] + this.nums[mid]) / 2;
        } else {
            return this.nums[mid];
        }
    }
}

// Best solution use Heap



class Heap {
    private data: number[];
    private comparator: (a: number, b: number) => number;

    constructor(comparator: (a: number, b: number) => number) {
        this.data = [];
        this.comparator = comparator;
    }

    size(): number {
        return this.data.length;
    }

    peek(): number {
        return this.data[0];
    }

    push(val: number): void {
        this.data.push(val);
        this.bubbleUp();
    }

    pop(): number | undefined {
        const top = this.peek();
        const last = this.data.pop();
        if (this.data.length > 0 && last !== undefined) {
            this.data[0] = last;
            this.bubbleDown();
        }
        return top;
    }

    private bubbleUp(): void {
        let index = this.data.length - 1;
        while (index > 0) {
            const parent = Math.floor((index - 1) / 2);
            if (this.comparator(this.data[index], this.data[parent]) >= 0) break;
            [this.data[index], this.data[parent]] = [this.data[parent], this.data[index]];
            index = parent;
        }
    }

    private bubbleDown(): void {
        let index = 0;
        const length = this.data.length;
        const element = this.data[0];

        while (true) {
            let left = 2 * index + 1;
            let right = 2 * index + 2;
            let swap = index;

            if (left < length && this.comparator(this.data[left], this.data[swap]) < 0) {
                swap = left;
            }
            if (right < length && this.comparator(this.data[right], this.data[swap]) < 0) {
                swap = right;
            }
            if (swap === index) break;

            [this.data[index], this.data[swap]] = [this.data[swap], this.data[index]];
            index = swap;
        }
    }
}

class MedianFinderHeap {
    private left: Heap;  // Max heap
    private right: Heap; // Min heap

    constructor() {
        this.left = new Heap((a, b) => b - a);  // Max heap
        this.right = new Heap((a, b) => a - b); // Min heap
    }

    addNum(num: number): void {
        if (this.left.size() === 0 || num <= this.left.peek()) {
            this.left.push(num);
        } else {
            this.right.push(num);
        }

        // Rebalance heaps
        if (this.left.size() > this.right.size() + 1) {
            this.right.push(this.left.pop()!);
        } else if (this.right.size() > this.left.size()) {
            this.left.push(this.right.pop()!);
        }
    }

    findMedian(): number {
        if (this.left.size() === this.right.size()) {
            return (this.left.peek() + this.right.peek()) / 2;
        }
        return this.left.peek();
    }
}



/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */
/**
 * Your MedianFinder object will be instantiated and called as such:
 * */
// var obj = new MedianFinder();
// obj.addNum(6);
// obj.addNum(10);
// obj.addNum(2);
// var param_2 = obj.findMedian();

/**
 * LeetCode 297 
 * Definition for a binary tree node.
 */
/**
 * Definition for a binary tree node.
 */
class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
      this.val = val ?? 0;
      this.left = left ?? null;
      this.right = right ?? null;
    }
  }
  
  /* ---------- serialize ---------- */
  function serialize(root: TreeNode | null): string {
    const out: string[] = [];
  
    const dfs = (node: TreeNode | null) => {
      if (!node) {
        out.push("#");          // null‑marker
        return;
      }
      out.push(String(node.val));
      dfs(node.left);
      dfs(node.right);
    };
  
    dfs(root);
    return out.join(",");       // compact string
  }
  
  /* ---------- deserialize ---------- */
  function deserialize(data: string): TreeNode | null {
    const vals = data.split(",");
    let idx = 0;
  
    const build = (): TreeNode | null => {
      const token = vals[idx++];
      if (token === "#" || token === "") return null;
      const node = new TreeNode(+token);
      node.left  = build();
      node.right = build();
      return node;
    };
  
    return build();
  }
  
  /* Usage:
  const root = new TreeNode(1,
                 new TreeNode(2),
                 new TreeNode(3, new TreeNode(4), new TreeNode(5)));
  const s = serialize(root);      // "1,2,#,#,3,4,#,#,5,#,#"
  const back = deserialize(s);    // identical structure
  */
  

// 49
/**
 * 
Given an array of strings strs, group the anagrams together. You can return the answer in any order.
Example 1:
Input: strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
 */
function groupAnagrams(strs: string[]): string[][] {
    const result :string[][] = [];
    const map = new Map<string, number[]>();

    for (let i=0; i<strs.length; i++) {
        let newStr = strs[i].split('').sort().join('');
        
        if (map.has(newStr)) {
            map.get(newStr)?.push(i);
        } else {
            map.set(newStr, [i]);
        }
    }

    console.log(map);

    //group the anagrams
    for (const item of map) {
        console.log(map.get(item[0]));
        let curr :string[]= [];
        for (const index of map.get(item[0])!) {
            curr.push(strs[index]);
        }
        result.push(curr);
    }

console.log(result);
    return result;
};
//groupAnagrams(["eat","tea","tan","ate","nat","bat"]);

// 49 GPT version
function groupAnagramsGpt(strs: string[]): string[][] {
    const map: Record<string, string[]> = {};

    for (const word of strs) {
        const key = word.split('').sort().join('');
        if (!map[key]) {
            map[key] = [];
        }
        map[key].push(word);
    }

    return Object.values(map);
}

// 53 Max subarray
/*
Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: The subarray [4,-1,2,1] has the largest sum 6.
*/
function maxSubArray(nums: number[]): number {
    let maxSum = nums[0];
    let currentSum = nums[0];

    for (let i = 1; i < nums.length; i++) {
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }

    return maxSum;
}

// maxSubArray([-2,1,-3,4,-1,2,1,-5,4]);

// Leetcode 190
function reverseBits(n: number): number {
    let binaryStr = n.toString(2);
    const len = binaryStr.length;
    for (let i=0; i<32-len; i++) {
        binaryStr = '0' + binaryStr;
    }
    let numArray = binaryStr.split('');
    console.log(binaryStr);
    let left = 0;
    let right = 32-1;

    while (left < right) {
        [numArray[left], numArray[right]] = [numArray[right], numArray[left]]
        left++;
        right--;
    }

    let newNum = numArray.join('');
    console.log(parseInt(newNum, 2));
	
    return parseInt(newNum, 2);
};
//reverseBits(43261596);

/*
    LeetCode 322
    ou are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.

    Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

    You may assume that you have an infinite number of each kind of coin.
    Example 1:

    Input: coins = [1,2,5], amount = 11
    Output: 3
    Explanation: 11 = 5 + 5 + 1
*/
function coinChangeCopilot(coins: number[], amount: number): number {
    // Create a DP array to store the minimum coins needed for each amount
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0; // Base case: 0 coins are needed to make amount 0
  
    // Iterate through each coin
    for (const coin of coins) {
      for (let i = coin; i <= amount; i++) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  
    // If dp[amount] is still Infinity, it means the amount cannot be formed
    return dp[amount] === Infinity ? -1 : dp[amount];
  }
//console.log(coinChangeCopilot([1,2,5], 11));

/**
 * 
 * @param s 
 * @param t 
 * 76 Min window -- ChatGPT solution sliding window pattern
 * Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "".

    The testcases will be generated such that the answer is unique.
    Example 1:
    Input: s = "ADOBECODEBANC", t = "ABC"
    Output: "BANC"
    Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.
 */
function minWindow(s: string, t: string): string {
    if (t.length > s.length) return "";
    
    const tFreq = new Map<string, number>();
    for (const char of t) {
        tFreq.set(char, (tFreq.get(char) || 0) + 1);
    }
    
    let left = 0;
    let minLen = Infinity;
    let minStart = 0;
    let required = tFreq.size;
    const windowCounts = new Map<string, number>();
    let formed = 0;
    
    for (let right = 0; right < s.length; right++) {
        const char = s[right];
        windowCounts.set(char, (windowCounts.get(char) || 0) + 1);
    
        if (tFreq.has(char) && windowCounts.get(char) === tFreq.get(char)) {
        formed++;
        }
    
        // Try to shrink the window from the left
        while (formed === required) {
        if (right - left + 1 < minLen) {
            minLen = right - left + 1;
            minStart = left;
        }
    
        const leftChar = s[left];
        windowCounts.set(leftChar, windowCounts.get(leftChar)! - 1);
        if (tFreq.has(leftChar) && windowCounts.get(leftChar)! < tFreq.get(leftChar)!) {
            formed--;
        }
        left++;
        }
    }
    
    return minLen === Infinity ? "" : s.substring(minStart, minStart + minLen);
}
      
//console.log(minWindow("ADOBECODEBANC", "ABC"));


// leetcode 211
class TrieNode {
    children: Map<string, TrieNode>;
    isEndOfWord: boolean;

    constructor() {
        this.children = new Map();
        this.isEndOfWord = false;
    }
}

class WordDictionary {
    private root: TrieNode;

    constructor() {
        this.root = new TrieNode();
    }

    addWord(word: string): void {
        let node = this.root;
        for (const char of word) {
            if (!node.children.has(char)) {
                node.children.set(char, new TrieNode());
            }
            node = node.children.get(char)!;
        }
        node.isEndOfWord = true;
    }

    search(word: string): boolean {
        return this.dfs(word, 0, this.root);
    }

    private dfs(word: string, index: number, node: TrieNode): boolean {
        if (index === word.length) {
            return node.isEndOfWord;
        }

        const char = word[index];
        if (char === '.') {
            for (const child of node.children.values()) {
                if (this.dfs(word, index + 1, child)) {
                    return true;
                }
            }
            return false;
        } else {
            if (!node.children.has(char)) {
                return false;
            }
            return this.dfs(word, index + 1, node.children.get(char)!);
        }
    }
}

/**
 * 
 * @param nums 
 * 213 House Robber II
 * it doesn't work for [1,3,1,3,100]
 */
function rob(nums: number[]): number {
    const dp = Array(nums.length).fill(0);

    for (let i=0; i<nums.length; i++) {
        if (i===nums.length-1 && nums.length % 2 === 1) {
            dp[i] = nums[i];
        } else {
            dp[i] = nums[i] + ((i-2 >=0)? dp[i-2] : 0); 
        }
    }

    console.log(dp);
    return Math.max(...dp);
};
//rob([1,2,3,1]);

/**
 * 
 * @param nums
 * @param k 
 * 347  Top K frequent element
 * use min heap could be better solution
 */
function topKFrequent(nums: number[], k: number): number[] {
    //console.log(nums);
    const result: number[] = [];
    //const map = new Map<number, number>();
    const map :Record<number, number> = {};
    for (const n of nums) {
        if (map[n]) {
            map[n] = map[n]+1;
        } else {
            map[n] = 1;
        }
    }
    console.log(Object.keys(map));

    const list :number[][]= [];

    for (const item of Object.keys(map)) {
        list.push([Number(item), map[Number(item)] ]);
    }

    

    list.sort((a, b) => b[1] - a[1]);
    console.log(list);

    for (let i=0; i<k; i++) {
        result.push(list[i][0]);
    }
    console.log(result);

    return result;
};
//topKFrequent([1,1,1,2,2,3], 2);


// leedcode 100
function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
    if (p===null && q===null) return true;
    if (!p || !q) return false;
    if (p.val !== q.val) return false;

    return p.val === q.val &&
        isSameTree(p.left, q.left) &&
        isSameTree(p.right, q.right);
};

// 1143 longest common subsequence
function longestCommonSubsequence(text1: string, text2: string): number {
    const m = text1.length;
    const n = text2.length;

    // Create a 2D array (m+1) x (n+1) filled with 0
    const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    return dp[m][n];
};
//longestCommonSubsequence("abcde", "ace");
// longestCommonSubsequence("abc", "abc");
// longestCommonSubsequence("abc", "def");
//console.log(longestCommonSubsequence("oxcpqrsvwf", "shmtulqrypy"));

/**
 * 
 * @param root 
 * 102 Binary tree level order traverse
 */
function levelOrder(root: TreeNode | null): number[][] {
    if (!root) return [];
    const queue: TreeNode[] = [root];
    const result :number[][] = [];

    while (queue.length > 0) {
        const n = queue.length;
        const currLevel: number[] = [];
        for (let i=0; i<n; i++) {
            let node = queue.shift()!;
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
            currLevel.push(node.val);
        }
        result.push(currLevel);
    }


    return result;
};

/**
 * 
 * @param root 
 * @param k 
 * 230 - Kth smaller element in a binary search tree
 * need to use Max heap;
 */
function kthSmallest(root: TreeNode | null, k: number): number {
    if (!root) return 0;
    let result = 0;
    const maxHeap :number[]= [];
    const queue :TreeNode[]= [root];

    while (queue.length > 0) {
        const n = queue.length;
        for (let i=0; i<n; i++) {
            let node = queue.shift()!;
            maxHeap.push(node.val);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }

    maxHeap.sort((a, b) => a - b);
    return maxHeap[k-1];
};

// better time O(H+k), H is height of the tree, and we don't have to traverse the entire tree
function kthSmallestGpt(root: TreeNode | null, k: number): number {
    const stack: TreeNode[] = [];
    let current = root;

    while (current || stack.length > 0) {
        while (current) {
            stack.push(current);     // Go as left as possible
            current = current.left;
        }

        current = stack.pop()!;      // Visit the node
        k--;

        if (k === 0) return current.val;  // Found k-th smallest

        current = current.right;     // Explore right subtree
    }

    return -1; // Shouldn't happen if k is valid
}

/**
 * 104. Maximum Depth of Binary Tree
 */
function maxDepth(root: TreeNode | null): number {
    if (!root) return 0;
    let depth = 0;

    const dfs = (node: TreeNode | null): number => {
        if (!node) return 0; 
        return Math.max(dfs(node.left), dfs(node.right)) + 1;
    };

    depth = Math.max(dfs(root.left), dfs(root.right)) +1;

    return depth;
};

/**
 * 
 * @param nums 
 * 
238. Product of Array Except Self
Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].

The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

You must write an algorithm that runs in O(n) time and without using the division operation.
Example 1:

Input: nums = [1,2,3,4]
Output: [24,12,8,6]
Example 2:

Input: nums = [-1,1,0,-3,3]
Output: [0,0,9,0,0]
 */
// function productExceptSelf(nums: number[]): number[] {
//     let result :number[] = [];

//     const product = (copy: number[]) : number => {

//         console.log('copy', copy);
//         let result = 1;
//         for (const n of copy) {
//             result *= n;
//         }
//         //console.log(result);
//         return result;
//     }


//     for (let i=0; i<nums.length; i++) {
//         const copy = [...nums];
//         copy.splice(i,1);
//         result.push(product(copy));
//     }

//     return result; 
// };
function productExceptSelf(nums: number[]): number[] {
    const n = nums.length;
    const answer = new Array(n).fill(1);

    // Step 1: prefix products
    let prefix = 1;
    for (let i = 0; i < n; i++) {
        answer[i] = prefix;
        prefix *= nums[i];
    }
    console.log('prefix', answer);

    // Step 2: suffix products
    let suffix = 1;
    for (let i = n - 1; i >= 0; i--) {
        console.log('suffix', suffix);
        answer[i] *= suffix;
        suffix *= nums[i];
    }

    console.log('post suffix', answer);
    return answer;
}

//console.log(productExceptSelf([1,2,3,4]));


/**
 * 
 * @param s 
 * @param t 
 * @returns 
 * 242 valid anagram
 */
// this one is O (n log n);
// function isAnagram(s: string, t: string): boolean {
//     return s.split('').sort().join('') === t.split('').sort().join('')
// };
//this is O(n) 
function isAnagram(s: string, t: string): boolean {
    if (s.length !== t.length) return false;

    const count: Record<string, number> = {};

    // Count characters in s
    for (const char of s) {
        count[char] = (count[char] || 0) + 1;
    }

    // Subtract counts using characters in t
    for (const char of t) {
        if (!count[char]) return false;
        count[char]--;
    }

    for (const char in count) {
        if (count[char] !== 0) return false;
    }

    return true;
}

/**
 * 371 sum of two integers
 */
function getSum(a: number, b: number): number {
    while (b !== 0) {
        const carry = (a & b) << 1;
        a = a ^ b;
        b = carry;
    }
    return a;
}
//console.log(getSum(1, 2));

function isPalindrome(s: string): boolean {
    let newStr = s.toLowerCase().replace(/[^\w]|_/g, '');

    let left = 0;
    let right = newStr.length - 1;

    while (left <= right) {
        if (newStr[left] !== newStr[right]) {
            return false
        }
        left++;
        right--;
    }
    return true;
};

//console.log(isPalindrome("A man, a plan, a canal: Panama"));
export function casePermutations(s: string): string[] {
    // Gather indices of letters
    const letterIdx: number[] = [];
    for (let i = 0; i < s.length; i++) {
      if (/[a-z]/i.test(s[i])) letterIdx.push(i);
    }
  console.log(letterIdx);
    const k = letterIdx.length; console.log('k', k);
    const n = 1 << k; console.log('n', n);
    const out: string[] = [];
  
    for (let mask = 0; mask < n; mask++) {
      const chars = s.split("");
      for (let bit = 0; bit < k; bit++) {
        const idx = letterIdx[bit];
        chars[idx] =
          (mask & (1 << bit)) === 0 ? chars[idx].toLowerCase() : chars[idx].toUpperCase();
      }
      out.push(chars.join(""));
    }
    return out;
  }
  
  // demo
  //console.log(casePermutations("ab")); // ["ab","Ab","aB","AB"]

  /**
 * Regex‑style matcher supporting '.' and '*'
 * @param s - input string
 * @param p - pattern string
 * @returns boolean
 *
 * Examples:
 *   isMatch("aa",  ".*")     // → true
 *   isMatch("aab", "c*a*b")  // → true
 */
export function isMatch(s: string, p: string): boolean {
  const m = s.length, n = p.length;

  // dp[i][j] == does s[i:] match p[j:]?
  const dp: boolean[][] = Array.from({ length: m + 1 }, () =>
    Array<boolean>(n + 1).fill(false),
  );
  dp[m][n] = true; // empty matches empty

  // iterate from the end toward the start
  for (let i = m; i >= 0; --i) {
    for (let j = n - 1; j >= 0; --j) {
      const firstMatch =
        i < m && (p[j] === s[i] || p[j] === ".");

      if (j + 1 < n && p[j + 1] === "*") {
        // case 1: skip "x*"  (zero occurrence)
        // case 2: consume one char if firstMatch, stay on same pattern pos
        dp[i][j] =
          dp[i][j + 2] ||
          (firstMatch && dp[i + 1][j]);
      } else {
        // normal single‑char match
        dp[i][j] = firstMatch && dp[i + 1][j + 1];
      }
    }
  }
  return dp[0][0];
}


/**
 * Insert ‘+’ and ‘-’ between the digits of `num`
 * so the whole expression equals `target`.
 *
 * @param num    digit string, e.g. "105"
 * @param target desired result
 * @returns      all valid expressions (no spaces)
 *
 * Examples:
 *   addOperators("123", 6)  ➜ ["1+2+3"]
 *   addOperators("105", 5)  ➜ ["10-5"]
 */
function addOperators(num: string, target: number): string[] {
  const n = num.length;
  const results: string[] = [];

  /** depth‑first search */
  function dfs(pos: number, expr: string[], curVal: number): void {
    if (pos === n) {
      if (curVal === target) results.push(expr.join(""));
      return;
    }

    // extend the next number slice: num[pos .. i]
    for (let i = pos; i < n; i++) {
      // block numbers with leading zeros (e.g., "05"), but allow "0"
      if (i > pos && num[pos] === "0") break;

      const slice = num.slice(pos, i + 1);
      const val = Number(slice);

      if (pos === 0) {
        // first slice starts the expression
        dfs(i + 1, [...expr, slice], val);
      } else {
        dfs(i + 1, [...expr, "+", slice], curVal + val);
        dfs(i + 1, [...expr, "-", slice], curVal - val);
      }
    }
  }

  dfs(0, [], 0);
  return results;
}

/* ---------------- quick demo ---------------- */

//   console.log(addOperators("123", 6));  // ["1+2+3"]
//   console.log(addOperators("105", 5));  // ["10-5"]

/**
 * 
 * @param x 
 * @param n 
 * @returns 
 * 
 * Calculate the power n of number X in O(logN) time complexity
 * If n is large multiply X for n time take O(N) time, which is slower than O(log N).
 */
  function calculatePower(x, n) {
  if (n === 0) return 1;
  
  if (n < 0) {
    x = 1 / x;
    n = -n;
  }

  let result = 1;

  while (n > 0) {
    if (n % 2 === 1) {
      result *= x;
    }
    x *= x;
    n = Math.floor(n / 2);
  }

  return result;
}

/**
 * 
 * @param headA
 * @param headB 
 * @returns 
 * 
 * Find the intersectin node of two linked list or return null if they don't intersect 
 */
function getIntersectionNode(headA: ListNode, headB :ListNode) {
  if (!headA || !headB) return null;

  let pointerA = headA;
  let pointerB = headB;

  // Loop until both pointers are equal (could be null or the intersection node)
  while (pointerA !== pointerB) {
    pointerA = pointerA ? pointerA.next : headB;
    pointerB = pointerB ? pointerB.next : headA;
  }

  return pointerA; // null if no intersection, or the intersecting node
}

/**
 * 
 * @param nums 
 * @returns 
 * 
 * 26. Remove Duplicates from Sorted Array
 */
function removeDuplicates(nums: number[]): number {
    if (nums.length === 0) return 0;

  let k = 1; // Index for next unique element

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[i - 1]) {
      nums[k] = nums[i];
      k++;
    }
  }

  return k;
};

//removeDuplicates([0,0,1,1,1,2,2,3,3,4]);

/**
 * 80. Remove Duplicates from Sorted Array II
 * Given an integer array nums sorted in non-decreasing order, remove some duplicates in-place such that 
 * each unique element appears at most twice. The relative order of the elements should be kept the same.
 */
function removeDuplicates2(nums: number[]): number {
  let k = 0;

  for (const num of nums) {
    if (k < 2 || num !== nums[k - 2]) {
      nums[k] = num;
      k++;
    }
  }

  return k;
};
//removeDuplicates2([0,0,1,1,1,2,2,3,3,4]);

/**
 * 
169. Majority Element
Given an array nums of size n, return the majority element.

The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.
Example 1:

Input: nums = [3,2,3]
Output: 3
Example 2:

Input: nums = [2,2,1,1,1,2,2]
Output: 2
 */
function majorityElement(nums: number[]): number {
    const foo = nums.length / 2;
    const map = new Map<number, number>();
    let mValue = 0;
    let maxMajority = 0;

    for (const num of nums) {
        map.set(num, (map.get(num) || 0) + 1);

        let currMajority = map.get(num)!;
        if (currMajority > foo && currMajority > maxMajority) {
            maxMajority = currMajority;
            mValue = num;
        }
    }


    return mValue;
};
//console.log(majorityElement([2,2,1,1,1,2,2]));

/**
 * 189 Rotate Array: Given an integer array nums, rotate the array to the right by k steps, where k is non-negative.
 * @param nums 
 * @param k 
 */
function rotate(nums: number[], k: number): void {
    if (nums.length === 0) return;
    k = k % nums.length;

    for (let i=0; i<k; i++) {
        const temp = nums.pop()!;
        nums.unshift(temp);
    }
    console.log(nums);
};
//rotate([1,2,3,4,5,6,7], 3);

/**
 * 45 jump game II
 * [2,3,1,1,4] = 2
 */
function jump(nums: number[]): number {
    const dp :number[]= Array(nums.length).fill(Infinity);
    let count = 0;

    dp[0] = 0;
    for (let i=0; i<nums.length; i++) {
        for (let j=i+1; j <= nums[i] + i; j++) {
            if (j < nums.length) {
                dp[j] = Math.min(dp[j], 1 + dp[i]);
            }
            
        }

    }

    return dp[nums.length-1];
};
//jump([2,3,1,1,4]);

/**
 * 
 * @param citations 
 * 274 h-index
 * Citation counts:
[6, 6, 6, 6, 6, 1]

Sorted:
→ [6, 6, 6, 6, 6, 1]

Paper 1 → 6 citations (≥1) ✅

Paper 2 → 6 citations (≥2) ✅

Paper 3 → 6 citations (≥3) ✅

Paper 4 → 6 citations (≥4) ✅

Paper 5 → 6 citations (≥5) ✅

Paper 6 → 1 citation (≥6) ❌

h-index = 5
 */
function hIndex(citations: number[]): number {
    let hIndex = 0;
    citations.sort((a,b)=>b-a);
    console.log(citations);

    for (let i=0; i<citations.length; i++) {
        let index = i+1;

        if (citations[i] >= index) {
            hIndex++;
        } else {
            break;
        }
    }
    return hIndex;
};
// console.log(hIndex([1,3,1]));
// console.log(hIndex([3,0,6,1,5]));

/**
 * 
380. Insert Delete GetRandom O(1)
 */
class RandomizedSet {
    nums: number[];
    mem = new Set<number>();
    constructor() {
      this.nums = []; 
    }

    insert(val: number): boolean {
        if (this.mem.has(val)) {
            return false;
        } else {
            this.mem.add(val);
            return true;
        }
    }

    remove(val: number): boolean {
        if (this.mem.has(val)) {
            this.mem.delete(val);
            return true;
        } else {
            return false;
        }
    }

    // this has O(n) complexity because [...this.mem]
    getRandom(): number {
        console.log(this.mem.keys());
        let arr = [...this.mem];
        let min = 0;
        let max = arr.length-1;
        
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        const index = Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
        return arr[index];
    }
}
let rs = new RandomizedSet();
// rs.insert(1);
// rs.insert(2);
// rs.getRandom();
class RandomizedSetChatGpt {
    private map: Map<number, number>;
    private arr: number[];

    constructor() {
        this.map = new Map();
        this.arr = [];
    }

    insert(val: number): boolean {
        if (this.map.has(val)) {
            return false;
        }
        this.arr.push(val);
        this.map.set(val, this.arr.length - 1);
        return true;
    }

    remove(val: number): boolean {
        if (!this.map.has(val)) {
            return false;
        }

        const index = this.map.get(val)!;
        const lastVal = this.arr[this.arr.length - 1];

        // Swap val with the last element
        this.arr[index] = lastVal;
        this.map.set(lastVal, index);

        // Remove last element
        this.arr.pop();
        this.map.delete(val);

        return true;
    }

    getRandom(): number {
        const randomIndex = Math.floor(Math.random() * this.arr.length);
        return this.arr[randomIndex];
    }
}

/**
 * 135 Candy
 * There are n children standing in a line. Each child is assigned a rating value given in the integer array ratings.

You are giving candies to these children subjected to the following requirements:

Each child must have at least one candy.
Children with a higher rating get more candies than their neighbors.
Return the minimum number of candies you need to have to distribute the candies to the children.

 

Example 1:

Input: ratings = [1,0,2]
Output: 5
Explanation: You can allocate to the first, second and third child with 2, 1, 2 candies respectively.
Example 2:

Input: ratings = [1,2,2]
Output: 4
Explanation: You can allocate to the first, second and third child with 1, 2, 1 candies respectively.
The third child gets 1 candy because it satisfies the above two conditions.
 */
function candy(ratings: number[]): number {
    let count = ratings.length;
    const dp :number[]= Array(ratings.length).fill(1);

    for (let i=1; i<ratings.length; i++) {
        // if (i===0 && ratings[i] > ratings[i+1]) {
        //     dp[i] = dp[i+1] + 1;
        //     count++;
        // } 
        // else if (i===ratings.length-1 && ratings[i] > ratings[i-1]) {
        //     dp[i] = dp[i-1] + 1;
        //     count++;
        // }
        if (ratings[i] > ratings[i-1]) {
            dp[i] = dp[i-1] + 1;
            count += dp[i-1];
        }
    }

console.log(dp);
    for (let j=ratings.length-2; j>=0; j--) {
        if (ratings[j] > ratings[j+1]) {
            dp[j] = Math.max(dp[i], dp[i + 1] + 1);
        }
    }

    let sum = 0;
    for(const item of dp) {
        sum += item;
    }


    console.log(dp);



    return sum;
};
//console.log(candy([1,3,4,5,2]));
// console.log(candy([1,0,2]));
// console.log(candy([1,2,2]));

/**
 * 
 * @param s 
 * @returns 
 * 13. Roman to Integer
 * Symbol       Value
I             1
V             5
X             10
L             50
C             100
D             500
M             1000
Example 1:

Input: s = "III"
Output: 3
Explanation: III = 3.
Example 2:

Input: s = "LVIII"
Output: 58
Explanation: L = 50, V= 5, III = 3.
Example 3:

Input: s = "MCMXCIV"
Output: 1994
Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.
 */
function romanToInt(s: string): number {
    const map :Record<string, number> = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000,
    };
    let total = 0;

    for (let i=0; i<s.length; i++) {
        const current = map[s[i]];
        const next = map[s[i+1]];

        if (next && current < next) {
            total = total - current;
        } else {
            total += current;
        }
    }
    return total;
};
// console.log(romanToInt("III"));
// console.log(romanToInt("LVIII"));
// console.log(romanToInt("MCMXCIV"));

/**
 * 12 Integer to Roman
 * @param num 
 */
function intToRoman(num: number): string {
    const romanMap: [number, string][] = [
        [1000, 'M'],
        [900, 'CM'],
        [500, 'D'],
        [400, 'CD'],
        [100, 'C'],
        [90, 'XC'],
        [50, 'L'],
        [40, 'XL'],
        [10, 'X'],
        [9, 'IX'],
        [5, 'V'],
        [4, 'IV'],
        [1, 'I']
    ];

    let result = '';

    for (const [value, symbol] of romanMap) {
        while (num >= value) {
            result += symbol;
            num -= value;
        }
    }

    return result;
}
//console.log(intToRoman(5000));

/**
 * 
 * @param s
 * 58 lenghth of last word
 */
function lengthOfLastWord(s: string): number {
    let len = 0;
    let strArray = s.trim().split(' ');

    len = strArray.pop()?.length || 0;
    return len;
    
};
//console.log(lengthOfLastWord("   fly me   to   the moon  "));

/**
 * 
 * @param strs 
 * 14 longest common prefix
 */
function longestCommonPrefix(strs: string[]): string {
    let prefix = '';
    let strArray :string[][] = [];
    let minLen = Infinity;
    let minIndex = 0;
    let i = 0;

    for (const word of strs) {
        if (word.length < minLen) {
            minLen = word.length;
            minIndex = i;
        }
        strArray.push(word.split(''));
        i++;
    }

    let shortest = strs[minIndex]

    for (let j=0; j<minLen; j++) {
        let currChar = shortest[j];

        for (let x=0; x<strs.length; x++) {
            if (strs[x][j] !== currChar) {
                return prefix;
                //break;
            }
        }

        prefix += currChar;

    }
    return prefix;
    
};
// console.log(longestCommonPrefix(["flower","flow","flight"]));
// console.log(longestCommonPrefix(["dog","racecar","car"]));

/**
 * 
151. Reverse Words in a String
 */
function reverseWords(s: string): string {
    let arr = s.trim().split(/\s+/);
   
    return arr.reverse().join(' ');
};
// console.log(reverseWords("the sky is blue"));

/**
 * 
 * @param s 
 * @param numRows 
 * The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this: 
 * (you may want to display this pattern in a fixed font for better legibility)
6. Zigzag Conversion
P   A   H   N
 A P L S I I G
  Y   I   R
 */
function convert(s: string, numRows: number): string {
    if (numRows === 1 || s.length <= numRows) return s;
    const rows :string[] = Array(numRows).fill("");
    let down = false;
    let currRow = 0;
    console.log(rows);
    
    for (const char of s) {

        rows[currRow] += char;

        if (currRow===0 || currRow===numRows-1) {
            down = !down;
        }

        currRow = down ? currRow+1 : currRow-1;
    }
    console.log(rows);
    return rows.join('');
};
//console.log(convert("AB", 1));

/**
 * 28 find need in the haystack
 */
// time is O(n)
function strStr(haystack: string, needle: string): number {
    return haystack.indexOf(needle);
};
//console.log(strStr("sadbutsad", "sad"));
// GPT version with sliding window technic, but time is O(m*n), worst than one above
function strStrGpt(haystack: string, needle: string): number {
    if (needle === "") return 0;
    for (let i = 0; i <= haystack.length - needle.length; i++) {
        if (haystack.slice(i, i + needle.length) === needle) {
            return i;
        }
    }
    return -1;
}

/**
 * 
 * @param words 
 * @param maxWidth 
 * 
68. Text Justification
Input: words = ["This", "is", "an", "example", "of", "text", "justification."], maxWidth = 16
Output:
[
   "This    is    an",
   "example  of text",
   "justification.  "
]
 */
function fullJustify(words: string[], maxWidth: number): string[] {
    let rowArray :string[]= [];
    let remain = maxWidth;
    let result :string[] = [];

    for (let i=0; i<words.length; i++) {
        if (remain >= words[i].length) {
            rowArray.push(words[i]);
            remain -= words[i].length+1;
        } else {
            let numSpace = remain + rowArray.length;
            console.log('numSpace', numSpace);
            let numSpaceBtw = Math.floor(numSpace / (rowArray.length > 1 ? rowArray.length-1 : rowArray.length));
            let extraSpace = numSpace % (rowArray.length-1);

            for (let j=0; j<extraSpace; j++) {
                rowArray[j] = rowArray[j]+" ";
            }
console.log('numSpaceBtw', numSpaceBtw);
            if (rowArray.length === 1) {
                result.push(rowArray[0] + " ".repeat(remain+1))
            } else {
                result.push(rowArray.join(' '.repeat(numSpaceBtw)));
            }
            rowArray = [];
            remain = maxWidth;
            rowArray.push(words[i]);
            remain -= words[i].length+1;
        }
    }

    result.push(rowArray.join(' ') + " ".repeat(remain+1));
    return result;
};
//console.log(fullJustify(["This", "is", "an", "example", "of", "text", "justification."], 16));
//console.log(fullJustify(["What","must","be","acknowledgment","shall","be"], 16));

/**
 * 
392. Is Subsequence
Input: s = "abc", t = "ahbgdc"
Output: true
 */
function isSubsequence(s: string, t: string): boolean {
    if (s==='') return true;
    let currIndex = 0;
    let char = s[currIndex];

    for (let i=0; i<t.length; i++) {
        console.log(char, t[i]);
        if (char === t[i]) {
            if (currIndex === s.length-1) return true;
            if (currIndex+1 < s.length) currIndex++;
            char = s[currIndex];

            
        }
    }
    
    return false;
};
// console.log(isSubsequence("abc", "ahbgdc"));
// console.log(isSubsequence("axc", "ahbgdc"));
//console.log(isSubsequence("acb", "ahbgdc"));

/**
 * 167 Two Sum II
 */
function twoSum(numbers: number[], target: number): number[] {
    const result :number[] = [];
    let left = 0;
    let right = numbers.length -1;
    while (left < right) {
        let currSum = numbers[left] + numbers[right];
        if (currSum === target) {
            return [left+1, right+1];
        }

        if (currSum > target) {
            right--;
        } else {
            left++;
        }
    }
    return result;
};
//console.log(twoSum([2,7,11,15], 9));

/**
 * 209 min size subarray sum
 * CANNOT sort the array because subarray means contiguous subarray
 */

function minSubArrayLen(target: number, nums: number[]): number {
    let left = 0;
    let sum = 0;
    let minLength = Infinity;

    for (let right = 0; right < nums.length; right++) {
        sum += nums[right];

        while (sum >= target) {
            minLength = Math.min(minLength, right - left + 1);
            sum -= nums[left];
            left++;
        }
    }

    return minLength === Infinity ? 0 : minLength;
}
// console.log(minSubArrayLen(7, [2,3,1,2,4,3]));
// console.log(minSubArrayLen(4, [1,4,4]));
// console.log(minSubArrayLen(11, [1,1,1,1,1,1,1,1]));
//console.log(minSubArrayLen(213, [12,28,83,4,25,26,25,2,25,25,25,12])); // Output?

/**
 * 
 * @param s 
 * @param words 
 * 
30. Substring with Concatenation of All Words (HARD)
You are given a string s and an array of strings words. All the strings of words are of the same length.

A concatenated string is a string that exactly contains all the strings of any permutation of words concatenated.

For example, if words = ["ab","cd","ef"], then "abcdef", "abefcd", "cdabef", "cdefab", "efabcd", and "efcdab" are all concatenated strings. "acdbef" is not a concatenated string because it is not the concatenation of any permutation of words.
Return an array of the starting indices of all the concatenated substrings in s. You can return the answer in any order.

 

Example 1:

Input: s = "barfoothefoobarman", words = ["foo","bar"]

Output: [0,9]

Explanation:

The substring starting at 0 is "barfoo". It is the concatenation of ["bar","foo"] which is a permutation of words.
The substring starting at 9 is "foobar". It is the concatenation of ["foo","bar"] which is a permutation of words.
 */
function findSubstring(s: string, words: string[]): number[] {
    if (s.length === 0 || words.length === 0) return [];

    const wordLen = words[0].length;
    const wordCount = words.length;
    const totalLen = wordLen * wordCount;
    const wordMap = new Map<string, number>();

    // Populate the word frequency map
    for (const word of words) {
        wordMap.set(word, (wordMap.get(word) || 0) + 1);
    }
    console.log(wordMap);

    const result: number[] = [];

    for (let i = 0; i <= s.length - totalLen; i++) {
        const seen = new Map<string, number>();
        let j = 0;
        while (j < wordCount) {
            const start = i + j * wordLen;
            const word = s.substring(start, start + wordLen);
            console.log('word', word);
            if (!wordMap.has(word)) {
                break;
            }
            seen.set(word, (seen.get(word) || 0) + 1);
            if ((seen.get(word) || 0) > (wordMap.get(word) || 0)) {
                break;
            }
            j++;
        }

        if (j === wordCount) {
            result.push(i);
        }
    }

    return result;
}
//console.log(findSubstring("barfoothefoobarman", ["foo","bar"]));

/**
 * 36 Valid Sudoku
 */
function isValidSudoku(board: string[][]): boolean {
    let rows = board.length;
    let cols = board[0].length;
    const rowsMem = new Set();
    const colsMem = new Set();
    const gridMem = new Set<string>();

    const isRowValid = (r: number): boolean => {
        console.log('isRowValid');
        if (rowsMem.has(r)) return true;
        const mem = new Set();
        for (let i=0; i<cols; i++) {
            //console.log('board[r][i]', board[r][i]);
            if (mem.has(board[r][i])) {
                return false;
            }
            if (board[r][i] !== ".") mem.add(board[r][i]);
        }
        rowsMem.add(r);
        //console.log('isRowValid end');
        return true;
    };

    const isColValid = (c: number): boolean => {
        console.log('isColValid');
        if (colsMem.has(c)) return true;
        const mem = new Set();
        for (let i=0; i<rows; i++) {
            console.log('mem', mem);
            if (mem.has(board[i][c])) {
                return false;
            }
            if (board[i][c] !== ".") mem.add(board[i][c]);
        }
        colsMem.add(c);
        return true;
    };

    const isBoxValid = (r: number, c: number): boolean => {
        console.log('isBoxValid', gridMem);
        let gRow: number = 0;
        let gCol: number = 0;
        let rStart: number = 0;
        let rEnd: number = 0;
        let cStart: number = 0;
        let cEnd: number =0;
        

        if (r <= 2) {
            gRow = 0;
            rStart = 0;
            rEnd = 2;
        }
        if (r >= 3 && r <= 5) {
            gRow = 1;
            rStart = 3;
            rEnd = 5;
        }
        if (r >= 6) {
            gRow = 2;
            rStart = 6;
            rEnd = 8;
        }

        if (c <= 2) {
            gCol = 0;
            cStart = 0;
            cEnd = 2;
        }
        if (c >= 3 && r <= 5) {
            gCol = 1;
            cStart = 3;
            cEnd = 5;
        }
        if (c >= 6) {
            gCol = 2;
            cStart = 6;
            cEnd = 8;
        }
console.log(gRow, gCol, rStart, rEnd, cStart, cEnd);
        if (gridMem.has(`${gRow}${gCol}`)) return true;
        const mem = new Set();
        for (let i=rStart; i<rEnd; i++) {
            for (let j=cStart; j<cEnd; j++) {
                console.log(mem);
                if (mem.has(board[i][j])) {
                    return false;
                }
                if (board[i][j] !== ".") mem.add(board[i][j]);
                gridMem.add(`${gRow}${gCol}`);
            }
        }
        return true;
    };

    for (let r=0; r<rows; r++) {
        for (let c=0; c<cols; c++) {
            if (board[r][c] !== ".") {
                console.log("======r, c", r, c);
                if (isRowValid(r) === false || isColValid(c)===false || isBoxValid(r, c)===false) {
                    console.log("!!!!!! NOT VALID !!!!!!!");
                    return false; 
                }
            }
        }
    }
    

    return true;
};
function isValidSudokuGpt(board: string[][]): boolean {
    const rows: Set<string>[] = Array.from({ length: 9 }, () => new Set());
    const cols: Set<string>[] = Array.from({ length: 9 }, () => new Set());
    const boxes: Set<string>[] = Array.from({ length: 9 }, () => new Set());
console.log(boxes);
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            const val = board[r][c];
            if (val === '.') continue;

            const boxIndex = Math.floor(r / 3) * 3 + Math.floor(c / 3);
        console.log('boxIndex', boxIndex);

            if (rows[r].has(val)) return false;
            if (cols[c].has(val)) return false;
            if (boxes[boxIndex].has(val)) return false;

            rows[r].add(val);
            cols[c].add(val);
            boxes[boxIndex].add(val);
        }
    }

    return true;
}
const board = 
    [["5","3",".",".","7",".",".",".","."]
    ,["6",".",".","1","9","5",".",".","."]
    ,[".","9","8",".",".",".",".","6","."]
    ,["8",".",".",".","6",".",".",".","3"]
    ,["4",".",".","8",".","3",".",".","1"]
    ,["7",".",".",".","2",".",".",".","6"]
    ,[".","6",".",".",".",".","2","8","."]
    ,[".",".",".","4","1","9",".",".","5"]
    ,[".",".",".",".","8",".",".","7","9"]];
const badBoard = 
    [["8","3",".",".","7",".",".",".","."]
    ,["6",".",".","1","9","5",".",".","."]
    ,[".","9","8",".",".",".",".","6","."]
    ,["8",".",".",".","6",".",".",".","3"]
    ,["4",".",".","8",".","3",".",".","1"]
    ,["7",".",".",".","2",".",".",".","6"]
    ,[".","6",".",".",".",".","2","8","."]
    ,[".",".",".","4","1","9",".",".","5"]
    ,[".",".",".",".","8",".",".","7","9"]];

//console.log(isValidSudokuGpt(badBoard));

/**
 * 
 * @param board 
 * 289 Game of life
 */
function gameOfLife(board: number[][]): void {
    let rows = board.length;
    let cols = board[0].length;
    const dp: number[][] = Array.from({ length: rows}, () => Array<number>(cols).fill(-1));

    const numNeighbors = (r: number, c: number) => {
        let n = 0;

        if (r-1 >= 0) n += board[r-1][c];
        if (r-1 >= 0 && c+1 < cols) n += board[r-1][c+1];
        if (c+1 < cols) n += board[r][c+1];
        if (r+1 < rows && c+1 < cols) n += board[r+1][c+1];
        if (r+1 < rows) n += board[r+1][c];
        if (r+1 < rows && c-1 >=0) n += board[r+1][c-1]; 
        if (c-1 >= 0) n += board[r][c-1];
        if (r-1 >= 0 && c-1 >=0) n += board[r-1][c-1];
        return n;
    };
    
    for (let i=0; i<rows; i++) {
        for (let j=0; j<cols; j++) {
            let nei = numNeighbors(i, j);
            //console.log('nei', nei);
            if (board[i][j] === 0 && nei === 3) {
                dp[i][j] = 1;
            } else if (board[i][j]===1) {
                if (nei < 2 || nei > 3) {
                    dp[i][j] = 0;
                } else {
                    dp[i][j] = board[i][j];
                }
            } else {
                dp[i][j] = board[i][j];
            }
        }

    }

    for (let i=0; i<rows; i++) {
        for (let j=0; j<cols; j++) {
            board[i][j] = dp[i][j];
        }
    }
    console.log(dp);
    console.log(board);
};
const gameboard = [
    [0,1,0],
    [0,0,1],
    [1,1,1],
    [0,0,0]];

    // output
    // [
    // [0,0,0],
    // [1,0,1],
    // [0,1,1],
    // [0,1,0]]
// gameOfLife(gameboard);

/**
 * 
 * @param ransomNote 
 * @param magazine 
 * @returns 
 * 383. Ransom Note
Solved
Easy
Topics
Companies
Given two strings ransomNote and magazine, return true if ransomNote can be constructed by using the letters from magazine and false otherwise.

Each letter in magazine can only be used once in ransomNote.

 

Example 1:

Input: ransomNote = "a", magazine = "b"
Output: false
Example 2:

Input: ransomNote = "aa", magazine = "ab"
Output: false
Example 3:

Input: ransomNote = "aa", magazine = "aab"
Output: true
 */
function canConstruct(ransomNote: string, magazine: string): boolean {
    const map = new Map<string, number>(); //char, frequency
    //const mem = new Set<string>(ransomNote.split(''));
    for (let i=0; i<ransomNote.length; i++) {
        map.set(ransomNote[i], (map.get(ransomNote[i]) || 0) + 1);
    }

    for (let j=0; j<magazine.length; j++) {
        if (map.has(magazine[j])) {
            let feq = map.get(magazine[j])!;
            if(feq === 1) {
                
                map.delete(magazine[j]);
                console.log(map);
                console.log(map.size)
                if (map.size ===0) return true;
            } else {
                map.set(magazine[j], feq-1);
            }
        }
    }

    return false;
};
//console.log(canConstruct("bg", "efjbdfbdgfjhhaiigfhbaejahgfbbgbjagbddfgdiaigdadhcfcj"));

/**
 * 205. Isomorphic Strings
Solved
Easy
Topics
Companies
Given two strings s and t, determine if they are isomorphic.

Two strings s and t are isomorphic if the characters in s can be replaced to get t.

All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character, but a character may map to itself.

 

Example 1:

Input: s = "egg", t = "add"

Output: true

Explanation:

The strings s and t can be made identical by:

Mapping 'e' to 'a'.
Mapping 'g' to 'd'.

Example 2:

Input: s = "foo", t = "bar"

Output: false

Explanation:

The strings s and t can not be made identical as 'o' needs to be mapped to both 'a' and 'r'.
 */
function isIsomorphic(s: string, t: string): boolean {
if (s.length !== t.length) return false;

    const mapST = new Map<string, string>();
    const mapTS = new Map<string, string>();

    for (let i = 0; i < s.length; i++) {
        const charS = s[i];
        const charT = t[i];

        const mappedS = mapST.get(charS);
        const mappedT = mapTS.get(charT);

        if (mappedS && mappedS !== charT) return false;
        if (mappedT && mappedT !== charS) return false;

        mapST.set(charS, charT);
        mapTS.set(charT, charS);
    }

    return true;
};
// console.log(isIsomorphic("egg", "add"));
// console.log(isIsomorphic("foo", "bar"));
// console.log(isIsomorphic("paper", "title"));

/**
 * 
 * @param pattern 
 * @param s 
 * 290 Word Pattern
 */
function wordPattern(pattern: string, s: string): boolean {
    const words = s.split(' ');
    if (pattern.length !== words.length) return false;

    const charToWord = new Map<string, string>();
    const wordToChar = new Map<string, string>();

    for (let i = 0; i < pattern.length; i++) {
        const char = pattern[i];
        const word = words[i];

        if (charToWord.has(char) && charToWord.get(char) !== word) {
            return false;
        }

        if (wordToChar.has(word) && wordToChar.get(word) !== char) {
            return false;
        }

        charToWord.set(char, word);
        wordToChar.set(word, char);
    }

    return true;
}
// console.log(wordPattern("abba", "dog cat cat dog"));
// console.log(wordPattern("abba", "dog dog dog dog"));

/**
 * 202 happy number
 * function wordPattern(pattern: string, s: string): boolean {
    const words = s.split(' ');
    if (pattern.length !== words.length) return false;

    const charToWord = new Map<string, string>();
    const wordToChar = new Map<string, string>();

    for (let i = 0; i < pattern.length; i++) {
        const char = pattern[i];
        const word = words[i];

        if (charToWord.has(char) && charToWord.get(char) !== word) {
            return false;
        }

        if (wordToChar.has(word) && wordToChar.get(word) !== char) {
            return false;
        }

        charToWord.set(char, word);
        wordToChar.set(word, char);
    }

    return true;
}
 */
function isHappy(n: number): boolean {
    if (n===1) return true;
    const mem = new Set<number>();
    let currNumber = n;

    const getNextNum = (num: number) => {
        if (num < 10) return num * num;

        let currSum = Math.pow(num % 10, 2); //first digit
        let currNum = num;

        while (Math.floor(currNum * 0.1) !== 0) {
            currNum = Math.floor(currNum * 0.1);
            currSum +=  Math.pow(currNum % 10, 2);
        }
        return currSum;
    };

// console.log(getNextNum(n));
    while (!mem.has(currNumber)) {
        if (currNumber===1) return true;
        mem.add(currNumber);

        currNumber = getNextNum(currNumber);
    }
    return false;
    
};
// console.log(isHappy(19));
// console.log(isHappy(2));

/**
 * 
 * @param nums 
 * @param k 
 * 219 contains duplicate II
 * Given an integer array nums and an integer k, return true if there are two 
 * distinct indices i and j in the array such that nums[i] == nums[j] and abs(i - j) <= k.
 */
function containsNearbyDuplicate(nums: number[], k: number): boolean {
    if (nums.length===1 || k===0) return false;
    const map = new Map<number, number[]>();
    for (let i=0; i<nums.length; i++) {
        if (map.has(nums[i])) {
            for (const idx of map.get(nums[i])!) {
                if (i - idx <= k) {
                    return true;
                }
            }
            map.get(nums[i])?.push(i);
        } else {
            map.set(nums[i], [i]);
        }
    }
    return false;
};
// console.log(containsNearbyDuplicate([99,99], 2));
// console.log(containsNearbyDuplicate([1,2,3,1], 3));

/**
 * 
 * @param nums 
 * 228 summary ranges
 * You are given a sorted unique integer array nums.

A range [a,b] is the set of all integers from a to b (inclusive).

Return the smallest sorted list of ranges that cover all the numbers in the array exactly. That is, each element of nums is covered by exactly one of the ranges, and there is no integer x such that x is in one of the ranges but not in nums.

Each range [a,b] in the list should be output as:

"a->b" if a != b
"a" if a == b

Example 1:

Input: nums = [0,1,2,4,5,7]
Output: ["0->2","4->5","7"]
Explanation: The ranges are:
[0,2] --> "0->2"
[4,5] --> "4->5"
[7,7] --> "7"
 */
function summaryRanges(nums: number[]): string[] {
    if (nums.length===1) return [String(nums[0])];
    const result: string[] = [];
    let left = 0;
    let right = 1;
    let curr = nums[left];

    while (right < nums.length && left < nums.length) {
        
        if (curr+1 === nums[right]) {
            curr = nums[right];
            right++;
            if (right >= nums.length) {
                result.push(`${nums[left]}->${nums[right-1]}`);
            }
        } else {
            if (left === right-1) {
                result.push(String(nums[left]));
                left++;
                right=left+1;
                curr = nums[left];
            } else {
                result.push(`${nums[left]}->${nums[right-1]}`);
                left = right;
                right = left+1;
                curr = nums[left];
            }
            if (right >= nums.length) {
                result.push(`${nums[left]}`);
            }
        }
    }

    return result;
};

function summaryRangesGpt(nums: number[]): string[] {
    const result: string[] = [];
    if (nums.length === 0) return result;

    let left = 0;

    for (let right = 1; right <= nums.length; right++) {
        // When the current number is not consecutive or we've reached the end
        if (right === nums.length || nums[right] !== nums[right - 1] + 1) {
            if (left === right - 1) {
                result.push(`${nums[left]}`);
            } else {
                result.push(`${nums[left]}->${nums[right - 1]}`);
            }
            left = right;
        }
    }

    return result;
}
//console.log(summaryRanges([0,1,2,4,5,7]));
// console.log(summaryRanges([0,2,3,4,6,8,9]));

/**
 * 
 * @param path 
71. Simplify Path
Example 3:

Input: path = "/home/user/Documents/../Pictures"

Output: "/home/user/Pictures"
 */
function simplifyPath(path: string): string {
    let simplifyPath = '';
    let finalPathArray :string[]= [];
    const pathArray = path.split("/");
    //console.log(pathArray);

    for (const item of pathArray) {
        if (item !== '' && item !== '.') {
            if (item === "..") {
                if (finalPathArray.length > 0)
                    finalPathArray.pop();
            } else {
                finalPathArray.push(item);
            }
        }
    }

    //console.log(finalPathArray);
    simplifyPath = '/' + finalPathArray.join('/');

    return simplifyPath;
};
// console.log(simplifyPath("/home/user/Documents/../Pictures/"));
// console.log(simplifyPath("/home/"));
// console.log(simplifyPath("/home//user"));
// console.log(simplifyPath("/../"));
// console.log(simplifyPath("/.../a/../b/c/../d/./"));


/**
 * 155 min stack
 */
class MinStack {
    private stack: number[] = [];
    private minStack: number[] = [];

    constructor() {}

    push(val: number): void {
        this.stack.push(val);
        if (this.minStack.length === 0) {
            this.minStack.push(val);
        } else {
            this.minStack.push(Math.min(val, this.minStack[this.minStack.length - 1]));
        }
    }

    pop(): void {
        this.stack.pop();
        this.minStack.pop();
    }

    top(): number {
        return this.stack[this.stack.length - 1];
    }

    getMin(): number {
        return this.minStack[this.minStack.length - 1];
    }
}


/**
 * 
 * @param tokens Example 1:
150 evaluate reserse polish notation
Input: tokens = ["2","1","+","3","*"]
Output: 9
Explanation: ((2 + 1) * 3) = 9
 */
function evalRPN(tokens: string[]): number {
    const stack :number[] = [];

    for (const t of tokens) {
        if (t === '+' || t === '-' || t === '*' || t === '/') {
            if (stack.length >= 2) {
                let num2 = stack.pop()!;
                let num1 = stack.pop()!;
                switch(t) {
                    case '+': stack.push(num1+num2); break;
                    case '-': stack.push(num1-num2); break;
                    case '*': stack.push(num1*num2); break;
                    case '/': stack.push(Math.trunc(num1 / num2)); break;
                }
            }
        } else {
            stack.push(Number(t));
        }
    }

    return stack[0];
};
//console.log(evalRPN(["10","6","9","3","+","-11","*","/","*","17","+","5","+"]));

/**
 * 
 * @param s 
 * @returns 
 * 224 basic calculator HARD
 */
function calculate(s: string): number {
    const stack: number[] = [];
    let result = 0;
    let sign = 1; // 1 for '+', -1 for '-'
    let i = 0;

    while (i < s.length) {
        const char = s[i];

        if (char === ' ') {
            i++;
        } else if (char >= '0' && char <= '9') {
            let num = 0;
            while (i < s.length && s[i] >= '0' && s[i] <= '9') {
                num = num * 10 + parseInt(s[i]);
                i++;
            }
            result += sign * num;
        } else if (char === '+') {
            sign = 1;
            i++;
        } else if (char === '-') {
            sign = -1;
            i++;
        } else if (char === '(') {
            // Push current result and sign for later
            stack.push(result);
            stack.push(sign);
            result = 0;
            sign = 1;
            i++;
        } else if (char === ')') {
            const prevSign = stack.pop()!;
            const prevResult = stack.pop()!;
            result = prevResult + prevSign * result;
            i++;
        }
    }

    return result;
}

// console.log(calculate(" 2-1 + 2 "));
// console.log(calculate("1 + 1"));
// console.log(calculate("(1+(4+5+2)-3)+(6+8)"));
// console.log(calculate("2147483647"));
//console.log(calculate("1-(     -2)"));

/**
 * 
 * @param l1 
 * @param l2 
 * 2 add two numbers
 */
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

  const createLinkedList = (nums: number[]): ListNode | null => {
    if (nums.length === 0) return null;

    const nodes: ListNode[] = nums.map(num => new ListNode(num));
    for (let i = 0; i < nodes.length - 1; i++) {
      nodes[i].next = nodes[i + 1];
    }
    return nodes[0];
  };
const linkedListToArray = (head: ListNode | null): number[] => {
    const result: number[] = [];
    while (head) {
      result.push(head.val);
      head = head.next;
    }
    return result;
};
function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    let dummyHead = new ListNode(0);
    let current = dummyHead;
    let carry = 0;

    while (l1 !== null || l2 !== null || carry !== 0) {
        const x = l1?.val ?? 0;
        const y = l2?.val ?? 0;
        const sum = x + y + carry;

        carry = Math.floor(sum / 10);
        current.next = new ListNode(sum % 10);
        current = current.next;

        if (l1) l1 = l1.next;
        if (l2) l2 = l2.next;
    }

    return dummyHead.next;
}

const list1 = createLinkedList([9,9,9,9,9,9,9]);
const list2 = createLinkedList([9,9,9,9]);
// const list1 = createLinkedList([2,4,3]);
// const list2 = createLinkedList([5,6,4]);
// const list1 = createLinkedList([0]);
// const list2 = createLinkedList([0]);
// console.log(linkedListToArray(addTwoNumbers(list1, list2)));

class Node {
    val: number;
    next: Node | null;
    random: Node | null;

    constructor(val?: number, next?: Node, random?: Node) {
        this.val = val ?? 0;
        this.next = next ?? null;
        this.random = random ?? null;
    }
}

/**
 * 
 * @param head 
 * @returns 
 * 138 Copy list with random pointer
 */
function copyRandomList(head: Node | null): Node | null {
    if (!head) return null;

    // 1. Clone each node and insert it right after the original
    let curr = head;
    while (curr) {
        const copy = new Node(curr.val, curr.next);
        curr.next = copy;
        curr = copy.next;
    }

    // 2. Assign random pointers for the copied nodes
    curr = head;
    while (curr) {
        if (curr.random) {
            curr.next!.random = curr.random.next;
        }
        curr = curr.next!.next;
    }

    // 3. Separate the original and copied lists
    curr = head;
    const copiedHead = head.next;
    while (curr) {
        const copy = curr.next!;
        curr.next = copy.next;
        copy.next = copy.next ? copy.next.next : null;
        curr = curr.next;
    }

    return copiedHead;
}

/**
 * 
 * @param head 
 * @param left 
 * @param right
 * 92 revert the left and right link list node 
 */
function reverseBetween(head: ListNode | null, left: number, right: number): ListNode | null {
    if (!head || left === right) return head;

    const dummy = new ListNode(0, head);
    let prev = dummy;

    // Step 1: move `prev` to node before `left`
    for (let i = 1; i < left; i++) {
        prev = prev.next!;
    }

    // Step 2: reverse the sublist
    let curr = prev.next!;
    for (let i = 0; i < right - left; i++) {
        const temp = curr.next!;
        curr.next = temp.next;
        temp.next = prev.next;
        prev.next = temp;
    }

    return dummy.next;
}
// reverseBetween(createLinkedList([1,2,3,4,5]), 2, 4);

/**
 * 
 * @param head 
 * 82 remove duplicates from sorted list
 */
function deleteDuplicates(head: ListNode | null): ListNode | null {
    const dummy = new ListNode(0, head);
    let prev = dummy;
    let curr = head;

    while (curr) {
        let hasDuplicate = false;

        while (curr.next && curr.val === curr.next.val) {
            curr = curr.next;
            hasDuplicate = true;
        }

        if (hasDuplicate) {
            // Skip all duplicates
            prev.next = curr.next;
        } else {
            // No duplicates, move prev forward
            prev = prev.next!;
        }

        curr = curr.next;
    }

    return dummy.next;
}
// deleteDuplicates(createLinkedList([1,2,3,3,4,4,5])); 

/**
 * 146 LRU cache
 */
class LRUCache {
    private capacity: number;
    private cache: Map<number, number>;

    constructor(capacity: number) {
        this.capacity = capacity;
        this.cache = new Map();
    }

    get(key: number): number {
        if (!this.cache.has(key)) return -1;

        const value = this.cache.get(key)!;
        // Mark as recently used
        this.cache.delete(key);
        this.cache.set(key, value);
        return value;
    }

    put(key: number, value: number): void {
        if (this.cache.has(key)) {
            this.cache.delete(key);
        }

        this.cache.set(key, value);

        if (this.cache.size > this.capacity) {
            console.log(this.cache.keys().next());
            const lru = this.cache.keys().next().value; // Least recently used
            this.cache.delete(lru);
        }
    }
}
let obj = new LRUCache(2)
// obj.put(1, 1)
// obj.put(2, 2)
// obj.put(3, 3)
// obj.get(2)
// obj.put(4,4)

/**
 * 
 * @param root 
 * 114 Flatten Binary Tree to linked list -- preorder, root to left to right
 * Input: root = [1,2,5,3,4,null,6]
Output: [1,null,2,null,3,null,4,null,5,null,6]
 */
  const buildTree = (values: (number | null)[]): TreeNode | null => {
    if (!values.length) return null;
    
    const root = { val: values[0] as number, left: null, right: null };
    const queue = [root];
    let i = 1;
    
    while (queue.length && i < values.length) {
      const node = queue.shift()!;
      
      if (i < values.length && values[i] !== null) {
        node.left = { val: values[i] as number, left: null, right: null };
        queue.push(node.left);
      }
      i++;
      
      if (i < values.length && values[i] !== null) {
        node.right = { val: values[i] as number, left: null, right: null };
        queue.push(node.right);
      }
      i++;
    }
    
    return root;
  };
function flatten(root: TreeNode | null): void {
  let prev: TreeNode | null = null;

  function dfs(node: TreeNode | null) {
    if (!node) return;

    // Traverse right first (because we are building the list backward)
    dfs(node.right);
    dfs(node.left);

    // Rewire the pointers
    node.right = prev;
    node.left = null;
    prev = node;
  }

  dfs(root);
};
//flatten(buildTree([1,2,5,3,4,null,6]));

/**
 * 
 * @param root 
 * 129 Sum root to leaf numbers
 */
function sumNumbers(root: TreeNode | null): number {
    if (!root) return 0;

    const dps = (node: TreeNode | null, currSum: number): number => {
        if (!node) return 0;
        currSum = node.val + currSum * 10;
        //console.log('currenSum', currSum);
        if (!node.left && !node.right) return currSum;

        return dps(node.left, currSum) +
            dps(node.right, currSum);
    };
    return dps(root, 0);
};
// console.log(sumNumbers(buildTree([4,9,0,5,1])));

/**
 * 173 binary search tree iterator inorder left to root to right
 */
class BSTIterator {
  private stack: TreeNode[] = [];

  constructor(root: TreeNode | null) {
    this.pushLeftBranch(root);
  }

  /** Push all left children to the stack */
  private pushLeftBranch(node: TreeNode | null) {
    while (node) {
      this.stack.push(node);
      node = node.left;
    }
  }

  /** @return the next smallest number */
  next(): number {
    const node = this.stack.pop()!;
    if (node.right) {
      this.pushLeftBranch(node.right);
    }
    return node.val;
  }

  /** @return whether we have a next smallest number */
  hasNext(): boolean {
    return this.stack.length > 0;
  }
}
// let obj1 = new BSTIterator(buildTree([7, 3, 15, null, null, 9, 20]));
// let param_1 = obj1.next();
// let param_2 = obj1.hasNext();


/**
 * 
 * @param root 
 * 222 count complete tree nodes
 */
function countNodes(root: TreeNode | null): number {
    const dfs = (node: TreeNode | null): number => {
        if (!node) return 0;

        return dfs(node.left) + dfs(node.right) + 1;
    };

    return dfs(root);
    
};
// console.log(countNodes(buildTree([1,2,3,4,5,6])));

/**
 * 
 * @param root
 * @param p 
 * @param q 
 * 236 Lowest common ancestor of a BT
 * Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
Output: 3
Explanation: The LCA of nodes 5 and 1 is 3.

Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
Output: 5
 */
function lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
  if (!root || root === p || root === q) {
    return root;
  }

  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);

  if (left && right) {
    return root;
  }

  return left ?? right;
};

/**
 * 
 * @param root 
 * 199 BT right side view
 */
function rightSideView(root: TreeNode | null): number[] {
  if (!root) return [];

  const result: number[] = [];
  const queue: TreeNode[] = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()!;
      // If it's the last node in this level, add to result
      if (i === levelSize - 1) {
        result.push(node.val);
      }
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  return result;
};
//console.log(rightSideView(buildTree([1,2,3,null,5,null,4])));
// console.log(rightSideView(buildTree([1,2,3,4,null,null,null,5])));
//console.log(rightSideView(buildTree([1,null,2,null,5,4,6,3])));
//console.log(rightSideView(buildTree([])));

/**
 * 
 * @param root 
 * 637 Average of levels in binary tree
 */
function averageOfLevels(root: TreeNode | null): number[] {
    if (!root) return [];
    const result :number[] = [];
    const queue :TreeNode[] = [root];

    while (queue.length > 0) {
        let n = queue.length;
        let levelSum = 0;

        for (let i=0; i<n; i++) {
            let node = queue.shift()!;
            levelSum += node.val;
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);

        }

        // console.log(levelSum , n)
        result.push(levelSum / n);
    }

    return result;
};
//console.log(averageOfLevels(buildTree([3,9,20,15,7])))

/**
 * 
 * @param root 
 * 530 min abs diff in BST
 */
function getMinimumDifference(root: TreeNode | null): number {
  let prev: number | null = null;
  let minDiff = Infinity;

  function inOrder(node: TreeNode | null) {
    if (!node) return;

    //left
    inOrder(node.left);

    //root
    if (prev !== null) {
      minDiff = Math.min(minDiff, Math.abs(node.val - prev));
    }
    prev = node.val;

    // right;
    inOrder(node.right);
  }

  inOrder(root);
  return minDiff;
    
};
console.log(getMinimumDifference(buildTree([4,2,6,1,3])));