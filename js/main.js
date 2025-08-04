(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();


    // Initiate the wowjs
    new WOW().init();

    // Handle custom hamburger menu animation
    document.addEventListener('DOMContentLoaded', function() {
        const hamburger = document.querySelector('.navbar-toggler');
        const ham = hamburger.querySelector('.ham');
        
        // Toggle 'active' class on click
        hamburger.addEventListener('click', function() {
            ham.classList.toggle('active');
        });
        
        // Remove 'active' class when menu is closed via other means (e.g., clicking a link)
        const navbarCollapse = document.getElementById('navbarCollapse');
        if (navbarCollapse) {
            navbarCollapse.addEventListener('hidden.bs.collapse', function() {
                ham.classList.remove('active');
            });
        }
    });




    // Enhanced smooth scrolling for all navigation links
    $(document).on('click', 'a[href^="#"]', function(event) {
        // Only handle internal links
        if (this.hash !== "") {
            event.preventDefault();
            
            // Store hash
            const hash = this.hash;
            const target = $(hash);
            
            // Verify target exists
            if (target.length) {
                // Close mobile menu if open
                $('.navbar-collapse').collapse('hide');
                
                // Get the navbar height
                const navbarHeight = $('.navbar').outerHeight();
                const scrollTop = target.offset().top - navbarHeight + 10; // Add small offset
                
                // Ultra-fast smooth scroll to target (reduced to 200ms)
                $('html, body').stop().animate({
                    scrollTop: scrollTop
                }, 200, 'swing', function() {
                    // Update URL after scroll completes
                    if (history.pushState) {
                        history.pushState(null, null, hash);
                    } else {
                        window.location.hash = hash;
                    }
                });
                
                // Update active state for nav links
                if ($(this).parents('.navbar-nav').length) {
                    $('.navbar-nav .nav-link').removeClass('active');
                    $(this).addClass('active');
                }
                
                return false;
            }
        }
    });
    
    // Update active state on scroll
    $(window).on('scroll', function() {
        const scrollPosition = $(this).scrollTop();
        const navbarHeight = $('.navbar').outerHeight();
        
        // Check each section
        $('section[id]').each(function() {
            const sectionTop = $(this).offset().top - navbarHeight - 100;
            const sectionBottom = sectionTop + $(this).outerHeight();
            const sectionId = $(this).attr('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                $('.navbar-nav .nav-link').removeClass('active');
                $(`.navbar-nav a[href*=${sectionId}]`).addClass('active');
            }
        });
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').scrollTop(0);
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Screenshot carousel
    $(".screenshot-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        loop: true,
        dots: true,
        items: 1
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        loop: true,
        center: true,
        dots: false,
        nav: true,
        navText: [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ],
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    });

})(jQuery);

