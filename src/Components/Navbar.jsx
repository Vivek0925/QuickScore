import React, { useRef, useEffect } from 'react';
import '../css/Navbar.css';

const tabs = ['Overall', 'Chatbot', 'SubjectWise', 'Comparison', 'StudentWise'];

const Navbar = ({ activeTab, setActiveTab }) => {
    const [highlightStyle, setHighlightStyle] = React.useState({});
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const tabRefs = useRef([]);
    const navRef = useRef(null);

    useEffect(() => {
        const currentTab = tabRefs.current[tabs.indexOf(activeTab)];
        if (currentTab) {
            const rect = currentTab.getBoundingClientRect();
            const containerRect = currentTab.parentElement.getBoundingClientRect();
            setHighlightStyle({
                width: `${rect.width}px`,
                transform: `translateX(${rect.left - containerRect.left}px)`,
            });
        }
    }, [activeTab]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target) && isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMobileMenuOpen]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768 && isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isMobileMenuOpen]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(prev => !prev);
    };

    return (
        <div className="nav-wrapper" ref={navRef}>
            <button
                className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}
                onClick={toggleMobileMenu}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
                <span className="hamburger-icon"></span>
                <span className="hamburger-icon"></span>
                <span className="hamburger-icon"></span>
            </button>
            <div className={`Nav-Tab ${isMobileMenuOpen ? 'show-mobile' : ''}`}>
                <div className="tab-highlight" style={highlightStyle}></div>
                {tabs.map((tab, index) => (
                    <button
                        key={tab}
                        ref={el => (tabRefs.current[index] = el)}
                        className={`tab ${activeTab === tab ? 'active' : ''}`}
                        onClick={() => {
                            setActiveTab(tab);
                            setIsMobileMenuOpen(false);
                        }}
                    >
                        {tab}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Navbar;
