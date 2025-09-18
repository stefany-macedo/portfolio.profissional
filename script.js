// Smooth scrolling para links de navegação
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

// Mobile menu toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Fechar menu mobile ao clicar em um link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Intersection Observer para animações de entrada
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

// Adicionar classes de animação aos elementos
document.addEventListener('DOMContentLoaded', () => {
    // Elementos para animação fade-in
    const fadeElements = document.querySelectorAll('.section-header, .about-text, .timeline-content, .skill-item, .certificate-item, .project-card, .language-item, .contact-item');
    fadeElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Elementos para animação slide-in-left
    const slideLeftElements = document.querySelectorAll('.hero-text, .about-text, .timeline-item:nth-child(odd) .timeline-content');
    slideLeftElements.forEach(el => {
        el.classList.add('slide-in-left');
        observer.observe(el);
    });

    // Elementos para animação slide-in-right
    const slideRightElements = document.querySelectorAll('.hero-image, .about-stats, .timeline-item:nth-child(even) .timeline-content');
    slideRightElements.forEach(el => {
        el.classList.add('slide-in-right');
        observer.observe(el);
    });

    // Elementos para animação scale-in
    const scaleElements = document.querySelectorAll('.image-container, .stat-item, .project-image');
    scaleElements.forEach(el => {
        el.classList.add('scale-in');
        observer.observe(el);
    });
});

// Navbar scroll effect
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Parallax effect para elementos do hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero::before');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Animação das barras de progresso dos idiomas
const animateProgressBars = () => {
    const progressBars = document.querySelectorAll('.language-progress');
    
    progressBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = progress + '%';
        }, 500);
    });
};

// Observar quando a seção de idiomas entra na viewport
const languagesSection = document.querySelector('.languages');
if (languagesSection) {
    const languagesObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBars();
                languagesObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    languagesObserver.observe(languagesSection);
}


// Efeito de digitação no título principal
const typeWriter = (element, text, speed = 100) => {
    let i = 0;
    element.innerHTML = '';
    
    const timer = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
};

// Aplicar efeito de digitação ao carregar a página
window.addEventListener('load', () => {
    const nameElement = document.querySelector('.name');
    if (nameElement) {
        const originalText = nameElement.textContent;
        typeWriter(nameElement, originalText, 150);
    }
});

// Adicionar efeito hover aos cards
document.querySelectorAll('.project-card, .certificate-item, .stat-item').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Smooth reveal para elementos com delay escalonado
const revealElements = document.querySelectorAll('.skills-grid .skill-item, .certificates-grid .certificate-item, .projects-grid .project-card');
revealElements.forEach((element, index) => {
    element.style.animationDelay = `${index * 0.1}s`;
});

// Adicionar classe de animação com delay
revealElements.forEach((element, index) => {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });
    
    element.classList.add('fade-in');
    revealObserver.observe(element);
});

// Efeito de partículas flutuantes no background
const createFloatingParticles = () => {
    const hero = document.querySelector('.hero');
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(107, 115, 255, 0.3);
            border-radius: 50%;
            pointer-events: none;
            animation: float-particle ${5 + Math.random() * 10}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 5}s;
        `;
        hero.appendChild(particle);
    }
};

// Adicionar CSS para animação de partículas
const style = document.createElement('style');
style.textContent = `
    @keyframes float-particle {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Inicializar partículas quando a página carregar
window.addEventListener('load', createFloatingParticles);

// Adicionar efeito de cursor personalizado
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    background: rgba(107, 115, 255, 0.5);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.1s ease;
    display: none;
`;

document.body.appendChild(cursor);

// Mostrar cursor personalizado apenas em desktop
if (window.innerWidth > 768) {
    cursor.style.display = 'block';
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    // Efeito hover nos elementos interativos
    document.querySelectorAll('a, button, .project-card, .certificate-item').forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.background = 'rgba(107, 115, 255, 0.8)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'rgba(107, 115, 255, 0.5)';
        });
    });
}

// Modal para zoom das imagens
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalClose = document.querySelector('.modal-close');

// Dados dos banners e stories
const modalData = {
    banner1: {
        src: 'https://i.imgur.com/PeeupFm.png',
        title: 'Banner para Vivi Cakes',
        description: 'Banner promocional para confeitaria com design atrativo e cores vibrantes.'
    },
    banner2: {
        src: 'https://i.imgur.com/r01LErh.jpeg',
        title: 'Banner Promocional para Óculos',
        description: 'Identidade visual de Nana Tour com promoção especial de óculos de sol.'
    },
    banner3: {
        src: 'https://i.imgur.com/PC4pdk5.jpeg',
        title: 'Banner para Cantor',
        description: 'Banner promocional para artista sertanejo com design elegante e profissional.'
    },
    stories1: {
        src: 'https://i.imgur.com/7lcDHZq.jpeg',
        title: 'Stories para Instagram',
        description: 'Conteúdo criativo para stories com design moderno e elementos interativos.'
    }
};

// Abrir modal
document.querySelectorAll('[data-modal]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const modalId = link.getAttribute('data-modal');
        const data = modalData[modalId];
        
        if (data) {
            modalImage.src = data.src;
            modalImage.alt = data.title;
            modalTitle.textContent = data.title;
            modalDescription.textContent = data.description;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    });
});

// Fechar modal
function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

modalClose.addEventListener('click', closeModal);

// Fechar modal clicando fora da imagem
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Fechar modal com tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeModal();
    }
});

// Lazy loading para imagens
const lazyImages = document.querySelectorAll('img');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
        }
    });
}, { threshold: 0.1 });

lazyImages.forEach(img => {
    img.classList.add('lazy');
    imageObserver.observe(img);
});

// Adicionar efeito de scroll suave para todos os elementos
document.documentElement.style.scrollBehavior = 'smooth';

// Preloader (opcional)
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Adicionar classe 'loaded' ao body quando tudo estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
});

// Console message personalizada
console.log('%c👋 Olá! Bem-vindo ao portfólio da Stefany Macêdo!', 'color: #6B73FF; font-size: 16px; font-weight: bold;');
console.log('%c💻 Desenvolvido com amor e muito café ☕', 'color: #FF6B9D; font-size: 14px;');
