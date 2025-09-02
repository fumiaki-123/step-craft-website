// Premium JavaScript for AI Model Photo Website
// Enhanced animations and interactions - Fixed Scroll Issues

document.addEventListener('DOMContentLoaded', function() {
    // Enhanced mobile menu with premium animations
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Enhanced hamburger menu animation
            const spans = mobileMenu.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (navLinks.classList.contains('active')) {
                    if (index === 0) {
                        span.style.transform = 'rotate(45deg) translate(7px, 7px)';
                    } else if (index === 1) {
                        span.style.opacity = '0';
                        span.style.transform = 'translateX(20px)';
                    } else if (index === 2) {
                        span.style.transform = 'rotate(-45deg) translate(7px, -7px)';
                    }
                } else {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                }
            });
        });
    }

    // Fixed smooth scrolling - only for hash links on same page
    const internalLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            const targetElement = document.querySelector(href);
            
            // Only smooth scroll if target exists on current page
            if (targetElement) {
                e.preventDefault();
                const headerHeight = document.querySelector('header')?.offsetHeight || 80;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: Math.max(0, targetPosition),
                    behavior: 'smooth'
                });
            }
        });
    });

    // Handle mobile menu closing for all navigation links
    const navLinksAll = document.querySelectorAll('.nav-links a');
    navLinksAll.forEach(link => {
        link.addEventListener('click', function() {
            // Close mobile menu if open
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const spans = mobileMenu?.querySelectorAll('span');
                spans?.forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            }
        });
    });

    // Fixed scroll-based header styling
    let lastScrollTop = 0;
    let ticking = false;
    const header = document.querySelector('header');
    
    function updateHeader() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class for backdrop blur effect
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header on scroll (disabled for now to prevent conflicts)
        // if (scrollTop > lastScrollTop && scrollTop > 200) {
        //     header.style.transform = 'translateY(-100%)';
        // } else {
        //     header.style.transform = 'translateY(0)';
        // }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        ticking = false;
        
        // Update progress bar
        updateProgressBar();
    }

    function requestHeaderUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestHeaderUpdate);

    // Enhanced intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const animationObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animations for grid items
                setTimeout(() => {
                    entry.target.classList.add('fade-in-up');
                    
                    // Add special effects for different elements
                    if (entry.target.classList.contains('feature-card')) {
                        entry.target.style.animationDelay = `${index * 0.1}s`;
                    }
                    
                    // Trigger number animations for stats
                    if (entry.target.classList.contains('stat-number')) {
                        animateNumber(entry.target);
                    }
                }, index * 100);
                
                animationObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .pricing-card, .portfolio-item, .section-title, .stat-number');
    animateElements.forEach(el => {
        animationObserver.observe(el);
    });

    // Enhanced form handling
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitButton = form.querySelector('button[type="submit"]') || form.querySelector('input[type="submit"]');
            if (!submitButton) return;
            
            const originalText = submitButton.textContent || submitButton.value;
            
            // Premium loading animation
            if (submitButton.tagName === 'BUTTON') {
                submitButton.innerHTML = `
                    <span style="display: inline-flex; align-items: center; gap: 0.5rem;">
                        <span class="loading-spinner"></span>
                        送信中...
                    </span>
                `;
            } else {
                submitButton.value = '送信中...';
            }
            
            submitButton.disabled = true;
            submitButton.style.opacity = '0.8';
            
            // Simulate form submission
            setTimeout(() => {
                showNotification('お問い合わせありがとうございます。3営業日以内にご連絡いたします。', 'success');
                form.reset();
                
                if (submitButton.tagName === 'BUTTON') {
                    submitButton.innerHTML = originalText;
                } else {
                    submitButton.value = originalText;
                }
                
                submitButton.disabled = false;
                submitButton.style.opacity = '1';
            }, 2000);
        });
    });

    // Enhanced counter animation
    function animateNumber(element) {
        const target = parseInt(element.dataset.count) || 0;
        const duration = 2000;
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeOutCubic * target);
            
            element.textContent = current.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        requestAnimationFrame(update);
    }

    // Portfolio filtering with smooth animations
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Animate portfolio items
            portfolioItems.forEach((item, index) => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    setTimeout(() => {
                        item.style.display = 'block';
                        item.style.animation = 'fadeInUp 0.6s ease-out forwards';
                    }, index * 50);
                } else {
                    item.style.animation = 'fadeOut 0.3s ease-out forwards';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Enhanced pricing calculator
    const priceCalculator = document.querySelector('#price-calculator');
    if (priceCalculator) {
        const inputs = priceCalculator.querySelectorAll('input, select');
        const totalPriceElement = document.querySelector('#total-price');
        
        function calculatePrice() {
            let basePrice = 39800;
            let total = basePrice;
            
            // Get values safely
            const additionalImages = parseInt(document.querySelector('#additional-images')?.value) || 0;
            const additionalModels = parseInt(document.querySelector('#additional-models')?.value) || 0;
            const rushDelivery = document.querySelector('#rush-delivery')?.checked || false;
            const retouching = document.querySelector('#retouching')?.checked || false;
            
            // Calculate total
            total += additionalImages * 5000;
            total += additionalModels * 8000;
            if (rushDelivery) total += 10000;
            if (retouching) total += 15000;
            
            // Animate price change
            if (totalPriceElement) {
                animatePriceChange(totalPriceElement, total);
            }
        }
        
        inputs.forEach(input => {
            input.addEventListener('change', calculatePrice);
        });
        
        calculatePrice();
    }

    // Fixed FAQ accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            // Initialize answer height
            answer.style.maxHeight = '0';
            answer.style.overflow = 'hidden';
            answer.style.transition = 'max-height 0.3s ease-out';
            
            question.addEventListener('click', function() {
                const isOpen = item.classList.contains('active');
                
                // Close other FAQs
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        if (otherAnswer) {
                            otherAnswer.style.maxHeight = '0';
                            otherItem.classList.remove('active');
                        }
                    }
                });
                
                // Toggle current FAQ
                if (isOpen) {
                    answer.style.maxHeight = '0';
                    item.classList.remove('active');
                } else {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    item.classList.add('active');
                }
            });
        }
    });

    // Removed problematic parallax effect - keeping hero sections static
    // This was causing scroll performance issues

    // Add loading spinner styles dynamically
    if (!document.querySelector('#spinner-styles')) {
        const style = document.createElement('style');
        style.id = 'spinner-styles';
        style.textContent = `
            .loading-spinner {
                width: 16px;
                height: 16px;
                border: 2px solid transparent;
                border-top: 2px solid currentColor;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            @keyframes fadeOut {
                from { opacity: 1; transform: translateY(0); }
                to { opacity: 0; transform: translateY(-20px); }
            }
        `;
        document.head.appendChild(style);
    }
});

// Utility functions
function animatePriceChange(element, newPrice) {
    element.style.transform = 'scale(1.1)';
    element.style.color = 'var(--accent-gold)';
    
    setTimeout(() => {
        element.textContent = `¥${newPrice.toLocaleString()}`;
        element.style.transform = 'scale(1)';
        element.style.color = '';
    }, 150);
}

function showNotification(message, type = 'info') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 2rem;
        background: var(--gradient-accent);
        color: var(--primary-dark);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-2xl);
        z-index: 10001;
        font-weight: 600;
        transform: translateX(400px);
        transition: transform 0.3s ease-out;
        max-width: 400px;
        font-family: var(--font-body);
        font-size: 14px;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    requestAnimationFrame(() => {
        notification.style.transform = 'translateX(0)';
    });
    
    // Animate out
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification && notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

function updateProgressBar() {
    const progressBar = document.querySelector('.progress-bar');
    if (!progressBar) return;
    
    try {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = Math.max(
            document.documentElement.scrollHeight,
            document.body.scrollHeight,
            document.documentElement.offsetHeight,
            document.body.offsetHeight
        );
        
        const scrollableHeight = documentHeight - windowHeight;
        
        if (scrollableHeight <= 0) {
            progressBar.style.width = '0%';
            return;
        }
        
        const progress = Math.min(100, Math.max(0, (scrollTop / scrollableHeight) * 100));
        progressBar.style.width = progress + '%';
    } catch (error) {
        // Error handling - set to 0 if calculation fails
        progressBar.style.width = '0%';
    }
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

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

// Enhanced window resize handling
window.addEventListener('resize', debounce(function() {
    const navLinks = document.querySelector('.nav-links');
    if (window.innerWidth > 768 && navLinks) {
        navLinks.classList.remove('active');
        
        // Reset hamburger menu
        const mobileMenu = document.querySelector('.mobile-menu');
        if (mobileMenu) {
            const spans = mobileMenu.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        }
    }
    
    // Recalculate progress bar on resize
    updateProgressBar();
}, 250));

// Initialize on load
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Update progress bar initially
    updateProgressBar();
    
    // Trigger initial animations
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero h1');
        if (heroTitle) {
            heroTitle.style.animation = 'fadeInUp 1s ease-out forwards';
        }
    }, 500);
});