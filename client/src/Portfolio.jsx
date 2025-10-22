import React, { useState, useEffect, useCallback, useRef } from 'react';

// --- GLOBAL CONFIG & DYNAMIC CONTENT MAPPING ---

// Helper function to simulate Admin Panel data fetching (All content is centralized here)
const PortfolioData = {
  hero: {
    title: "DevWithKaran: The Project Catalyst.",
    subtitleTyping: " Innovation, Design, Development & Launch.",
    // The image path for the Hero section, now dynamic (Placeholder for your image)
    imageSrc: "/karan.jpg",
    imageAlt: "Karan - Freelance Software Developer",
    languages: ['React', 'Node.js', 'Tailwind CSS', 'Express.js', 'Java', 'Python', 'C/C++', 'PHP', 'CodeIgniter', 'SQL', 'NoSQL'],
  },
  loader: {
    // URL for the logo used in the loading screen spinner
    logoUrl: "/karan_freelancing_logo.svg",
    welcomeMessages: ['Welcome', 'Bienvenue', 'Willkommen', 'ようこそ', 'Bonjour', '환영합니다', 'नमस्कार', '¡Bienvenido', '欢迎', 'स्वागत है'],
  },
  about: {
    sectionTitle: "About Karan",
    introText: "I'm Karan, a dedicated Project Catalyst specializing in the **MERN Stack & PHP Development**. My mission is to transform complex ideas into beautifully executed, high-performance web applications. I deliver **clean, scalable code** designed for seamless user experience.",
    mainText: "My work is defined by precision and speed. I bring the latest in component architecture and state management to every engagement, ensuring your product is future-proof and scalable from day one.",
    metrics: [
      { value: "2+", label: "Years Experience", style: 'border-[var(--accent-blue)] shadow-xl z-20 transition-transform duration-300 hover:translate-x-2' },
      { value: "5+", label: "Projects Launched", style: 'border-gray-700/50 shadow-lg z-10 transition-transform duration-300 hover:-translate-x-2' },
      { value: "98%", label: "Client Satisfaction", style: 'border-gray-700/50 shadow-md transition-transform duration-300 hover:translate-y-2' },
    ]
  },
  skills: [
    { name: 'React', icon: '⚛️', detail: "Modern component-based architecture, reusable UI components, and server-side rendering optimization." },
    { name: 'Tailwind CSS', icon: '🎨', detail: "Utility-first CSS framework for rapid, responsive, and consistent UI design." },
    { name: 'Node.js & Express', icon: '⚙️', detail: "High-performance, non-blocking backend APIs and server-side application development." },
    { name: 'PHP', icon: '🐘', detail: "Server-side scripting for dynamic, scalable, and robust web applications." },
    { name: 'Java', icon: '☕', detail: "Object-oriented programming, strong type safety, and enterprise-grade application development." },
    { name: 'C/C++', icon: '💻', detail: "Low-level programming, memory management, and high-performance system development." },
    { name: 'Python', icon: '🐍', detail: "Versatile language for web development, automation, scripting, and data analysis." },
    { name: 'Database (SQL & NoSQL)', icon: '💾', detail: "Design, integration, and optimization of relational (PostgreSQL, MySQL) and NoSQL (MongoDB) databases." },
  ],

  services: [
    {
      title: "Web Development",
      description: "Designing scalable, decoupled backends (Node/Express, PHP) and integrated frontends (React, Tailwind CSS) for high-performance web applications.",
      icon: "💻"
    },
    {
      title: "Application Development",
      description: "Building responsive, user-friendly web and mobile applications with clean, maintainable, and high-performance code.",
      icon: "⚡"
    },
    {
      title: "Blockchain Development",
      description: "Developing secure, decentralized applications and smart contracts with modern blockchain technologies.",
      icon: "⛓️"
    },
    {
      title: "Cloud Deployment & CI/CD",
      description: "Automating deployment pipelines and managing cloud infrastructure using Vercel, Netlify, AWS, or GCP for seamless delivery.",
      icon: "☁️"
    },
  ],

  projects: [
    {
      title: "DeepFake Detection Using Multi-Modal (Deep Learning)",
      description: "A high-performance, SEO-friendly e-commerce frontend built using Next.js and Tailwind CSS, integrated with a GraphQL API for rapid inventory updates.",
      tech: ["React.js", "Node.js", "Tailwind CSS", "Python", "FastAPI", "CNN + LSTM model"],
      imageSrc: "https://placehold.co/600x400/1e1e1e/00E5FF?text=E-Commerce+Showcase",
      link: "https://github.com/Karan7385/deepfake_detection.git"
    },
    {
      title: "Meat On james | Online Meat Shop (Austrailian Client)",
      description: "A full-stack application featuring real-time document editing and multi-user presence, powered by Node.js, WebSockets, and Firestore for rapid persistence.",
      tech: ["HTML", "CSS", "JavaScript", "PHP", "CodeIgniter", "MySQL"],
      imageSrc: "https://placehold.co/600x400/1e1e1e/00E5FF?text=Real-Time+Editor+App",
      link: "#"
    },
    {
      title: "Gazetteer | An Geographical educational Website (UK Client)",
      description: "Developed and deployed a robust API layer for managing microservices, ensuring high availability, security, and low latency for enterprise clients.",
      tech: ["HTML", "CSS", "JavaScript", "MySQL", "Leaflet.js", "PHP"],
      imageSrc: "https://github.com/Karan7385/Gazetteer.git",
      link: "#"
    },
  ],
  testimonials: [
    { quote: "Karan's speed and quality were unmatched. He transformed our slow legacy application into a Next.js powerhouse, hitting 95+ PageSpeed scores.", client: "Jane Doe, CTO @ InnovateTech" },
    { quote: "The architectural guidance provided was invaluable. Our new API gateway scales seamlessly under heavy load, saving us thousands in infrastructure costs.", client: "Alex Chen, Lead Engineer @ ScaleUp Co." },
  ],
  insights: [
    { date: "Aug 20", title: "Why Next.js is the New Enterprise Standard", summary: "A deep dive into server components, caching strategies, and how to harness the app router for scalability..." },
    { date: "Aug 21", title: "Mastering Tailwind: Custom Utility Classes", summary: "Learn how to extend Tailwind's configuration to create ultra-specific, repeatable component styles efficiently..." },
    { date: "Aug 22", title: "Node.js Performance: Async vs. Worker Threads", summary: "A comparison of event loop blocking and how to effectively delegate CPU-intensive tasks using Worker Threads..." },
  ],
  contact: {
    sectionTitle: "Ready to Launch?",
    subtitle: "Let's build something exceptional together. I'm actively seeking challenging freelance opportunities.",
    email: "your.email@example.com",
    buttonText: "CONTACT DEVWITHKARAN",
    socialLinks: [
      { name: "LinkedIn", url: "www.linkedin.com/in/vishwakarmakaran" },
      { name: "GitHub", url: "https://github.com/Karan7385/" },
    ]
  }
};

// Remove 'insights' from navigation for the updated structure
const navLinks = ['home', 'about', 'skills', 'services', 'projects', 'testimonials', 'contact'];

// Split title once for the hero animation
const HERO_TITLE_SPLIT = PortfolioData.hero.title.split(" ");
const WELCOME_MESSAGES = PortfolioData.loader.welcomeMessages;
const LANGUAGES = PortfolioData.hero.languages;

// --- CUSTOM CSS FOR COMPLEX CYBER-GLASS DESIGN & REUSABLE SCROLL ANIMATIONS ---
const customStyles = `
/* Theme: Cyber-Glass Dark, Layered, High-Contrast */
:root {
  --bg-dark: #0A0A0A; 
  --card-bg-transparent: rgba(26, 26, 26, 0.8); /* Base transparency for glass effect */
  --accent-blue: #00E5FF; /* Brighter Cyan Accent */
  --text-light: #F3F4F6;
  --shadow-blue-strong: rgba(0, 229, 255, 0.9);
  --shadow-layer-1: 0 0 10px rgba(0, 229, 255, 0.3);
  --shadow-layer-2: 0 0 25px rgba(0, 229, 255, 0.5);
  --shadow-layer-3: 0 0 50px rgba(0, 229, 255, 0.7);
}

/* Base Body Styling and Background Grid */
.animated-grid {
  background-color: var(--bg-dark);
  background-image: 
    linear-gradient(to right, rgba(0, 229, 255, 0.1) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0, 229, 255, 0.1) 1px, transparent 1px),
    radial-gradient(circle at 10% 90%, rgba(0, 229, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 90% 10%, rgba(0, 229, 255, 0.1) 0%, transparent 50%);
  background-size: 50px 50px, 50px 50px, 100% 100%, 100% 100%;
  animation: grid-move 60s linear infinite;
  perspective: 1000px; /* Crucial for 3D transforms */
}

/* 1. Scroll Animation Control (Reusable) */
@keyframes fade-in-scale-up {
  from { opacity: 0; transform: translateY(50px) scale(0.9); filter: blur(10px); }
  to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
}

.animate-on-scroll {
  opacity: 0;
  transition: opacity 0.6s, transform 0.6s, filter 0.6s;
}
.in-view-enter {
  animation: fade-in-scale-up 1s cubic-bezier(0.2, 0.6, 0.4, 1) forwards;
}

/* 2. Loader Specific CSS */
.welcome-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--bg-dark);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  transition: opacity 1s ease-in-out;
}
.fade-out {
  opacity: 0;
  pointer-events: none;
}
@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
@keyframes pulse-neon {
    0% { box-shadow: 0 0 10px var(--shadow-blue-strong), inset 0 0 10px var(--shadow-blue-strong); }
    50% { box-shadow: 0 0 40px var(--shadow-blue-strong), inset 0 0 40px var(--shadow-blue-strong); }
    100% { box-shadow: 0 0 10px var(--shadow-blue-strong), inset 0 0 10px var(--shadow-blue-strong); }
}
/* Keyframe for smooth text cycling */
@keyframes text-cycle-in {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

.welcome-text {
    animation: text-cycle-in 0.4s ease-out forwards;
    color: var(--accent-blue);
    text-shadow: 0 0 15px var(--shadow-blue-strong); 
}

.loader-ring { 
    width: 200px; 
    height: 200px; 
    animation: pulse-neon 4s infinite alternate; 
}

.spinner-border {
  border: 5px solid rgba(243, 244, 246, 0.1); 
  border-top: 5px solid var(--accent-blue); 
  animation: spin 1s cubic-bezier(0.5, 0.0, 0.5, 1.0) infinite; 
}
/* End Loader Specific CSS */


/* 3. Complex Skill Chip Design */
.skill-chip-complex {
    position: relative;
    background: var(--card-bg-transparent);
    border: 1px solid rgba(0, 229, 255, 0.2);
    backdrop-filter: blur(8px); 
    box-shadow: 0 0 15px rgba(0, 229, 255, 0.2);
    transition: all 0.5s ease-in-out;
    transform-style: preserve-3d;
}
.skill-chip-complex::before {
    content: '';
    position: absolute;
    inset: 0;
    margin: -2px; 
    border: 3px solid transparent;
    background: linear-gradient(135deg, var(--accent-blue) 0%, rgba(0, 229, 255, 0) 50%, var(--accent-blue) 100%) border-box;
    mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
    z-index: -1;
    opacity: 0.3;
    transition: opacity 0.5s;
}
.skill-chip-complex:hover {
    transform: rotateX(5deg) rotateY(-5deg) translateZ(10px); 
    box-shadow: 0 20px 50px var(--shadow-blue-strong);
}
.skill-chip-complex:hover::before {
    opacity: 1;
    animation: pulse-neon 4s infinite alternate;
}
.skill-chip-detail {
    max-height: 0;
    opacity: 0;
    transition: max-height 0.5s ease-in-out, opacity 0.5s;
}
.skill-chip-complex:hover .skill-chip-detail {
    max-height: 150px; 
    opacity: 1;
}

/* 4. Layered Project Card Design */
.project-card-complex {
    background: var(--card-bg-transparent);
    backdrop-filter: blur(15px);
    border: 2px solid rgba(0, 229, 255, 0.4);
    box-shadow: var(--shadow-layer-1), 0 0 10px rgba(0, 229, 255, 0.5) inset;
    transition: all 0.6s cubic-bezier(0.2, 0.8, 0.4, 1.2);
    transform-style: preserve-3d;
}
.project-card-complex:hover {
    transform: perspective(1000px) rotateY(-2deg) translateZ(20px);
    box-shadow: var(--shadow-layer-2), var(--shadow-layer-3);
    border-color: var(--accent-blue);
}
.project-card-image-wrap {
    transform: translateZ(10px); 
    transition: transform 0.6s;
}
.project-card-complex:hover .project-card-image-wrap {
    transform: translateZ(30px) scale(1.02);
}

/* 5. Section Header Scanline/Glow Effect */
.header-scanline {
    position: relative;
    text-shadow: 0 0 10px rgba(0, 229, 255, 0.5);
}
.header-scanline::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(to right, transparent, var(--accent-blue), transparent);
    box-shadow: 0 0 25px var(--shadow-blue-strong);
    animation: pulse-glow 3s infinite alternate;
}
@keyframes pulse-glow {
    from { opacity: 0.7; width: 60px; }
    to { opacity: 1; width: 100px; }
}

/* 6. Contact Modal Specific Styles (UPDATED ANIMATION) */

/* Keyframes for the digital glitch entry animation */
@keyframes modal-entry-glitch {
    0% { 
        opacity: 0; 
        transform: rotateX(90deg) scale(0.8); 
        filter: brightness(3) contrast(2); /* Flash effect */
    }
    50% {
        opacity: 1;
        filter: brightness(1.5) contrast(1.5);
    }
    100% { 
        opacity: 1; 
        transform: rotateX(0deg) scale(1);
        filter: brightness(1) contrast(1); 
    }
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9); 
    backdrop-filter: blur(8px);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    visibility: hidden;
    /* Transition set to be slightly longer for drama */
    transition: opacity 0.4s ease-in-out, visibility 0s 0.4s; 
    perspective: 1000px; /* Enable 3D transitions */
}
.modal-overlay.open { 
    opacity: 1; 
    visibility: visible;
    transition: opacity 0.4s ease-in-out;
}

.modal-content-glass {
    position: relative;
    width: 95%;
    max-width: 600px;
    background: var(--card-bg-transparent);
    border: 3px solid var(--accent-blue);
    border-radius: 8px;
    box-shadow: 0 0 50px rgba(0, 229, 255, 0.7);
    padding: 2rem;
    /* Set origin for 3D rotation */
    transform-origin: center top; 
}
.modal-overlay.open .modal-content-glass {
    /* Apply the new dramatic animation */
    animation: modal-entry-glitch 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

.form-input-cyber {
    background-color: rgba(0, 0, 0, 0.8);
    border: 1px solid rgba(0, 229, 255, 0.5);
    color: white;
    box-shadow: 0 0 8px rgba(0, 229, 255, 0.3) inset;
    transition: border-color 0.3s, box-shadow 0.3s;
    font-family: 'Inter', monospace;
    width: 100%;
    padding: 0.75rem;
    border-radius: 4px;
}
.form-input-cyber:focus {
    outline: none;
    border-color: var(--accent-blue);
    box-shadow: 0 0 15px rgba(0, 229, 255, 0.7) inset;
}
.close-button-neon {
    transition: color 0.3s, transform 0.3s, opacity 0.3s;
}
.close-button-neon:hover {
    color: var(--accent-blue);
    transform: scale(1.1) rotate(10deg);
    opacity: 1;
}
/* End Contact Modal Specific Styles */

/* 7. Nav Bar Scrolled Style (ENHANCED) */
.scrolled-nav-active {
    background-color: rgba(10, 10, 10, 0.95);
    backdrop-filter: blur(15px);
    border-bottom: 2px solid var(--accent-blue);
    box-shadow: 0 0 40px rgba(0, 229, 255, 0.5); /* Stronger glow shadow */
}

.nav-link-active::after {
    /* Enhanced active link effect */
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: var(--accent-blue);
    box-shadow: 0 0 10px var(--shadow-blue-strong);
}
`;

const globalStyles = `
    :root {
        --dark-bg: #111827; /* Tailwind gray-900 */
        --accent-pink: #ec4899; /* Tailwind pink-500 */
        --accent-blue: #3b82f6; /* Tailwind blue-500 */
        --shadow-blue-light: rgba(59, 130, 246, 0.4);
        --shadow-blue-strong: rgba(59, 130, 246, 0.8);
        --shadow-pink: rgba(236, 72, 153, 0.6);
        --input-border: #374151; /* Tailwind gray-700 */
    }

    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(8px);
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
        z-index: 50;
    }

    .modal-overlay.open {
        opacity: 1;
        visibility: visible;
    }

    .modal-content-glass {
        background: rgba(31, 41, 55, 0.85); /* Tailwind gray-800 with transparency */
        border: 2px solid var(--accent-pink);
        box-shadow: 0 0 50px var(--shadow-pink), 0 0 20px var(--shadow-blue-light);
        padding: 2.5rem;
        border-radius: 0.5rem;
        max-width: 90%;
        width: 500px;
        position: relative;
        transform: translateY(-50px);
        opacity: 0;
        transition: transform 0.4s ease, opacity 0.4s ease;
    }

    .modal-overlay.open .modal-content-glass {
        transform: translateY(0);
        opacity: 1;
    }

    .form-input-cyber {
        width: 100%;
        padding: 0.75rem;
        background: #1f2937; /* Tailwind gray-800 */
        border: 1px solid var(--input-border);
        color: white;
        font-family: monospace;
        border-radius: 0.375rem;
        box-shadow: inset 0 1px 3px rgba(0,0,0,0.5);
        transition: border-color 0.2s, box-shadow 0.2s;
    }

    .form-input-cyber:focus {
        border-color: var(--accent-blue);
        outline: none;
        box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
    }
    
    .close-button-neon {
        text-shadow: 0 0 5px var(--accent-pink), 0 0 10px var(--accent-pink);
    }
    .close-button-neon:hover {
        opacity: 1;
        text-shadow: 0 0 10px var(--accent-blue), 0 0 20px var(--accent-blue);
    }
`;

// --- COMPONENTS ---

// Skill Matrix Item (Complex 3D Hex)
const SkillMatrixItem = ({ icon, name, detail, isVisible }) => (
  <div
    className={`skill-chip-complex p-4 sm:p-6 flex flex-col items-center justify-start text-center cursor-pointer 
            ${isVisible ? 'in-view-enter' : 'animate-on-scroll'}`}
  >
    <span className="skill-icon text-4xl sm:text-5xl mb-3 text-[var(--accent-blue)] transition-transform duration-300">{icon}</span>
    <h3 className="skill-name text-lg font-semibold text-white transition-colors duration-300">{name}</h3>
    <div className="skill-chip-detail w-full overflow-hidden text-sm text-gray-300 mt-4">
      {detail}
    </div>
  </div>
);

// Welcome Overlay Component (The Custom Loader)
const WelcomeOverlay = ({ logoUrl, welcomeMessages }) => {
  const [messageIndex, setMessageIndex] = useState(0);

  // Cycle through welcome messages every 400ms
  useEffect(() => {
    const cycleInterval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % welcomeMessages.length);
    }, 400);

    return () => clearInterval(cycleInterval);
  }, [welcomeMessages.length]);

  return (
    // Use the dedicated .welcome-overlay class for full screen position and flex
    <div id="welcome-overlay" className="welcome-overlay">
      <h1 className="text-xl sm:text-2xl font-mono text-gray-500 welcome-title mb-8">
        &gt; Initializing Portfolio
      </h1>

      {/* Logo and Spinner */}
      {/* The loader-ring class now handles the strong pulsing glow animation */}
      <div className="loader-ring relative flex items-center justify-center rounded-full">
        <div className="spinner-border absolute top-0 left-0 right-0 bottom-0 rounded-full"></div>
        <img
          src={logoUrl}
          alt="Karan Logo"
          className="logo-img w-32 h-32 object-cover rounded-full border-4 border-black/50"
          // Fallback if logo fails to load
          onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/150x150/0A0A0A/00E5FF?text=Logo+Error" }}
        />
      </div>

      {/* Dynamic Welcome Text - The key={messageIndex} forces the .welcome-text keyframe animation to re-run on every message change, fixing the jump. */}
      <div className="text-center w-full h-24 flex items-center justify-center overflow-hidden">
        <span key={messageIndex} className="welcome-text font-black text-5xl sm:text-7xl transition-all duration-300">
          {welcomeMessages[messageIndex]}
        </span>
      </div>
      <p className="text-sm font-mono text-gray-700 welcome-title pt-16">Loading assets... Standby.</p>
    </div>
  );
};

/**
 * Generates a simple math challenge for CAPTCHA.
 * @returns {object} { num1, num2, correctAnswer }
 */
const generateCaptcha = () => {
  const num1 = Math.floor(Math.random() * 9) + 2; // 2 to 10
  const num2 = Math.floor(Math.random() * 9) + 2; // 2 to 10
  return {
    num1,
    num2,
    correctAnswer: num1 + num2
  };
};

const Portfolio = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [typingText, setTypingText] = useState('');
  const [isNavScrolled, setIsNavScrolled] = useState(false);
  const [languageIndex, setLanguageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // NEW STATE for Modal

  // State and Refs for On-Scroll Animations (Now tracks enter/exit)
  const [inView, setInView] = useState({});
  const sectionRefs = useRef({});

  // 1. Loading Screen Management
  useEffect(() => {
    const fadeOutDelay = 3500;
    const cleanupDelay = 1000;

    const startFadeOutTimer = setTimeout(() => {
      const overlay = document.getElementById('welcome-overlay');
      if (overlay) {
        overlay.classList.add('fade-out');

        const cleanupTimer = setTimeout(() => {
          setIsLoading(false);
        }, cleanupDelay);
        return () => clearTimeout(cleanupTimer);
      } else {
        setIsLoading(false);
      }
    }, fadeOutDelay);

    return () => clearTimeout(startFadeOutTimer);
  }, []);

  // 2. Language Cycling Animation (Hero Welcome)
  useEffect(() => {
    if (isLoading) return;

    const cycleInterval = setInterval(() => {
      setLanguageIndex(prev => (prev + 1) % LANGUAGES.length);
    }, 2500);
    return () => clearInterval(cycleInterval);
  }, [isLoading]);

  // 3. Dynamic Typing Effect (Hero Subtitle)
  const fullText = PortfolioData.hero.subtitleTyping;
  useEffect(() => {
    if (isLoading) return;

    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setTypingText(prev => prev + fullText.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 60);
    return () => clearInterval(typingInterval);
  }, [isLoading, fullText]);

  // 4. Advanced Intersection Observer for Re-triggerable Animations & Nav Scroll
  useEffect(() => {
    if (isLoading) return;

    // Observer setup: fires when 20% of element is visible/hidden
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = entry.target.id;
        // Set true when entering, set false when leaving (allows re-trigger)
        setInView(prev => ({ ...prev, [id]: entry.isIntersecting }));
      });
    }, {
      rootMargin: '0px',
      threshold: 0.2,
    });

    // Scroll listener for Navbar/Active Section management
    const handleScroll = () => {
      setIsNavScrolled(window.scrollY > 50);

      let current = 'home';
      navLinks.forEach(secId => {
        const element = document.getElementById(secId);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Nav highlighting logic: determines active section when its center passes the screen center
          if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
            current = secId;
          }
        }
      });
      setActiveSection(current);
    };

    // Attach observer to all relevant sections
    navLinks.forEach(id => {
      const element = document.getElementById(id);
      if (element && id !== 'home') { // Skip home since it's always in view on load
        observer.observe(element);
      }
    });

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading, navLinks.length]);


  // Smooth scroll handler
  const scrollToSection = useCallback((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  }, []);


  // SVG Logo component for Navbar and branding
  const LogoIcon = () => (
    <svg className="w-7 h-7 mr-2 animate-spin-slow" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="var(--accent-blue)" strokeWidth="2" opacity="0.2" />
      <path d="M7 10H17M7 14H17M10 7V17M14 7V17" stroke="var(--accent-blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="1.5" fill="var(--accent-blue)" className="animate-pulse" />
    </svg>
  );

  // SEO Tags
  const SEO_Tags = (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="DevWithKaran | Project Catalyst. Building high-performance, animated, and scalable web applications with the modern stack." />
      <title>DevWithKaran | Project Catalyst & Freelancer</title>
      <meta name="keywords" content="Karan, Developer, Freelancer, React, Tailwind, NextJS, Frontend, Web Development, Portfolio" />
    </>
  );

  // Helper to apply scroll animation classes
  const getScrollClass = (id) => inView[id] ? 'in-view-enter' : 'animate-on-scroll';

  return (
    <>
      {/* 1. Custom CSS and SEO Tags */}
      <style>{customStyles}</style>
      {SEO_Tags}

      {/* Conditional rendering of the welcome overlay */}
      {isLoading && <WelcomeOverlay logoUrl={PortfolioData.loader.logoUrl} welcomeMessages={PortfolioData.loader.welcomeMessages} />}

      <div className={`min-h-screen bg-[var(--bg-dark)] text-[var(--text-light)] font-inter antialiased overflow-x-hidden animated-grid transition-colors duration-500 section-container ${isLoading ? 'hidden' : 'block'}`}>

        {/* 2. Optimized Navbar - Cyber Glass Effect (UPDATED CLASSES) */}
        <nav className={`fixed w-full z-50 transition-all duration-500 
          ${isNavScrolled
            ? 'scrolled-nav-active' /* New custom class for stronger effect */
            : 'bg-transparent border-b border-gray-800/50'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            {/* Logo/Brand (Dynamic Title) */}
            <button className="flex items-center text-2xl font-extrabold cursor-pointer transition-colors duration-300 hover:text-[var(--accent-blue)]" onClick={() => scrollToSection('home')}>
              <LogoIcon />
              DevWith<span className="text-[var(--accent-blue)]">Karan</span>
            </button>
            {/* Nav Links */}
            <div className="hidden md:flex space-x-6">
              {navLinks.map((id, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(id)}
                  className={`capitalize relative py-1 text-base font-medium transition-all duration-300 font-mono tracking-wider
                    ${activeSection === id
                      ? 'text-[var(--accent-blue)] font-bold nav-link-active' /* New active class */
                      : 'text-gray-400 hover:text-white'}
                    hover:text-[var(--accent-blue)]`}
                >
                  {id}
                </button>
              ))}
            </div>
            {/* Mobile Menu Icon (Placeholder) */}
            <div className="md:hidden text-2xl">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
            </div>
          </div>
        </nav>

        {/* 3. Hero Section (Dynamic Content) */}
        <header id="home" className="relative pt-32 pb-24 md:pt-48 md:pb-36 flex items-center min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column: Text & Animations */}
            <div>
              <p className="text-xl font-mono text-gray-500 mb-4 animate-reveal" style={{ animationDelay: '0.1s' }}>
                &gt; Building with{' '}
                <span className={`text-[var(--accent-blue)] font-bold language-switch ${languageIndex !== null ? 'language-enter' : 'language-exit'}`}>
                  {LANGUAGES[languageIndex]}
                </span>
              </p>

              <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black leading-tight mb-6 glitch-text">
                {HERO_TITLE_SPLIT.map((word, index) => (
                  <span
                    key={index}
                    className="inline-block mr-3 animate-reveal"
                    style={{ animationDelay: `${0.4 + index * 0.08}s` }}
                  >
                    {word}
                  </span>
                ))}
              </h1>

              {/* FIX IMPLEMENTED: The typing cursor ensures readability of the full string */}
              <p className="text-lg sm:text-xl lg:text-3xl text-gray-400 font-light mb-8 min-h-[40px] overflow-visible whitespace-normal">
                <span className="text-[var(--accent-blue)] font-mono">{typingText}</span>
                <span className="typing-cursor ml-1 inline-block w-1 bg-[var(--accent-blue)] animate-pulse h-6 align-middle"></span>
              </p>

              <button
                onClick={() => scrollToSection('contact')}
                className="relative px-8 py-3 text-lg font-bold text-black bg-[var(--accent-blue)] border-2 border-[var(--accent-blue)] rounded-sm shadow-xl transition-all duration-300 hover:shadow-[0_0_40px_var(--shadow-blue-strong)] transform hover:scale-[1.05] active:scale-100 uppercase tracking-widest"
              >
                DEPLOY CONTRACT
              </button>
            </div>

            {/* Right Column: User Image (Dynamic) */}
            <div className="flex justify-end animate-reveal" style={{ animationDelay: '1.2s' }}>
              <div className="relative w-80 h-80 bg-transparent p-1 border-4 border-gray-700/50 transform rotate-[-2deg] hover:rotate-[2deg] transition-transform duration-500">
                <div className="absolute inset-0 border-4 border-[var(--accent-blue)] opacity-50 shadow-[0_0_80px_var(--shadow-blue-strong)]/30"></div>
                <img
                  src={PortfolioData.hero.imageSrc}
                  alt={PortfolioData.hero.imageAlt}
                  className="w-full h-full object-cover border-2 border-[var(--accent-blue)]/30"
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x400/0A0A0A/00E5FF?text=Image+Error" }}
                />
              </div>
            </div>

          </div>
        </header>

        {/* 4. About Section (Dynamic Content) */}
        <section
          id="about"
          ref={el => sectionRefs.current['about'] = el}
          className={`py-20 md:py-32 border-y border-[var(--accent-blue)]/20 ${getScrollClass('about')}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-white uppercase tracking-widest header-scanline">
                01. {PortfolioData.about.sectionTitle}
              </h2>
              <p className="text-lg text-gray-300 border-l-4 border-[var(--accent-blue)] pl-4 italic bg-black/50 p-2 shadow-inner" dangerouslySetInnerHTML={{ __html: PortfolioData.about.introText.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[var(--accent-blue)]">$1</strong>') }}></p>
              <p className="text-lg text-gray-400">{PortfolioData.about.mainText}</p>
            </div>

            {/* Metric Callout (Dynamic Content) - Complex Layered Design */}
            <div className="relative h-auto lg:h-72 flex flex-col lg:flex-none gap-6">
              {PortfolioData.about.metrics.map((metric, index) => (
                <div
                  key={index}
                  className={`w-full lg:w-64 p-6 bg-[var(--card-bg-transparent)] border-2 border-gray-700/50 backdrop-blur-sm 
                shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all duration-500 
                ${index === 0 ? 'lg:absolute lg:top-0 lg:left-0' :
                      index === 1 ? 'lg:absolute lg:top-16 lg:right-0' :
                        'lg:absolute lg:bottom-0 lg:left-1/2 lg:transform lg:-translate-x-1/2'} 
                flex flex-col items-start`}
                  style={{ zIndex: 10 - index }}
                >
                  <p className={`text-6xl font-extrabold ${index === 0 ? 'text-[var(--accent-blue)]' : 'text-white/80'} font-mono`}>
                    {metric.value}
                  </p>
                  <p className="text-sm text-gray-400 mt-1 uppercase tracking-wider">{metric.label}</p>
                </div>
              ))}
            </div>


          </div>
        </section>

        {/* 5. Skills & Expertise (Dynamic Content) - COMPLEX 3D GRID */}
        <section
          id="skills"
          ref={el => sectionRefs.current['skills'] = el}
          className={`py-20 md:py-32 border-b border-[var(--accent-blue)]/20`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold mb-12 text-center text-white uppercase tracking-widest header-scanline">
              02. The <span className="text-[var(--accent-blue)]">Skill Matrix</span>
            </h2>
            <p className="text-center text-gray-400 mb-10 max-w-3xl mx-auto">
              My core competencies, presented as modules ready for integration. Hover to see the focus area.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-4">
              {PortfolioData.skills.map((skill, index) => (
                <SkillMatrixItem
                  key={index}
                  icon={skill.icon}
                  name={skill.name}
                  detail={skill.detail}
                  isVisible={inView['skills']}
                />
              ))}
            </div>
          </div>
        </section>

        {/* 6. Services / Offerings (Dynamic Content) - Layered Cards */}
        <section
          id="services"
          ref={el => sectionRefs.current['services'] = el}
          className={`py-20 md:py-32 border-b border-[var(--accent-blue)]/20`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold mb-12 text-center text-white uppercase tracking-widest header-scanline">
              03. Service <span className="text-[var(--accent-blue)]">Modules</span>
            </h2>
            <p className="text-center text-gray-400 mb-10 max-w-3xl mx-auto">
              Choose the service module that best aligns with your development needs.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {PortfolioData.services.map((service, index) => (
                <div
                  key={index}
                  className={`p-6 bg-[var(--card-bg-transparent)] border-2 border-gray-700/50 backdrop-blur-md 
                        shadow-md shadow-[var(--shadow-blue-strong)]/20 hover:border-[var(--accent-blue)] transition duration-500 
                        transform hover:shadow-[0_0_30px_var(--shadow-blue-strong)] ${getScrollClass('services')}`}
                  style={{ animationDelay: `${0.1 + index * 0.15}s` }}
                >
                  <span className="text-5xl mb-4 block text-[var(--accent-blue)]">{service.icon}</span>
                  <h3 className="text-xl font-bold mb-2 text-white">{service.title}</h3>
                  <p className="text-gray-400 text-sm">{service.description}</p>
                  <button onClick={() => setIsModalOpen(true)} className="mt-4 inline-block text-sm text-[var(--accent-blue)] font-medium hover:underline hover:tracking-wide transition-all">Engage Now &gt;</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Projects & Showcase (Dynamic Content) - EXTREME COMPLEX CARD */}
        <section
          id="projects"
          ref={el => sectionRefs.current['projects'] = el}
          className={`py-20 md:py-32 border-b border-[var(--accent-blue)]/20`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold mb-4 text-center text-white uppercase tracking-widest header-scanline">
              04. Featured <span className="text-[var(--accent-blue)]">Deployments</span>
            </h2>
            <p className="text-center text-gray-400 mb-20 max-w-3xl mx-auto">
              Selected works demonstrating technical expertise, design flair, and a focus on measurable business impact.
            </p>

            {PortfolioData.projects.map((project, index) => (
              <div
                key={index}
                className={`project-card-complex grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 p-8 relative ${getScrollClass('projects')}`}
                style={{ animationDelay: `${0.1 + index * 0.2}s` }}
              >
                {/* 1. Project Image (Alternating position) */}
                <div className={`lg:col-span-7 ${index % 2 !== 0 ? 'lg:order-2' : 'lg:order-1'} project-card-image-wrap`}>
                  <img
                    src={project.imageSrc}
                    alt={project.title}
                    className="w-full h-auto border-4 border-gray-700/50 shadow-xl shadow-black/70"
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/1e1e1e/00E5FF?text=Image+Missing" }}
                  />
                </div>

                {/* 2. Project Details (Alternating position) */}
                <div className={`lg:col-span-5 flex flex-col justify-center space-y-4 ${index % 2 !== 0 ? 'lg:order-1' : 'lg:order-2'} transform translateZ(1px)`}>
                  <span className="text-sm font-mono text-white/50 uppercase tracking-widest border-b border-[var(--accent-blue)]/50 pb-1">Deployment / 0{index + 1}</span>
                  <h3 className="text-4xl font-extrabold text-[var(--accent-blue)]">{project.title}</h3>
                  <p className="text-lg text-gray-300">{project.description}</p>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="px-3 py-1 text-xs font-mono bg-[var(--accent-blue)]/20 text-[var(--accent-blue)] border-b border-r border-[var(--accent-blue)] shadow-md shadow-black/50">
                        &lt;{tech}&gt;
                      </span>
                    ))}
                  </div>

                  <a
                    href={project.link}
                    className="mt-4 inline-flex items-center text-lg font-semibold text-white hover:text-[var(--accent-blue)] transition duration-300 transform hover:translate-x-1"
                  >
                    View Case Study
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 8. Testimonials (Dynamic Content) */}
        <section
          id="testimonials"
          ref={el => sectionRefs.current['testimonials'] = el}
          className={`py-20 md:py-32 border-b border-[var(--accent-blue)]/20`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold mb-12 text-center text-white uppercase tracking-widest header-scanline">
              05. Client <span className="text-[var(--accent-blue)]">Praise</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {PortfolioData.testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`p-8 bg-[var(--card-bg-transparent)] border-l-8 border-[var(--accent-blue)] shadow-xl shadow-[0_0_30px_var(--shadow-blue-strong)]/30 backdrop-blur-md transition duration-500 hover:scale-[1.02] ${getScrollClass('testimonials')}`}
                  style={{ animationDelay: `${0.1 + index * 0.2}s` }}
                >
                  <p className="text-2xl italic mb-6 text-white leading-relaxed font-serif">
                    "{testimonial.quote}"
                  </p>
                  <p className="font-semibold text-lg text-[var(--accent-blue)] font-mono tracking-wider">- {testimonial.client}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 9. Contact & CTA (Dynamic Content) */}
        <section
          id="contact"
          ref={el => sectionRefs.current['contact'] = el}
          className={`py-20 md:py-32 border-t border-[var(--accent-blue)]/20 bg-black/50 ${getScrollClass('contact')}`}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-4 text-white uppercase tracking-widest header-scanline">
              06. {PortfolioData.contact.sectionTitle}
            </h2>
            <p className="text-xl text-gray-400 mb-10">
              {PortfolioData.contact.subtitle}
            </p>

            {/* UPDATED: Button now opens the modal */}
            <button
              className="relative px-12 py-4 text-xl font-extrabold text-black bg-[var(--accent-blue)] border-2 border-[var(--accent-blue)] rounded-sm shadow-2xl transition-all duration-300 hover:shadow-[0_0_60px_var(--shadow-blue-strong)] transform hover:scale-[1.05] active:scale-100 uppercase tracking-widest"
            >
              <a href="mailto:karanvishwakarma7385@gmail.com">
                {PortfolioData.contact.buttonText}
              </a>
            </button>
          </div>
        </section>

        {/* 10. Footer (Dynamic Content) */}
        <footer className="py-8 border-t border-gray-800 bg-black/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} DevWithKaran. All Rights Reserved. // ARCHIVE V4.0</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              {PortfolioData.contact.socialLinks.map((link, index) => (
                <a key={index} href={link.url} className="hover:text-[var(--accent-blue)] transition font-mono">{link.name}</a>
              ))}
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}

export default Portfolio;
