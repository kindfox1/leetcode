import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import TwoPointers from './components/TwoPointers';
import Interval from './components/Interval';
import SlidingWindow from './components/SlidingWindow';
import Stack from './components/Stack';
import LinkedList from './components/LinkedList';
import BinarySearch from './components/BinarySearch';
import Heap from './components/Heap';
import DepthFirstSearch from './components/DepthFirstSearch';
import BreadthFirstSearch from './components/BreadthFirstSearch';
import Backtracking from './components/Backtracking';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <div className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<TwoPointers />} />
              <Route path="/sliding-window" element={<SlidingWindow />} />
              <Route path="/interval" element={<Interval />} />
              <Route path="/stack" element={<Stack />} />
              <Route path="/linked-list" element={<LinkedList />} />
              <Route path="/binary-search" element={<BinarySearch />} />
              <Route path="/heap" element={<Heap />} />
              <Route path="/depth-first-search" element={<DepthFirstSearch />} />
              <Route path="/breath-first-search" element={<BreadthFirstSearch />} />
              <Route path="/backtracking" element={<Backtracking />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;