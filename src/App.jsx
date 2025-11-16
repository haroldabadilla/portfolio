import React, { useState, useEffect } from 'react';

/*
================================================================================
Inline SVG Icon Components
================================================================================
*/

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
  </svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401m-1.2-8.212c.792 0 1.438-.646 1.438-1.438C5.18 2.52 4.544 1.877 3.743 1.877S2.305 2.52 2.305 3.318c0 .792.646 1.438 1.438 1.438zm6.5 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4" />
  </svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 16 16">
    <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zM16 4.697v-7.104L10.197 8.83z" />
  </svg>
);

// Custom icon for React
const ReactIcon = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className={className} viewBox="0 0 24 24">
    <path d="M12 2.247a1 1 0 0 0-.623.21l-9.25 5.34a1 1 0 0 0-.377.79v10.666a1 1 0 0 0 .377.79l9.25 5.34a1 1 0 0 0 1.246 0l9.25-5.34a1 1 0 0 0 .377-.79V8.587a1 1 0 0 0-.377-.79L12.623 2.457a1 1 0 0 0-.623-.21ZM12 4.132l7.75 4.474-2.106 1.216-7.75-4.474 2.106-1.216Zm-7.75 4.474L12 13.08l-7.75-4.474Zm0 6.132l7.75 4.474v-8.948L4.25 10.264v4.474Zm9.5 4.474l7.75-4.474v-4.474L13.75 14.556v8.948Z" />
  </svg>
);

// Custom icon for Figma
const FigmaIcon = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className={className} viewBox="0 0 24 24">
    <path d="M12 24a6 6 0 0 1-6-6h6v6ZM6 12a6 6 0 0 1 6-6V0a6 6 0 0 0-6 6v6Zm0 6a6 6 0 0 1 6-6V6a6 6 0 0 0-6 6v6Zm6 0a6 6 0 0 1 6-6v-6a6 6 0 0 0-6 6v6Zm6-6a6 6 0 0 1-6 6V6a6 6 0 0 1 6 6Z" />
  </svg>
);

// Icons for Theme Toggle
const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-moon-fill" viewBox="0 0 16 16">
    <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0 2.06 4.77a7.2 7.2 0 0 0 4.77 2.06.77.77 0 0 1 .858.08.77.77 0 0 1 0 1.062a8.01 8.01 0 0 1-3.47 2.66A8.02 8.02 0 0 1 1 8.02a8.02 8.02 0 0 1 2.66-3.47A8.01 8.01 0 0 1 6 .278M4.858 1.311A.77.77 0 0 1 4.17 1.63a.77.77 0 0 1 1.062 0 .77.77 0 0 1 0 1.062.77.77 0 0 1-1.062 0 .77.77 0 0 1-.688-1.062M10.826 4.17a.77.77 0 0 1 1.062 0 .77.77 0 0 1 0 1.062.77.77 0 0 1-1.062 0 .77.77 0 0 1 0-1.062.77.77 0 0 1 .688-.08m-4.707 6.27a.77.77 0 0 1 1.062 0 .77.77 0 0 1 0 1.062.77.77 0 0 1-1.062 0 .77.77 0 0 1 0-1.062.77.77 0 0 1 .688-.08" />
  </svg>
);

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sun-fill" viewBox="0 0 16 16">
    <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707" />
  </svg>
);


/*
================================================================================
Helper Components
================================================================================
*/

/**
 * Renders a reusable, accessible social media link.
 */
const SocialLink = ({ href, 'aria-label': ariaLabel, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={ariaLabel}
    className="text-body-secondary mx-2 fs-4 text-decoration-none"
    style={{ transition: 'color 0.3s ease, opacity 0.3s ease' }}
    onMouseEnter={e => e.currentTarget.style.color = 'var(--bs-primary)'}
    onMouseLeave={e => e.currentTarget.style.color = 'var(--bs-body-secondary)'}
    onFocus={e => e.currentTarget.style.color = 'var(--bs-primary)'}
    onBlur={e => e.currentTarget.style.color = 'var(--bs-body-secondary)'}
  >
    {children}
  </a>
);

/**
 * Renders the project media (image, video, iframe, or carousel).
 */
const ProjectMedia = ({ media, projectId }) => {
  if (!media) return null;

  // Generate a unique ID for the carousel based on the project ID (title)
  const carouselId = `carousel-${projectId.replace(/\s+/g, '-').toLowerCase()}`;

  switch (media.type) {
    case 'image':
      return <img src={media.src} className="card-img-top" alt={media.alt || 'Project visual'} />;
    case 'video':
      return (
        <video className="card-img-top" controls autoPlay loop muted>
          <source src={media.src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    case 'iframe':
      return (
        <div className="ratio ratio-16x9">
          <iframe
            src={media.src}
            title={media.alt || 'Project video'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      );
    case 'carousel':
      if (!media.items || media.items.length === 0) return null;
      return (
        <div id={carouselId} className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-indicators">
            {media.items.map((_, index) => (
              <button
                key={index}
                type="button"
                data-bs-target={`#${carouselId}`}
                data-bs-slide-to={index}
                className={index === 0 ? 'active' : ''}
                aria-current={index === 0 ? 'true' : 'false'}
                aria-label={`Slide ${index + 1}`}
              ></button>
            ))}
          </div>
          <div className="carousel-inner">
            {media.items.map((item, index) => (
              <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                {/* "Echo Blur" Pillarbox Effect Wrapper */}
                <div
                  className="ratio ratio-16x9" // This div provides the 16:9 space
                  style={{
                    overflow: 'hidden',
                    backgroundColor: '#212529'
                  }}
                >
                  {/* Background Blurred Image */}
                  <img
                    src={item.src}
                    className="d-block w-100 h-100"
                    alt="" // Decorative, so alt is empty
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      objectFit: 'cover',
                      filter: 'blur(10px)',
                      transform: 'scale(1.1)',
                      opacity: 0.8,
                      zIndex: 1 // Background
                    }}
                  />
                  {/* Foreground Contained Image */}
                  <img
                    src={item.src}
                    className="d-block w-100 h-100"
                    alt={item.alt || `Slide ${index + 1}`}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      objectFit: 'contain',
                      zIndex: 2 // Foreground
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          {/* Carousel Controls */}
          <button className="carousel-control-prev" type="button" data-bs-target={`#${carouselId}`} data-bs-slide="prev" style={{ zIndex: 3 }}>
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target={`#${carouselId}`} data-bs-slide="next" style={{ zIndex: 3 }}>
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      );
    default:
      return null;
  }
};

/**
 * Renders a single Project Card.
 */
const ProjectCard = ({ title, description, links, tech, media }) => (
  <div className="col">
    <div
      className="card h-100 shadow-sm border-light-subtle"
      style={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = 'var(--bs-shadow-lg)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'var(--bs-shadow-sm)';
      }}
      onFocus={e => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = 'var(--bs-shadow-lg)';
      }}
      onBlur={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'var(--bs-shadow-sm)';
      }}
      tabIndex="0" // Make the card focusable for accessibility
    >
      {/* Render the media at the top of the card. Pass title as projectId for carousel */}
      <ProjectMedia media={media} projectId={title} />

      <div className="card-body d-flex flex-column">
        <h5 className="card-title fw-bold">{title}</h5>
        <p className="card-text text-body-secondary">{description}</p>
        <div className="mt-auto">
          <p className="fw-semibold mb-2">Technologies Used:</p>
          <div className="d-flex flex-wrap gap-2 mb-3">
            {tech.map((item) => (
              <span key={item} className="badge bg-light text-dark border border-dark-subtle">
                {item}
              </span>
            ))}
          </div>
          {/* Render multiple links as buttons */}
          <div className="d-flex flex-wrap gap-2">
            {links.map((link, index) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                // Differentiate button styles: first is primary, others are outline
                className={`btn ${index === 0 ? 'btn-primary' : 'btn-outline-primary'} d-flex align-items-center justify-content-center gap-2 shadow-sm`}
                style={{ transition: 'filter 0.2s ease-in-out' }}
                onMouseEnter={e => e.currentTarget.style.filter = 'brightness(95%)'}
                onMouseLeave={e => e.currentTarget.style.filter = 'brightness(100%)'}
              >
                {/* Add an icon to the button */}
                <i className="bi bi-box-arrow-up-right"></i>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

/**
 * ==============================================================================
 * Main App Component
 * ==============================================================================
 * This is the main portfolio component.
 * All portfolio data is centralized in the `portfolioData` object.
 */
export default function App() {
  // --- Portfolio Data Configuration ---
  const portfolioData = {
    name: "Harold Juan Granado Abadilla",
    title: "Web Developer & IT Specialist",
    profileImageUrl: "/images/harold-profile.jpg",
    bio: "Graduate in Information Technology with a passion for building responsive, efficient, and accessible web applications using PHP, React.js, and Bootstrap.",
    about: "I am a passionate developer with a strong foundation in both front-end and back-end technologies. My experience includes developing full-stack systems for community services, optimizing database performance, and providing technical support. I'm skilled in debugging, responsive design, and collaborating in a team environment. I'm eager to apply my skills to build modern, accessible, and impactful web solutions.",

    skills: {
      "Languages & Frameworks": [
        { name: "React.js", icon: ReactIcon },
        { name: "JavaScript (ES6+)", icon: "bi-filetype-js" },
        { name: "PHP", icon: "bi-filetype-php" },
        { name: "HTML5", icon: "bi-filetype-html" },
        { name: "CSS3", icon: "bi-filetype-css" },
        { name: "Bootstrap", icon: "bi-bootstrap" }
      ],
      "Database & API": [
        { name: "MySQL", icon: "bi-database" },
        { name: "RESTful APIs", icon: "bi-braces-asterisk" }
      ],
      "Tools": [
        { name: "Git", icon: "bi-git" },
        { name: "GitHub", icon: "bi-github" },
        { name: "Figma", icon: FigmaIcon },
        { name: "VS Code", icon: "bi-code-slash" },
        { name: "XAMPP", icon: "bi-server" }
      ],
      "Strengths": [
        { name: "Responsive Web Design", icon: "bi-phone-flip" },
        { name: "Debugging", icon: "bi-bug" },
        { name: "Troubleshooting", icon: "bi-tools" },
        { name: "Code Reviews", icon: "bi-search" },
        { name: "Documentation", icon: "bi-file-earmark-text" }
      ]
    },

    projects: [
      {
        title: "InfoServe: Integrated Barangay Information System",
        description: "Designed and developed a full-stack multiplatform system for barangay citizen services, including a mobile version built with React.",
        links: [
          { label: "View Web App", url: "https://github.com/InfoServe-Services/InfoServe" },
          { label: "View React.js App", url: "https://github.com/haroldabadilla/InfoServeAndroid" }
        ],
        tech: ["PHP", "MySQL", "JavaScript", "React.js", "Angular", "Bootstrap", "RESTful APIs"],
        media: {
          type: 'iframe',
          src: 'https://youtube.com/embed/VgGG1n4Pad0',
          alt: 'KapitBisig video demo'
        }
      },
      {
        title: "Neighborhub: Barangay Citizen Management System",
        description: "Engineered a web system to digitally manage resident data and streamline document processing for 28,800 residents.",
        links: [
          { label: "View Details", url: "https://github.com/haroldabadilla/BrgyCMS" }
        ],
        tech: ["PHP", "MySQL", "JavaScript", "HTML5", "CSS3", "Bootstrap"],
        media: {
          type: 'carousel',
          items: [
            { type: 'image', src: '/images/neighborhub-1.png', alt: 'Neighborhub Slide 1' },
            { type: 'image', src: '/images/neighborhub-2.png', alt: 'Neighborhub Slide 2' },
            { type: 'image', src: '/images/neighborhub-3.png', alt: 'Neighborhub Slide 3' },
            { type: 'image', src: '/images/neighborhub-4.png', alt: 'Neighborhub Slide 4' },
            { type: 'image', src: '/images/neighborhub-5.png', alt: "Neighborhub Slide 5" },
            { type: 'image', src: '/images/neighborhub-6.png', alt: 'Neighborhub Slide 6' },
            { type: 'image', src: '/images/neighborhub-7.png', alt: 'Neighborhub Slide 7' },
            { type: 'image', src: '/images/neighborhub-8.png', alt: 'Neighborhub Slide 8' },
            { type: 'image', src: '/images/neighborhub-9.png', alt: 'Neighborhub Slide 9' },
            { type: 'image', src: '/images/neighborhub-10.png', alt: 'Neighborhub Slide 10' }
          ]
        }
      },
      {
        title: "KapitBisig HOA Web System",
        description: "Developed a full-stack web system for HOA community services, featuring an interactive resident map.",
        links: [
          { label: "View Details", url: "https://github.com/haroldabadilla/subdivision-database" }
        ],
        tech: ["PHP", "MySQL", "JavaScript", "HTML5", "CSS3", "Bootstrap", "RESTful APIs"],
        media: {
          type: 'carousel',
          items: [
            { type: 'image', src: 'https://placehold.co/600x400/0d6efd/white?text=InfoServe+Slide+1', alt: 'KapitBisig Slide 1' },
            { type: 'image', src: 'https://placehold.co/600x400/0d6efd/white?text=InfoServe+Slide+2', alt: 'KapitBisig Slide 2' },
            { type: 'image', src: 'https://placehold.co/600x400/0d6efd/white?text=InfoServe+Slide+3', alt: 'KapitBisig Slide 3' }
          ]
        }
      },
    ],
    links: {
      email: "mailto:haroldabadilla02@gmail.com",
      linkedin: "https://www.linkedin.com/in/harold-juan-abadilla-0356aa293/",
      github: "https://github.com/haroldabadilla",
    },
  };

  // State for the theme (light/dark)
  const [theme, setTheme] = useState('light');
  // State for the "Back to Top" button visibility
  const [showScroll, setShowScroll] = useState(false);

  // Effect to manage side-effects for theme and scroll
  useEffect(() => {
    // Apply the theme to the root HTML element for Bootstrap
    document.documentElement.setAttribute('data-bs-theme', theme);

    // This effect checks scroll position for the "Back to Top" button
    const checkScrollTop = () => {
      if (!showScroll && window.scrollY > 400) {
        setShowScroll(true);
      } else if (showScroll && window.scrollY <= 400) {
        setShowScroll(false);
      }
    };

    window.addEventListener('scroll', checkScrollTop);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('scroll', checkScrollTop);
    };
  }, [theme, showScroll]); // Re-run effect when theme or showScroll changes

  // Function to scroll to the top smoothly
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Function to toggle the theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    // Main container with theme-aware background
    <div
      className="bg-body-tertiary min-vh-100"
      style={{
        fontFamily: "'Poppins', sans-serif",
        scrollPaddingTop: '100px' // Fix for navbar obscuring content
      }}
      // Add Bootstrap scrollspy attributes
      data-bs-spy="scroll"
      data-bs-target="#portfolio-navbar"
      data-bs-offset="100"
      tabIndex="0"
    >
      {/*
      ========================================================================
      Navigation Bar
      ========================================================================
      */}
      <nav id="portfolio-navbar" className="navbar navbar-expand-lg bg-body sticky-top shadow-sm">
        <div className="container-md">
          <a className="navbar-brand fw-bold" href="#home">{portfolioData.name}</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
              <li className="nav-item">
                <a className="nav-link" href="#home">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#skills">Skills</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#projects">Projects</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">Contact</a>
              </li>
              <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
                <button
                  className="btn btn-outline-secondary d-flex align-items-center"
                  onClick={toggleTheme}
                  aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
                >
                  {theme === 'light' ? <MoonIcon /> : <SunIcon />}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Content wrapper: centered and responsive */}
      <main className="container-md py-5 px-3">
        {/*
        ========================================================================
        Hero/Home Section
        ========================================================================
        */}
        <section id="home" className="mb-5" aria-labelledby="hero-heading">
          <div className="bg-body p-4 p-md-5 rounded-3 shadow-sm border-light-subtle">
            <div className="row align-items-center">
              <div className="col-lg-3 text-center mb-4 mb-lg-0">
                <img
                  src={portfolioData.profileImageUrl}
                  className="img-fluid rounded-circle shadow-sm"
                  alt="Harold Juan Granado Abadilla"
                  style={{ maxWidth: '200px', border: '5px solid var(--bs-primary-bg-subtle)' }}
                  onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/200x200/0d6efd/white?text=Harold'; }}
                />
              </div>
              <div className="col-lg-9">
                <h1 id="hero-heading" className="display-4 fw-bold mb-3">
                  {portfolioData.name}
                </h1>
                <p className="h4 text-body-secondary mb-4">
                  {portfolioData.title}
                </p>
                <p className="lead text-body-secondary">
                  {portfolioData.bio}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/*
        ========================================================================
        About Section
        ========================================================================
        */}
        <section id="about" className="mb-5" aria-labelledby="about-heading">
          <div className="bg-body p-4 p-md-5 rounded-3 shadow-sm border-light-subtle">
            <h2 id="about-heading" className="h3 fw-bold mb-3">
              About Me
            </h2>
            <p className="text-body-secondary">
              {portfolioData.about}
            </p>
          </div>
        </section>


        {/*
        ========================================================================
        Skills Section
        ========================================================================
        */}
        <section id="skills" className="mb-5" aria-labelledby="skills-heading">
          <h2 id="skills-heading" className="h3 fw-bold mb-4">
            Technical Skills
          </h2>
          {/* Map over the categories */}
          {Object.entries(portfolioData.skills).map(([category, skills]) => (
            <div key={category} className="card shadow-sm border-light-subtle mb-4">
              <div className="card-header bg-body border-0 p-3">
                <h3 className="h5 fw-semibold text-body-secondary mb-0">{category}</h3>
              </div>
              <div className="card-body">
                <div className="d-flex flex-wrap gap-3">
                  {/* Map over the skills in each category */}
                  {skills.map((skill) => (
                    <span
                      key={skill.name}
                      className="badge fs-5 fw-normal bg-light text-dark border border-dark-subtle p-3 d-flex align-items-center rounded-pill"
                      style={{ transition: 'background-color 0.2s ease, transform 0.2s ease' }}
                      onMouseEnter={e => {
                        e.currentTarget.style.backgroundColor = 'var(--bs-primary-bg-subtle)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.backgroundColor = 'var(--bs-light)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                      onFocus={e => {
                        e.currentTarget.style.backgroundColor = 'var(--bs-primary-bg-subtle)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onBlur={e => {
                        e.currentTarget.style.backgroundColor = 'var(--bs-light)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                      tabIndex="0" // Make the skill pill focusable
                    >
                      {/* Render icon based on type (string for BS, component for custom) */}
                      {typeof skill.icon === 'string' ? (
                        <i className={`${skill.icon} me-2`} style={{ fontSize: '1.2rem' }}></i>
                      ) : (
                        React.createElement(skill.icon, { className: "me-2" })
                      )}
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </section>

        {/*
        ========================================================================
        Projects Section
        ========================================================================
        */}
        <section id="projects" className="mb-5" aria-labelledby="projects-heading">
          <h2 id="projects-heading" className="h3 fw-bold mb-4">
            Key Projects
          </h2>
          <div className="row row-cols-1 row-cols-md-2 g-4">
            {portfolioData.projects.map((project) => (
              <ProjectCard
                key={project.title}
                title={project.title}
                description={project.description}
                links={project.links}
                tech={project.tech}
                media={project.media}
              />
            ))}
          </div>
        </section>

        {/*
        ========================================================================
        Contact Section
        ========================================================================
        */}
        <section id="contact" className="mb-5" aria-labelledby="contact-heading">
          <div className="bg-body p-4 p-md-5 rounded-3 shadow-sm border-light-subtle text-center">
            <h2 id="contact-heading" className="h4 fw-bold mb-3">
              Get in Touch
            </h2>
            <div className="mb-3">
              <SocialLink href={portfolioData.links.email} aria-label="Email me">
                <MailIcon />
              </SocialLink>
              <SocialLink href={portfolioData.links.github} aria-label="My GitHub profile">
                <GithubIcon />
              </SocialLink>
              <SocialLink href={portfolioData.links.linkedin} aria-label="My LinkedIn profile">
                <LinkedinIcon />
              </SocialLink>
            </div>
          </div>
        </section>

        {/*
        ========================================================================
        Footer Section (Copyright Only)
        ========================================================================
        */}
        <footer className="pb-3 text-center">
          <p className="text-body-secondary small">
            © {new Date().getFullYear()} {portfolioData.name}. All rights reserved.
          </p>
        </footer>
      </main>

      {/*
      ========================================================================
      Back to Top Button
      ========================================================================
      */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="btn btn-primary p-2"
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 100,
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--bs-shadow-lg)',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
            opacity: 1,
            transform: 'scale(1)'
          }}
          aria-label="Go to top"
        >
          {/* Using Bootstrap Icon for the arrow */}
          <i className="bi bi-arrow-up" style={{ fontSize: '1.5rem', color: 'white' }}></i>
        </button>
      )}
    </div>
  );
}