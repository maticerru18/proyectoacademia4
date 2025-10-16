// ================================
// ACADEMIA GOURMET DIGITAL - MAIN JS
// ================================

// Esperamos a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // ================================
    // VARIABLES GLOBALES
    // ================================
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const metricNumbers = document.querySelectorAll('.metric-number');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let currentTestimonialIndex = 0;
    let metricsAnimated = false;
    
    // ================================
    // NAVBAR SCROLL EFFECT
    // ================================
    function handleNavbarScroll() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 25px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    }
    
    // ================================
    // MOBILE NAVIGATION
    // ================================
    function initMobileNav() {
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', function() {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });
            
            // Cerrar menú al hacer click en un enlace
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                });
            });
            
            // Cerrar menú al hacer click fuera
            document.addEventListener('click', function(e) {
                if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            });
        }
    }
    
    // ================================
    // SMOOTH SCROLLING PARA ANCHORS
    // ================================
    function initSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const navbarHeight = navbar.offsetHeight;
                    const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // ================================
    // DATOS DE CURSOS PARA FILTROS
    // ================================
    const coursesData = [
        {
            id: 'reposteria-decoracion',
            title: 'Repostería y Decoración',
            description: 'Aprende técnicas profesionales de decoración y repostería creativa.',
            level: 'Intermedio',
            price: '$99.99',
            rating: 4.9,
            image: 'images/cheesecake-facil-con-leche-condensada-2000-4160526441114bf3ad8f3409586a2c8a.jpg',
            categories: ['all', 'dessert', 'pastry'],
            link: 'https://cursosdecocina.tv/reposteria-y-decoracion-online/?ref=W102357359I'
        },
        {
            id: 'cocina-arabe',
            title: 'Cocina Árabe',
            description: 'Aprende los secretos de la cocina del Medio Oriente con recetas auténticas.',
            level: 'Intermedio',
            price: '$89.99',
            rating: 4.9,
            image: 'https://via.placeholder.com/400x250/8D6E63/FFFFFF?text=Cocina+%C3%81rabe',
            categories: ['all', 'main-course'],
            link: 'https://hotmart.com/curso-cocina-arabe'
        },
        {
            id: 'pasteleria-vegana',
            title: 'Pastelería Vegana',
            description: 'Postres deliciosos sin ingredientes de origen animal.',
            level: 'Intermedio',
            price: '$94.99',
            rating: 4.7,
            image: 'https://via.placeholder.com/400x250/E91E63/FFFFFF?text=Pastelería+Vegana',
            categories: ['all', 'dessert', 'pastry', 'vegan'],
            link: 'https://hotmart.com/curso-pasteleria-vegana'
        },
        {
            id: 'cocteleria-clasica',
            title: 'Coctelería Clásica',
            description: 'Domina los cócteles clásicos internacionales con técnicas profesionales.',
            level: 'Principiante',
            price: '$74.99',
            rating: 4.8,
            image: 'images/field_image_cocteleria.jpg',
            categories: ['all', 'beverage'],
            link: 'https://cursosdecocina.tv/cocteleria-clasica-online/?ref=X102346090O'
        },
        {
            id: 'cocina-vegana',
            title: 'Cocina Vegana',
            description: 'Recetas 100% vegetales nutritivas y deliciosas.',
            level: 'Intermedio',
            price: '$84.99',
            rating: 4.9,
            image: 'https://via.placeholder.com/400x250/4CAF50/FFFFFF?text=Cocina+Vegana',
            categories: ['all', 'main-course', 'vegan'],
            link: 'https://hotmart.com/curso-cocina-vegana'
        },
        {
            id: 'chocolateria',
            title: 'Chocolatería',
            description: 'Arte del chocolate profesional con templado y decoraciones avanzadas.',
            level: 'Avanzado',
            price: '$139.99',
            rating: 4.9,
            image: 'https://via.placeholder.com/400x250/5D4037/FFFFFF?text=Chocolatería',
            categories: ['all', 'dessert', 'pastry'],
            link: 'https://hotmart.com/curso-chocolateria'
        },
        {
            id: 'sushi-rolls',
            title: 'Sushi Rolls',
            description: 'Técnicas japonesas auténticas para crear sushi y rolls perfectos.',
            level: 'Intermedio',
            price: '$109.99',
            rating: 4.8,
            image: 'images/japanese-sushi-roll-recipe-1745392172.jpg',
            categories: ['all', 'main-course'],
            link: 'https://cursosdecocina.tv/curso-de-sushi-online/?ref=I102346270I'
        },
        {
            id: 'barista-training',
            title: 'Barista Training',
            description: 'Conviértete en barista profesional: espresso perfecto y latte art avanzado.',
            level: 'Avanzado',
            price: '$79.99',
            rating: 4.8,
            image: 'images/train_sq.webp',
            categories: ['all', 'beverage'],
            link: 'https://cursosdecocina.tv/barista-training-online/?ref=B102357560A'
        },
        {
            id: 'panaderia-artesanal',
            title: 'Panadería Artesanal',
            description: 'Panes artesanales con masa madre, fermentaciones largas y técnicas tradicionales.',
            level: 'Intermedio',
            price: '$99.99',
            rating: 4.8,
            image: 'images/Panaderia-Artesanal.webp',
            categories: ['all', 'dessert', 'pastry'],
            link: 'https://cursosdecocina.tv/panaderia-artesanal-online/'
        }
    ];
    
    // ================================
    // SISTEMA DE FILTROS
    // ================================
    function initCourseFilters() {
        const coursesGrid = document.querySelector('.courses-grid');
        
        if (!coursesGrid) return;
        
        // Cargar cursos iniciales destacados
        renderCourses('featured');
        
        // Event listeners para filtros
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remover active de todos los botones
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Agregar active al botón clickeado
                this.classList.add('active');
                
                // Obtener categoría y filtrar
                const category = this.getAttribute('data-filter');
                renderCourses(category);
            });
        });
    }
    
    function renderCourses(category) {
        const coursesGrid = document.querySelector('.courses-grid');
        if (!coursesGrid) return;
        
        // Filtrar cursos según categoría
        let filteredCourses = coursesData;
        if (category === 'featured') {
            // Mostrar solo los cursos destacados específicos (máximo 4)
            const featuredIds = [
                'reposteria-decoracion',
                'cocteleria-clasica',
                'barista-training',
                'panaderia-artesanal'
            ];
            filteredCourses = featuredIds
                .map(id => coursesData.find(course => course.id === id))
                .filter(Boolean);
        } else if (category !== 'all') {
            filteredCourses = coursesData.filter(course => 
                course.categories.includes(category)
            );
        }
        
        // Limpiar grid
        coursesGrid.innerHTML = '';
        
        // Renderizar cursos filtrados
        filteredCourses.forEach((course, index) => {
            const courseCard = createCourseCard(course);
            coursesGrid.appendChild(courseCard);
            
            // Animación de entrada
            setTimeout(() => {
                courseCard.classList.add('visible');
            }, index * 100);
        });
    }
    
    function createCourseCard(course) {
    const card = document.createElement('div');
    card.className = 'course-card';
    card.setAttribute('id', course.id);
        
        card.innerHTML = `
            <div class="course-image">
                <img src="${course.image}" alt="${course.title}" onerror="this.onerror=null; this.src='https://via.placeholder.com/400x250/FF6B35/FFFFFF?text=Imagen+No+Disponible';">
                <div class="course-level">${course.level}</div>
            </div>
            <div class="course-content">
                <h3>${course.title}</h3>
                <p>${course.description}</p>
                <div class="course-rating">
                    <div class="stars">
                        ${generateStars(course.rating)}
                    </div>
                    <span>(${course.rating})</span>
                </div>
                <div class="course-price">${course.price}</div>
                <a href="${course.link}" class="btn btn-primary course-cta" target="_blank" rel="noopener">Comprar Curso Ahora</a>
            </div>
        `;
        
        return card;
    }
    
    function generateStars(rating) {
        const fullStars = Math.floor(rating);
        let starsHTML = '';
        
        for (let i = 0; i < fullStars; i++) {
            starsHTML += '<i class="fas fa-star"></i>';
        }
        
        if (rating % 1 !== 0) {
            starsHTML += '<i class="fas fa-star-half-alt"></i>';
        }
        
        return starsHTML;
    }
    
    // ================================
    // CARRUSEL DE TESTIMONIOS
    // ================================
    function initTestimonialsCarousel() {
        if (testimonialCards.length === 0) return;
        
        // Mostrar testimonios iniciales (primeros 4 en desktop, 1 en mobile)
        showTestimonials();
        
        // Event listeners para navegación
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentTestimonialIndex = Math.max(0, currentTestimonialIndex - 1);
                showTestimonials();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                const maxIndex = testimonialCards.length - getVisibleTestimonialsCount();
                currentTestimonialIndex = Math.min(maxIndex, currentTestimonialIndex + 1);
                showTestimonials();
            });
        }
        
        // Auto-play del carrusel
        setInterval(() => {
            const maxIndex = testimonialCards.length - getVisibleTestimonialsCount();
            currentTestimonialIndex = currentTestimonialIndex >= maxIndex ? 0 : currentTestimonialIndex + 1;
            showTestimonials();
        }, 5000);
    }
    
    function showTestimonials() {
        const visibleCount = getVisibleTestimonialsCount();
        
        testimonialCards.forEach((card, index) => {
            if (index >= currentTestimonialIndex && index < currentTestimonialIndex + visibleCount) {
                card.style.display = 'block';
                card.classList.add('visible');
            } else {
                card.style.display = 'none';
                card.classList.remove('visible');
            }
        });
        
        // Actualizar estado de botones de navegación
        updateCarouselButtons();
    }
    
    function getVisibleTestimonialsCount() {
        return window.innerWidth <= 768 ? 1 : 4;
    }
    
    function updateCarouselButtons() {
        if (!prevBtn || !nextBtn) return;
        
        const maxIndex = testimonialCards.length - getVisibleTestimonialsCount();
        
        prevBtn.disabled = currentTestimonialIndex === 0;
        nextBtn.disabled = currentTestimonialIndex >= maxIndex;
        
        prevBtn.style.opacity = prevBtn.disabled ? '0.5' : '1';
        nextBtn.style.opacity = nextBtn.disabled ? '0.5' : '1';
    }
    
    // ================================
    // ANIMACIÓN DE MÉTRICAS
    // ================================
    function initMetricsAnimation() {
        const metricsSection = document.querySelector('.metrics');
        
        if (!metricsSection) return;
        
        // Observer para activar animación cuando la sección sea visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !metricsAnimated) {
                    animateMetrics();
                    metricsAnimated = true;
                }
            });
        }, {
            threshold: 0.5
        });
        
        observer.observe(metricsSection);
    }
    
    function animateMetrics() {
        metricNumbers.forEach(number => {
            const target = parseInt(number.getAttribute('data-target'));
            const increment = target / 50; // Duración de la animación
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    number.textContent = target + (target === 95 ? '%' : '+');
                    clearInterval(timer);
                } else {
                    number.textContent = Math.floor(current) + (target === 95 ? '%' : '+');
                }
            }, 40);
        });
    }
    
    // ================================
    // SCROLL REVEAL ANIMATIONS
    // ================================
    function initScrollReveal() {
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
        
        // Elementos para animar al scroll
        const elementsToAnimate = document.querySelectorAll(`
            .course-card,
            .testimonial-card,
            .metric-card,
            .section-header,
            .filter-buttons,
            .cta-content
        `);
        
        elementsToAnimate.forEach(element => {
            observer.observe(element);
        });
    }
    
    // ================================
    // FILTROS EN PÁGINA DE CURSOS
    // ================================
    function initCoursePage() {
        const coursePageFilters = document.querySelectorAll('.filter-buttons-courses .filter-btn');
        const allCourseCards = document.querySelectorAll('.course-card[data-category]');
        
        if (coursePageFilters.length === 0) return;
        
        coursePageFilters.forEach(button => {
            button.addEventListener('click', function() {
                // Remover active de todos los botones
                coursePageFilters.forEach(btn => btn.classList.remove('active'));
                // Agregar active al botón clickeado
                this.classList.add('active');
                
                // Obtener categoría y filtrar
                const category = this.getAttribute('data-filter');
                filterCoursePage(category);
            });
        });
    }
    
    function filterCoursePage(category) {
        const allCourseCards = document.querySelectorAll('.course-card[data-category]');
        
        allCourseCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            
            if (category === 'all' || cardCategory === category) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.classList.add('visible');
                }, 100);
            } else {
                card.classList.remove('visible');
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }
    
    // ================================
    // SCROLL TO COURSE FROM DROPDOWN
    // ================================
    function initDropdownScrolling() {
        // Solo para cursos.html
        if (!window.location.pathname.includes('cursos.html')) return;
        
        // Verificar si hay un hash en la URL
        const hash = window.location.hash;
        if (hash) {
            setTimeout(() => {
                const targetElement = document.querySelector(hash);
                if (targetElement) {
                    const navbarHeight = navbar.offsetHeight;
                    const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }, 500);
        }
    }
    
    // ================================
    // LAZY LOADING DE IMÁGENES
    // ================================
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // ================================
    // GESTIÓN DE ERRORES DE IMÁGENES
    // ================================
    function initImageErrorHandling() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            img.addEventListener('error', function() {
                // Reemplazar con imagen de placeholder en caso de error
                this.src = 'https://via.placeholder.com/400x250/FF6B35/FFFFFF?text=Imagen+No+Disponible';
            });
        });
    }
    
    // ================================
    // PERFORMANCE OPTIMIZATIONS
    // ================================
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
        };
    }
    
    // ================================
    // EVENT LISTENERS PRINCIPALES
    // ================================
    function initEventListeners() {
        // Scroll del navbar con throttle para mejor performance
        window.addEventListener('scroll', throttle(handleNavbarScroll, 10));
        
        // Resize para ajustar carrusel de testimonios
        window.addEventListener('resize', throttle(() => {
            showTestimonials();
        }, 250));
        
        // Prevenir envío de formularios (si los hay)
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                // Aquí se podría agregar lógica de envío real
                console.log('Formulario enviado');
            });
        });
    }
    
    // ================================
    // UTILIDADES ADICIONALES
    // ================================
    
    // Función para copiar texto al portapapeles
    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Texto copiado al portapapeles');
        });
    }
    
    // Función para mostrar notificaciones (si se necesita)
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            background: var(--primary-color);
            color: white;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // ================================
    // INICIALIZACIÓN PRINCIPAL
    // ================================
    function init() {
        console.log('🚀 Academia Gourmet Digital - Iniciando aplicación...');
        
        try {
            // Inicializar todos los módulos
            initMobileNav();
            initSmoothScrolling();
            initCourseFilters();
            initTestimonialsCarousel();
            initMetricsAnimation();
            initScrollReveal();
            initCoursePage();
            initDropdownScrolling();
            initLazyLoading();
            initImageErrorHandling();
            initEventListeners();
            initFAQ();
            
            console.log('✅ Todos los módulos inicializados correctamente');
            
            // Pequeña animación de entrada para el body
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.5s ease';
            
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 100);
            
        } catch (error) {
            console.error('❌ Error durante la inicialización:', error);
        }
    }

    // ================================
    // FAQ FUNCTIONALITY
    // ================================
    function initFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            
            question.addEventListener('click', () => {
                // Cerrar todas las otras preguntas primero
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-question').classList.remove('active');
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        otherAnswer.style.maxHeight = null;
                    }
                });

                // Toggle la pregunta actual
                item.classList.toggle('active');
                question.classList.toggle('active');
                
                // Ajustar la altura máxima para la animación
                if (item.classList.contains('active')) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                } else {
                    answer.style.maxHeight = null;
                }
            });
        });

        // Establecer la altura inicial de todas las respuestas a 0
        document.querySelectorAll('.faq-answer').forEach(answer => {
            answer.style.maxHeight = null;
        });
    }
    
    // ================================
    // INICIAR APLICACIÓN
    // ================================
    init();

    // Inicializar FAQ después de que todo esté cargado
    document.addEventListener('DOMContentLoaded', initFAQ);
    
    // ================================
    // EXPORTAR FUNCIONES ÚTILES AL SCOPE GLOBAL
    // ================================
    window.AcademiaGourmet = {
        showNotification,
        copyToClipboard,
        filterCoursePage,
        initFAQ,
        // Otras funciones que podrían ser útiles externamente
    };
});

// ================================
// SERVICE WORKER REGISTRATION (Opcional)
// ================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registrado correctamente:', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed:', registrationError);
            });
    });
}