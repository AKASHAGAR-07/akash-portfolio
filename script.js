/* Interactive Portfolio Client-Side Logic */

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const header = document.querySelector("header");
  const navLinksList = document.querySelectorAll(".nav-links a");

  // Mobile Menu Toggling
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("active");
    });
  }

  // Mobile Menu Auto-Close
  navLinksList.forEach(link => {
    link.addEventListener("click", () => {
      if (hamburger && hamburger.classList.contains("active")) {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
      }
    });
  });

  // Smooth Scrolling Offset handling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth"
        });
      }
    });
  });

  // Dynamic header styling and active navigation link on scroll
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
      if (window.scrollY >= sectionTop - 120) {
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

  // --- INTERACTIVE SKILLS & PROJECT FILTERING ---
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

  // --- DYNAMIC THEME SWITCHER CONTROLLER ---
  const themeButtons = document.querySelectorAll(".theme-btn");
  
  const applyTheme = (themeName) => {
    // Remove existing themes
    document.body.classList.remove("theme-cyberpunk", "theme-emerald", "theme-sunset");
    
    // Add new theme class (except aurora which is default)
    if (themeName !== "aurora") {
      document.body.classList.add(`theme-${themeName}`);
    }

    // Toggle active state on buttons
    themeButtons.forEach(btn => {
      if (btn.getAttribute("data-theme") === themeName) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    localStorage.setItem("portfolio-theme", themeName);
  };

  // Load Saved Theme
  const savedTheme = localStorage.getItem("portfolio-theme") || "aurora";
  applyTheme(savedTheme);

  // Wire click events
  themeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const selectedTheme = btn.getAttribute("data-theme");
      applyTheme(selectedTheme);
    });
  });

  // --- LIGHTWEIGHT INTERACTIVE CANVAS PARTICLES ---
  const canvas = document.getElementById("particles-canvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let particlesArray = [];
    let numberOfParticles = 75;

    // Mouse interactive radius
    const mouse = {
      x: null,
      y: null,
      radius: 120
    };

    window.addEventListener("mousemove", (event) => {
      mouse.x = event.x;
      mouse.y = event.y;
    });

    window.addEventListener("mouseout", () => {
      mouse.x = null;
      mouse.y = null;
    });

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Adapt particle count to screen size
      if (window.innerWidth < 768) {
        numberOfParticles = 35;
      } else {
        numberOfParticles = 75;
      }
      initParticles();
    };

    window.addEventListener("resize", resizeCanvas);

    // Dynamic color detection
    const getThemeColor = () => {
      return getComputedStyle(document.body).getPropertyValue('--color-primary').trim() || '#38bdf8';
    };

    // Particle Object Blueprint
    class Particle {
      constructor(x, y, directionX, directionY, size) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = getThemeColor();
        ctx.fill();
      }

      update() {
        // Wrap edges instead of bouncing to feel more natural and flowy
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;

        // Interaction with mouse cursor
        if (mouse.x != null && mouse.y != null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            // Soft repel physics
            const force = (mouse.radius - distance) / mouse.radius;
            this.x -= dx / distance * force * 3;
            this.y -= dy / distance * force * 3;
          }
        }

        // Apply constant velocity
        this.x += this.directionX;
        this.y += this.directionY;

        this.draw();
      }
    }

    const initParticles = () => {
      particlesArray = [];
      for (let i = 0; i < numberOfParticles; i++) {
        let size = Math.random() * 2 + 1;
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let directionX = (Math.random() * 0.4) - 0.2;
        let directionY = (Math.random() * 0.4) - 0.2;

        particlesArray.push(new Particle(x, y, directionX, directionY, size));
      }
    };

    const connectParticles = () => {
      let opacity = 1;
      const themeColor = getThemeColor();
      // Match RGB values to support alpha transparency
      let rgb = "56, 189, 248"; // fallback
      if (themeColor.startsWith("#")) {
        // Parse hex to rgb
        const hex = themeColor.slice(1);
        if (hex.length === 6) {
          const r = parseInt(hex.slice(0, 2), 16);
          const g = parseInt(hex.slice(2, 4), 16);
          const b = parseInt(hex.slice(4, 6), 16);
          rgb = `${r}, ${g}, ${b}`;
        }
      } else if (themeColor.startsWith("rgb")) {
        // Strip rgb/rgba wrappers
        rgb = themeColor.match(/\d+,\s*\d+,\s*\d+/)[0];
      }

      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
                       + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));

          // Draw lines between close coordinates
          if (distance < (canvas.width / 9) * (canvas.height / 9)) {
            opacity = 1 - (distance / ((canvas.width / 9) * (canvas.height / 9)));
            ctx.strokeStyle = `rgba(${rgb}, ${opacity * 0.08})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }
      connectParticles();
      requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();
  }
});