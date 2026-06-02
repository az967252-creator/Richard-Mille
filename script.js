/**
 * Richard Mille Website - Interactive Features
 * Handles: Navigation, Scroll Animations, Mobile Menu, Video Fallback
 */

document.addEventListener('DOMContentLoaded', function () {

    // ==========================================
    // SPLASH SCREEN LOGIC
    // ==========================================
    const splashScreen = document.getElementById('splashScreen');
    const enterBtn = document.getElementById('enterBtn');
    const heroVideo = document.getElementById('heroVideo');
    
    // Ensure video doesn't play automatically if not desired when splash is visible
    if (splashScreen && heroVideo) {
        heroVideo.pause();
        heroVideo.currentTime = 0;
    }
    
    if (splashScreen) {
        document.body.classList.add('splash-active');
        
        function dismissSplash() {
            splashScreen.classList.add('hidden');
            document.body.classList.remove('splash-active');
            window.scrollTo({ top: 0, behavior: 'auto' }); // Scroll directly to hero immediately
            
            // Start video immediately for zero delay
            if (heroVideo) {
                heroVideo.play().catch(e => console.log('Video play prevented', e));
            }
            
            // Wait for transition to complete before completely hiding the element
            setTimeout(() => {
                splashScreen.style.display = 'none';
            }, 1000); // Wait partially through transition
        }
        
        if (enterBtn) {
            enterBtn.addEventListener('click', dismissSplash);
        }
    } else {
        // Fallback for when there's no splash screen
        if (heroVideo) {
            heroVideo.play().catch(e => console.log('Video play prevented', e));
        }
    }

    // ==========================================
    // HEADER SCROLL EFFECT
    // ==========================================
    const header = document.getElementById('header');
    const hero = document.getElementById('hero');

    function handleHeaderScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleHeaderScroll);
    handleHeaderScroll();


    // ==========================================
    // MOBILE MENU TOGGLE
    // ==========================================
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });


    // ==========================================
    // SMOOTH SCROLL FOR NAVIGATION LINKS
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });


    // ==========================================
    // SCROLL ANIMATIONS (FADE IN)
    // ==========================================
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        observer.observe(element);
    });


    // ==========================================
    // VIDEO FALLBACK FOR SLOW CONNECTIONS
    // ==========================================

    heroVideo.addEventListener('error', function () {
        // Video failed to load, show fallback
        console.log('Video failed to load, showing fallback');
        // You can add a fallback background image here via CSS
    });

    // If video can't play, show error state
    heroVideo.addEventListener('stalled', function () {
        console.log('Video is stalling, may show fallback soon');
    });

    // ==========================================
    // VIDEO WATCH NAME DISPLAY
    // ==========================================
    const heroWatchName = document.getElementById('heroWatchName');

    // Watches to display based on video progress
    const watches = [
        { name: 'RM 11-03', subtitle: 'Automatic Chronograph', price: 'From CHF 195,000' },
        { name: 'RM 035', subtitle: 'Worldtimer Manual Winding', price: 'From CHF 165,000' },
        { name: 'RM 07-01', subtitle: 'Automatic Date', price: 'From CHF 125,000' },
        { name: 'RM 67-02', subtitle: 'Extra Flat Automatic', price: 'From CHF 145,000' },
        { name: 'RM 50-03', subtitle: 'Tourbillon Split Seconds', price: 'From CHF 980,000' },
        { name: 'RM 88', subtitle: 'Automatic Tourbillon', price: 'From CHF 375,000' }
    ];

    let currentWatchIndex = 0;

    function showWatchName() {
        if (!heroWatchName) return;
        // Just show the static watch name from HTML
        heroWatchName.classList.add('visible');
    }

    function hideWatchName() {
        if (!heroWatchName) return;
        heroWatchName.classList.remove('visible');
    }

    // Show watch name when video ends (or reaches near end)
    if (heroVideo && heroWatchName) {
        heroVideo.addEventListener('ended', function () {
            showWatchName();
        });

        // Also show at certain timestamps for looping
        heroVideo.addEventListener('timeupdate', function () {
            const duration = heroVideo.duration;
            const currentTime = heroVideo.currentTime;

            // Show watch name in the last 3 seconds
            if (duration > 0 && currentTime > duration - 3 && !heroWatchName.classList.contains('visible')) {
                showWatchName();
            }
            // Hide at the beginning
            else if (currentTime < 1) {
                hideWatchName();
            }
        });
    }

    // Replay video when user returns to hero section
    const heroSection = document.getElementById('hero');
    let hasLeftHero = false;

    if (heroSection && heroVideo) {
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    // User left the hero section
                    hasLeftHero = true;
                    heroVideo.pause();
                } else if (entry.isIntersecting && hasLeftHero) {
                    // User returned to hero section - replay video
                    heroVideo.currentTime = 0;
                    heroVideo.play();
                    hideWatchName();
                    hasLeftHero = false;
                }
            });
        }, { threshold: 0.5 });

        heroObserver.observe(heroSection);
    }

    // Replay gear video when user returns to timepieces section
    const timepiecesSection = document.getElementById('timepieces');
    const gearVideo = document.querySelector('.gear-video');
    let hasLeftGear = false;

    if (timepiecesSection && gearVideo) {
        const gearObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    // User left the timepieces section
                    hasLeftGear = true;
                    gearVideo.pause();
                } else if (entry.isIntersecting && hasLeftGear) {
                    // User returned to timepieces section - replay video
                    gearVideo.currentTime = 0;
                    gearVideo.play().catch(e => console.log('Gear video play prevented', e));
                    hasLeftGear = false;
                }
            });
        }, { threshold: 0.2 });

        gearObserver.observe(timepiecesSection);
    }


    // ==========================================
    // PARALLAX EFFECT ON SCROLL
    // ==========================================
    const heroContent = document.querySelector('.hero-content');

    window.addEventListener('scroll', function () {
        const scrollPosition = window.pageYOffset;
        const heroHeight = hero.offsetHeight;

        if (scrollPosition < heroHeight) {
            const parallaxSpeed = 0.4;
            const yPos = scrollPosition * parallaxSpeed;
            if (heroContent) {
                heroContent.style.transform = `translateY(${yPos}px)`;
                heroContent.style.opacity = 1 - (scrollPosition / 600);
            }
        }
    });


    // ==========================================
    // NEWSLETTER FORM HANDLING (REFINED)
    // ==========================================
    const newsletterForm = document.querySelector('.form-glass-module');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const emailInput = this.querySelector('.identity-input');
            const submitBtn = this.querySelector('.identity-submit');
            
            if (emailInput.value) {
                const originalText = submitBtn.textContent;
                
                // Technical Feedback
                submitBtn.textContent = 'PROTOCOL_SENT';
                submitBtn.style.backgroundColor = '#22c55e';
                emailInput.value = '';

                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.backgroundColor = '';
                }, 3000);
            }
        });
    }

    // ==========================================
    // NEWSLETTER VELOCITY PARALLAX
    // ==========================================
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    
    window.addEventListener('scroll', function() {
        // Use a simple localized velocity if global isn't sufficient
        const scrolled = window.pageYOffset;
        
        parallaxLayers.forEach(layer => {
            const speed = parseFloat(layer.getAttribute('data-speed')) || 0;
            const yPos = -(scrolled * speed);
            layer.style.transform = `translate(-50%, calc(-50% + ${yPos}px))`;
        });
    });


    // ==========================================
    // WATCH CARD HOVER ENHANCEMENT
    // ==========================================
    const watchCards = document.querySelectorAll('.watch-card');

    watchCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.zIndex = '10';
        });

        card.addEventListener('mouseleave', function () {
            this.style.zIndex = '';
        });
    });


    // ==========================================
    // SCROLL TO TOP BUTTON (Optional Enhancement)
    // ==========================================
    function createScrollTopButton() {
        const btn = document.createElement('button');
        btn.id = 'scrollTopBtn';
        btn.innerHTML = '↑';
        btn.setAttribute('aria-label', 'Scroll to top');
        btn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background-color: #FF6B00;
            color: #0A0A0A;
            border: none;
            border-radius: 50%;
            font-size: 20px;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 999;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        document.body.appendChild(btn);

        // Show/hide button based on scroll
        window.addEventListener('scroll', function () {
            if (window.scrollY > 500) {
                btn.style.opacity = '1';
                btn.style.visibility = 'visible';
            } else {
                btn.style.opacity = '0';
                btn.style.visibility = 'hidden';
            }
        });

        // Scroll to top on click
        btn.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Hover effects
        btn.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.1)';
            this.style.backgroundColor = '#FF8533';
        });

        btn.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1)';
            this.style.backgroundColor = '#FF6B00';
        });
    }

    createScrollTopButton();


    // ==========================================
    // LAZY LOADING FOR IMAGES
    // ==========================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }


    // ==========================================
    // PREVENT SMOOTH SCROLL FOR INNER ANCHORS
    // ==========================================
    // Add a slight delay before allowing scroll animations
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

});

// ==========================================
// ADDITIONAL CSS FOR BODY OPACITY TRANSITION
// ==========================================
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';

// ==========================================
// HORIZONTAL CARD CAROUSEL (Velocity Driven)
// ==========================================
const carouselTrack = document.getElementById('carouselTrack');
let carouselCards = document.querySelectorAll('.carousel-card');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Carousel State & Velocity Logic
let lastScrollPos = window.scrollY;
let velocity = 0;
let carouselPos = 0; // Continuous position for smooth movement
let isHovered = false;
let hoveredIndex = -1;

function updateCarousel() {
    const spacing = 400; // Increased spacing to prevent card clumping/overlap
    const totalCards = carouselCards.length;
    
    // Velocity-linked factors
    const tiltAmount = velocity * 15; // Lateral tilt based on scroll speed
    const stretchAmount = Math.abs(velocity) * 500; // Extra horizontal spread during scroll

    carouselCards.forEach((card, index) => {
        // Calculate relative position (-totalCards/2 to totalCards/2)
        let relPos = (index - carouselPos) % totalCards;
        if (relPos < -totalCards / 2) relPos += totalCards;
        if (relPos > totalCards / 2) relPos -= totalCards;

        // 1. Curved Path Calculation (Sine Wave)
        // This creates a 3D arc effect as cards move from side to center to side
        const angle = relPos * (Math.PI / (totalCards / 2));
        const curveX = relPos * (spacing + stretchAmount);
        const curveZ = Math.cos(angle * 0.5) * 200 - 200; // Arc depth
        const curveRotateY = relPos * -15; // Perspective rotation
        
        // 2. Velocity Effects (Skew & Tilt)
        const finalSkew = velocity * 10;
        const finalRotateY = curveRotateY + tiltAmount;

        // Visual properties based on position
        const opacity = Math.max(0.1, 1 - Math.abs(relPos) * 0.25);
        const blur = Math.max(0, Math.abs(relPos) * 3 - 2); // Blur only distant cards
        const zIndex = Math.round(100 - Math.abs(relPos) * 10);

        // Base transform for the "3D Plane"
        let transform = `translateX(${curveX}px) translateZ(${curveZ}px) rotateY(${finalRotateY}deg) skewX(${finalSkew}deg)`;
        let finalOpacity = opacity;
        let finalFilter = `blur(${blur}px)`;
        let finalZIndex = zIndex;

        // Hover Pop-out interaction
        if (index === hoveredIndex) {
            transform = `translateX(${curveX}px) translateZ(100px) rotateY(0deg) scale(1.15)`;
            finalOpacity = 1;
            finalFilter = 'blur(0)';
            finalZIndex = 200;
        }

        card.style.transform = transform;
        card.style.opacity = finalOpacity;
        card.style.filter = finalFilter;
        card.style.zIndex = finalZIndex;
        
        // Active flag
        if (Math.abs(relPos) < 0.5) {
            card.classList.add('active');
        } else {
            card.classList.remove('active');
        }
    });
}

function animate() {
    // 1. Calculate Scroll Velocity
    const currentScroll = window.scrollY;
    const scrollDelta = currentScroll - (lastScrollPos || 0);
    lastScrollPos = currentScroll;
    
    // Smooth out velocity with lerp
    const targetVelocity = scrollDelta * 0.002;
    velocity += (targetVelocity - velocity) * 0.15;
    
    // 2. Base move + Velocity influence
    if (!isHovered) {
        // Base auto-flow (right to left)
        const baseSpeed = 0.008;
        // The total speed is base + scroll intensity
        const totalSpeed = baseSpeed + Math.abs(velocity) * 2;
        carouselPos += totalSpeed;
    }

    // Refresh card list for dynamic safety
    const totalCards = carouselCards.length;
    if (totalCards > 0) {
        // Wrap position
        if (carouselPos > totalCards) carouselPos -= totalCards;
        if (carouselPos < 0) carouselPos += totalCards;
        
        updateCarousel();
    }
    
    requestAnimationFrame(animate);
}

// Event Listeners for Hover Interaction
carouselCards.forEach((card, index) => {
    card.addEventListener('mouseenter', () => {
        isHovered = true;
        hoveredIndex = index;
    });
    
    card.addEventListener('mouseleave', () => {
        isHovered = false;
        hoveredIndex = -1;
    });
});

// Controls (Optional: jump position)
if (nextBtn) nextBtn.addEventListener('click', () => { carouselPos += 1; });
if (prevBtn) prevBtn.addEventListener('click', () => { carouselPos -= 1; });

// Start the loop
if (carouselCards.length > 0) {
    animate();
}

// Click on card to "zoom" (simulated)
carouselCards.forEach(card => {
    card.addEventListener('click', function () {
        const cardTitle = this.querySelector('.card-title').textContent;
        console.log('Viewing details for: ' + cardTitle);
        // Here you would navigate to product details
    });
});
document.addEventListener('mousemove', function (e) {
    const moveX = (e.clientX - window.innerWidth / 2) / 50;
    const moveY = (e.clientY - window.innerHeight / 2) / 50;

    // Hero content parallax
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.transform = `translateZ(50px) translateX(${moveX}px) translateY(${moveY}px)`;
    }

    // Watch cards parallax on hover
    const watchCards = document.querySelectorAll('.watch-card');
    watchCards.forEach((card, index) => {
        const offsetX = (index % 3 - 1) * moveX * 0.5;
        const offsetY = (Math.floor(index / 3) - 1) * moveY * 0.5;
    });
});

// 3D Tilt Effect for Boutiques
document.querySelectorAll('.boutique-card').forEach(card => {
    card.addEventListener('mousemove', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(30px)`;
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = '';
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // ==========================================
    // REAL-TIME BOUTIQUE CLOCKS
    // ==========================================
    function updateBoutiqueClocks() {
        const clockElements = document.querySelectorAll('.current-time');
        
        clockElements.forEach(clock => {
            const timezone = clock.getAttribute('data-timezone');
            if (timezone) {
                try {
                    const now = new Date();
                    const options = {
                        timeZone: timezone,
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: false
                    };
                    const timeString = new Intl.DateTimeFormat('en-GB', options).format(now);
                    clock.textContent = timeString;
                } catch (e) {
                    console.error('Error updating clock for timezone:', timezone, e);
                }
            }
        });
    }

    // Initialize clocks
    updateBoutiqueClocks();
    setInterval(updateBoutiqueClocks, 1000);
});
