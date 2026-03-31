// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu ul li a');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // Close mobile menu when clicking on a link
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Animate sections when they come into view
    const animateSections = function() {
        const sections = document.querySelectorAll('.animate-section');
        const productCards = document.querySelectorAll('.producto-card');
        const socialIcons = document.querySelectorAll('.social-icon');
        const whatsappBtn = document.querySelector('.btn-whatsapp-grande');
        const horarioItems = document.querySelectorAll('.horario-item');
        const destacadoItems = document.querySelectorAll('.destacado-item');
        const destinosEnvioItems = document.querySelectorAll('.destinos-envio li');
        
        // Function to check if element is in viewport
        const isInViewport = function(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
                rect.bottom >= 0
            );
        };
        
        // Check animate sections
        sections.forEach(section => {
            if (isInViewport(section)) {
                section.classList.add('visible');
            }
        });
        
        // Check product cards
        productCards.forEach((card, index) => {
            if (isInViewport(card) && !card.classList.contains('animated')) {
                card.style.animation = `fadeInUp 0.8s ease forwards ${index * 0.2}s`;
                card.classList.add('animated');
            }
        });
        
        // Check social icons
        socialIcons.forEach(icon => {
            if (isInViewport(icon) && !icon.classList.contains('animated')) {
                icon.style.animation = `fadeInUp 0.5s ease forwards ${icon.style.getPropertyValue('--i') * 0.1}s`;
                icon.classList.add('animated');
            }
        });

        // Check whatsapp button
        if (whatsappBtn && isInViewport(whatsappBtn) && !whatsappBtn.classList.contains('animated')) {
            whatsappBtn.style.animation = 'fadeInUp 0.8s ease forwards';
            whatsappBtn.classList.add('animated');
        }
        
        // Check horario items
        horarioItems.forEach((item, index) => {
            if (isInViewport(item) && !item.classList.contains('animated')) {
                item.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.1}s`;
                item.classList.add('animated');
            }
        });
        
        // Check destacado items
        destacadoItems.forEach((item, index) => {
            if (isInViewport(item) && !item.classList.contains('animated')) {
                item.style.animation = `fadeInUp 0.8s ease forwards ${index * 0.2}s`;
                item.classList.add('animated');
            }
        });
        
        // Check destinos envio items
        destinosEnvioItems.forEach((item, index) => {
            if (isInViewport(item) && !item.classList.contains('animated')) {
                const delay = Math.min(index * 0.03, 1.5); // Cap max delay at 1.5s
                item.style.animation = `fadeInRight 0.5s ease forwards ${delay}s`;
                item.classList.add('animated');
            }
        });
    };
    
    // Run animation check on scroll
    window.addEventListener('scroll', animateSections);
    
    // Run once on page load
    animateSections();
    
    // Header scroll effect - update on scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 5px 20px rgba(221, 105, 155, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add hover effect to product cards
    const productImgs = document.querySelectorAll('.producto-img');
    productImgs.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.querySelector('img').style.transform = 'scale(1.1) rotate(1deg)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.querySelector('img').style.transform = 'scale(1)';
        });
    });
    
    // Initialize hero section particles effect
    const heroSection = document.getElementById('hero');
    
    if (heroSection) {
        // Create sparkle particles
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.classList.add('sparkle-particle');
            
            // Random position, size and animation delay
            const size = Math.random() * 8 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            particle.style.animationDuration = `${Math.random() * 3 + 4}s`;
            
            heroSection.appendChild(particle);
        }
    }
    
    // Add floating animation to product cards on scroll
    const addFloatingEffect = function() {
        const cards = document.querySelectorAll('.producto-card');
        const destacadoItems = document.querySelectorAll('.destacado-item');
        
        cards.forEach((card, index) => {
            const scrollPos = window.scrollY;
            const speed = 0.03;
            const offset = index * 10;
            
            if (isElementInViewport(card)) {
                card.style.transform = `translateY(${Math.sin((scrollPos + offset) * speed) * 8}px)`;
            }
        });
        
        // Add subtle floating effect to destacado items
        destacadoItems.forEach((item, index) => {
            if (item.classList.contains('animated')) {
                const scrollPos = window.scrollY;
                const speed = 0.02;
                const offset = index * 15;
                
                if (isElementInViewport(item)) {
                    const sinValue = Math.sin((scrollPos + offset) * speed);
                    item.style.transform = `translateY(${sinValue * 5}px)`;
                }
            }
        });
    };
    
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    // Only add floating animation if not on mobile
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', addFloatingEffect);
    }
    
    // Fix WhatsApp links to include phone number (you would need to update with your actual number)
    const whatsappLinks = document.querySelectorAll('.btn-whatsapp-grande');
    const phoneNumber = '1234567890'; // Replace with actual phone number
    
    whatsappLinks.forEach(link => {
        const currentHref = link.getAttribute('href');
        link.setAttribute('href', currentHref.replace('https://wa.me/', `https://wa.me/${phoneNumber}`));
    });
    
    // Animate testimonials on hover
    const testimonioItems = document.querySelectorAll('.testimonio-item');
    testimonioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(221, 105, 155, 0.1)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
        });
    });

    // Add pulse effect to section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        title.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        title.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Add animation for destinos-envio items on hover
    const destinosItems = document.querySelectorAll('.destinos-envio li');
    destinosItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.color = '#dd699b';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.color = '';
        });
    });
}); 