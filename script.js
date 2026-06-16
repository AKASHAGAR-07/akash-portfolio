/* Interactive SpaceX/Tesla-Inspired Portfolio Client-Side Logic */

document.addEventListener("DOMContentLoaded", () => {
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

  // --- 1. SYSTEM INITIALIZATION PRELOADER LOGIC ---
  const preloader = document.getElementById("preloader");
  const percentSpan = document.getElementById("load-pct");
  const loaderBar = document.querySelector(".loader-bar");
  const statusAction = document.querySelector(".status-action");
  
  if (preloader) {
    let progress = 0;
    const stages = [
      "LOADING KERNEL INTERFACES...",
      "STABILIZING RF MATRIX...",
      "BOOTING AVISHIELD DETECT CORE...",
      "CONNECTING REMOTE SERVERS...",
      "SYSTEM INJECT COMPLETED."
    ];
    
    const loadingInterval = setInterval(() => {
      progress += Math.floor(Math.random() * 5) + 3;
      if (progress >= 100) {
        progress = 100;
        clearInterval(loadingInterval);
        
        statusAction.textContent = stages[stages.length - 1];
        percentSpan.textContent = "100%";
        loaderBar.style.width = "100%";
        
        setTimeout(() => {
          preloader.classList.add("fade-out");
          setTimeout(() => {
            preloader.remove();
          }, 800);
        }, 300);
      } else {
        percentSpan.textContent = `${progress}%`;
        loaderBar.style.width = `${progress}%`;
        
        // Cycle stages messages based on progress
        const stageIndex = Math.floor((progress / 100) * (stages.length - 1));
        statusAction.textContent = stages[stageIndex];
      }
    }, 45);
  }

  // --- 2. HOLOGRAPHIC CURSOR FOLLOW GLOW ---
  const cursorGlow = document.getElementById("cursor-glow");
  window.addEventListener("mousemove", (e) => {
    if (cursorGlow) {
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top = `${e.clientY}px`;
    }
  });

  // --- 3. DYNAMIC TYPEWRITER TEXT ENGINE ---
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
        delay = 2000; // Pause at end of text
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 500; // Pause before starting next role
      }

      setTimeout(type, delay);
    };

    setTimeout(type, 1000);
  }

  // --- 4. SCROLL REVEAL OBSERVER ---
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

  // --- 5. STATS RUNWAY COUNT-UP ANIMATION ---
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

  // --- 6. TECHNICAL PROJECTS GRID FILTERING ---
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

  // --- 7. DYNAMIC THEME SWITCHER SYSTEM ---
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

  // --- 8. AI ASSISTANT TERMINAL CHATBOT WIDGET ---
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
      if (notif) notif.remove(); // Remove initial alert indicator
    });

    chatClose.addEventListener("click", () => {
      chatContainer.classList.remove("active");
    });
  }

  const responses = {
    projects: "Akash has engineered 6 key projects, including high-frequency Terahertz Fractal Antennas, the AVISHIELD runway security AI system, and 2 patent approved designs. Click the cards in the 'Featured Innovations' section to filter them!",
    patents: "Akash has secured patent approval for two innovations:\n1. **RELIEVO**: An adaptive joints therapy medical device merging IFT and SWD.\n2. **SURFACE GUARD**: A handheld smart optical scanner triggering automated sanitation spray mechanism.",
    contact: "Establish communications with Akash V via:\n- **Email**: akashveeramuthu07@gmail.com\n- **Phone**: +91 9894454355\n- **LinkedIn**: linkedin.com/in/akash-veeramuthu-93ba93290",
    mentor: "Akash V is mentored by **Dr. K. Sakthisudhan**, Professor at the **Dr. N.G.P Institute of Technology** in Coimbatore, India. Together, they publish research and file patents in ECE, RF, and AI domains."
  };

  chatSuggestBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const intent = btn.getAttribute("data-intent");
      const userText = btn.textContent;
      
      // Append User message
      const userMsgDiv = document.createElement("div");
      userMsgDiv.className = "chat-message user";
      userMsgDiv.innerHTML = `<p>${userText}</p>`;
      chatMessages.appendChild(userMsgDiv);
      
      chatMessages.scrollTop = chatMessages.scrollHeight;

      // Simulate Bot processing delay
      setTimeout(() => {
        const botMsgDiv = document.createElement("div");
        botMsgDiv.className = "chat-message bot";
        
        // Convert newlines to breaks
        const formattedResponse = (responses[intent] || "Invalid query code. Restart session.").replace(/\n/g, "<br>");
        botMsgDiv.innerHTML = `<p>${formattedResponse}</p>`;
        
        chatMessages.appendChild(botMsgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }, 500);
    });
  });

  // --- 9. INTERACTIVE CANVAS PARTICLES NETWORK WITH MOUSE TRAILS ---
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
      
      // Add a particle path tail on mouse movement
      if (Math.random() < 0.25) {
        particlesArray.push(new Particle(event.x, event.y, (Math.random() * 0.4 - 0.2), (Math.random() * 0.4 - 0.2), Math.random() * 2 + 1));
        if (particlesArray.length > 120) {
          particlesArray.shift(); // keep array within bounds
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

        // Repulsive physics when near mouse coordinate
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
});