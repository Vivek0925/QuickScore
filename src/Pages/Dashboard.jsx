import React, { useState } from 'react';
import StudentCountChart from '../Components/StudentCountChart';
import Stats from '../Components/stats';
import StudentPerformance from '../Components/StudentPerformance';
import TopPerformer from '../Components/TopPerformer';
import SubjectWise from '../Components/Subjectwise';
import SubjectwiseMarks from '../Components/SubjectwiseMarks';
import Navbar from '../Components/Navbar.jsx';
import Footer from '../Components/Footer.jsx';
import '../css/Dashboard.css';
import Chatbot from '../Components/Chatbot';


const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('Overall');

  return (
    <div className="dashboard-layout">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="container-fluid py-4 mt-5 main-content">
        {/* Tab Content Area */}
        {activeTab === 'Overall' && (
          <div className="row">
            {/* Main Content */}
            <div className="col-md-7 mb-4">
              <Stats />
              <StudentCountChart />
              <SubjectWise />
            </div>

            {/* Sidebar */}
            <div className="col-md-5 mb-4">
              <StudentPerformance />
              <TopPerformer />
              <SubjectwiseMarks />
            </div>
          </div>
        )}

        {activeTab === 'Chatbot' && (
          <div className="row">
            <Chatbot />
            <div style={{ height: '100vh' }}></div>
          </div>
        )}

        {activeTab === 'SubjectWise' && (
          <div className="row">
            <div className="mb-4 text-center my-5">
              <h3>📊 Subject wise View Coming Soon</h3>
              <p>You can compare performance over time or across students here.</p>
            </div>
          </div>
        )}

        {activeTab === 'Comparison' && (
          <div className="text-center my-5">
            <h3>📊 Comparison View Coming Soon</h3>
            <p>You can compare performance over time or across students here.</p>
          </div>
        )}
        {activeTab === 'StudentWise' && (
          <div className="text-center my-5">
            <h3>📊 StudentWise Coming Soon</h3>
            <p>You can compare performance over time or across students here.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;