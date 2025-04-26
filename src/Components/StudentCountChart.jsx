import React, { useState, useEffect } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ChartDataLabels
);

const gradeGroups = {
  A: ['A+', 'A'],
  B: ['B+', 'B'],
  C: ['C+', 'C'],
  D: ['D+', 'D'],
  F: ['F', 'FF'],
};

const groupColors = {
  A: ['#60a5fa', '#93c5fd'],
  B: ['#34d399', '#6ee7b7'],
  C: ['#fde68a', '#fcd34d'],
  D: ['#fca5a5', '#f87171'],
  F: ['#f59e0b', '#ef4444'],
};

const StudentCountChart = () => {
  const [gradeCounts, setGradeCounts] = useState({});
  const [hoveredGroup, setHoveredGroup] = useState(null); // track the hovered group

  useEffect(() => {
    fetch('http://localhost:3001/grades') // Replace with your real API
      .then((res) => res.json())
      .then((data) => {
        const counts = {};
        data.forEach((item) => {
          counts[item.grade] = item.count;
        });
        setGradeCounts(counts);
      })
      .catch((err) => {
        console.error('Error fetching grade data:', err);
        // fallback mock data
        setGradeCounts({
          'A+': 15,
          A: 25,
          'B+': 20,
          B: 22,
          'C+': 18,
          C: 17,
          'D+': 10,
          D: 9,
          F: 5,
          FF: 2,
        });
      });
  }, []);

  const groupData = Object.entries(gradeGroups).map(([group, subgrades]) =>
    subgrades.reduce((sum, g) => sum + (gradeCounts[g] || 0), 0)
  );

  const totalStudents = groupData.reduce((a, b) => a + b, 0);

  const pieData = {
    labels: Object.keys(gradeGroups),
    datasets: [
      {
        data: groupData,
        backgroundColor: Object.values(groupColors).map((shades) => shades[0]),
        borderWidth: 2,
        hoverOffset: 10,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      animateScale: true,
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            size: 13,
            family: 'Poppins',
          },
          color: '#444',
        },
      },
      tooltip: {
        enabled: false, // Disable default tooltip
      },
      datalabels: {
        formatter: (value, context) => {
          const total = context.dataset.data.reduce((a, b) => a + b, 0);
          const percentage = ((value / total) * 100).toFixed(1);
          return `${percentage}%`;
        },
        color: '#fff',
        font: {
          weight: 'bold',
          size: 12,
        },
      },
    },
    hover: {
      onHover: function (event, chartElement) {
        if (chartElement.length) {
          const label = chartElement[0]._model.label;
          setHoveredGroup(label); // Set the hovered group
        } else {
          setHoveredGroup(null); // Reset if no element is hovered
        }
      },
    },
  };

  // Update the pie chart data dynamically based on the hovered group
  const dynamicPieData = hoveredGroup
    ? {
      labels: gradeGroups[hoveredGroup],
      datasets: [
        {
          data: gradeGroups[hoveredGroup].map(
            (grade) => gradeCounts[grade] || 0
          ),
          backgroundColor: gradeGroups[hoveredGroup].map(
            (grade) => groupColors[hoveredGroup][0]
          ),
          borderWidth: 2,
          hoverOffset: 10,
        },
      ],
    }
    : pieData;

  const passedCount = ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D+', 'D'].reduce(
    (sum, grade) => sum + (gradeCounts[grade] || 0),
    0
  );
  const failedCount = ['F', 'FF'].reduce(
    (sum, grade) => sum + (gradeCounts[grade] || 0),
    0
  );

  const barData = {
    labels: ['Passed', 'Failed'],
    datasets: [
      {
        label: 'Student Count',
        data: [passedCount, failedCount],
        backgroundColor: ['#10b981', '#ef4444'],
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `Count: ${tooltipItem.raw}`;
          },
        },
      },
    },
    animation: {
      duration: 1200,
      easing: 'easeOutBounce',
    },
    scales: {
      x: {
        ticks: {
          stepSize: 1,
          color: '#fff',
          font: {
            family: 'Poppins',
          },
        },
        grid: {
          color: '#eee',
        },
      },
      y: {
        ticks: {
          color: '#333',
          font: {
            family: 'Poppins',
            weight: 'bold',
          },
        },
        grid: {
          display: false,
        },
      },
    },
    elements: {
      bar: {
        borderRadius: 10,
        barThickness: 30,
      },
    },
  };

  if (!Object.keys(gradeCounts).length) return <p className="text-center">Loading...</p>;

  return (
    <div className="col mb-4">
      <div className="card shadow rounded-4 border-0">
        <div className="card-body p-4">
          <h5 className="card-title text-center fw-semibold fs-5 mb-4 text-primary-emphasis">
            📊 Grade-wise Student Distribution
          </h5>
          <div className="row justify-content-center">
            <div className="col-md-6 mb-4">
              <div style={{ height: '280px' }}>
                <Pie data={dynamicPieData} options={pieOptions} />
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div style={{ height: '280px' }}>
                <Bar data={barData} options={barOptions} />
              </div>
            </div>
          </div>
          <p className="text-center mt-3 mb-0 fs-6">
            <strong>Total Students:</strong> {totalStudents}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentCountChart;
