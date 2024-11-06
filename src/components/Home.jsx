import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Github, MessageCircle } from 'lucide-react';
import './Home.css';
import { useLocation } from 'react-router-dom';

const Home = () => {

  const calculators = [
    {
      name: 'Basic Calculator',
      path: '/basic',
      description: 'Perform basic mathematical operations with ease',
      icon: '🔢'
    },
    {
      name: 'Age Calculator',
      path: '/age',
      description: 'Calculate exact age between two dates',
      icon: '📅'
    },
    {
      name: 'BMI Calculator',
      path: '/bmi',
      description: 'Calculate your Body Mass Index',
      icon: '⚖️'
    },
    {
      name: 'Loan Calculator',
      path: '/loan',
      description: 'Calculate loan payments and interest',
      icon: '💰'
    },
    {
      name: 'Salary Calculator',
      path: '/salary',
      description: 'Calculate take-home pay after taxes',
      icon: '💵'
    },
    {
      name: 'Expense Calculator',
      path: '/expense',
      description: 'Track and calculate your expenses',
      icon: '📊'
    },
    {
      name: 'Scientific Calculator',
      path: '/scientific',
      description: 'Advanced mathematical calculations',
      icon: '🔬'
    },
    {
      name: 'Inflation Calculator',
      path: '/inflation',
      description: 'Calculate inflation impact on money value',
      icon: '📈'
    },
    {
      name: 'Gpa Calculator',
      path: '/gpa',
      description: 'Calculate your GPA',
      icon: '📚'
    },
    {
      name: 'CGPA Calculator',
      path: '/cgpa',
      description: 'Calculate your CGPA across multiple semesters',
      icon: '🎓'
    }

  ];

  const team = [
    {
      name: "Saad Shakeel",
      whatsapp: "wa.me/923208042513",
      linkedin: "www.linkedin.com/in/saad-shakeel-419063259/",
      github: "github.com/saadshakeel04"
    },
    {
      name: "Laiba Tauseef",
      whatsapp: "wa.me/923343058356",
      linkedin: "www.linkedin.com/in/laiba-siddiqui-8459772b1/",
      github: "github.com/laibasidd"
    },
    {
      name: "Ali Asghar",
      whatsapp: "wa.me/923229706992",
      linkedin: "www.linkedin.com/in/aliasghar-here/",
      github: "github.com/Aliasgharcoder"
    }];

    const location = useLocation();

    const heroRef = useRef(null);
    const calculatorsRef = useRef(null);
    const contactRef = useRef(null);
  
    // Use Intersection Observer to detect scroll position
    useEffect(() => {
      const sections = [heroRef.current, calculatorsRef.current, contactRef.current];
  
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Stop observing once the animation has been triggered
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 }); // Trigger animation when 30% of the section is visible
  
      sections.forEach((section) => {
        if (section) observer.observe(section);
      });
  
      return () => {
        sections.forEach((section) => {
          if (section) observer.unobserve(section);
        });
      };
    }, []);
  

    useEffect(() => {
      if (location.state?.scrollTo) {
        const element = document.getElementById(location.state.scrollTo);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
        window.history.replaceState({}, document.title);
      }
    }, [location]);

  return (
    <div className="home">
      <section ref={heroRef} id="hero" className="hero">
        <h1>Your Ultimate Calculator Hub</h1>
        <p>Access a comprehensive suite of calculators for all your mathematical needs. From basic arithmetic to complex financial calculations, we've got you covered.</p>
        <a href="#calculators" class="cta-button">
  Explore Calculators
</a>
      </section>

      <section ref={calculatorsRef} id="calculators" className="calculators">
        <h2>Our Calculators</h2>
        <div className="calculator-grid">
          {calculators.map((calc) => (
            <Link key={calc.path} to={calc.path} className="calculator-card">
              <div className="calculator-icon">{calc.icon}</div>
              <h3>{calc.name}</h3>
              <p>{calc.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section ref={contactRef} id="contact" className="contact">
        <h2>Our Team</h2>
        <div className="team-grid">
          {team.map((person) => (
            <div key={person.name} className="team-member">
              <h3>{person.name}</h3>
              <div className="social-links">
                <a href={person.whatsapp} target="_blank" rel="noopener noreferrer" className="social-link">
                  <MessageCircle size={24} />
                </a>
                <a href={`https://${person.linkedin}`} target="_blank" rel="noopener noreferrer" className="social-link">
                  <Linkedin size={24} />
                </a>
                <a href={`https://${person.github}`} target="_blank" rel="noopener noreferrer" className="social-link">
                  <Github size={24} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
