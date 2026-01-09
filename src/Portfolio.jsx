import React, { useState, useEffect } from 'react';

// ============================================
// PORTFOLIO - ESTEBAN MEZA
// Dual Mode: Professional / Cyberpunk
// ============================================

const Portfolio = () => {
  const [mode, setMode] = useState('pro');
  const [lang, setLang] = useState('en');
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('');
  const [konamiProgress, setKonamiProgress] = useState(0);
  const [easterEggActive, setEasterEggActive] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);

  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

  // Kratos quotes - ALWAYS in English
  const kratosQuotes = [
    '"Do not be sorry. Be better." - Kratos',
    '"The cycle ends here." - Kratos',
    '"We must be better than this." - Kratos',
    '"Keep your expectations low and you will never be disappointed." - Kratos'
  ];

  const translations = {
    en: {
      loading: ['INITIALIZING SYSTEM...', 'LOADING NEURAL INTERFACE...', 'CONNECTING TO NIGHT CITY...', 'DECRYPTING DATA...', 'WELCOME, NETRUNNER'],
      nav: { about: 'About', skills: 'Skills', projects: 'Projects', contact: 'Contact', cv: 'Resume' },
      hero: {
        greeting: "Hello, I'm",
        name: 'Esteban Meza',
        titles: ['Backend Developer', 'Blockchain Enthusiast', 'Smart Contract Builder', 'System Architect'],
        cta: 'View My Work'
      },
      about: {
        title: 'About Me',
        description: "I'm a Backend Developer and Blockchain enthusiast with 1.5+ years of experience building robust systems and decentralized applications. Currently pursuing my BS in Computer Science (graduating 2028), I specialize in creating scalable backend architectures and smart contracts.",
        description2: "I'm passionate about the intersection of traditional backend development and emerging blockchain technologies, always looking for new challenges that push the boundaries of what's possible."
      },
      skills: {
        title: 'Skills & Technologies',
        categories: { languages: 'Languages', frameworks: 'Frameworks', blockchain: 'Blockchain', tools: 'Tools' }
      },
      projects: {
        title: 'Featured Projects',
        viewCode: 'View Code',
        liveDemo: 'Live Demo',
        items: [
          {
            title: 'Supply Chain Blockchain Platform',
            description: 'Full-stack supply chain management system with blockchain verification and role-based access control. Built with Spring Boot, React, PostgreSQL, and Ethereum smart contracts.',
            tech: ['Java', 'Spring Boot', 'React', 'Solidity', 'PostgreSQL', 'Web3j'],
            github: 'https://github.com/EstebanMezaCS/inventory-blockchain',
            demo: 'https://supply-chain-frontend-t3l1.onrender.com'
          },
          {
            title: 'RBAC API',
            description: 'RESTful API with 5-tier role-based access control, user authentication, and PostgreSQL integration. Clean architecture with Controller-Service-Repository pattern.',
            tech: ['Java', 'Spring Boot', 'PostgreSQL', 'JPA', 'REST API'],
            github: 'https://github.com/EstebanMezaCS/spring-boot-rbac-api',
            demo: null
          }
        ]
      },
      contact: {
        title: 'Get In Touch',
        subtitle: "Have a project in mind? Let's build something amazing together."
      },
      cv: { download: 'Download Resume' },
      footer: { designed: 'Designed & Built by', rights: 'All rights reserved.' }
    },
    es: {
      loading: ['INICIALIZANDO SISTEMA...', 'CARGANDO INTERFAZ NEURAL...', 'CONECTANDO A NIGHT CITY...', 'DESENCRIPTANDO DATOS...', 'BIENVENIDO, NETRUNNER'],
      nav: { about: 'Sobre Mí', skills: 'Habilidades', projects: 'Proyectos', contact: 'Contacto', cv: 'CV' },
      hero: {
        greeting: "Hola, soy",
        name: 'Esteban Meza',
        titles: ['Desarrollador Backend', 'Entusiasta Blockchain', 'Creador de Smart Contracts', 'Arquitecto de Sistemas'],
        cta: 'Ver Mi Trabajo'
      },
      about: {
        title: 'Sobre Mí',
        description: "Soy un Desarrollador Backend y entusiasta de Blockchain con más de 1.5 años de experiencia construyendo sistemas robustos y aplicaciones descentralizadas. Actualmente cursando mi licenciatura en Ciencias de la Computación (graduación 2028), me especializo en crear arquitecturas backend escalables y contratos inteligentes.",
        description2: "Me apasiona la intersección entre el desarrollo backend tradicional y las tecnologías blockchain emergentes, siempre buscando nuevos desafíos que expandan los límites de lo posible."
      },
      skills: {
        title: 'Habilidades y Tecnologías',
        categories: { languages: 'Lenguajes', frameworks: 'Frameworks', blockchain: 'Blockchain', tools: 'Herramientas' }
      },
      projects: {
        title: 'Proyectos Destacados',
        viewCode: 'Ver Código',
        liveDemo: 'Demo en Vivo',
        items: [
          {
            title: 'Plataforma Blockchain Supply Chain',
            description: 'Sistema completo de gestión de cadena de suministro con verificación blockchain y control de acceso basado en roles. Construido con Spring Boot, React, PostgreSQL y contratos inteligentes de Ethereum.',
            tech: ['Java', 'Spring Boot', 'React', 'Solidity', 'PostgreSQL', 'Web3j'],
            github: 'https://github.com/EstebanMezaCS/inventory-blockchain',
            demo: 'https://supply-chain-frontend-t3l1.onrender.com'
          },
          {
            title: 'API RBAC',
            description: 'API RESTful con control de acceso basado en roles de 5 niveles, autenticación de usuarios e integración con PostgreSQL. Arquitectura limpia con patrón Controller-Service-Repository.',
            tech: ['Java', 'Spring Boot', 'PostgreSQL', 'JPA', 'REST API'],
            github: 'https://github.com/EstebanMezaCS/spring-boot-rbac-api',
            demo: null
          }
        ]
      },
      contact: {
        title: 'Contáctame',
        subtitle: "¿Tienes un proyecto en mente? Construyamos algo increíble juntos."
      },
      cv: { download: 'Descargar CV' },
      footer: { designed: 'Diseñado y Construido por', rights: 'Todos los derechos reservados.' }
    }
  };

  const t = translations[lang];

  const skills = {
    languages: [
      { name: 'Java', level: 80 },
      { name: 'Python', level: 75 },
      { name: 'JavaScript', level: 70 },
      { name: 'C++', level: 65 },
      { name: 'C#', level: 65 },
      { name: 'Assembly x86', level: 40 }
    ],
    frameworks: [
      { name: 'Spring Boot', level: 60 },
      { name: 'React', level: 65 },
      { name: 'Node.js', level: 55 }
    ],
    blockchain: [
      { name: 'Solidity', level: 55 },
      { name: 'Web3j', level: 50 },
      { name: 'Hardhat', level: 50 }
    ],
    tools: [
      { name: 'Git', level: 75 },
      { name: 'PostgreSQL', level: 70 },
      { name: 'Docker', level: 55 },
      { name: 'Maven', level: 65 }
    ]
  };

  // Effects
  useEffect(() => {
    if (loading) {
      let progress = 0;
      let textIndex = 0;
      const progressInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
          progress = 100;
          clearInterval(progressInterval);
          setTimeout(() => setLoading(false), 500);
        }
        setLoadingProgress(Math.min(progress, 100));
        const newTextIndex = Math.floor((progress / 100) * t.loading.length);
        if (newTextIndex !== textIndex && newTextIndex < t.loading.length) {
          textIndex = newTextIndex;
          setLoadingText(t.loading[textIndex]);
        }
      }, 200);
      setLoadingText(t.loading[0]);
      return () => clearInterval(progressInterval);
    }
  }, [loading]);

  useEffect(() => {
    if (loading) return;
    const titles = t.hero.titles;
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeout;

    const type = () => {
      const currentTitle = titles[titleIndex];
      if (isDeleting) {
        setTypedText(currentTitle.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setTypedText(currentTitle.substring(0, charIndex + 1));
        charIndex++;
      }
      let typeSpeed = isDeleting ? 50 : 100;
      if (!isDeleting && charIndex === currentTitle.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typeSpeed = 500;
      }
      timeout = setTimeout(type, typeSpeed);
    };
    timeout = setTimeout(type, 1000);
    return () => clearTimeout(timeout);
  }, [loading, lang]);

  useEffect(() => {
    const interval = setInterval(() => setCursorVisible(v => !v), 530);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === konamiCode[konamiProgress]) {
        const newProgress = konamiProgress + 1;
        setKonamiProgress(newProgress);
        if (newProgress === konamiCode.length) {
          setEasterEggActive(true);
          setKonamiProgress(0);
          setTimeout(() => setEasterEggActive(false), 5000);
        }
      } else {
        setKonamiProgress(0);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiProgress]);

  const themes = {
    pro: {
      bg: '#0a0a0f',
      bgSecondary: '#12121a',
      bgTertiary: '#1a1a24',
      accent: '#3b82f6',
      accentHover: '#2563eb',
      text: '#f1f5f9',
      textSecondary: '#94a3b8',
      textMuted: '#64748b',
      border: 'rgba(255,255,255,0.1)',
      gradient: 'linear-gradient(135deg, #3b82f6, #1d4ed8)'
    },
    cyber: {
      bg: '#0a0a0f',
      bgSecondary: '#0f0f1a',
      bgTertiary: '#151525',
      accent: '#00f0ff',
      accentHover: '#00c4cc',
      text: '#f0f0f0',
      textSecondary: '#00f0ff',
      textMuted: '#666680',
      border: 'rgba(0, 240, 255, 0.2)',
      gradient: 'linear-gradient(135deg, #00f0ff, #ff00ff)'
    }
  };

  const theme = themes[mode];

  // CSS Classes for hover effects (using CSS instead of JS events)
  const styles = `
    @keyframes glitch {
      0%, 90%, 100% { transform: translate(0); }
      92% { transform: translate(-2px, 2px); }
      94% { transform: translate(2px, -2px); }
      96% { transform: translate(-2px, -2px); }
      98% { transform: translate(2px, 2px); }
    }
    @keyframes rain {
      0% { transform: translateY(-100vh); opacity: 0; }
      10% { opacity: 1; }
      90% { opacity: 1; }
      100% { transform: translateY(100vh); opacity: 0; }
    }
    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
      40% { transform: translateX(-50%) translateY(-10px); }
      60% { transform: translateX(-50%) translateY(-5px); }
    }
    @keyframes scrollDown {
      0% { transform: translateY(0); opacity: 1; }
      100% { transform: translateY(15px); opacity: 0; }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    html { scroll-behavior: smooth; }
    * { box-sizing: border-box; }
    
    .nav-link {
      color: ${theme.textSecondary};
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      transition: color 0.2s ease;
      font-family: ${mode === 'cyber' ? "'Orbitron', monospace" : "'Space Grotesk', sans-serif"};
    }
    .nav-link:hover {
      color: ${theme.accent};
    }
    
    .btn-toggle {
      background: ${theme.bgTertiary};
      border: 1px solid ${theme.border};
      color: ${theme.text};
      padding: 8px 16px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 12px;
      font-weight: bold;
      transition: all 0.2s ease;
    }
    .btn-toggle:hover {
      background: ${theme.accent};
      color: #000;
    }
    
    .btn-mode {
      background: ${mode === 'cyber' ? theme.gradient : theme.bgTertiary};
      border: 1px solid ${theme.border};
      color: ${theme.text};
      padding: 8px 16px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 12px;
      font-weight: bold;
      transition: all 0.2s ease;
    }
    .btn-mode:hover {
      opacity: 0.8;
    }
    
    .btn-cta {
      background: ${mode === 'cyber' ? 'transparent' : theme.gradient};
      border: ${mode === 'cyber' ? `2px solid ${theme.accent}` : 'none'};
      color: ${mode === 'cyber' ? theme.accent : '#fff'};
      padding: 16px 40px;
      border-radius: 8px;
      font-size: 16px;
      font-weight: bold;
      text-decoration: none;
      transition: all 0.2s ease;
      font-family: ${mode === 'cyber' ? "'Orbitron', monospace" : "'Space Grotesk', sans-serif"};
      display: inline-block;
    }
    .btn-cta:hover {
      background: ${theme.accent};
      color: #000;
      transform: translateY(-2px);
    }
    
    .skill-card {
      background: ${theme.bgSecondary};
      padding: 30px;
      border-radius: 16px;
      border: 1px solid ${theme.border};
      transition: all 0.2s ease;
    }
    .skill-card:hover {
      border-color: ${theme.accent};
      box-shadow: 0 0 20px ${theme.accent}20;
    }
    
    .project-card {
      background: ${theme.bgSecondary};
      border-radius: 16px;
      border: 1px solid ${theme.border};
      overflow: hidden;
      transition: all 0.2s ease;
    }
    .project-card:hover {
      transform: translateY(-5px);
      border-color: ${theme.accent};
      box-shadow: 0 10px 40px ${theme.accent}20;
    }
    
    .project-link {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      color: ${theme.textSecondary};
      text-decoration: none;
      font-size: 14px;
      transition: color 0.2s ease;
      padding: 8px 0;
    }
    .project-link:hover {
      color: ${theme.accent};
    }
    
    .social-link {
      display: flex;
      align-items: center;
      gap: 8px;
      background: ${theme.bgSecondary};
      border: 1px solid ${theme.border};
      color: ${theme.textSecondary};
      padding: 12px 24px;
      border-radius: 8px;
      text-decoration: none;
      font-size: 14px;
      transition: all 0.2s ease;
    }
    .social-link:hover {
      border-color: ${theme.accent};
      color: ${theme.accent};
    }
    
    .btn-cv {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: ${theme.bgSecondary};
      border: 2px solid ${theme.accent};
      color: ${theme.accent};
      padding: 16px 40px;
      border-radius: 8px;
      font-size: 16px;
      font-weight: bold;
      text-decoration: none;
      transition: all 0.2s ease;
      font-family: ${mode === 'cyber' ? "'Orbitron', monospace" : "'Space Grotesk', sans-serif"};
    }
    .btn-cv:hover {
      background: ${theme.accent};
      color: #000;
    }
    
    .btn-email {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: ${mode === 'cyber' ? 'transparent' : theme.gradient};
      border: ${mode === 'cyber' ? `2px solid ${theme.accent}` : 'none'};
      color: ${mode === 'cyber' ? theme.accent : '#fff'};
      padding: 16px 40px;
      border-radius: 8px;
      font-size: 18px;
      font-weight: bold;
      text-decoration: none;
      margin-bottom: 50px;
      transition: all 0.2s ease;
    }
    .btn-email:hover {
      background: ${theme.accent};
      color: #000;
    }
    
    .quote-box {
      font-size: 14px;
      color: ${theme.textMuted};
      margin-bottom: 40px;
      font-style: italic;
      cursor: pointer;
      transition: all 0.2s ease;
      padding: 10px 20px;
      border-radius: 8px;
      background: ${mode === 'cyber' ? `${theme.accent}10` : 'transparent'};
    }
    .quote-box:hover {
      color: ${theme.accent};
    }
    
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: ${theme.bg}; }
    ::-webkit-scrollbar-thumb { background: ${theme.accent}; border-radius: 4px; }
    ::selection { background: ${theme.accent}; color: #000; }
  `;

  const CyberRain = () => {
    if (mode !== 'cyber') return null;
    return (
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}>
        {[...Array(50)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            top: `-${Math.random() * 20}%`,
            width: '1px',
            height: `${15 + Math.random() * 30}px`,
            background: `linear-gradient(to bottom, transparent, ${theme.accent}40, transparent)`,
            animation: `rain ${2 + Math.random() * 3}s linear infinite`,
            animationDelay: `${Math.random() * 2}s`
          }} />
        ))}
      </div>
    );
  };

  const LoadingScreen = () => (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      background: '#000', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', zIndex: 10000,
      fontFamily: "'Orbitron', monospace"
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
        pointerEvents: 'none'
      }} />
      <div style={{
        fontSize: '48px', fontWeight: 'bold', color: '#00f0ff',
        textShadow: '0 0 10px #00f0ff, 0 0 20px #00f0ff, 0 0 40px #00f0ff',
        marginBottom: '40px', animation: 'glitch 2s infinite'
      }}>
        ESTEBAN_MEZA.exe
      </div>
      <div style={{
        fontSize: '14px', color: '#00f0ff', marginBottom: '20px',
        fontFamily: "'Courier New', monospace", textShadow: '0 0 5px #00f0ff'
      }}>
        {loadingText}
      </div>
      <div style={{
        width: '300px', height: '4px', background: '#1a1a2e',
        borderRadius: '2px', overflow: 'hidden', border: '1px solid #00f0ff40'
      }}>
        <div style={{
          width: `${loadingProgress}%`, height: '100%',
          background: 'linear-gradient(90deg, #00f0ff, #ff00ff)',
          boxShadow: '0 0 10px #00f0ff', transition: 'width 0.2s ease'
        }} />
      </div>
      <div style={{
        marginTop: '10px', fontSize: '12px', color: '#00f0ff80',
        fontFamily: "'Courier New', monospace"
      }}>
        [{Math.floor(loadingProgress)}%]
      </div>
    </div>
  );

  const EasterEggOverlay = () => {
    if (!easterEggActive) return null;
    return (
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        background: 'rgba(0,0,0,0.9)', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', zIndex: 9999, animation: 'fadeIn 0.3s ease'
      }}>
        <div style={{ fontSize: '24px', color: '#f0ff00', marginBottom: '20px', textShadow: '0 0 10px #f0ff00', fontFamily: "'Orbitron', monospace" }}>
          🎮 KONAMI CODE ACTIVATED! 🎮
        </div>
        <div style={{ fontSize: '48px', marginBottom: '20px' }}>⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️🅱️🅰️</div>
        <div style={{ color: '#00f0ff', fontSize: '16px', textAlign: 'center', maxWidth: '400px', lineHeight: '1.6' }}>
          🎮 Favorite Games: Cyberpunk 2077, Elden Ring, Fallout, The Witcher 3, R6 Siege, Tarkov<br/><br/>
          🎬 Favorite Movies: Avengers Endgame, Spider-Man, Star Wars<br/><br/>
          🎵 Music: Phonk, AC/DC, Metallica, Eminem
        </div>
      </div>
    );
  };

  return (
    <div style={{ minHeight: '100vh', background: theme.bg, color: theme.text, fontFamily: "'Inter', -apple-system, sans-serif", overflowX: 'hidden' }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Orbitron:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{styles}</style>

      {loading ? <LoadingScreen /> : (
        <>
          {mode === 'cyber' && <CyberRain />}
          <EasterEggOverlay />
          
          {/* Navigation */}
          <nav style={{
            position: 'fixed', top: 0, left: 0, width: '100%', padding: '20px 40px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            background: `${theme.bg}ee`, backdropFilter: 'blur(10px)',
            borderBottom: `1px solid ${theme.border}`, zIndex: 1000
          }}>
            <div style={{
              fontSize: '24px', fontWeight: 'bold', color: theme.accent,
              fontFamily: mode === 'cyber' ? "'Orbitron', monospace" : "'Space Grotesk', sans-serif",
              textShadow: mode === 'cyber' ? `0 0 10px ${theme.accent}` : 'none'
            }}>
              {mode === 'cyber' ? '<EM/>' : 'EM'}
            </div>

            <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
              {Object.entries(t.nav).map(([key, value]) => (
                <a key={key} href={`#${key}`} className="nav-link">{value}</a>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
              <button className="btn-toggle" onClick={() => setLang(lang === 'en' ? 'es' : 'en')}>
                {lang === 'en' ? '🇪🇸 ES' : '🇺🇸 EN'}
              </button>
              <button className="btn-mode" onClick={() => setMode(mode === 'pro' ? 'cyber' : 'pro')}>
                {mode === 'cyber' ? '💼 PRO' : '🌃 CYBER'}
              </button>
            </div>
          </nav>

          <main>
            {/* Hero Section */}
            <section style={{
              minHeight: '100vh', display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', padding: '120px 40px 80px',
              position: 'relative', textAlign: 'center'
            }}>
              {mode === 'cyber' && (
                <div style={{
                  position: 'absolute', top: '50%', left: '50%',
                  transform: 'translate(-50%, -50%)', width: '600px', height: '600px',
                  background: `radial-gradient(circle, ${theme.accent}10 0%, transparent 70%)`,
                  pointerEvents: 'none'
                }} />
              )}

              <div style={{
                fontSize: mode === 'cyber' ? '18px' : '16px', color: theme.accent,
                marginBottom: '20px',
                fontFamily: mode === 'cyber' ? "'Orbitron', monospace" : "'Space Grotesk', sans-serif",
                textShadow: mode === 'cyber' ? `0 0 10px ${theme.accent}` : 'none',
                letterSpacing: '3px'
              }}>
                {t.hero.greeting}
              </div>

              <h1 style={{
                fontSize: mode === 'cyber' ? '72px' : '64px', fontWeight: 'bold',
                color: theme.text, marginBottom: '20px',
                fontFamily: mode === 'cyber' ? "'Orbitron', monospace" : "'Space Grotesk', sans-serif",
                textShadow: mode === 'cyber' ? `0 0 20px ${theme.accent}, 0 0 40px ${theme.accent}40` : 'none',
                animation: mode === 'cyber' ? 'glitch 3s infinite' : 'none'
              }}>
                {t.hero.name}
              </h1>

              <div style={{
                fontSize: '24px', color: theme.textSecondary, marginBottom: '40px', height: '36px',
                fontFamily: mode === 'cyber' ? "'Courier New', monospace" : "'Space Grotesk', sans-serif"
              }}>
                <span style={{ color: mode === 'cyber' ? theme.accent : theme.text }}>{'> '}</span>
                {typedText}
                <span style={{ opacity: cursorVisible ? 1 : 0, color: theme.accent, marginLeft: '2px' }}>|</span>
              </div>

              <div className="quote-box" onClick={() => setQuoteIndex((quoteIndex + 1) % kratosQuotes.length)}>
                {kratosQuotes[quoteIndex]}
              </div>

              <a href="#projects" className="btn-cta">{t.hero.cta}</a>

              <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', animation: 'bounce 2s infinite' }}>
                <div style={{
                  width: '24px', height: '40px', border: `2px solid ${theme.accent}40`,
                  borderRadius: '12px', display: 'flex', justifyContent: 'center', paddingTop: '8px'
                }}>
                  <div style={{
                    width: '4px', height: '8px', background: theme.accent,
                    borderRadius: '2px', animation: 'scrollDown 2s infinite'
                  }} />
                </div>
              </div>
            </section>

            {/* About Section */}
            <section id="about" style={{ padding: '100px 40px', maxWidth: '1000px', margin: '0 auto' }}>
              <h2 style={{
                fontSize: '36px', fontWeight: 'bold', color: theme.text, marginBottom: '40px',
                fontFamily: mode === 'cyber' ? "'Orbitron', monospace" : "'Space Grotesk', sans-serif",
                textShadow: mode === 'cyber' ? `0 0 10px ${theme.accent}` : 'none'
              }}>
                {mode === 'cyber' && <span style={{ color: theme.accent }}>{'// '}</span>}
                {t.about.title}
              </h2>

              <div style={{
                background: theme.bgSecondary, padding: '40px', borderRadius: '16px',
                border: `1px solid ${theme.border}`
              }}>
                <p style={{ color: theme.textSecondary, fontSize: '18px', lineHeight: '1.8', marginBottom: '20px' }}>
                  {t.about.description}
                </p>
                <p style={{ color: theme.textSecondary, fontSize: '18px', lineHeight: '1.8' }}>
                  {t.about.description2}
                </p>

                <div style={{
                  display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px',
                  marginTop: '40px', paddingTop: '30px', borderTop: `1px solid ${theme.border}`
                }}>
                  {[
                    { value: '1.5+', label: lang === 'en' ? 'Years Experience' : 'Años Experiencia' },
                    { value: '2', label: lang === 'en' ? 'Projects' : 'Proyectos' },
                    { value: '2028', label: lang === 'en' ? 'Graduation' : 'Graduación' }
                  ].map((stat, i) => (
                    <div key={i} style={{ textAlign: 'center' }}>
                      <div style={{
                        fontSize: '32px', fontWeight: 'bold', color: theme.accent,
                        fontFamily: mode === 'cyber' ? "'Orbitron', monospace" : "'Space Grotesk', sans-serif",
                        textShadow: mode === 'cyber' ? `0 0 10px ${theme.accent}` : 'none'
                      }}>
                        {stat.value}
                      </div>
                      <div style={{ color: theme.textMuted, fontSize: '14px' }}>{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Skills Section */}
            <section id="skills" style={{ padding: '100px 40px', maxWidth: '1200px', margin: '0 auto' }}>
              <h2 style={{
                fontSize: '36px', fontWeight: 'bold', color: theme.text, marginBottom: '60px',
                fontFamily: mode === 'cyber' ? "'Orbitron', monospace" : "'Space Grotesk', sans-serif",
                textShadow: mode === 'cyber' ? `0 0 10px ${theme.accent}` : 'none', textAlign: 'center'
              }}>
                {mode === 'cyber' && <span style={{ color: theme.accent }}>{'// '}</span>}
                {t.skills.title}
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '40px' }}>
                {Object.entries(skills).map(([category, items]) => (
                  <div key={category} className="skill-card">
                    <h3 style={{
                      fontSize: '18px', fontWeight: 'bold', color: theme.accent, marginBottom: '25px',
                      fontFamily: mode === 'cyber' ? "'Orbitron', monospace" : "'Space Grotesk', sans-serif",
                      textTransform: 'uppercase', letterSpacing: '2px'
                    }}>
                      {t.skills.categories[category]}
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      {items.map((skill, i) => (
                        <div key={i}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <span style={{ color: theme.text, fontSize: '14px' }}>{skill.name}</span>
                            <span style={{ color: theme.textMuted, fontSize: '12px' }}>{skill.level}%</span>
                          </div>
                          <div style={{ height: '6px', background: theme.bgTertiary, borderRadius: '3px', overflow: 'hidden' }}>
                            <div style={{
                              width: `${skill.level}%`, height: '100%',
                              background: mode === 'cyber' ? theme.gradient : theme.accent,
                              borderRadius: '3px'
                            }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Projects Section */}
            <section id="projects" style={{ padding: '100px 40px', maxWidth: '1200px', margin: '0 auto' }}>
              <h2 style={{
                fontSize: '36px', fontWeight: 'bold', color: theme.text, marginBottom: '60px',
                fontFamily: mode === 'cyber' ? "'Orbitron', monospace" : "'Space Grotesk', sans-serif",
                textShadow: mode === 'cyber' ? `0 0 10px ${theme.accent}` : 'none', textAlign: 'center'
              }}>
                {mode === 'cyber' && <span style={{ color: theme.accent }}>{'// '}</span>}
                {t.projects.title}
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px' }}>
                {t.projects.items.map((project, i) => (
                  <div key={i} className="project-card">
                    <div style={{ padding: '30px', borderBottom: `1px solid ${theme.border}` }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                        <span style={{ fontSize: '24px' }}>{i === 0 ? '⛓️' : '🔐'}</span>
                        <h3 style={{
                          fontSize: '20px', fontWeight: 'bold', color: theme.text,
                          fontFamily: mode === 'cyber' ? "'Orbitron', monospace" : "'Space Grotesk', sans-serif"
                        }}>
                          {project.title}
                        </h3>
                      </div>
                      <p style={{ color: theme.textSecondary, fontSize: '14px', lineHeight: '1.7' }}>
                        {project.description}
                      </p>
                    </div>

                    <div style={{ padding: '20px 30px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {project.tech.map((tech, j) => (
                        <span key={j} style={{
                          padding: '6px 12px',
                          background: `${theme.accent}15`,
                          color: theme.accent,
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '500'
                        }}>
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div style={{ padding: '20px 30px', display: 'flex', gap: '20px', borderTop: `1px solid ${theme.border}` }}>
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                        📂 {t.projects.viewCode}
                      </a>
                      {project.demo && (
                        <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-link">
                          🚀 {t.projects.liveDemo}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Contact Section */}
            <section id="contact" style={{ padding: '100px 40px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
              <h2 style={{
                fontSize: '36px', fontWeight: 'bold', color: theme.text, marginBottom: '20px',
                fontFamily: mode === 'cyber' ? "'Orbitron', monospace" : "'Space Grotesk', sans-serif",
                textShadow: mode === 'cyber' ? `0 0 10px ${theme.accent}` : 'none'
              }}>
                {mode === 'cyber' && <span style={{ color: theme.accent }}>{'// '}</span>}
                {t.contact.title}
              </h2>

              <p style={{ color: theme.textSecondary, fontSize: '18px', marginBottom: '50px' }}>
                {t.contact.subtitle}
              </p>

              <a href="mailto:estebanmeza.cs@outlook.com" className="btn-email">
                📧 estebanmeza.cs@outlook.com
              </a>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                <a href="https://github.com/EstebanMezaCS" target="_blank" rel="noopener noreferrer" className="social-link">
                  <span style={{ fontSize: '18px' }}>💻</span> GitHub
                </a>
                <a href="https://www.linkedin.com/in/esteban-meza-87731a22b/" target="_blank" rel="noopener noreferrer" className="social-link">
                  <span style={{ fontSize: '18px' }}>💼</span> LinkedIn
                </a>
                {mode === 'cyber' && (
                  <a href="https://steamcommunity.com/id/emezag19/" target="_blank" rel="noopener noreferrer" className="social-link">
                    <span style={{ fontSize: '18px' }}>🎮</span> Steam
                  </a>
                )}
              </div>
            </section>

            {/* CV Section */}
            <section id="cv" style={{ padding: '60px 40px', textAlign: 'center' }}>
              <a href="/CV_Esteban_Meza.pdf" download="CV_Esteban_Meza.pdf" className="btn-cv">
                📄 {t.cv.download}
              </a>
            </section>
          </main>

          {/* Footer */}
          <footer style={{ padding: '40px', textAlign: 'center', borderTop: `1px solid ${theme.border}`, marginTop: '60px' }}>
            <p style={{ color: theme.textMuted, fontSize: '14px' }}>
              {t.footer.designed} <span style={{ color: theme.accent }}>Esteban Meza</span>
            </p>
            <p style={{ color: theme.textMuted, fontSize: '12px', marginTop: '10px' }}>
              © 2026 {t.footer.rights}
            </p>
            {mode === 'cyber' && (
              <p style={{ color: theme.textMuted, fontSize: '10px', marginTop: '15px', fontFamily: "'Courier New', monospace" }}>
                [TIP: Try the Konami Code ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️BA]
              </p>
            )}
          </footer>
        </>
      )}
    </div>
  );
};

export default Portfolio;
