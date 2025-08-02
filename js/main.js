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




    // Smooth scrolling on the navbar links and button links
    $(".navbar-nav a, .navbar .btn-link").on('click', function (event) {
        if (this.hash !== "" && $(this.hash).length) {
            event.preventDefault();
            
            // Close mobile menu if open
            $('.navbar-collapse').collapse('hide');
            
            // Get the target element
            var target = $(this.hash);
            var navbarHeight = $('.navbar').outerHeight();
            var scrollTop = target.offset().top - navbarHeight;
            
            // Smooth scroll to target
            $('html, body').animate({
                scrollTop: scrollTop
            }, 800, 'swing');

            // Update active state for nav links
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('li').find('a').addClass('active');
            }
            
            // Update URL without adding to history
            if (history.pushState) {
                history.pushState(null, null, this.hash);
            } else {
                location.hash = this.hash;
            }
        }
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

