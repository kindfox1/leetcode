import React from 'react';
//import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  //icon: LucideIcon;
  trend: string;
  description: string;
}

export default function StatCard({ title, value, trend, description }: StatCardProps) {
  const isPositive = trend.startsWith('+');
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="h-12 w-12 rounded-lg bg-indigo-100 flex items-center justify-center">
          {/* <Icon className="h-6 w-6 text-indigo-600" /> */}
        </div>
        <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {trend}
        </span>
      </div>
      <h3 className="text-lg font-semibold text-gray-900">{value}</h3>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-xs text-gray-400 mt-1">{description}</p>
    </div>
  );
}