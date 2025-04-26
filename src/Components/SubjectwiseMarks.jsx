import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';
import { Dropdown, ButtonGroup, Button } from 'react-bootstrap';
import { Search } from 'lucide-react';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 rounded shadow-sm border">
        <strong>{payload[0].payload.subject}</strong>
        <br />
        🔺 Highest: {payload[0].payload.Highest}
        <br />
        🔻 Lowest: {payload[0].payload.Lowest}
      </div>
    );
  }
  return null;
};

const SubjectwiseMarks = () => {
  const [subjectData, setSubjectData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/subject-wise-marks');
        const data = await response.json();
        setSubjectData(data || []);
      } catch (err) {
        console.error('Failed to fetch subject-wise data', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-3  rounded-4 shadow mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">Subject-wise Marks</h5>
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={subjectData} barSize={24}>
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="Highest" fill="url(#colorHigh)" radius={[6, 6, 0, 0]} />
              <Bar dataKey="Lowest" fill="url(#colorLow)" radius={[6, 6, 0, 0]} />
              <defs>
                <linearGradient id="colorHigh" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={1} />
                  <stop offset="100%" stopColor="#60a5fa" stopOpacity={0.8} />
                </linearGradient>
                <linearGradient id="colorLow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={1} />
                  <stop offset="100%" stopColor="#6ee7b7" stopOpacity={0.8} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default SubjectwiseMarks;
