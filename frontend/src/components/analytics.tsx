'use client ';

import { log } from 'console';
import { useState, useEffect } from 'react';
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const colors = ['#00C49F', '#FF8042', '#FFBB28', '#8884d8', '#FF6384'];


export default function AnalyticsPage() {

    const [stats , setStats] = useState([]);

    useEffect(() =>{
        fetch('http://localhost:5000/api/mood/stats').then(res => res.json()).then(data => {
            if (data.success){
                setStats(data.data);
             
            }
        })
    },[]);
console.log(stats);
    return (
        <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">📊 Mood Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Mood Frequency (Bar)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats}>
              <XAxis dataKey="mood" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

       
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Mood Distribution (Pie)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stats}
                dataKey="count"
                nameKey="mood"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {stats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </main>
    )
}