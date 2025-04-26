import React from 'react';


const students = [
  {
    name: 'Kinara Zuri',
    percent: '87.9%',
    grade: 3,
    gpa: 5,
    attended: '77.3%',
    title: 'Best In Marks',
    avatarBg: "#FBD6D2",
    avatar: "👦"
  },
  {
    name: 'Lea Jabulani',
    percent: '89.3%',
    grade: 4,
    gpa: 4,
    attended: '75.3%',
    title: 'Best In Attendance',
    avatarBg: "#D9D9D9",
    avatar: "👦"
  },
  {
    name: 'Corny Niang',
    percent: '79.3%',
    grade: 5,
    gpa: 3,
    attended: '80.2%',
    title: 'Most Improved In Marks',
    avatarBg: "#D0F1C3",
    avatar: "👦"
  },
  {
    name: 'Yao Ming',
    percent: '82.5%',
    grade: 1,
    gpa: 5,
    attended: '86.8%',
    title: 'Most Improved In Attendance',
    avatarBg: "#ABD6D2",
    avatar: "👦"
  },
];

const StudentPerformance = () => {
  return (
    <div className="container-fluid py-5 ">
      <div className="row g-4 border  border-0 shadow-sm rounded-2" >
        {students.map((student, idx) => (
          <div className="col-md-6  mt-3  col-lg-6" key={idx}>
            <div className="card py-2 border-0 shadow-sm rounded-3" >
              <div className="align-items-center ms-0 d-flex ms-3  gap-3" >
                <div
                  className="rounded-circle  d-flex justify-content-center align-items-center text-center"
                  style={{
                    backgroundColor: student.avatarBg,
                    width: 70,
                    height: 70,
                    fontSize: 30,
                  }}
                >
                  {student.avatar}
                </div>
                <div className='pt-3' style={{ fontSize: '14px' }}>
                  <h6 className="fw-900 mb-1" >{student.percent}</h6>
                  <div className="text-dark fw-bold" >{student.name}</div>
                  <div className="d-flex gap-2 justify-content-around text-center mb-2">

                    <div className='mt-1'>
                      <div className="text-muted small">GPA</div>
                      <div className="text-start">{student.gpa}</div>
                    </div>
                    <div>
                      <div className="mt-1">
                        <div className="text-muted small">
                          {student.title.includes('Attendance') ? 'Attend' : 'Marks'}
                        </div>
                        {student.title.includes('Attendance') ? student.attended : student.percent}
                      </div>

                    </div>
                  </div>


                </div>
              </div>

            </div>
            <div className="text-center text-primary mt-3 fw-semibold text-black pb-2" style={{ fontSize: '0.95rem' }}>
              {student.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentPerformance;
