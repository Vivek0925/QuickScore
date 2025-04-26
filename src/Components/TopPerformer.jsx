import React from 'react';
import { Card, Dropdown } from 'react-bootstrap';

const students = [
  {
    name: "Luka Magic",
    gender: "Male",
    marks: "73.7%",
    gpa: "5",
    attendance: "77.3%",
    avatarBg: "#FBD6D2",
    avatar: "👦"
  },
  {
    name: "Bianca Shangwe",
    gender: "Female",
    marks: "63.7%",
    gpa: "2.2",
    attendance: "63.7%",
    avatarBg: "#D9D9D9",
    avatar: "👧"
  },
  {
    name: "Alpha Kenya",
    gender: "Male",
    marks: "83.1%",
    gpa: "5",
    attendance: "78.9%",
    avatarBg: "#D0F1C3",
    avatar: "👦"
  }
];

const TopPerformer = () => {
  return (
    <div className="p-3 rounded  shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">Top Performers</h5>
      </div>

      {/* Static single row layout (no scroll) */}
      <div className="d-flex justify-content-center gap-3">
        {students.map((student, index) => (
          <Card
            key={index}
            className="text-center student-card"

          >
            <Card.Body>
              <div
                className="rounded-circle mx-auto d-flex justify-content-center align-items-center text-center mb-2"
                style={{
                  backgroundColor: student.avatarBg,
                  width: 60,
                  height: 60,
                  fontSize: 30,
                }}
              >
                {student.avatar}
              </div>
              <h6 className='fw-bold' style={{ fontSize: '12px' }}>{student.name}</h6>
              <div className="d-flex gap-2 justify-content-center text-center border-top pt-2">
                <div className="flex-fill" style={{ fontSize: '14px' }}>
                  <small className="text-muted">Marks</small>
                  <div>{student.marks}</div>
                </div>

                <div className="flex-fill" style={{ fontSize: '14px' }}>
                  <small className="text-muted">Attend</small>
                  <div>{student.attendance}</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TopPerformer;
