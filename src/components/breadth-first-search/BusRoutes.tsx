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

  const handleCalculate = () => {
    try {
      const routesArray = routes.split(';').map(route => 
        route.split(',').map(Number)
      );
      const sourceNum = parseInt(source);
      const targetNum = parseInt(target);
      
      if (!isNaN(sourceNum) && !isNaN(targetNum)) {
        setResult(numBusesToDestination(routesArray, sourceNum, targetNum));
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
      <p className="text-sm text-gray-600 mb-4">
        Example Routes: 1,2,7;3,6,7 Source: 1 Target: 6
      </p>
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