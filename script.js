document.addEventListener('DOMContentLoaded', () => {
    // 1. CUSTOM CURSOR
    const cursor = document.querySelector('.custom-cursor');
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (!isMobile) {
        cursor.style.display = 'block';
        document.addEventListener('mousemove', (e) => {
            cursor.style.transform = `translate3d(${e.clientX - 10}px, ${e.clientY - 10}px, 0)`;
        });

        // Effect on hover
        const interactables = document.querySelectorAll('a, .section, .skills-grid span, .project-card');
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform += ' scale(2.5)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = cursor.style.transform.replace(' scale(2.5)', '');
            });
        });
    }

    // 2. INTERSECTION OBSERVER FOR ANIMATIONS
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add a small delay based on index for cascade effect if needed, 
                // but simple active class is fine for now.
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, index * 20); // Reduced delay for smoother reveal
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.animate-reveal');
    revealElements.forEach((el, index) => {
        // Pass index for potential staggered delay logic
        revealObserver.observe(el);
    });

    // 3. DINAMIC BACKGROUND TILT (Optional subtle effect)
    document.addEventListener('mousemove', (e) => {
        const xPos = (e.clientX / window.innerWidth - 0.5) * 20;
        const yPos = (e.clientY / window.innerHeight - 0.5) * 20;
        
        const aurora = document.querySelector('.aurora-bg');
        if(aurora) {
             aurora.style.transform = `rotate(0deg) translate3d(${xPos}px, ${yPos}px, 0)`;
        }
    });

    // 4. TITLING EFFECT FOR PROJECT CARDS
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
        });
    });

    console.log("Sunny Gupta's Portfolio Loaded Successfully.");
});
