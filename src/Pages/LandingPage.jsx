import React from "react";
import "../css/LandingPage.css"
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import Footer from '../Components/Footer';


export default function LandingPage() {
    return (
        <div className="landing-container">
            {/* Navbar */}
            <nav className="navbar">
                <div className="logo">QuickScore</div>
                <ul className="nav-links">
                    <li>Offerings</li>
                    <li>Why EduTrack</li>
                    <li>Stories</li>
                    <li>Help</li>
                </ul>
                <button className="login-button">Login</button>
            </nav>

            {/* Hero Section */}
            <section className="hero-section">
                <h1 className="hero-heading">
                    <span className="highlighted">Explore</span> your academic future
                </h1>
                <p>Analyze student results and academic data with insightful visualizations and smart feedback</p>
                <div>
                    <Link to="/dashboard" className="link">
                        <button className="cta-button" >Get Started</button>
                    </Link>
                </div>
            </section>

            {/* preview of web */}

            <div className="web-preview-slider">
                <div className="web-preview-track">
                    <img src="preview2.jfif" alt="" />
                    <img src="preview.jfif" alt="Preview 2" />
                    <img src="preview3.jfif" alt="Preview 3" />
                    {/* duplicate */}
                    <img src="preview2.jfif" alt="" />
                    <img src="preview.jfif" alt="Preview 2" />
                    <img src="preview3.jfif" alt="Preview 3" />


                </div>
            </div>

            {/* cards */}
            <div className="edu-feature-panel">
                <div className="edu-feature-image">
                    <img src="preview.jfif" alt="Academic trend preview" />
                </div>
                <div className="edu-feature-text">
                    <h2>Discover</h2>
                    <p>
                        Access insights into academic growth trends, with data updated regularly to guide your future planning.
                    </p>
                </div>
            </div>

            <div className="edu-split-panel">
                <div className="edu-card">
                    <img src="preview2.jfif" alt="People Also Search" />
                    <h3>People Also Search</h3>
                    <p>
                        Absolute search volume data for any keyword and any country + YoY growth metrics.
                    </p>
                </div>
                <div className="edu-card">
                    <img src="preview3.jfif" alt="Search Volume" />
                    <h3>Search Volume</h3>
                    <p>
                        Get keyword growth metrics like year-over-year and month-over-month changes for academic data.
                    </p>
                </div>
            </div>



            {/* Features */}
            <section className="features-section">
                <div className="feature-card">
                    <div className="feature-icon">🎓</div>
                    <h2>Student Insights</h2>
                    <p>Track progress, attendance, and subject-wise scores for better academic decisions.</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon">📊</div>
                    <h2>Smart Analytics</h2>
                    <p>Identify trends and get personalized recommendations using AI-powered tools.</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon">📌</div>
                    <h2>Faculty Dashboard</h2>
                    <p>Empower teachers with tools to analyze class performance and attendance quickly.</p>
                </div>
            </section>


            {/* Outro Section */}
            <section className="outro-section">
                <h2>Helping you connect the dots</h2>
                <p>Visualize your academic data like never before and make better decisions for the future.</p>
                <button className="demo-button">Try Demo</button>
            </section>

            <Footer />

        </div>
    );
}