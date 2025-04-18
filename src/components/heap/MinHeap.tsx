export class MinHeap {
    private heap: number[] = [];
  
    constructor() {}
  
    private swap(i: number, j: number): void {
      [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }
  
    private parent(i: number): number {
      return Math.floor((i - 1) / 2);
    }
  
    private left(i: number): number {
      return 2 * i + 1;
    }
  
    private right(i: number): number {
      return 2 * i + 2;
    }

    public length() :number {
        return this.heap.length;
    }
  
    // Formerly 'insert'
    insert(value: number): void {
      this.heap.push(value);
      this.bubbleUp(this.heap.length - 1);
    }
  
    private bubbleUp(i: number): void {
      while (i > 0 && this.heap[i] < this.heap[this.parent(i)]) {
        this.swap(i, this.parent(i));
        i = this.parent(i);
      }
    }
  
    // Formerly 'extract'
    pop(): number | undefined {
      if (this.heap.length === 0) return undefined;
      if (this.heap.length === 1) return this.heap.pop();
  
      const root = this.heap[0];
      this.heap[0] = this.heap.pop()!;
      this.bubbleDown(0);
      return root;
    }
  
    private bubbleDown(i: number): void {
      const n = this.heap.length;
      while (true) {
        let smallest = i;
        const left = this.left(i);
        const right = this.right(i);
  
        if (left < n && this.heap[left] < this.heap[smallest]) {
          smallest = left;
        }
        if (right < n && this.heap[right] < this.heap[smallest]) {
          smallest = right;
        }
        if (smallest === i) break;
  
        this.swap(i, smallest);
        i = smallest;
      }
    }
  
    peek(): number | undefined {
      return this.heap[0];
    }
  
    heapify(array: number[]): void {
      this.heap = array.slice();
      for (let i = Math.floor(this.heap.length / 2) - 1; i >= 0; i--) {
        this.bubbleDown(i);
      }
    }
  
    print(): void {
      console.log(this.heap);
    }
  }
  