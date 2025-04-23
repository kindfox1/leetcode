import React from 'react';
import { Link, useLocation } from 'react-router-dom';
//import { Home, BarChart2, Timer, Layers, Link as LinkIcon, Search, Database, Trees as Tree } from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();
  
  // const menuItems = [
  //   { icon: Home, name: 'Two Pointers', path: '/' },
  //   { icon: BarChart2, name: 'Sliding Window', path: '/sliding-window' },
  //   { icon: Timer, name: 'Interval', path: '/interval' },
  //   { icon: Layers, name: 'Stack', path: '/stack' },
  //   { icon: LinkIcon, name: 'Linked List', path: '/linked-list' },
  //   { icon: Search, name: 'Binary Search', path: '/binary-search' },
  //   { icon: Database, name: 'Heap', path: '/heap' },
  //   { icon: Tree, name: 'Depth-First Search', path: '/depth-first-search' },
  // ];

  const menuItems = [
    { name: 'Two Pointers', path: '/' },
    { name: 'Sliding Window', path: '/sliding-window' },
    { name: 'Interval', path: '/interval' },
    { name: 'Stack', path: '/stack' },
    { name: 'Linked List', path: '/linked-list' },
    { name: 'Binary Search', path: '/binary-search' },
    { name: 'Heap', path: '/heap' },
    { name: 'Depth-First Search', path: '/depth-first-search' },
    { name: 'Breath-First Search', path: '/breath-first-search' },
  ];

  return (
    <aside className="w-64 bg-indigo-700 text-white">
      <div className="p-6">
        <h1 className="text-2xl font-bold">Algorithm Patterns</h1>
      </div>
      
      <nav className="mt-6">
        <div className="px-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`
                flex items-center px-4 py-3 text-sm font-medium rounded-lg
                ${location.pathname === item.path
                  ? 'bg-indigo-800 text-white'
                  : 'text-indigo-100 hover:bg-indigo-800 hover:text-white'}
              `}
            >
              {/* <item.icon className="h-5 w-5 mr-3" /> */}
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
    </aside>
  );
}