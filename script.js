// Gerar estrelas ✦ dinamicamente
function generateStars() {
    const starsWrapper = document.getElementById('starsWrapper');
    if (!starsWrapper) return;
    
    const starCount = 30;
    const wrapperWidth = starsWrapper.offsetWidth;
    const wrapperHeight = starsWrapper.offsetHeight;
    
    starsWrapper.innerHTML = '';
    
    for (let layer = 0; layer < 3; layer++) {
        const starLayer = document.createElement('div');
        starLayer.className = 'star-layer';
        starLayer.style.position = 'absolute';
        starLayer.style.width = '100%';
        starLayer.style.height = '100%';
        starLayer.style.animation = `slideStars ${20 + layer * 5}s linear infinite`;
        starLayer.style.animationDelay = `${layer * 2}s`;
        
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('span');
            star.className = 'star-particle';
            
            const size = Math.random();
            if (size < 0.3) {
                star.classList.add('small');
            } else if (size > 0.7) {
                star.classList.add('large');
            }
            
            star.innerHTML = '✦';
            
            const floatDelay = Math.random() * 4;
            star.style.animationDelay = `${floatDelay}s`;
            
            const opacity = 0.1 + Math.random() * 0.3;
            star.style.opacity = opacity;
            
            const top = Math.random() * wrapperHeight;
            const left = Math.random() * wrapperWidth;
            
            star.style.position = 'absolute';
            star.style.top = `${top}px`;
            star.style.left = `${left}px`;
            
            const rotation = Math.random() * 360;
            star.style.transform = `rotate(${rotation}deg)`;
            
            starLayer.appendChild(star);
        }
        
        starsWrapper.appendChild(starLayer);
    }
}

// Header scroll effect
function handleHeaderScroll() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Scroll animations para seções
function checkVisibility() {
    const sections = document.querySelectorAll('.section, .image-favorites, .image-text-section');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.85) {
            section.classList.add('visible');
            
            const cards = section.querySelectorAll('.product-card, .favorite-item');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('visible');
                }, index * 100);
            });
        }
    });
}

// Menu mobile toggle
function setupMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (!menuToggle || !navLinks) return;
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        const icon = this.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.className = 'fas fa-times';
        } else {
            icon.className = 'fas fa-bars';
        }
    });
    
    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const menuIcon = document.querySelector('.menu-toggle i');
            if (menuIcon) {
                menuIcon.className = 'fas fa-bars';
            }
        });
    });
}

// Adicionar ao carrinho
function setupAddToCartButtons() {
    document.querySelectorAll('.btn-buy').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-title').textContent;
            const originalText = this.textContent;
            const cartCount = document.querySelector('.cart-count');
            
            let count = parseInt(cartCount.textContent);
            count++;
            cartCount.textContent = count;
            
            this.textContent = '✓ Adicionado';
            this.style.backgroundColor = '#4CAF50';
            
            const cartIcon = document.querySelector('.cart-icon i');
            cartIcon.style.transform = 'scale(1.2)';
            setTimeout(() => {
                cartIcon.style.transform = 'scale(1)';
            }, 300);
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.backgroundColor = '';
            }, 2000);
            
            console.log(`Produto adicionado: ${productName}`);
        });
    });
}

// Newsletter form
function setupNewsletterForm() {
    const form = document.getElementById('newsletterForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (!email || !email.includes('@')) {
            alert('Por favor, insira um e-mail válido.');
            return;
        }
        
        emailInput.value = '';
        
        const button = this.querySelector('button');
        const originalHTML = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i>';
        button.style.backgroundColor = '#4CAF50';
        
        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.style.backgroundColor = '';
            alert('Obrigado por se inscrever! Em breve você receberá nossas novidades.');
        }, 1500);
    });
}

// Smooth scrolling para links de navegação
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                const navLinks = document.getElementById('navLinks');
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    const menuIcon = document.querySelector('.menu-toggle i');
                    if (menuIcon) {
                        menuIcon.className = 'fas fa-bars';
                    }
                }
            }
        });
    });
}

// Product card hover effects
function setupProductHoverEffects() {
    document.querySelectorAll('.product-card, .favorite-item, .user-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (this.classList.contains('product-card') || this.classList.contains('user-card')) {
                this.style.transform = 'translateY(-8px)';
            } else if (this.classList.contains('favorite-item')) {
                this.style.transform = 'translateX(5px)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (this.classList.contains('product-card') || this.classList.contains('user-card')) {
                this.style.transform = 'translateY(0)';
            } else if (this.classList.contains('favorite-item')) {
                this.style.transform = 'translateX(0)';
            }
        });
    });
}

// Parallax effect para fullscreen image
function setupParallaxEffect() {
    const fullscreenImg = document.querySelector('.fullscreen-img');
    if (!fullscreenImg) return;
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        if (fullscreenImg) {
            fullscreenImg.style.transform = `translate3d(0, ${rate}px, 0) scale(1.1)`;
        }
    });
}

// Carrossel Quem Usa
function setupCarousel() {
    const carousel = document.getElementById('usersCarousel');
    const prevButton = document.getElementById('carouselPrev');
    const nextButton = document.getElementById('carouselNext');
    const indicatorsContainer = document.getElementById('carouselIndicators');
    
    if (!carousel || !prevButton || !nextButton || !indicatorsContainer) return;
    
    const cards = carousel.querySelectorAll('.user-card');
    const totalCards = cards.length;
    let currentIndex = 0;
    let autoPlayInterval;
    
    // Calcular quantos cards cabem na tela
    function getCardsPerView() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 992) return 2;
        if (window.innerWidth <= 1200) return 3;
        return 4;
    }
    
    // Criar indicadores
    function createIndicators() {
        indicatorsContainer.innerHTML = '';
        const cardsPerView = getCardsPerView();
        const totalSlides = Math.ceil(totalCards / cardsPerView);
        
        for (let i = 0; i < totalSlides; i++) {
            const indicator = document.createElement('button');
            indicator.className = 'carousel-indicator';
            if (i === 0) indicator.classList.add('active');
            indicator.setAttribute('data-slide', i);
            indicator.addEventListener('click', () => goToSlide(i));
            indicatorsContainer.appendChild(indicator);
        }
        
        return totalSlides;
    }
    
    // Atualizar carrossel
    function updateCarousel() {
        const cardsPerView = getCardsPerView();
        const cardWidth = cards[0].offsetWidth + 40;
        const translateX = -currentIndex * cardWidth * cardsPerView;
        carousel.style.transform = `translateX(${translateX}px)`;
        
        document.querySelectorAll('.carousel-indicator').forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
        
        const totalSlides = Math.ceil(totalCards / cardsPerView);
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex >= totalSlides - 1;
    }
    
    // Ir para slide específico
    function goToSlide(index) {
        const cardsPerView = getCardsPerView();
        const totalSlides = Math.ceil(totalCards / cardsPerView);
        
        if (index < 0) index = 0;
        if (index >= totalSlides) index = totalSlides - 1;
        
        currentIndex = index;
        updateCarousel();
    }
    
    // Próximo slide
    function nextSlide() {
        const cardsPerView = getCardsPerView();
        const totalSlides = Math.ceil(totalCards / cardsPerView);
        
        if (currentIndex < totalSlides - 1) {
            currentIndex++;
            updateCarousel();
        } else {
            goToSlide(0);
        }
    }
    
    // Slide anterior
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    }
    
    // Auto-play
    function startAutoPlay() {
        stopAutoPlay();
        autoPlayInterval = setInterval(() => {
            nextSlide();
        }, 5000);
    }
    
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
    }
    
    // Event listeners
    prevButton.addEventListener('click', () => {
        prevSlide();
        stopAutoPlay();
    });
    
    nextButton.addEventListener('click', () => {
        nextSlide();
        stopAutoPlay();
    });
    
    // Inicializar
    createIndicators();
    updateCarousel();
    startAutoPlay();
    
    // Redimensionamento
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            createIndicators();
            updateCarousel();
        }, 250);
    });
    
    // Pausar auto-play quando hover
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
}

// Recalcular posição das estrelas ao redimensionar
function handleResize() {
    generateStars();
}

// Inicializar tudo quando a página carregar
function init() {
    generateStars();
    checkVisibility();
    setupMobileMenu();
    setupAddToCartButtons();
    setupNewsletterForm();
    setupSmoothScrolling();
    setupProductHoverEffects();
    setupParallaxEffect();
    setupCarousel();
    
    window.addEventListener('scroll', function() {
        handleHeaderScroll();
        checkVisibility();
    });
    
    window.addEventListener('resize', handleResize);
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', init);