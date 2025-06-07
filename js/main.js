/**
 * Espaço Bela Unha - Main JavaScript
 * 
 * Este arquivo contém todas as funcionalidades JavaScript do site
 * do Espaço Bela Unha, especializado em alongamento de unhas.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Variáveis globais
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    const dropdowns = document.querySelectorAll('.dropdown');
    const backToTopButton = document.getElementById('back-to-top');
    const cookieConsent = document.querySelector('.cookie-consent');
    const acceptCookiesButton = document.getElementById('accept-cookies');

    // Menu Mobile Toggle
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', function() {
            navList.classList.toggle('open');
            
            // Transformar o ícone do hambúrguer em X
            this.classList.toggle('active');
            
            if (this.classList.contains('active')) {
                this.setAttribute('aria-expanded', 'true');
            } else {
                this.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Dropdown Menu para Mobile (click instead of hover)
    if (window.innerWidth < 992) {
        dropdowns.forEach(dropdown => {
            const link = dropdown.querySelector('a');
            
            link.addEventListener('click', function(e) {
                e.preventDefault();
                dropdown.classList.toggle('open');
            });
        });
    }

    // Back to Top Button
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });

        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Cookie Consent
    if (cookieConsent && acceptCookiesButton) {
        // Verificar se o usuário já aceitou os cookies
        if (!localStorage.getItem('cookiesAccepted')) {
            cookieConsent.style.display = 'block';
        }

        acceptCookiesButton.addEventListener('click', function() {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieConsent.style.display = 'none';
        });
    }

    // Inicializar sliders se a biblioteca Slick estiver disponível
    if (typeof $.fn.slick !== 'undefined') {
        // Gallery Slider
        $('.gallery-slider').slick({
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });

        // Testimonials Slider
        $('.testimonials-slider').slick({
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 4000,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });
    } else {
        console.log('Slick slider não está disponível. Certifique-se de incluir a biblioteca.');
    }

    // Animação de scroll suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Ignorar se for um link de dropdown ou não for um link interno
            if (href === '#' || this.parentElement.classList.contains('dropdown')) {
                return;
            }
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Adicionar classe 'active' ao link de navegação da página atual
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-list a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        // Verificar se o caminho do link corresponde à página atual
        if (currentLocation.includes(linkPath) && linkPath !== 'index.html') {
            link.classList.add('active');
        } else if (currentLocation.endsWith('/') && linkPath === 'index.html') {
            link.classList.add('active');
        }
    });

    // Formulário de Newsletter
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                // Aqui você adicionaria o código para enviar o email para seu sistema
                // Por enquanto, apenas simulamos uma mensagem de sucesso
                alert('Obrigado por se inscrever em nossa newsletter!');
                emailInput.value = '';
            }
        });
    }

    // Lazy Loading para imagens
    if ('loading' in HTMLImageElement.prototype) {
        // Se o navegador suporta lazy loading nativo
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback para navegadores que não suportam lazy loading nativo
        // Aqui você poderia implementar uma biblioteca de lazy loading
        console.log('Este navegador não suporta lazy loading nativo.');
    }

    // Detectar quando elementos entram na viewport para animações
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Adicionar elementos que devem ser animados quando entrarem na viewport
    document.querySelectorAll('.service-card, .blog-card, .testimonial-item, .about-content').forEach(el => {
        observer.observe(el);
    });
});

// Função para validar formulário de contato
function validateContactForm() {
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();
    let isValid = true;
    
    // Validar nome
    if (name === '') {
        document.getElementById('name-error').textContent = 'Por favor, informe seu nome.';
        isValid = false;
    } else {
        document.getElementById('name-error').textContent = '';
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
        document.getElementById('email-error').textContent = 'Por favor, informe seu email.';
        isValid = false;
    } else if (!emailRegex.test(email)) {
        document.getElementById('email-error').textContent = 'Por favor, informe um email válido.';
        isValid = false;
    } else {
        document.getElementById('email-error').textContent = '';
    }
    
    // Validar mensagem
    if (message === '') {
        document.getElementById('message-error').textContent = 'Por favor, escreva sua mensagem.';
        isValid = false;
    } else {
        document.getElementById('message-error').textContent = '';
    }
    
    return isValid;
}

// Função para validar formulário de agendamento
function validateBookingForm() {
    const name = document.getElementById('booking-name').value.trim();
    const email = document.getElementById('booking-email').value.trim();
    const phone = document.getElementById('booking-phone').value.trim();
    const service = document.getElementById('booking-service').value;
    const date = document.getElementById('booking-date').value;
    const time = document.getElementById('booking-time').value;
    let isValid = true;
    
    // Validações similares ao formulário de contato
    // ...
    
    return isValid;
}

// Função para formatar número de telefone
function formatPhoneNumber(input) {
    // Remove todos os caracteres não numéricos
    let phoneNumber = input.value.replace(/\D/g, '');
    
    // Formata o número como (XX) XXXXX-XXXX
    if (phoneNumber.length > 0) {
        phoneNumber = phoneNumber.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/);
        input.value = !phoneNumber[2] ? phoneNumber[1] : '(' + phoneNumber[1] + ') ' + phoneNumber[2] + (phoneNumber[3] ? '-' + phoneNumber[3] : '');
    }
}

