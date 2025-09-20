// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollAnimations();
    initTypingEffect();
    initContactForm();
    initSmoothScrolling();
    initScrollIndicator();
    initProfileImageEffect();
    initResponsiveHandlers();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active nav link based on scroll position
        updateActiveNavLink();
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add animation classes and observe elements
    const animationElements = [
        { selector: '.about-content > *', animation: 'fade-in', delay: true },
        { selector: '.project-card', animation: 'fade-in', delay: true },
        { selector: '.timeline-item', animation: 'slide-in-left', delay: true },
        { selector: '.contact-content > *', animation: 'fade-in', delay: true },
        { selector: '.skill-category', animation: 'slide-in-right', delay: true },
        { selector: '.hero-content > *', animation: 'fade-in', delay: true },
        { selector: '.social-link', animation: 'fade-in', delay: true }
    ];

    animationElements.forEach(({ selector, animation, delay }) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, index) => {
            element.classList.add(animation);
            if (delay) {
                element.style.transitionDelay = `${index * 0.1}s`;
            }
            observer.observe(element);
        });
    });
}

// Typing effect for hero subtitle
function initTypingEffect() {
    const typingText = document.querySelector('.typing-text');
    const cursor = document.querySelector('.cursor');
    
    if (!typingText) return;

    const titles = [
        'Data Science Student',
        'Problem Solver',
        'Team Leader',
        'Tech Enthusiast'
    ];
    
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeWriter() {
        const currentTitle = titles[titleIndex];
        
        if (isDeleting) {
            typingText.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentTitle.length) {
            typingSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typingSpeed = 500; // Pause before new word
        }

        setTimeout(typeWriter, typingSpeed);
    }

    // Start typing effect after a short delay
    setTimeout(typeWriter, 1000);
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        // Basic validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }

        // Simulate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        // Simulate API call
        setTimeout(() => {
            showNotification('Thank you! Your message has been sent successfully.', 'success');
            contactForm.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px',
        wordWrap: 'break-word'
    });

    // Set background color based on type
    const colors = {
        success: '#10B981',
        error: '#EF4444',
        info: '#3B82F6'
    };
    notification.style.backgroundColor = colors[type] || colors.info;

    // Add to DOM and animate in
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll indicator functionality
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (!scrollIndicator) return;

    scrollIndicator.addEventListener('click', () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    });

    // Hide scroll indicator when scrolling down
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 200) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.visibility = 'hidden';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.visibility = 'visible';
        }
    });
}

// Enhanced profile image interaction
function initProfileImageEffect() {
    const profileImage = document.querySelector('.profile-image');
    
    if (!profileImage) return;
    
    profileImage.addEventListener('mouseenter', () => {
        profileImage.style.transform = 'scale(1.1)';
        profileImage.style.transition = 'transform 0.3s ease';
    });
    
    profileImage.addEventListener('mouseleave', () => {
        profileImage.style.transform = 'scale(1.05)';
    });

    // Add click effect
    profileImage.addEventListener('click', () => {
        showNotification('👋 Thanks for checking out my portfolio!', 'info');
    });
}

// Parallax effect for hero section
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    const profileContainer = document.querySelector('.profile-image-container');
    
    if (!hero || !profileContainer) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const rate = scrollTop * -0.3;
        
        profileContainer.style.transform = `translateY(${rate}px)`;
    });
}

// Initialize parallax effect
initParallaxEffect();

// Skill tags interaction
document.addEventListener('DOMContentLoaded', function() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('click', () => {
            const skill = tag.textContent;
            showNotification(`${skill} is one of my core technical skills!`, 'info');
        });
    });
});

// Project card interactions
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Add subtle animation on hover
        card.addEventListener('mouseenter', () => {
            const techTags = card.querySelectorAll('.tech-tag');
            techTags.forEach((tag, index) => {
                setTimeout(() => {
                    tag.style.transform = 'translateY(-2px)';
                    tag.style.transition = 'transform 0.2s ease';
                }, index * 50);
            });
        });
        
        card.addEventListener('mouseleave', () => {
            const techTags = card.querySelectorAll('.tech-tag');
            techTags.forEach(tag => {
                tag.style.transform = '';
            });
        });
    });
});

// Timeline item animations
document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.3 });

    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        timelineObserver.observe(item);
    });
});

// Social links interaction - removed conflicting hover animations
// The CSS hover effects are sufficient

// Add pulse animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .notification {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    
    .notification-success {
        background: linear-gradient(135deg, #10B981, #059669) !important;
    }
    
    .notification-error {
        background: linear-gradient(135deg, #EF4444, #DC2626) !important;
    }
    
    .notification-info {
        background: linear-gradient(135deg, #3B82F6, #2563EB) !important;
    }
`;
document.head.appendChild(style);

// Contact methods interaction
document.addEventListener('DOMContentLoaded', function() {
    const contactMethods = document.querySelectorAll('.contact-method');
    
    contactMethods.forEach(method => {
        method.addEventListener('click', (e) => {
            const methodType = method.querySelector('h4').textContent;
            
            // Add visual feedback
            method.style.transform = 'translateX(15px) scale(1.02)';
            setTimeout(() => {
                method.style.transform = '';
            }, 200);
            
            // Show notification for non-link contact methods
            if (!method.href || method.href === '#') {
                e.preventDefault();
                showNotification(`${methodType} contact information copied to clipboard!`, 'success');
            }
        });
    });
});

// Form input animations
document.addEventListener('DOMContentLoaded', function() {
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.style.transform = 'translateY(-2px)';
            input.style.boxShadow = '0 4px 12px rgba(255, 214, 10, 0.2)';
        });
        
        input.addEventListener('blur', () => {
            input.style.transform = '';
            input.style.boxShadow = '';
        });
        
        // Add floating label effect
        input.addEventListener('input', () => {
            if (input.value.length > 0) {
                input.style.borderColor = 'var(--primary-yellow)';
            } else {
                input.style.borderColor = '';
            }
        });
    });
});

// Scroll progress indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-yellow), var(--dark-yellow));
        z-index: 10000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        
        progressBar.style.width = `${Math.min(scrollPercent, 100)}%`;
    });
}

// Initialize scroll progress
initScrollProgress();

// Achievement badges animation
document.addEventListener('DOMContentLoaded', function() {
    const badges = document.querySelectorAll('.achievement-badge');
    
    const badgeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'bounceIn 0.6s ease';
            }
        });
    }, { threshold: 0.8 });
    
    badges.forEach(badge => {
        badgeObserver.observe(badge);
    });
});

// Add bounceIn animation
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes bounceIn {
        0% { 
            transform: scale(0.3);
            opacity: 0;
        }
        50% { 
            transform: scale(1.05);
            opacity: 1;
        }
        70% { 
            transform: scale(0.9);
        }
        100% { 
            transform: scale(1);
        }
    }
    
    @keyframes slideInUp {
        from {
            transform: translateY(30px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    .hero-buttons .btn:nth-child(1) {
        animation: slideInUp 0.8s ease 0.5s both;
    }
    
    .hero-buttons .btn:nth-child(2) {
        animation: slideInUp 0.8s ease 0.7s both;
    }
    
    .hero-buttons .btn:nth-child(3) {
        animation: slideInUp 0.8s ease 0.9s both;
    }
    
    .hero-buttons .btn:nth-child(4) {
        animation: slideInUp 0.8s ease 1.1s both;
    }
    
`;
document.head.appendChild(additionalStyles);

// Easter egg functionality
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        triggerEasterEgg();
        konamiCode = [];
    }
});

function triggerEasterEgg() {
    // Create confetti effect
    const colors = ['#FFD60A', '#FFE066', '#FFED4A', '#F9C74F'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            createConfetti(colors[Math.floor(Math.random() * colors.length)]);
        }, i * 50);
    }
    
    showNotification('🎉 You found the Easter egg! Thanks for exploring my portfolio!', 'success');
}

function createConfetti(color) {
    const confetti = document.createElement('div');
    confetti.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: ${color};
        top: -10px;
        left: ${Math.random() * window.innerWidth}px;
        z-index: 10000;
        border-radius: 50%;
        pointer-events: none;
        animation: confettiFall 3s linear forwards;
    `;
    
    document.body.appendChild(confetti);
    
    setTimeout(() => {
        if (confetti.parentNode) {
            confetti.parentNode.removeChild(confetti);
        }
    }, 3000);
}

// Add confetti animation
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confettiFall {
        to {
            transform: translateY(${window.innerHeight + 20}px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyle);

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    updateActiveNavLink();
}, 100);

window.addEventListener('scroll', throttledScrollHandler);

// Preload images for better performance
function preloadImages() {
    const images = [
        // Add any image URLs that need preloading
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize preloading
preloadImages();

// Responsive handlers
function initResponsiveHandlers() {
    // Handle window resize for responsive adjustments
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            handleResponsiveAdjustments();
        }, 250);
    });
    
    // Initial call
    handleResponsiveAdjustments();
}

function handleResponsiveAdjustments() {
    const windowWidth = window.innerWidth;
    const isMobile = windowWidth <= 768;
    const isTablet = windowWidth > 768 && windowWidth <= 1024;
    const isDesktop = windowWidth > 1024;
    
    // Adjust typing effect speed based on screen size
    const typingText = document.querySelector('.typing-text');
    if (typingText && isMobile) {
        // Faster typing on mobile for better UX
        typingSpeed = 80;
    }
    
    // Adjust profile image hover effects for touch devices
    const profileImage = document.querySelector('.profile-image');
    if (profileImage && isMobile) {
        // Remove hover effects on mobile to prevent sticky hover states
        profileImage.style.transition = 'transform 0.3s ease';
    }
    
    // Ensure proper spacing for social links on different screen sizes
    const socialLinks = document.querySelector('.social-links');
    if (socialLinks) {
        if (isMobile) {
            socialLinks.style.marginTop = '-var(--spacing-base)';
        } else {
            socialLinks.style.marginTop = '-var(--spacing-lg)';
        }
    }
    
    // Adjust button layout for very small screens
    const heroButtons = document.querySelector('.hero-buttons');
    const heroButtonsSecondRow = document.querySelector('.hero-buttons-second-row');
    
    if (windowWidth <= 480) {
        if (heroButtons) {
            heroButtons.style.flexDirection = 'column';
            heroButtons.style.alignItems = 'stretch';
        }
        if (heroButtonsSecondRow) {
            heroButtonsSecondRow.style.alignItems = 'stretch';
        }
    } else {
        if (heroButtons) {
            heroButtons.style.flexDirection = 'row';
            heroButtons.style.alignItems = 'center';
        }
        if (heroButtonsSecondRow) {
            heroButtonsSecondRow.style.alignItems = 'flex-start';
        }
    }
}

// Console message for developers
console.log(`
%c👋 Hello, Developer!
%cThanks for checking out my portfolio's code!
%cBuilt with vanilla HTML, CSS, and JavaScript
%cFeel free to reach out if you have any questions!

%c- May Sabai
`, 
'color: #FFD60A; font-size: 16px; font-weight: bold;',
'color: #666; font-size: 14px;',
'color: #666; font-size: 12px;',
'color: #666; font-size: 12px;',
'color: #FFD60A; font-size: 12px; font-weight: bold;'
);