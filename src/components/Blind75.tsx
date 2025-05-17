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
class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.left = (left===undefined ? null : left)
        this.right = (right===undefined ? null : right)
    }
 }

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

/*
 * Encodes a tree to a single string.
 */
function serialize(root: TreeNode | null): string {
    if (!root) return '';
    let result = '';
    console.log(root);
    const queue: TreeNode[] = [root];


    while (queue.length > 0) {
        let n = queue.length;

        for (let i=0; i<n; i++) {
            const node = queue.shift()!;
            result += node.val? node.val: 'n';
            if (node.left) {
                queue.push(node.left);
            } else {
                result += 'n';
            }

            if (node.right) {
                queue.push(node.right);
            } else {
                result += 'n';
            }
        }
    }

    console.log(result);
    return result;
};

/*
 * Decodes your encoded data to tree.
 */
function deserialize(data: string): TreeNode | null {

};


/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
// const tree = buildTree([1,2,3,null,null,4,5]);
// serialize(tree);

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
    console.log(parseInt(a, 2));
    return a - (-b);
};
console.log(getSum(1, 2));
