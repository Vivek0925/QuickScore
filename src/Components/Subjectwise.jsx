import React, { useEffect, useState } from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const SubjectWise = () => {
  const [subjectData, setSubjectData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/db.json');
        const data = await response.json();
        setSubjectData((data['subject-wise-results'] || []).slice(0, 5)); // Only take 5 subjects
      } catch (err) {
        console.error('Failed to fetch subject-wise data', err);
      }
    };

    fetchData();
  }, []);

  const colors = ['#8b5cf6', '#6366f1', '#0ea5e9', '#10b981', '#f59e0b'];

  return (
    <div
      className="p-3 col rounded-4 shadow bg-white position-relative overflow-hidden"
      style={{ minHeight: '240px' }} // Increased height
    >
      {/* Title */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">Subject-wise Marks</h5>
      </div>

      {/* Circular Progress Cards */}
      <div
        className="d-flex py-5 gap-4 pb-3 justify-content-center custom-scroll-container"
        style={{
          padding: '10px 0',
          width: '100%',
          overflowX: 'auto',
          scrollbarWidth: 'none',           // Firefox
          msOverflowStyle: 'none',          // IE/Edge
        }}
      >
        {subjectData.map((item, index) => {
          const total = item.Pass + item.Fail;
          const passPercentage = total > 0 ? ((item.Pass / total) * 100).toFixed(1) : 0;

          return (
            <div
              key={index}
              style={{ width: 130, minWidth: 130 }} // Slightly bigger width
              className="text-center d-flex flex-column align-items-center justify-content-center"
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  width: 130,
                  height: 130, // Increased circle size
                  borderRadius: '50%',
                  backgroundColor: '#f3f4f6',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                }}
              >
                <CircularProgressbarWithChildren
                  value={passPercentage}
                  styles={buildStyles({
                    pathColor: colors[index % colors.length],
                    trailColor: '#e5e7eb',
                  })}
                >
                  <div
                    style={{
                      fontSize: 22,
                      fontWeight: 'bold',
                      color: '#1f2937',
                    }}
                  >
                    {passPercentage}%
                  </div>
                </CircularProgressbarWithChildren>
              </div>
              <div className="mt-2" style={{ fontSize: 14, fontWeight: '500', color: '#4b5563' }}>
                {item.subject}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SubjectWise;
