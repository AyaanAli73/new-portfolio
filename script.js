// Updated Data with more projects
const PROJECTS = [
    { id: 1, title: "Rubik's Cube Solver", desc: "Image-based cube face reader + solver UI.", tags: ["Canvas", "JS"], link: "#" },
    { id: 2, title: "Portfolio Template", desc: "Responsive, animated portfolio template.", tags: ["React", "Tailwind"], link: "#" },
    { id: 3, title: "Business Landing", desc: "Conversion-focused landing with analytics.", tags: ["HTML", "CSS"], link: "#" },
    { id: 4, title: "Mini E-commerce Demo", desc: "Product grid & cart prototype.", tags: ["React", "UX"], link: "#" },
    { id: 5, title: "Weather Dashboard", desc: "Real-time weather data visualization.", tags: ["API", "JS", "CSS"], link: "#" },
    { id: 6, title: "To-Do App", desc: "A clean and simple task management app.", tags: ["JS", "HTML", "CSS"], link: "#" },
    { id: 7, title: "Recipe Finder", desc: "Searches for recipes based on ingredients.", tags: ["API", "React"], link: "#" },
    { id: 8, title: "Quiz Game", desc: "A fun, interactive quiz with scoring.", tags: ["JS", "HTML"], link: "#" },
];

// New: Services Data
const SERVICES = [
    { icon: 'fas fa-laptop-code', title: 'Full Stack Development', description: 'Building responsive, high-performance web applications from front-to-back.' },
    { icon: 'fas fa-palette', title: 'UI/UX Design', description: 'Crafting intuitive interfaces that look amazing and feel natural to use.' },
    { icon: 'fas fa-rocket', title: 'Performance Optimization', description: 'Improving website speed and efficiency for a flawless user experience.' },
];

const QUOTES = [
    "Breathe like water — build like code.",
    "Strong code, gentle UI — craft both.",
    "Design with purpose, ship with pride.",
];

// DOM Elements
const header = document.getElementById('main-header'); // NEW
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
const mobileMenu = document.getElementById('mobile-menu');
const mobileCloseButton = document.getElementById('mobile-close-button');
const themeToggle = document.getElementById('theme-toggle');
const searchInput = document.getElementById('search-input');
const projectsGrid = document.getElementById('projects-grid');
const quoteText = document.getElementById('quote-text');
const contactForm = document.getElementById('contact-form');
const formSuccessMessage = document.getElementById('form-success-message'); // NEW
const currentYear = document.getElementById('current-year');
const skillProgressBars = document.querySelectorAll('.skill-progress');
const fadeElements = document.querySelectorAll('.fade-in');
const seeAllButton = document.getElementById('see-all-button');
const projectsModal = document.getElementById('projects-modal');
const modalCloseButton = document.querySelector('.modal-close-button');
const allProjectsGrid = document.getElementById('all-projects-grid');
const servicesGrid = document.getElementById('services-grid');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    currentYear.textContent = new Date().getFullYear();
    renderProjects(PROJECTS.slice(0, 4)); // Render initial projects
    renderServices();
    initAnimations();
    initQuotes();
    initSkillBars();
    initParticles(document.body.classList.contains('dark-mode'));
});

// NEW: Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
mobileMenuButton.addEventListener('click', () => {
    mobileMenuOverlay.classList.add('active');
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
});

mobileCloseButton.addEventListener('click', closeMobileMenu);
mobileMenuOverlay.addEventListener('click', closeMobileMenu);
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

function closeMobileMenu() {
    mobileMenuOverlay.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Theme Toggle
themeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode', !isDark);
    
    themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    
    // This is a placeholder; full particle re-init might be complex
    // For now, we assume particles work okay with either theme.
    // To properly re-init, you'd need to clear the old animation frame and restart.
});

// Search Functionality
searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase().trim();
    const projectsToRender = query ? PROJECTS.filter(project => 
        project.title.toLowerCase().includes(query) ||
        project.desc.toLowerCase().includes(query) ||
        project.tags.some(tag => tag.toLowerCase().includes(query))
    ) : PROJECTS.slice(0, 4); // If search is empty, show first 4
    
    renderProjects(projectsToRender);
});

function renderProjects(projects) {
    projectsGrid.innerHTML = '';
    
    if (projects.length === 0) {
        projectsGrid.innerHTML = '<p class="no-results">No projects found matching your search.</p>';
        return;
    }
    
    projects.forEach(project => {
        const projectEl = document.createElement('div');
        projectEl.className = 'project-card fade-in';
        projectEl.innerHTML = `
            <div class="project-header">
                <div>
                    <h4 class="project-title">${project.title}</h4>
                </div>
                <div class="text-right">
                    <a href="${project.link}" class="project-link">View</a>
                    <div class="project-status">Prototype</div>
                </div>
            </div>
            <p class="project-description">${project.desc}</p>
            <div class="project-tags">
                ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
            </div>
        `;
        projectsGrid.appendChild(projectEl);
    });
    
    // Re-trigger animations for newly added elements
    initAnimations();
}

// Quote Rotation
function initQuotes() {
    if (!quoteText) return;
    let quoteIndex = 0;
    setInterval(() => {
        quoteIndex = (quoteIndex + 1) % QUOTES.length;
        quoteText.textContent = `"${QUOTES[quoteIndex]}"`;
    }, 4500);
}

// Contact Form Submission
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    formSuccessMessage.textContent = 'Demo: Message sent — thanks for reaching out!';
    formSuccessMessage.classList.add('visible');
    
    this.reset();
    
    setTimeout(() => {
        formSuccessMessage.classList.remove('visible');
    }, 4000);
});

// Animations
function initAnimations() {
    const observers = new Map();

    const createObserver = (options, className) => {
        return new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(className);
                }
            });
        }, options);
    };

    const observerOptions = [
        { options: { threshold: 0.1 }, selector: '.fade-in', className: 'visible' },
        { options: { threshold: 0.2 }, selector: '.pop-in', className: 'visible' }
    ];

    observerOptions.forEach(({ options, selector, className }) => {
        if (observers.has(selector)) {
            observers.get(selector).disconnect();
        }
        const observer = createObserver(options, className);
        observers.set(selector, observer);
        document.querySelectorAll(selector).forEach(el => observer.observe(el));
    });
}

// Skill Bars Animation
function initSkillBars() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = `${width}%`;
            }
        });
    }, { threshold: 0.5 });
    
    skillProgressBars.forEach(bar => observer.observe(bar));
}

// Particles Animation (Optimized)
function initParticles(isDark) {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    
    const createParticles = () => {
        particles = [];
        const particleCount = Math.floor((canvas.width * canvas.height) / 20000);
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                radius: 0.5 + Math.random() * 1.5,
                hue: Math.random() > 0.5 ? 340 : 190,
                alpha: 0.2 + Math.random() * 0.6
            });
        }
    };
    
    const drawParticles = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < -10) p.x = canvas.width + 10;
            if (p.x > canvas.width + 10) p.x = -10;
            if (p.y < -10) p.y = canvas.height + 10;
            if (p.y > canvas.height + 10) p.y = -10;
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${p.hue}, 90%, 60%, ${p.alpha})`;
            ctx.fill();
        });
        requestAnimationFrame(drawParticles);
    };
    
    resizeCanvas();
    createParticles();
    drawParticles();
    
    window.addEventListener('resize', () => {
        resizeCanvas();
        createParticles();
    });
}

// Modal Functions
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
        <div class="project-header">
             <h4 class="project-title">${project.title}</h4>
             <a href="${project.link}" class="project-link" target="_blank" rel="noopener noreferrer">View</a>
        </div>
        <p class="project-description">${project.desc}</p>
        <div class="project-tags">
            ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
        </div>
    `;
    return card;
}

function renderAllProjects() {
    allProjectsGrid.innerHTML = '';
    PROJECTS.forEach(project => {
        allProjectsGrid.appendChild(createProjectCard(project));
    });
}

function showModal() {
    projectsModal.style.display = 'flex';
    renderAllProjects();
    document.body.style.overflow = 'hidden';
}

function hideModal() {
    projectsModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

if (seeAllButton) {
    seeAllButton.addEventListener('click', (e) => {
        e.preventDefault();
        showModal();
    });
}
if (modalCloseButton) modalCloseButton.addEventListener('click', hideModal);
projectsModal.addEventListener('click', (e) => {
    if (e.target.id === 'projects-modal') hideModal();
});

// Render Services Dynamically
function renderServices() {
    if (!servicesGrid) return;
    servicesGrid.innerHTML = '';
    SERVICES.forEach((service, index) => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'service-card pop-in';
        serviceCard.style.animationDelay = `${index * 0.1}s`;
        serviceCard.innerHTML = `
            <i class="${service.icon} service-icon"></i>
            <h4 class="service-title">${service.title}</h4>
            <p class="service-description">${service.description}</p>
        `;
        servicesGrid.appendChild(serviceCard);
    });
}
// REMOVED: The stray closing brace '}' that was here.
