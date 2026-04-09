document.addEventListener('DOMContentLoaded', function() {
    // ============================================================
    // Header scroll effect
    // ============================================================
    const header = document.querySelector('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.scrollY;
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    });

    // ============================================================
    // Mobile menu toggle
    // ============================================================
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
    }

    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            if (mobileToggle) mobileToggle.classList.remove('active');
        });
    });

    // ============================================================
    // Smooth scrolling for anchor links
    // ============================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const elementPosition = targetElement.offsetTop - headerHeight - 20;
                window.scrollTo({ top: elementPosition, behavior: 'smooth' });
            }
        });
    });

    // ============================================================
    // Intersection Observer for scroll-triggered animations
    // ============================================================
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.product-card, .step, .feature-item, .contact-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    const style = document.createElement('style');
    style.textContent = `.animate-in { opacity: 1 !important; transform: translateY(0) !important; }`;
    document.head.appendChild(style);

    // Stagger animation delays
    document.querySelectorAll('.product-card').forEach((card, i) => {
        card.style.transitionDelay = `${i * 0.1}s`;
    });
    document.querySelectorAll('.feature-item').forEach((item, i) => {
        item.style.transitionDelay = `${i * 0.1}s`;
    });
    document.querySelectorAll('.step').forEach((step, i) => {
        step.style.transitionDelay = `${i * 0.15}s`;
    });

    // ============================================================
    // Reviews: move to top section and render dynamic testimonials
    // ============================================================
    const productsSection = document.getElementById('products');
    const reviewsSection = document.getElementById('reviews');
    if (productsSection && reviewsSection) {
        productsSection.parentNode.insertBefore(reviewsSection, productsSection);
    }

    const reviewsTrack = document.getElementById('reviewsTrack');
    if (reviewsTrack) {
        const reviews = [
            { author: 'Sarah M.', initials: 'SM', role: 'Content Writer, 3 yrs', platform: 'Writedom Bot', rating: 5, avatar: 'linear-gradient(135deg,#6366f1,#8b5cf6)', text: 'Short version: this bot works.' },
            { author: 'James O.', initials: 'JO', role: 'Academic Writer, 4 yrs', platform: 'WritersHub Bot', rating: 5, avatar: 'linear-gradient(135deg,#06b6d4,#3b82f6)', text: 'Set up took minutes. Orders started coming in the same day.' },
            { author: 'Amara N.', initials: 'AN', role: 'Freelance Writer', platform: 'Writedom Bot', rating: 4.5, avatar: 'linear-gradient(135deg,#ec4899,#f97316)', text: 'The free trial sold me. I woke up to multiple bids already placed.' },
            { author: 'David K.', initials: 'DK', role: 'Technical Writer, 5 yrs', platform: 'WritersHub Bot', rating: 5, avatar: 'linear-gradient(135deg,#10b981,#06b6d4)', text: 'Filters are clean and precise. I only bid where I can actually win.' },
            { author: 'Faith W.', initials: 'FW', role: 'Full-time Freelancer', platform: 'Both Bots', rating: 5, avatar: 'linear-gradient(135deg,#f59e0b,#ef4444)', text: 'Running both bots gave me steady weekly income for the first time.' },
            { author: 'Collins M.', initials: 'CM', role: 'Essay Writer', platform: 'Writedom Bot', rating: 5, avatar: 'linear-gradient(135deg,#8b5cf6,#ec4899)', text: 'Background mode is perfect. I write while the bot handles the hunt.' },
            { author: 'Rose A.', initials: 'RA', role: 'Beginner Writer', platform: 'WritersHub Bot', rating: 4.5, avatar: 'linear-gradient(135deg,#3b82f6,#10b981)', text: 'Very easy to install. Support replied quickly and clearly.' },
            { author: 'Tunde O.', initials: 'TO', role: 'Professional Writer', platform: 'Writedom Bot', rating: 5, avatar: 'linear-gradient(135deg,#6366f1,#06b6d4)', text: 'Reliable for months. No random crashes, no weird misses.' },
            { author: 'Lina P.', initials: 'LP', role: 'Blog Writer', platform: 'WritersHub Bot', rating: 5, avatar: 'linear-gradient(135deg,#22c55e,#14b8a6)', text: 'I literally tripled my daily bid coverage in week one.' },
            { author: 'Brian C.', initials: 'BC', role: 'Copywriter', platform: 'Writedom Bot', rating: 5, avatar: 'linear-gradient(135deg,#a855f7,#6366f1)', text: 'This thing is absurdly fast. Blink and the bid is already sent.' },
            { author: 'Nora E.', initials: 'NE', role: 'Research Writer', platform: 'WritersHub Bot', rating: 5, avatar: 'linear-gradient(135deg,#0ea5e9,#2563eb)', text: 'My response time went from late to lightning-fast.' },
            { author: 'Kevin T.', initials: 'KT', role: 'Business Writer', platform: 'Writedom Bot', rating: 4.5, avatar: 'linear-gradient(135deg,#f97316,#dc2626)', text: 'Straight to the point: more bids, better clients.' },
            { author: 'Maya R.', initials: 'MR', role: 'SEO Writer', platform: 'Both Bots', rating: 5, avatar: 'linear-gradient(135deg,#14b8a6,#3b82f6)', text: 'I used to manually refresh pages all day. Now I let the bots run while I focus on delivery, and my pipeline is fuller than it has ever been. Some weeks it feels like every good order somehow finds me first.' },
            { author: 'Peter J.', initials: 'PJ', role: 'Ghostwriter', platform: 'WritersHub Bot', rating: 5, avatar: 'linear-gradient(135deg,#f43f5e,#8b5cf6)', text: 'Simple. Effective. Worth it.' },
            { author: 'Grace L.', initials: 'GL', role: 'Article Writer', platform: 'Writedom Bot', rating: 5, avatar: 'linear-gradient(135deg,#06b6d4,#0ea5e9)', text: 'I tested it for three days and got more qualified opportunities than I normally get in two weeks.' },
            { author: 'Victor S.', initials: 'VS', role: 'Academic Specialist', platform: 'WritersHub Bot', rating: 4.5, avatar: 'linear-gradient(135deg,#84cc16,#22c55e)', text: 'Good defaults and strong filtering. Saves real time daily.' },
            { author: 'Nelly A.', initials: 'NA', role: 'Freelance Writer', platform: 'Writedom Bot', rating: 5, avatar: 'linear-gradient(135deg,#e11d48,#f97316)', text: 'My dashboard exploded with accepted bids after I tuned filters.' },
            { author: 'Owen D.', initials: 'OD', role: 'Technical Blogger', platform: 'Both Bots', rating: 5, avatar: 'linear-gradient(135deg,#4f46e5,#06b6d4)', text: 'Wild result: in one month I went from chasing orders manually to scheduling work two weeks ahead because bids were landing consistently. It felt exaggerated when I heard it from others, but now it is my normal workflow.' },
            { author: 'Hannah Q.', initials: 'HQ', role: 'Proofreader & Writer', platform: 'WritersHub Bot', rating: 5, avatar: 'linear-gradient(135deg,#10b981,#0ea5e9)', text: 'Tiny setup, huge impact.' },
            { author: 'Sam B.', initials: 'SB', role: 'Proposal Writer', platform: 'Writedom Bot', rating: 5, avatar: 'linear-gradient(135deg,#7c3aed,#ec4899)', text: 'The speed advantage is real. I stopped missing high-value orders.' },
            { author: 'Esther I.', initials: 'EI', role: 'Long-form Writer', platform: 'WritersHub Bot', rating: 5, avatar: 'linear-gradient(135deg,#059669,#22d3ee)', text: 'Before this, I was spending ridiculous hours refreshing tabs and still arriving late. After switching, I suddenly had time to improve my writing quality while the extension hunted opportunities nonstop. Revenue climbed, stress dropped, and my whole routine became calmer and more predictable.' },
            { author: 'Mark U.', initials: 'MU', role: 'Content Strategist', platform: 'Both Bots', rating: 4.5, avatar: 'linear-gradient(135deg,#334155,#6366f1)', text: 'Predictable performance every day. Exactly what I needed.' },
            { author: 'Ivy F.', initials: 'IF', role: 'Beginner Freelancer', platform: 'Writedom Bot', rating: 5, avatar: 'linear-gradient(135deg,#f59e0b,#e11d48)', text: 'I was nervous about bots, but this one is straightforward and safe.' },
            { author: 'Daniel Z.', initials: 'DZ', role: 'Professional Copywriter', platform: 'WritersHub Bot', rating: 5, avatar: 'linear-gradient(135deg,#1d4ed8,#9333ea)', text: 'Exaggerated but true: it felt like I hired a tireless assistant who never sleeps, never misses a listing, and never gets distracted. The consistency is unreal, especially during peak posting hours.' },
            { author: 'Ruth G.', initials: 'RG', role: 'Essay Specialist', platform: 'Writedom Bot', rating: 5, avatar: 'linear-gradient(135deg,#16a34a,#0ea5e9)', text: 'Five stars. Clean UI and strong results.' },
            { author: 'Alex P.', initials: 'AP', role: 'Freelance Writer, 6 yrs', platform: 'Both Bots', rating: 5, avatar: 'linear-gradient(135deg,#06b6d4,#a855f7)', text: 'I expected a small lift. Instead, this became the backbone of my client acquisition workflow. If I could only keep one productivity tool, this would be it.' }
        ];

        const starIcons = (rating) => {
            const fullStars = Math.floor(rating);
            const halfStar = rating % 1 !== 0;
            let stars = '';
            for (let i = 0; i < fullStars; i++) stars += '<i class="fas fa-star"></i>';
            if (halfStar) stars += '<i class="fas fa-star-half-alt"></i>';
            return stars;
        };

        reviewsTrack.innerHTML = reviews.map(review => `
            <div class="review-card">
                <div class="review-stars">${starIcons(review.rating)}</div>
                <p class="review-text">"${review.text}"</p>
                <div class="review-author">
                    <div class="review-avatar" style="background: ${review.avatar};">${review.initials}</div>
                    <div class="review-author-info">
                        <strong>${review.author}</strong>
                        <span>${review.role}</span>
                    </div>
                </div>
                <div class="review-platform"><i class="fas fa-robot"></i> ${review.platform}</div>
            </div>
        `).join('');

        reviewsTrack.addEventListener('mouseenter', () => {
            reviewsTrack.style.animationPlayState = 'paused';
        });
        reviewsTrack.addEventListener('mouseleave', () => {
            reviewsTrack.style.animationPlayState = 'running';
        });
        // Touch support: pause on touch
        reviewsTrack.addEventListener('touchstart', () => {
            reviewsTrack.style.animationPlayState = 'paused';
        }, { passive: true });
        reviewsTrack.addEventListener('touchend', () => {
            reviewsTrack.style.animationPlayState = 'running';
        }, { passive: true });
    }

    // ============================================================
    // Download button tracking
    // ============================================================
    const storeButtons = document.querySelectorAll('.download-btn');
    storeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.product-card');
            if (card) {
                const botType = card.querySelector('h3')?.textContent || 'Unknown Bot';
                console.log(`%c📥 ${botType} Chrome Web Store link clicked`, 'color:#6366f1; font-weight:bold;');
            }
        });
    });

    // ============================================================
    // Stat number hover micro-interaction
    // ============================================================
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        stat.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.transition = 'transform 0.3s ease';
        });
        stat.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // ============================================================
    // Parallax effect for floating background shapes
    // ============================================================
    document.addEventListener('mousemove', (e) => {
        const shapes = document.querySelectorAll('.shape');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 10;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            shape.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // ============================================================
    // Button ripple effect
    // ============================================================
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `@keyframes ripple { to { transform: scale(4); opacity: 0; } }`;
    document.head.appendChild(rippleStyle);

    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position:absolute; background:rgba(255,255,255,0.3); border-radius:50%;
                pointer-events:none; width:100px; height:100px;
                left:${x - 50}px; top:${y - 50}px;
                transform:scale(0); animation:ripple 0.6s ease-out;
            `;
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // ============================================================
    // Console branding
    // ============================================================
    console.log('%c🚀 WriteSmartTechnologies', 'font-size:24px; font-weight:bold; color:#6366f1;');
    console.log('%cBidding Bots — Automation for Pro Writers', 'font-size:14px; color:#94a3b8;');
    console.log('%c📞 +254 707 188 251  |  💬 https://wa.me/254707188251', 'font-size:12px; color:#25d366;');
});