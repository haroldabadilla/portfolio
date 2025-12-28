import { useState, useEffect } from 'react';

const AppStyles = () => (
  <style>
    {`
      /* --- Helpers --- */
      .social-link-hover {
        transition: color 0.3s ease;
      }
      .social-link-hover:hover,
      .social-link-hover:focus-visible {
        color: var(--bs-primary) !important;
      }

      .project-card-hover {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      .project-card-hover:hover,
      .project-card-hover:focus-visible,
      .project-card-hover:focus-within {
        transform: translateY(-5px);
        box-shadow: var(--bs-shadow-lg) !important;
      }

      .project-link-hover {
        transition: filter 0.2s ease-in-out;
      }
      .project-link-hover:hover,
      .project-link-hover:focus-visible {
        filter: brightness(95%);
      }

      .skill-pill-hover {
        transition: background-color 0.2s ease, transform 0.2s ease;
      }
      .skill-pill-hover:hover,
      .skill-pill-hover:focus-visible {
        background-color: var(--bs-primary-bg-subtle) !important;
        transform: translateY(-2px);
      }

      /* --- Project Media Carousel --- */
      .carousel-pillarbox {
        overflow: hidden;
        background-color: #212529;
      }
      .carousel-pillarbox-bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        filter: blur(10px);
        transform: scale(1.1);
        opacity: 0.8;
        z-index: 1;
      }
      .carousel-pillarbox-fg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: contain;
        z-index: 2;
      }
      .carousel-control-prev,
      .carousel-control-next {
        z-index: 3;
      }

      /* --- Back to Top Button --- */
      .back-to-top-btn {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 100;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: var(--bs-shadow-lg);
        transition: opacity 0.3s ease, transform 0.3s ease;
        opacity: 1;
        transform: scale(1);
      }
    `}
  </style>
);


/*
================================================================================
Helper Components
================================================================================
*/

/**
 * Renders a reusable, accessible social media link.
 * Hover/focus styles are handled by the `.social-link-hover` CSS class.
 */
const SocialLink = ({ href, 'aria-label': ariaLabel, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={ariaLabel}
    className="text-body-secondary mx-2 fs-4 text-decoration-none social-link-hover"
  >
    {children}
  </a>
);

/**
 * Renders the project media (image, video, iframe, or carousel).
 */
const ProjectMedia = ({ media, projectId }) => {
  if (!media) return null;

  // Generate a unique ID for the carousel based on the project ID
  const carouselId = `carousel-${projectId.replace(/\s+/g, '-').toLowerCase()}`;

  switch (media.type) {
    case 'image':
      return <img src={media.src} className="card-img-top" alt={media.alt || 'Project visual'} />;
    case 'video':
      return (
        <video className="card-img-top" controls autoPlay loop muted>
          <source src={media.src} type="video/mp4" />
          {/* TODO: Add <track> elements for captions to improve accessibility. */}
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
        <div
          id={carouselId}
          className="carousel slide"
          data-bs-ride="carousel"
          data-bs-pause="hover" // Accessibility: Pause on hover
        >
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
                <div className="ratio ratio-16x9 carousel-pillarbox">
                  {/* Background Blurred Image */}
                  <img
                    src={item.src}
                    className="d-block carousel-pillarbox-bg"
                    alt="" // Decorative, so alt is empty
                    aria-hidden="true"
                  />
                  {/* Foreground Contained Image */}
                  <img
                    src={item.src}
                    className="d-block carousel-pillarbox-fg"
                    alt={item.alt || `Slide ${index + 1}`}
                  />
                </div>
              </div>
            ))}
          </div>
          {/* Carousel Controls */}
          <button className="carousel-control-prev" type="button" data-bs-target={`#${carouselId}`} data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target={`#${carouselId}`} data-bs-slide="next">
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
 * Hover/focus styles are handled by the `.project-card-hover` CSS class.
 */
const ProjectCard = ({ title, description, links, tech, media }) => (
  <div className="col">
    <div
      className="card h-100 shadow-sm border-light-subtle project-card-hover"
      tabIndex="0" // Make the card container focusable
    >
      {/* Render the media at the top of the card. */}
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
                className={`btn ${index === 0 ? 'btn-primary' : 'btn-outline-primary'} d-flex align-items-center justify-content-center gap-2 shadow-sm project-link-hover`}
              >
                {/* Add an icon to the button, hidden from screen readers */}
                <i className="bi bi-box-arrow-up-right" aria-hidden="true"></i>
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
    name: "Harold Juan G. Abadilla",
    title: "Web Developer & IT Specialist",
    profileImageUrl: "images/harold-profile.jpg",
    bio: "Graduate in Information Technology with a passion for building responsive, efficient, and accessible web applications using PHP, React.js, and Bootstrap.",
    about: "I am a passionate developer with a strong foundation in both front-end and back-end technologies. My experience includes developing full-stack systems for community services, optimizing database performance, and providing technical support. I'm skilled in debugging, responsive design, and collaborating in a team environment. I'm eager to apply my skills to build modern, accessible, and impactful web solutions.",

    skills: {
      "Languages & Frameworks": [
        { name: "React.js", icon: "images/react-icon.svg" }, // Custom SVG
        { name: "C#", icon: "bi bi-c-circle" },
        { name: "JavaScript (ES6+)", icon: "bi-filetype-js" },
        { name: "PHP", icon: "bi-filetype-php" },
        { name: "Node.js", icon: "images/nodejs-icon.svg" },
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
        { name: "Figma", icon: "images/figma-icon.svg" }, // Custom SVG
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
          alt: 'InfoServe video demo'
        }
      },
      {
        title: "Neighborhub: Barangay Citizen Management System",
        description: "Engineered a web system to digitally manage resident data and streamline document processing for 28,800 residents.",
        links: [
          { label: "View Details", url: "https://github.com/haroldabadilla/BrgyCMS" }
        ],
        tech: ["PHP", "MySQL", "JavaScript", "HTML5", "CSS3", "Bootstrap", "RESTful APIs"],
        media: {
          type: 'carousel',
          items: [
            { type: 'image', src: 'images/neighborhub-1.png', alt: 'Neighborhub Slide 1' },
            { type: 'image', src: 'images/neighborhub-2.png', alt: 'Neighborhub Slide 2' },
            { type: 'image', src: 'images/neighborhub-3.png', alt: 'Neighborhub Slide 3' },
            { type: 'image', src: 'images/neighborhub-4.png', alt: 'Neighborhub Slide 4' },
            { type: 'image', src: 'images/neighborhub-5.png', alt: "Neighborhub Slide 5" },
            { type: 'image', src: 'images/neighborhub-6.png', alt: 'Neighborhub Slide 6' },
            { type: 'image', src: 'images/neighborhub-7.png', alt: 'Neighborhub Slide 7' },
            { type: 'image', src: 'images/neighborhub-8.png', alt: 'Neighborhub Slide 8' },
            { type: 'image', src: 'images/neighborhub-9.png', alt: 'Neighborhub Slide 9' },
            { type: 'image', src: 'images/neighborhub-10.png', alt: 'Neighborhub Slide 10' }
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
            { type: 'image', src: 'images/kapitbisig-1.png', alt: 'KapitBisig Slide 1' },
            { type: 'image', src: 'images/kapitbisig-2.png', alt: 'KapitBisig Slide 2' },
            { type: 'image', src: 'images/kapitbisig-3.png', alt: 'KapitBisig Slide 3' }
          ]
        }
      },
      {
        title: "Memorial Tribute Platform",
        description: "Developed a full-stack memorial site for departed loved ones using Hybrid Architecture (C# .NET & React.js).",
        links: [
          { label: "View Details", url: "https://haroldabadilla.github.io/memorial/" }
        ],
        tech: ["React.js", "C# .NET", "Cloudinary API", "JSON", "CSS3"],
        media: {
          type: 'carousel',
          items: [
            { type: 'image', src: 'images/memorial-1.png', alt: 'Memorial Tribute Slide 1' },
            { type: 'image', src: 'images/memorial-2.png', alt: 'Memorial Tribute Slide 2' },
            { type: 'image', src: 'images/memorial-3.png', alt: 'Memorial Tribute Slide 3' },
            { type: 'image', src: 'images/memorial-4.png', alt: 'Memorial Tribute Slide 4' },
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

  // Effect to manage the theme
  useEffect(() => {
    // Apply the theme to the root HTML element for Bootstrap
    document.documentElement.setAttribute('data-bs-theme', theme);
  }, [theme]); // Re-run only when theme changes

  // Effect to manage the "Back to Top" button visibility
  useEffect(() => {
    const checkScrollTop = () => {
      // Show button if scrolled down
      if (!showScroll && window.scrollY > 400) {
        setShowScroll(true);
        // Hide button if scrolled back up
      } else if (showScroll && window.scrollY <= 400) {
        setShowScroll(false);
      }
    };

    window.addEventListener('scroll', checkScrollTop);
    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('scroll', checkScrollTop);
    };
  }, [showScroll]); // Re-run only when showScroll changes

  /**
   * Scrolls the window to the top smoothly.
   */
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Toggles the theme between 'light' and 'dark'.
   */
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    // React.Fragment to wrap styles and app
    <>
      <AppStyles />

      {/* Main container with theme-aware background */}
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
                    {theme === 'light' ? (
                      <i className="bi bi-moon-fill" aria-hidden="true"></i>
                    ) : (
                      <i className="bi bi-sun-fill" aria-hidden="true"></i>
                    )}
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
                    {skills.map((skill) => {
                      const isSvgPath = typeof skill.icon === 'string' && skill.icon.endsWith('.svg');

                      return (
                        <span
                          key={skill.name}
                          className="badge fs-5 fw-normal bg-light text-dark border border-dark-subtle p-3 d-flex align-items-center rounded-pill skill-pill-hover"
                          tabIndex="0" // Make the skill pill focusable
                        >
                          {isSvgPath ? (
                            // Render SVG as a mask to inherit color
                            <i
                              className="me-2"
                              aria-hidden="true"
                              style={{
                                backgroundColor: 'currentColor', // This inherits 'text-dark'
                                width: '24px', // Set explicit size
                                height: '24px',
                                display: 'inline-block',
                                '-webkit-mask-image': `url(${skill.icon})`,
                                'mask-image': `url(${skill.icon})`,
                                '-webkit-mask-size': 'contain',
                                'mask-size': 'contain',
                                '-webkit-mask-repeat': 'no-repeat',
                                'mask-repeat': 'no-repeat',
                                '-webkit-mask-position': 'center',
                                'mask-position': 'center',
                              }}
                            ></i>
                          ) : (
                            // Render Bootstrap icon class
                            <i className={`${skill.icon} me-2`} style={{ fontSize: '1.2rem' }} aria-hidden="true"></i>
                          )}
                          {skill.name}
                        </span>
                      );
                    })}
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
                  <i className="bi bi-envelope-fill"></i>
                </SocialLink>
                <SocialLink href={portfolioData.links.github} aria-label="My GitHub profile">
                  <i className="bi bi-github"></i>
                </SocialLink>
                <SocialLink href={portfolioData.links.linkedin} aria-label="My LinkedIn profile">
                  <i className="bi bi-linkedin"></i>
                </SocialLink>
              </div>
            </div>
          </section>

          {/*
          ========================================================================
          Footer Section
          ========================================================================
          */}
          <footer className="pb-3 text-center" role="contentinfo">
            <p className="text-body-secondary small">
              Built with React, Vite, and Bootstrap.
            </p>
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
            className="btn btn-primary p-2 back-to-top-btn"
            aria-label="Go to top"
          >
            {/* Using Bootstrap Icon for the arrow */}
            <i className="bi bi-arrow-up" style={{ fontSize: '1.5rem', color: 'white' }} aria-hidden="true"></i>
          </button>
        )}
      </div>
    </>
  );
}