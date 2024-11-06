import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const calculators = [
    { name: 'Basic Calculator', path: '/basic' },
    { name: 'Age Calculator', path: '/age' },
    { name: 'BMI Calculator', path: '/bmi' },
    { name: 'Loan Calculator', path: '/loan' },
    { name: 'Salary Calculator', path: '/salary' },
    { name: 'Expense Calculator', path: '/expense' },
    { name: 'Scientific Calculator', path: '/scientific' },
    { name: 'Inflation Calculator', path: '/inflation' },
    { name: 'Gpa Calculator', path: '/gpa' },
    { name: 'Cgpa Calculator', path: '/cgpa' }
  ];

  // This function scrolls to the section or navigates to a new page
  const handleNavigation = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // This function navigates to the Contact page
  const navigateToContact = () => {
    navigate('/contact');
  };

  return (
    <nav className="navbar">
      <div className="nav-content">
        <Link to="/" className="nav-logo">CalcHub</Link>

        <div className="nav-links">
          <button onClick={() => handleNavigation('hero')} className="nav-link">Home</button>
          <button onClick={() => handleNavigation('calculators')} className="nav-link">About</button>
          <button onClick={() => handleNavigation('contact')} className="nav-link">Team</button>
          <button onClick={navigateToContact} className="nav-link">Contact Us</button>

          <div className="dropdown">
            <button className="nav-link dropdown-btn">Calculators</button>
            <div className="dropdown-content">
              {calculators.map((calc) => (
                <Link key={calc.path} to={calc.path} className="dropdown-link">
                  {calc.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="mobile-menu">
          <button onClick={() => handleNavigation('hero')} className="mobile-link">Home</button>
          <button onClick={() => handleNavigation('calculators')} className="mobile-link">About</button>
          <button onClick={() => handleNavigation('contact')} className="mobile-link">Team</button>
          <button onClick={navigateToContact} className="mobile-link">Contact Us</button>

          <div className="mobile-dropdown">
            <div className="mobile-dropdown-title">Calculators</div>
            {calculators.map((calc) => (
              <Link key={calc.path} to={calc.path} className="mobile-dropdown-link">
                {calc.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;