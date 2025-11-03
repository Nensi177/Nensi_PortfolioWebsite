// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 33, 0.98)';
    } else {
        navbar.style.background = 'rgba(0, 0, 33, 0.95)';
    }
});

// Enhanced skill bar animations
const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
        if (!bar.classList.contains('animated')) {
            const width = bar.getAttribute('data-width');
            setTimeout(() => {
                bar.style.width = width;
                bar.style.boxShadow = `0 0 20px rgba(0, 255, 255, 0.5), inset 0 0 10px rgba(255, 255, 255, 0.1)`;
            }, index * 300);
            bar.classList.add('animated');
        }
    });
};

// Enhanced circular skills animation
const animateCircularSkills = () => {
    const circles = document.querySelectorAll('.circle');
    circles.forEach((circle, index) => {
        if (!circle.classList.contains('animated')) {
            setTimeout(() => {
                const percent = circle.getAttribute('data-percent');
                if (percent) {
                    const degree = (percent / 100) * 360;
                    let currentDegree = 0;
                    
                    const animation = setInterval(() => {
                        if (currentDegree >= degree) {
                            clearInterval(animation);
                            circle.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.4)';
                            return;
                        }
                        currentDegree += 3;
                        const gradient = `conic-gradient(#00ffff 0deg, #ff00ff ${currentDegree}deg, rgba(255, 255, 255, 0.1) ${currentDegree}deg)`;
                        circle.style.background = gradient;
                    }, 20);
                }
                circle.classList.add('animated');
            }, index * 400);
        }
    });
};

// Fade in animation for sections
const fadeInElements = () => {
    const elements = document.querySelectorAll('.fade-in');
    
    elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100;
        
        if (isVisible) {
            element.classList.add('visible');
        }
    });
};



// Intersection Observer for skills animations
const setupSkillsObserver = () => {
    const skillsSection = document.querySelector('.skills');
    if (!skillsSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !skillsSection.classList.contains('animated')) {
            skillsSection.classList.add('animated');
            animateSkillBars();
            animateCircularSkills();
            observer.unobserve(skillsSection);
        }
    }, { threshold: 0.3 });
    
    observer.observe(skillsSection);
};

// Optimized scroll event listener
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            fadeInElements();
            ticking = false;
        });
        ticking = true;
    }
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
    contactForm.reset();
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#00ffff' : '#ff4444'};
        color: ${type === 'success' ? '#000021' : '#ffffff'};
        padding: 1rem 2rem;
        border-radius: 8px;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Enhanced typing animation for tagline
function initTaglineAnimation() {
    const tagline = document.getElementById('animated-tagline');
    if (!tagline) return;
    
    const text = 'Aspiring Web Developer | Front-End Enthusiast';
    tagline.textContent = '';
    tagline.style.borderRight = '2px solid #00ffff';
    tagline.style.animation = 'blink-caret 0.75s step-end infinite';
    
    let i = 0;
    const typeSpeed = 100;
    
    function typeChar() {
        if (i < text.length) {
            tagline.textContent += text.charAt(i);
            i++;
            setTimeout(typeChar, typeSpeed);
        } else {
            setTimeout(() => {
                tagline.style.borderRight = 'none';
            }, 2000);
        }
    }
    
    setTimeout(typeChar, 1500);
}



// Add 3D hover effect to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        this.style.transform = `translateY(-15px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotateX(0deg) rotateY(0deg)';
    });
});

// Add 3D tilt effect to stats cards
document.querySelectorAll('.stat').forEach(stat => {
    stat.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 8;
        const rotateY = (centerX - x) / 8;
        
        this.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    stat.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotateX(0deg) rotateY(0deg)';
    });
});



// Add 3D click effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mousedown', function() {
        this.style.transform = 'translateY(-3px) rotateX(5deg) scale(0.98)';
    });
    
    button.addEventListener('mouseup', function() {
        this.style.transform = 'translateY(-5px) rotateX(10deg) scale(1)';
    });
    
    button.addEventListener('click', function(e) {
        // Create 3D ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0) translateZ(10px);
            animation: ripple-3d 0.6s linear;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add dynamic styles for enhanced animations
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    @keyframes ripple-3d {
        to {
            transform: scale(4) translateZ(20px);
            opacity: 0;
        }
    }
    
    .btn:active {
        transform: translateY(-3px) rotateX(5deg) scale(0.98) !important;
    }
    
    .skills.animated .technical-skills h3,
    .skills.animated .soft-skills h3 {
        animation: glow-text 2s ease-in-out infinite alternate;
    }
    
    .skills.animated .skill {
        animation: slideInLeft 0.8s ease forwards;
    }
    
    .skills.animated .circle-skill {
        animation: slideInUp 0.8s ease forwards;
    }
    
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(dynamicStyles);

// Initialize all animations on page load
document.addEventListener('DOMContentLoaded', () => {
    // Reset skill bars to 0 width initially
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        bar.style.width = '0';
        bar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
    });
    
    // Add fade-in class to sections
    const sections = document.querySelectorAll('section > .container, section > .home-container');
    sections.forEach(section => {
        section.classList.add('fade-in');
    });
    
    // Initialize animations
    setupSkillsObserver();
    initTaglineAnimation();
    
    setTimeout(() => {
        fadeInElements();
    }, 500);
});

// Optimized active navigation highlighting
let navTicking = false;
window.addEventListener('scroll', () => {
    if (!navTicking) {
        requestAnimationFrame(() => {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-link');
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
            
            navTicking = false;
        });
        navTicking = true;
    }
});

