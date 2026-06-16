/* SpaceX/Tesla-Inspired Portfolio Client-Side JavaScript Logic */

document.addEventListener("DOMContentLoaded", () => {
  // --- 1. WEB AUDIO API SYNTHESIZED SOUND ENGINE ---
  const AudioEngine = {
    ctx: null,
    init() {
      if (!this.ctx) {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      }
    },
    beep(frequency = 800, duration = 0.08, volume = 0.05) {
      try {
        this.init();
        if (this.ctx.state === "suspended") {
          this.ctx.resume();
        }
        const osc = this.ctx.createOscillator();
        const gainNode = this.ctx.createGain();

        osc.connect(gainNode);
        gainNode.connect(this.ctx.destination);

        osc.type = "sine";
        osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);
        
        // Custom exponential decline for high-tech click feel
        gainNode.gain.setValueAtTime(volume, this.ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.00001, this.ctx.currentTime + duration);

        osc.start(this.ctx.currentTime);
        osc.stop(this.ctx.currentTime + duration);
      } catch (e) {
        // Fallback silently if audio context is blocked
      }
    }
  };
  window.audioEngine = AudioEngine;

  // Bind audio click triggers to buttons and links
  const attachAudioTriggers = () => {
    const clickables = document.querySelectorAll("a, button, .audio-click, .nav-links a, .chat-suggest-btn");
    clickables.forEach(item => {
      item.addEventListener("click", () => {
        // High frequency soft mechanical click
        AudioEngine.beep(1200, 0.05, 0.04);
      });
      item.addEventListener("mouseenter", () => {
        // Ultra soft hover pulse click
        AudioEngine.beep(600, 0.02, 0.01);
      });
    });
  };

  // Mobile Navigation Hamburger Control
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const header = document.querySelector("header");
  const navLinksList = document.querySelectorAll(".nav-links a");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("active");
    });
  }

  navLinksList.forEach(link => {
    link.addEventListener("click", () => {
      if (hamburger && hamburger.classList.contains("active")) {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
      }
    });
  });

  // Dynamic header scrolled classes & active nav links highlights
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    let currentSection = "";
    const sections = document.querySelectorAll("section");

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - 150) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinksList.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  });

  // Smooth scroll offset handling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      
      e.preventDefault();
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 85,
          behavior: "smooth"
        });
      }
    });
  });

  // --- 2. SYSTEM INITIALIZATION PRELOADER LOGIC ---
  const preloader = document.getElementById("preloader");
  const percentSpan = document.getElementById("load-pct");
  const loaderBar = document.querySelector(".loader-bar");
  const statusAction = document.querySelector(".status-action");
  const loaderLog = document.getElementById("loader-log");
  
  if (preloader) {
    let progress = 0;
    const stages = [
      "LOADING KERNEL INTERFACES...",
      "STABILIZING RF MATRIX...",
      "BOOTING AVISHIELD DETECT CORE...",
      "CONNECTING REMOTE SERVERS...",
      "SYSTEM INJECT COMPLETED."
    ];

    const logsList = [
      "SYSTEM: Initializing ECE-OS Kernel...",
      "CORE: Mapping GPIO registers to ESP32...",
      "RF: HFSS mesh solver loaded successfully.",
      "CV: YOLOv8 model layers initialized.",
      "DETECTION: Bounding envelope configured.",
      "ADC: Multiplexer channel reading established.",
      "IFT: Beat wave phase lock established.",
      "SWD: 27.12 MHz resonant coil operational.",
      "SYSTEM: Welcome, Operator Akash V."
    ];
    
    const loadingInterval = setInterval(() => {
      progress += Math.floor(Math.random() * 4) + 2;
      if (progress >= 100) {
        progress = 100;
        clearInterval(loadingInterval);
        
        statusAction.textContent = stages[stages.length - 1];
        percentSpan.textContent = "100%";
        loaderBar.style.width = "100%";
        if (loaderLog) loaderLog.textContent = logsList[logsList.length - 1];
        
        setTimeout(() => {
          preloader.classList.add("fade-out");
          setTimeout(() => {
            preloader.remove();
          }, 800);
        }, 300);
      } else {
        percentSpan.textContent = `${progress}%`;
        loaderBar.style.width = `${progress}%`;
        
        const stageIndex = Math.floor((progress / 100) * (stages.length - 1));
        statusAction.textContent = stages[stageIndex];

        // Print custom logs based on loader progress
        const logIndex = Math.floor((progress / 100) * (logsList.length - 1));
        if (loaderLog) {
          loaderLog.textContent = logsList[logIndex];
        }
      }
    }, 35);
  }

  // --- 3. HOLOGRAPHIC CURSOR FOLLOW GLOW ---
  const cursorGlow = document.getElementById("cursor-glow");
  window.addEventListener("mousemove", (e) => {
    if (cursorGlow) {
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top = `${e.clientY}px`;
    }
  });

  // --- 4. DYNAMIC TYPEWRITER TEXT ENGINE ---
  const typewriterText = document.querySelector(".typewriter-text");
  if (typewriterText) {
    const roles = [
      "Electronics & Communication Engineer",
      "RF Antenna Designer",
      "AI Innovator",
      "Research Enthusiast"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let delay = 120;

    const type = () => {
      const currentRole = roles[roleIndex];
      if (isDeleting) {
        typewriterText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        delay = 60;
      } else {
        typewriterText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        delay = 120;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        delay = 2000;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 500;
      }

      setTimeout(type, delay);
    };

    setTimeout(type, 1000);
  }

  // --- 5. REAL-TIME SIMULATED TELEMETRY ---
  const tempVal = document.getElementById("telemetry-temp");
  const gainVal = document.getElementById("telemetry-gain");
  const currentVal = document.getElementById("telemetry-current");

  setInterval(() => {
    if (tempVal) {
      const currentTemp = (37.2 + Math.random() * 2.2).toFixed(1);
      tempVal.textContent = `${currentTemp} °C`;
    }
    if (gainVal) {
      const currentGain = (5.10 + Math.random() * 0.15).toFixed(2);
      gainVal.textContent = `${currentGain} dBi`;
    }
    if (currentVal) {
      const currentHz = (99.6 + Math.random() * 1.2).toFixed(1);
      currentVal.textContent = `${currentHz} Hz`;
    }
    
    // Synthesize faint system background operations beep
    if (Math.random() < 0.1) {
      AudioEngine.beep(2000, 0.01, 0.002);
    }
  }, 1800);

  // --- 6. SCROLL REVEAL OBSERVER ---
  const revealElements = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

  revealElements.forEach(el => revealObserver.observe(el));

  // --- 7. STATS RUNWAY COUNT-UP ANIMATION ---
  const statNumbers = document.querySelectorAll(".stat-num");
  const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const targetVal = parseInt(target.getAttribute("data-val"));
        let count = 0;
        const speed = targetVal > 5 ? 20 : 150;
        
        const updateCount = () => {
          count++;
          target.textContent = count;
          if (count < targetVal) {
            setTimeout(updateCount, speed);
          } else {
            target.textContent = targetVal;
          }
        };
        
        updateCount();
        observer.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(num => statsObserver.observe(num));

  // --- 8. TECHNICAL PROJECTS GRID FILTERING ---
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      projectCards.forEach(card => {
        const category = card.getAttribute("data-category");
        if (filterValue === "all" || category === filterValue) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });

  // --- 9. DYNAMIC THEME SWITCHER SYSTEM ---
  const themeButtons = document.querySelectorAll(".theme-btn");
  const applyTheme = (themeName) => {
    document.body.classList.remove("theme-cyberpunk", "theme-emerald", "theme-sunset");
    if (themeName !== "aurora") {
      document.body.classList.add(`theme-${themeName}`);
    }

    themeButtons.forEach(btn => {
      if (btn.getAttribute("data-theme") === themeName) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    localStorage.setItem("akash-portfolio-theme", themeName);
  };

  const savedTheme = localStorage.getItem("akash-portfolio-theme") || "aurora";
  applyTheme(savedTheme);

  themeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const selectedTheme = btn.getAttribute("data-theme");
      applyTheme(selectedTheme);
    });
  });

  // --- 10. AI ASSISTANT TERMINAL CHATBOT WIDGET ---
  const chatbot = document.getElementById("chatbot");
  const chatToggle = document.getElementById("chat-toggle");
  const chatContainer = document.getElementById("chat-container");
  const chatClose = document.getElementById("chat-close");
  const chatMessages = document.getElementById("chat-messages");
  const chatSuggestBtns = document.querySelectorAll(".chat-suggest-btn");

  if (chatToggle && chatContainer && chatClose) {
    chatToggle.addEventListener("click", () => {
      chatContainer.classList.toggle("active");
      const notif = chatToggle.querySelector(".chat-notification");
      if (notif) notif.remove();
    });

    chatClose.addEventListener("click", () => {
      chatContainer.classList.remove("active");
    });
  }

  const responses = {
    projects: "Akash V has engineered 6 key ECE innovations:\n1. **CPW Fractal Antenna (2.4 THz)** (Ongoing design/optimization)\n2. **AVISHIELD AI Runway Safety** (AAI airport monitoring)\n3. **RELIEVO Joint Therapy** (Patent Approved IFT/SWD combiner)\n4. **SURFACE GUARD Sanitizer** (Patent Approved sensor fusion system)\n5. **Microstrip Patch Antenna** (Simulated in MATLAB @ 2.4 GHz)\n6. **Smoke Detector System** (Real-time alarm network)",
    patents: "Akash has secured patent approval for two ECE projects:\n- **RELIEVO**: Synergistic joints treatment merging IFT and SWD therapies.\n- **SURFACE GUARD**: Optical UV/IR scanner with micro-solenoid sanitizer spray.\nBoth projects are filed under Indian Patent Office (IPO).",
    contact: "Establish communications with Akash V:\n- **Email**: akashveeramuthu07@gmail.com\n- **Phone**: +91 9894454355\n- **LinkedIn**: linkedin.com/in/akash-veeramuthu-93ba93290\n- **Base**: Udumalpet / Coimbatore.",
    mentor: "Akash V is mentored by **Dr. K. Sakthisudhan**, Professor at **Dr. N.G.P Institute of Technology** in Coimbatore, India. He collaborates in the ECE department on RF engineering and AI systems."
  };

  chatSuggestBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const intent = btn.getAttribute("data-intent");
      const userText = btn.textContent;
      
      const userMsgDiv = document.createElement("div");
      userMsgDiv.className = "chat-message user";
      userMsgDiv.innerHTML = `<p>${userText}</p>`;
      chatMessages.appendChild(userMsgDiv);
      
      chatMessages.scrollTop = chatMessages.scrollHeight;

      setTimeout(() => {
        const botMsgDiv = document.createElement("div");
        botMsgDiv.className = "chat-message bot";
        
        const formattedResponse = (responses[intent] || "Invalid query code. Restart session.").replace(/\n/g, "<br>");
        botMsgDiv.innerHTML = `<p>${formattedResponse}</p>`;
        
        chatMessages.appendChild(botMsgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }, 500);
    });
  });

  // --- 11. INTERACTIVE CANVAS PARTICLES NETWORK WITH MOUSE TRAILS ---
  const canvas = document.getElementById("particles-canvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let particlesArray = [];
    let numberOfParticles = 80;

    const mouse = {
      x: null,
      y: null,
      radius: 130
    };

    window.addEventListener("mousemove", (event) => {
      mouse.x = event.x;
      mouse.y = event.y;
      
      if (Math.random() < 0.25) {
        particlesArray.push(new Particle(event.x, event.y, (Math.random() * 0.4 - 0.2), (Math.random() * 0.4 - 0.2), Math.random() * 2 + 1));
        if (particlesArray.length > 120) {
          particlesArray.shift();
        }
      }
    });

    window.addEventListener("mouseout", () => {
      mouse.x = null;
      mouse.y = null;
    });

    const getPrimaryColor = () => {
      return getComputedStyle(document.body).getPropertyValue('--color-primary').trim() || '#38bdf8';
    };

    class Particle {
      constructor(x, y, dx, dy, size) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.size = size;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = getPrimaryColor();
        ctx.fill();
      }

      update() {
        if (this.x > canvas.width || this.x < 0) this.dx = -this.dx;
        if (this.y > canvas.height || this.y < 0) this.dy = -this.dy;

        if (mouse.x != null && mouse.y != null) {
          let diffX = mouse.x - this.x;
          let diffY = mouse.y - this.y;
          let distance = Math.sqrt(diffX * diffX + diffY * diffY);

          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            this.x -= (diffX / distance) * force * 4;
            this.y -= (diffY / distance) * force * 4;
          }
        }

        this.x += this.dx;
        this.y += this.dy;
        this.draw();
      }
    }

    const init = () => {
      particlesArray = [];
      numberOfParticles = window.innerWidth < 768 ? 40 : 80;
      for (let i = 0; i < numberOfParticles; i++) {
        let size = Math.random() * 2 + 0.8;
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let dx = (Math.random() * 0.4) - 0.2;
        let dy = (Math.random() * 0.4) - 0.2;
        particlesArray.push(new Particle(x, y, dx, dy, size));
      }
    };

    const connect = () => {
      let opacityValue = 1;
      const primaryColor = getPrimaryColor();
      let rgb = "56, 189, 248";
      
      if (primaryColor.startsWith("#")) {
        const hex = primaryColor.slice(1);
        if (hex.length === 6) {
          const r = parseInt(hex.slice(0, 2), 16);
          const g = parseInt(hex.slice(2, 4), 16);
          const b = parseInt(hex.slice(4, 6), 16);
          rgb = `${r}, ${g}, ${b}`;
        }
      }

      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          let dist = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                     ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));

          if (dist < (canvas.width / 9) * (canvas.height / 9)) {
            opacityValue = 1 - (dist / ((canvas.width / 9) * (canvas.height / 9)));
            ctx.strokeStyle = `rgba(${rgb}, ${opacityValue * 0.08})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    window.addEventListener("resize", resize);
    resize();

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }
      connect();
      requestAnimationFrame(animateParticles);
    };

    animateParticles();
  }

  // Trigger audio link mappings initialization
  attachAudioTriggers();
});