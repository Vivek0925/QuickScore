import React from 'react';
import '../css/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-logo">QuickScore</div>
                <div className="footer-links">
                    <a href="#">Privacy</a>
                    <a href="#">Terms</a>
                    <a href="#">Contact</a>
                    <a href="#">Support</a>
                </div>
            </div>
            <p className="footer-copy">© 2025 QuickScore. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
