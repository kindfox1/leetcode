import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const BusRoutes = () => {
  const [routes, setRoutes] = useState('');
  const [source, setSource] = useState('');
  const [target, setTarget] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const numBusesToDestination = (routes: number[][], source: number, target: number): number => {
    if (source === target) return 0;
    
    // Create a map of stop to routes that contain that stop
    const stopToRoutes = new Map<number, Set<number>>();
    routes.forEach((route, routeIndex) => {
      route.forEach(stop => {
        if (!stopToRoutes.has(stop)) {
          stopToRoutes.set(stop, new Set());
        }
        stopToRoutes.get(stop)!.add(routeIndex);
      });
    });
    
    if (!stopToRoutes.has(source) || !stopToRoutes.has(target)) return -1;
    
    const visitedRoutes = new Set<number>();
    const visitedStops = new Set<number>();
    const queue: [number, number][] = [[source, 0]]; // [stop, buses taken]
    visitedStops.add(source);
    
    while (queue.length > 0) {
      const [currentStop, buses] = queue.shift()!;
      
      // Get all routes that contain current stop
      const routesForStop = stopToRoutes.get(currentStop) || new Set();
      
      for (const routeIndex of routesForStop) {
        if (visitedRoutes.has(routeIndex)) continue;
        visitedRoutes.add(routeIndex);
        
        // Check all stops in this route
        for (const stop of routes[routeIndex]) {
          if (stop === target) return buses + 1;
          if (visitedStops.has(stop)) continue;
          
          visitedStops.add(stop);
          queue.push([stop, buses + 1]);
        }
      }
    }
    
    return -1;
  };

  // ChatGPT solution
  function busRoutes(routes: number[][], source: number, target: number): number {
    if (source === target) {
      return 0;
    }
  
    // Map of bus stop -> list of route indices
    const busStops: Record<number, number[]> = {};
    for (let i = 0; i < routes.length; i++) {
      for (const stop of routes[i]) {
        if (!busStops[stop]) {
          busStops[stop] = [];
        }
        busStops[stop].push(i);
      }
    }
  
    const visited = new Set<number>();
    const queue: [number, number][] = [];
  
    // Initialize queue with all routes from the source stop
    if (!busStops[source]) {
      return -1; // source stop is not in any route
    }
  
    for (const bus of busStops[source]) {
      queue.push([bus, 1]);
      visited.add(bus);
    }
  
    while (queue.length > 0) {
      const [currBus, numChanges] = queue.shift()!;
  
      for (const stop of routes[currBus]) {
        if (stop === target) {
          return numChanges;
        }
  
        for (const nextBus of busStops[stop]) {
          if (!visited.has(nextBus)) {
            queue.push([nextBus, numChanges + 1]);
            visited.add(nextBus);
          }
        }
      }
    }
  
    return -1; // no path found
  }
  

  // [[1,2,7],[3,6,7]] Source: 1 Target: 6 Output 2
  const numBusesToDestination2 = (routes: number[][], source: number, target: number): number => {
    if (source === target) {
      return 0;
    }
    let result = -1;
    const map = new Map<number, number[]>();

    // build adjacency list
    for (let routeIndex=0; routeIndex<routes.length; routeIndex++) {
      for (const stop of routes[routeIndex]) {
        if (map.has(stop)) {
          map.get(stop)?.push(routeIndex);
        } else {
          map.set(stop, [routeIndex]);
        }
      }
    }

    if (!map.has(source)) {
      return -1;
    }

    const queue: [number, number][] = [];
    const visited = new Set<number>();

    // init the queue start traverse the route(s) with source stop
    for (const route of map.get(source)!) {
      queue.push([route, 1]);
      visited.add(route);
    }

    while (queue.length > 0) {
      const [route, count] = queue.shift()!;
      //console.log('queue =', route, count);

      for (const stop of routes[route]) {
        //console.log('stop', stop);
        if (stop === target) {
          //console.log('FOUND IT!!!!', stop, count);
          return count;
        }

        if (stop !== source) {
          for (const route of map.get(stop)!) {
            if (!visited.has(route)) {
              queue.push([route, count+1]);
              visited.add(route);
            }
          }
          
        }
      }
    }
    
    
    //console.log(map);
    
    
    return result;
  };

  const handleCalculate = () => {
    try {
      // const routesArray = routes.split(';').map(route => 
      //   route.split(',').map(Number)
      // );
      const routesArray = JSON.parse(routes);
      const sourceNum = parseInt(source);
      const targetNum = parseInt(target);
      
      if (!isNaN(sourceNum) && !isNaN(targetNum)) {
        setResult(numBusesToDestination2(routesArray, sourceNum, targetNum));
      }
    } catch (error) {
      console.error('Invalid input format');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Typography variant="h6" gutterBottom>
        Bus Routes
      </Typography>
      <p className="text-sm text-gray-600 mb-4">[[1,2,7],[3,6,7]] Source: 1 Target: 6 Output 2</p>
      <p className="text-sm text-gray-600 mb-4">[[3, 8, 9], [5, 6, 8], [1, 7, 10]] source = 3 target = 6, output: 2 </p>
      <p className="text-sm text-gray-600 mb-4">[[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]] source = 1 target = 12, output: -1 </p>
      <TextField
        label="Enter routes (format: route1;route2)"
        variant="outlined"
        fullWidth
        value={routes}
        onChange={(e) => setRoutes(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Source stop"
        variant="outlined"
        fullWidth
        value={source}
        onChange={(e) => setSource(e.target.value)}
        margin="normal"
        type="number"
      />
      <TextField
        label="Target stop"
        variant="outlined"
        fullWidth
        value={target}
        onChange={(e) => setTarget(e.target.value)}
        margin="normal"
        type="number"
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleCalculate}
        sx={{ mt: 2 }}
      >
        Calculate Minimum Buses
      </Button>
      {result !== null && (
        <Box mt={2}>
          <Typography variant="h6">
            {result === -1 ? 
              'Cannot reach target' : 
              `Minimum buses needed: ${result}`}
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default BusRoutes;