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
    // Reviews: move to top section + Firebase-backed reviews
    // ============================================================
    const productsSection = document.getElementById('products');
    const reviewsSection = document.getElementById('reviews');
    if (productsSection && reviewsSection) {
        productsSection.parentNode.insertBefore(reviewsSection, productsSection);
    }

    const reviewsTrack = document.getElementById('reviewsTrack');
    const reviewForm = document.getElementById('reviewForm');
    const reviewFormStatus = document.getElementById('reviewFormStatus');
    const writedomRatingValue = document.getElementById('writedomRatingValue');
    const writershubRatingValue = document.getElementById('writershubRatingValue');
    const overallRatingValue = document.getElementById('overallRatingValue');
    if (reviewsTrack) {
        // Reviews are genuine only: they load live from Firestore as real clients submit them.
        // No seeded or template reviews. Until real reviews exist, an empty state is shown.
        const localReviews = [];

        const AVATAR_PALETTE = [
            'linear-gradient(135deg,#6366f1,#8b5cf6)',
            'linear-gradient(135deg,#06b6d4,#3b82f6)',
            'linear-gradient(135deg,#c9a227,#f97316)',
            'linear-gradient(135deg,#10b981,#06b6d4)'
        ];

        const starIcons = (rating) => {
            const fullStars = Math.floor(rating);
            const halfStar = rating % 1 !== 0;
            let stars = '';
            for (let i = 0; i < fullStars; i++) stars += '<i class="fas fa-star"></i>';
            if (halfStar) stars += '<i class="fas fa-star-half-alt"></i>';
            return stars;
        };

        const getFirstName = (name) => {
            const normalized = String(name || '').trim();
            if (!normalized) return 'Writer';
            return normalized.split(/\s+/)[0];
        };

        const getInitials = (name) => {
            return getFirstName(name).charAt(0).toUpperCase() || 'W';
        };

        const formatReviewDate = (dateValue) => {
            let date = null;
            if (dateValue && typeof dateValue.toDate === 'function') {
                date = dateValue.toDate();
            } else if (dateValue instanceof Date) {
                date = dateValue;
            } else if (typeof dateValue === 'string' || typeof dateValue === 'number') {
                date = new Date(dateValue);
            }
            if (!date || Number.isNaN(date.getTime())) return 'Date unavailable';
            return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
        };

        const safe = (value) => String(value || '').replace(/[&<>"']/g, (char) => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        }[char]));

        const cardHtml = (review) => `
            <div class="review-card">
                <div class="review-stars">${starIcons(review.rating)}</div>
                <p class="review-text">${safe(review.text)}</p>
                <div class="review-author">
                    <div class="review-avatar" style="background: ${review.avatar};">${safe(review.initials)}</div>
                    <div class="review-author-info">
                        <strong>${safe(review.author)}</strong>
                        <span>${safe(review.reviewDate)}</span>
                    </div>
                </div>
                <div class="review-platform"><i class="fas fa-robot"></i> ${safe(review.platform)}</div>
            </div>
        `;

        const renderReviews = (reviews) => {
            // Genuine empty state: no reviews yet.
            if (!reviews.length) {
                reviewsTrack.style.animation = 'none';
                reviewsTrack.innerHTML = `
                    <div class="review-card review-card--empty">
                        <div class="review-stars"><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i></div>
                        <p class="review-text">No reviews yet — be the first to share your experience! Use the form below to leave a genuine review.</p>
                        <div class="review-platform"><i class="fas fa-pen"></i> Your review appears here instantly</div>
                    </div>
                `;
                return;
            }
            // With only one real review the marquee has nothing to scroll through smoothly,
            // so pause the animation and show it statically until more come in.
            if (reviews.length === 1) {
                reviewsTrack.style.animation = 'none';
                reviewsTrack.innerHTML = cardHtml(reviews[0]);
                return;
            }
            // Duplicate cards for smooth marquee animation once there are enough real reviews.
            reviewsTrack.style.animation = '';
            const duplicated = [...reviews, ...reviews];
            reviewsTrack.innerHTML = duplicated.map(cardHtml).join('');
        };

        const averageRating = (reviews) => {
            if (!reviews.length) return null;
            const total = reviews.reduce((sum, review) => sum + (Number(review.rating) || 0), 0);
            return total / reviews.length;
        };

        const formatAverage = (value) => {
            if (value === null) return '--★';
            return `${value.toFixed(1)}★`;
        };

        const updateAggregateRatings = (reviews) => {
            if (!writedomRatingValue || !writershubRatingValue || !overallRatingValue) return;

            const writedomReviews = reviews.filter(
                (review) => review.platform === 'Writedom Bot' || review.platform === 'Both Bots'
            );
            const writershubReviews = reviews.filter(
                (review) => review.platform === 'WritersHub Bot' || review.platform === 'Both Bots'
            );
            const overallReviews = reviews.filter((review) => Number(review.rating) > 0);

            writedomRatingValue.textContent = formatAverage(averageRating(writedomReviews));
            writershubRatingValue.textContent = formatAverage(averageRating(writershubReviews));
            overallRatingValue.textContent = formatAverage(averageRating(overallReviews));
        };

        const normalizeFirebaseReview = (doc) => {
            const data = doc.data();
            const displayName = data.clientName || 'Anonymous Writer';
            const initials = getInitials(displayName);
            return {
                author: getFirstName(displayName),
                initials,
                platform: data.platform || 'Writedom Bot',
                rating: Number(data.rating) || 5,
                avatar: AVATAR_PALETTE[Math.floor(Math.random() * AVATAR_PALETTE.length)],
                text: data.text || '',
                reviewDate: formatReviewDate(data.createdAt || data.reviewDate)
            };
        };

        const getFirestore = () => {
            const config = window.WRITE_SMART_FIREBASE_CONFIG;
            const hasConfig = config && config.projectId && config.apiKey;
            if (!hasConfig || typeof firebase === 'undefined') return null;
            if (!firebase.apps.length) firebase.initializeApp(config);
            return firebase.firestore();
        };

        const firestore = getFirestore();
        const localReviewsPrepared = localReviews.map((review) => ({
            ...review,
            author: getFirstName(review.author),
            initials: getInitials(review.author),
            reviewDate: formatReviewDate(review.reviewDate)
        }));
        let activeReviews = [...localReviewsPrepared];

        renderReviews(activeReviews);
        updateAggregateRatings(activeReviews);

        // Track a pending preview so we can drop it once the live snapshot confirms the real doc.
        let pendingPreview = null;

        const mergeAndRender = (cloudReviews) => {
            // If we still have a pending preview and the cloud hasn't returned it yet, keep it at
            // the front so the submitter never sees their review disappear between saves.
            const base = [...cloudReviews, ...localReviewsPrepared];
            if (pendingPreview) {
                const alreadyIn = cloudReviews.some(
                    (r) => r.author === pendingPreview.author && r.text === pendingPreview.text
                );
                activeReviews = alreadyIn ? base : [pendingPreview, ...base];
                if (alreadyIn) pendingPreview = null;
            } else {
                activeReviews = base;
            }
            renderReviews(activeReviews);
            updateAggregateRatings(activeReviews);
        };

        if (firestore) {
            // Use onSnapshot instead of .get() so every user's carousel updates in real-time
            // whenever anyone posts a review — no page refresh needed.
            const attachReviewListener = (withOrder) => {
                let query = firestore
                    .collection('reviews')
                    .where('approved', '==', true)
                    .limit(30);
                if (withOrder) query = query.orderBy('createdAt', 'desc');

                query.onSnapshot((snapshot) => {
                    const cloudReviews = snapshot.docs.map(normalizeFirebaseReview);
                    mergeAndRender(cloudReviews);
                }, (error) => {
                    console.error('Could not load Firebase reviews:', error);
                    // Firestore composite index may be missing — retry without orderBy.
                    if (withOrder) attachReviewListener(false);
                });
            };
            attachReviewListener(true);
        }

        if (reviewForm) {
            reviewForm.addEventListener('submit', async (event) => {
                event.preventDefault();
                if (!firestore) {
                    reviewFormStatus.textContent = 'Review service unavailable. Please contact us via WhatsApp.';
                    reviewFormStatus.classList.add('is-error');
                    return;
                }

                const formData = new FormData(reviewForm);
                const clientName = getFirstName(formData.get('reviewName'));
                const platform = String(formData.get('reviewPlatform') || '').trim();
                const text = String(formData.get('reviewText') || '').trim();
                const rating = Number(formData.get('reviewRating') || 5);

                if (!clientName || !platform || !text || !rating) {
                    reviewFormStatus.textContent = 'Please fill in all fields before posting.';
                    reviewFormStatus.classList.add('is-error');
                    return;
                }

                reviewFormStatus.textContent = 'Posting your review…';
                reviewFormStatus.classList.remove('is-error');

                // Show the review in the carousel immediately so the submitter doesn't wait.
                pendingPreview = {
                    author: clientName,
                    initials: getInitials(clientName),
                    platform,
                    rating,
                    avatar: AVATAR_PALETTE[Math.floor(Math.random() * AVATAR_PALETTE.length)],
                    text,
                    reviewDate: formatReviewDate(new Date())
                };
                activeReviews = [pendingPreview, ...activeReviews];
                renderReviews(activeReviews);
                updateAggregateRatings(activeReviews);

                try {
                    await firestore.collection('reviews').add({
                        clientName,
                        platform,
                        text,
                        rating,
                        approved: true,
                        createdAt: firebase.firestore.FieldValue.serverTimestamp()
                    });
                    reviewForm.reset();
                    reviewFormStatus.textContent = 'Review posted! It is now live in the carousel.';
                    // onSnapshot will fire and replace the pendingPreview with the real Firestore doc.
                } catch (error) {
                    console.error('[WriteSmart] Review post failed — code:', error.code, '| message:', error.message);
                    if (pendingPreview) {
                        activeReviews = activeReviews.filter((r) => r !== pendingPreview);
                        pendingPreview = null;
                        renderReviews(activeReviews);
                    }
                    const msg = error.code === 'permission-denied'
                        ? 'Database permissions are blocking submissions. Update your Firestore rules (see firestore.rules).'
                        : `Could not post review (${error.code || 'unknown'}). Please try again or contact us on WhatsApp.`;
                    reviewFormStatus.textContent = msg;
                    reviewFormStatus.classList.add('is-error');
                }
            });
        }

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