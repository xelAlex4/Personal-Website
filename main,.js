// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for scroll animations
const initScrollAnimations = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });
};

// Contact Form Handling
const initContactForm = () => {
    const contactForm = document.querySelector('.contact-form form');
    if (!contactForm) return;

    const formStatus = document.createElement('div');
    formStatus.className = 'form-status';
    formStatus.style.display = 'none';
    contactForm.appendChild(formStatus);

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Show loading state
        formStatus.textContent = 'Sending message...';
        formStatus.style.display = 'block';
        formStatus.style.backgroundColor = '#e3f2fd';
        formStatus.style.color = getComputedStyle(document.documentElement)
            .getPropertyValue('--primary-color');

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                formStatus.textContent = 'Message sent successfully! 🎉';
                formStatus.style.backgroundColor = '#d4edda';
                formStatus.style.color = '#155724';
                contactForm.reset();
                
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 4000);
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error('Form submission error:', error);
            formStatus.textContent = 'Oops! There was a problem sending your message. Please try again.';
            formStatus.style.backgroundColor = '#f8d7da';
            formStatus.style.color = '#721c24';
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        }
    });
};

// Initialize all functionality
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initContactForm();
});