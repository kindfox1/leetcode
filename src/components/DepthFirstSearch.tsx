import React from 'react';
import { Typography } from '@mui/material';
import MaximumDepth from './depth-first-search/MaximumDepth';
import PathSum from './depth-first-search/PathSum';
import ValidateBST from './depth-first-search/ValidateBST';
import CalculateTilt from './depth-first-search/CalculateTilt';
import TreeDiameter from './depth-first-search/TreeDiameter';
import PathSum2 from './depth-first-search/PathSum2';
import LongestUnivaluePath from './depth-first-search/LongestUnivaluePath';
import AdjacencyList from './depth-first-search/AdjacencyList';
import CopyGraph from './depth-first-search/CopyGraph';
import MinSpanningTree from './depth-first-search/MinSpanningTree';
import Matrices from './depth-first-search/Matrices';
import FloodFill from './depth-first-search/FloodFill';
import NumberOfIslands from './depth-first-search/NumberOfIslands';
import SurroundedRegions from './depth-first-search/SurroundedRegions';
import PacificAtlantic from './depth-first-search/PacificAtlantic';
import GoodNodes from './depth-first-search/GoodNodes';
import CloneGraph from './depth-first-search/CloneGraph';
import GraphValidTree from './depth-first-search/GraphValidTree';

const DepthFirstSearch = () => {
  return (
    <main className="flex-1 overflow-y-auto bg-gray-100">
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <Typography variant="h2" component="h1" gutterBottom>
          Depth-First Search Problems
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom>
          Binary Tree
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <MaximumDepth />
          <PathSum />
          <GoodNodes />
          <ValidateBST />
          <CalculateTilt />
          <TreeDiameter />
          <PathSum2 />
          <LongestUnivaluePath />
        </div>
        <Typography variant="h4" component="h2" gutterBottom>
          Graph
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AdjacencyList />
          <CloneGraph />
          <GraphValidTree />
          <MinSpanningTree />
        </div>
        <Typography variant="h4" component="h2" gutterBottom>
          Matrix
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Matrices />
          <FloodFill />
          <NumberOfIslands />
          <SurroundedRegions />
          <PacificAtlantic />
        </div>
      </div>
    </main>
  );
};

export default DepthFirstSearch;