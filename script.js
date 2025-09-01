// Header scroll effect
const header = document.querySelector('.header');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
        header.classList.add('scrolled');
        header.classList.remove('transparent');
    } else {
        header.classList.add('transparent');
        header.classList.remove('scrolled');
    }
    
    lastScrollY = currentScrollY;
});

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const nav = document.querySelector('.nav');

mobileMenuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Hero carousel
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

// Hero navigation
document.querySelector('.hero-nav-btn.next').addEventListener('click', nextSlide);
document.querySelector('.hero-nav-btn.prev').addEventListener('click', prevSlide);

// Hero dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// Auto-advance hero carousel
setInterval(nextSlide, 5000);

// Flavors carousel
let currentFlavorIndex = 0;
const flavorsContainer = document.querySelector('.flavors-container');
const flavorCards = document.querySelectorAll('.flavor-card');
const flavorsPerView = window.innerWidth > 768 ? 3 : 1;
const totalFlavors = flavorCards.length;

function updateFlavorsPosition() {
    const cardWidth = 320; // 300px + 20px gap
    const translateX = -currentFlavorIndex * cardWidth;
    flavorsContainer.style.transform = `translateX(${translateX}px)`;
}

function nextFlavors() {
    const maxIndex = Math.max(0, totalFlavors - flavorsPerView);
    currentFlavorIndex = Math.min(currentFlavorIndex + 1, maxIndex);
    updateFlavorsPosition();
}

function prevFlavors() {
    currentFlavorIndex = Math.max(0, currentFlavorIndex - 1);
    updateFlavorsPosition();
}

document.querySelector('.flavors-nav.next').addEventListener('click', nextFlavors);
document.querySelector('.flavors-nav.prev').addEventListener('click', prevFlavors);

// Testimonials carousel
let currentTestimonialIndex = 0;
const testimonialsContainer = document.querySelector('.testimonials-container');
const testimonials = document.querySelectorAll('.testimonial');
const testimonialsPerView = window.innerWidth > 768 ? 2 : 1;
const totalTestimonials = testimonials.length;

function updateTestimonialsPosition() {
    const testimonialWidth = 420; // 400px + 20px gap
    const translateX = -currentTestimonialIndex * testimonialWidth;
    testimonialsContainer.style.transform = `translateX(${translateX}px)`;
}

function nextTestimonials() {
    const maxIndex = Math.max(0, totalTestimonials - testimonialsPerView);
    currentTestimonialIndex = Math.min(currentTestimonialIndex + 1, maxIndex);
    updateTestimonialsPosition();
}

function prevTestimonials() {
    currentTestimonialIndex = Math.max(0, currentTestimonialIndex - 1);
    updateTestimonialsPosition();
}

document.querySelector('.testimonials-nav.next').addEventListener('click', nextTestimonials);
document.querySelector('.testimonials-nav.prev').addEventListener('click', prevTestimonials);

// Product interactions
let cartCount = 0;
const cartCountElement = document.querySelector('.cart-count');

function addToCart(productName) {
    cartCount++;
    cartCountElement.textContent = cartCount;
    showNotification(`${productName} added to cart!`);
}

// Add to cart buttons
document.querySelectorAll('.flavor-card .btn-primary').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const productName = e.target.closest('.flavor-card').querySelector('h3').textContent;
        addToCart(productName);
    });
});

document.querySelectorAll('.mixed-option .btn-primary').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const productName = e.target.closest('.mixed-option').querySelector('h4').textContent;
        addToCart(productName);
    });
});

// CTA buttons
document.querySelectorAll('.cta-section .btn-primary').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        showNotification('Redirecting to shop...');
        // Here you would redirect to the shop page
    });
});

document.querySelectorAll('.cta-section .btn-secondary').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        showNotification('Finding stores near you...');
        // Here you would redirect to store locator
    });
});

// Notification system
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notification-text');
    
    notificationText.textContent = message;
    notification.className = `notification ${type}`;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Close notification
document.getElementById('notification-close').addEventListener('click', () => {
    document.getElementById('notification').classList.remove('show');
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

// Initialize header state
window.addEventListener('load', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.add('transparent');
    }
});

// Handle window resize for carousels
window.addEventListener('resize', () => {
    // Update flavors carousel
    const newFlavorsPerView = window.innerWidth > 768 ? 3 : 1;
    if (newFlavorsPerView !== flavorsPerView) {
        currentFlavorIndex = Math.min(currentFlavorIndex, Math.max(0, totalFlavors - newFlavorsPerView));
        updateFlavorsPosition();
    }
    
    // Update testimonials carousel
    const newTestimonialsPerView = window.innerWidth > 768 ? 2 : 1;
    if (newTestimonialsPerView !== testimonialsPerView) {
        currentTestimonialIndex = Math.min(currentTestimonialIndex, Math.max(0, totalTestimonials - newTestimonialsPerView));
        updateTestimonialsPosition();
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.crafted-item, .feature, .process-step, .flavor-card, .promise-item, .testimonial').forEach(el => {
    observer.observe(el);
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .crafted-item, .feature, .process-step, .flavor-card, .promise-item, .testimonial {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .crafted-item.animate-in, .feature.animate-in, .process-step.animate-in, 
    .flavor-card.animate-in, .promise-item.animate-in, .testimonial.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .nav.active {
        display: block;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        padding: 1rem;
    }
    
    .nav.active .nav-list {
        flex-direction: column;
        gap: 1rem;
    }
    
    .mobile-menu-toggle.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .mobile-menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-toggle.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
`;
document.head.appendChild(style);
