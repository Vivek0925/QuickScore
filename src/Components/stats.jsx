import React from 'react';
import { FaUsers, FaClipboardCheck } from 'react-icons/fa';

const Stats = () => {
  return (
    <div className="container-fluid py-4" >
      <div className="d-flex flex-wrap justify-content-start gap-4">

        {/* Filters */}
        <div className="d-flex flex-column gap-2">
          <select className="form-select shadow-sm rounded-2 border-0 px-3 py-2" style={{ width: '170px', backgroundColor: 'white' }}>
            <option>Select Semester</option>
            <option>Sem 1</option>
            <option>Sem 2</option>
          </select>
          <select className="form-select shadow-sm rounded-2 border-0 px-3 py-2" style={{ width: '170px', backgroundColor: 'white' }}>
            <option>Select Grade</option>
            <option>Grade 10</option>
            <option>Grade 11</option>
            <option>Grade 12</option>
          </select>
        </div>

        {/* Student Count */}
        <div className='d-flex gap-4 flex-wrap'>
          <div className="d-flex align-items-center p-3 bg-white rounded-3 shadow-sm" style={{ minWidth: '200px' }}>
            <div className="me-3 text-secondary">
              <FaUsers size={30} />
            </div>
            <div>
              <h5 className="mb-0 fw-bold">3,457</h5>
              <small className="text-muted">Student Count</small>
            </div>
          </div>

          {/* Student Attendance */}
          <div className="d-flex align-items-center p-3 bg-white rounded-3 shadow-sm" style={{ minWidth: '200px' }}>
            <div className="me-3 text-secondary">
              <FaClipboardCheck size={30} />
            </div>
            <div>
              <h5 className="mb-0 fw-bold">83.7%</h5>
              <small className="text-muted">Student Attendance</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
