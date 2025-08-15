// Custom JavaScript for Landing Page

$(document).ready(function() {
    
    // Ensure mobile menu is hidden on page load
    $('body').removeClass('mobile-menu-visible');
    
    // Ensure clean mobile menu population
    setTimeout(function() {
        console.log('Populating mobile menu...');
        $('.mobile-menu .menu-outer').empty(); // Clear any existing content
        var mobileMenuContent = $('.menu-area .main-menu').html();
        $('.mobile-menu .menu-outer').append(mobileMenuContent);
        
        var menuItems = $('.mobile-menu .navigation li').length;
        console.log('Mobile menu populated with', menuItems, 'items');
    }, 50);
    
    // Mobile Menu Toggle (Fixed for proper hide/show)
    $('.mobile-nav-toggler').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Mobile menu toggler clicked');
        $('body').addClass('mobile-menu-visible');
    });
    
    // Close mobile menu
    $('.close-btn').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Close button clicked');
        $('body').removeClass('mobile-menu-visible');
    });
    
    $('.menu-backdrop').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Backdrop clicked');
        $('body').removeClass('mobile-menu-visible');
    });
    
    // Mobile Menu Dropdown (using event delegation for dynamically added elements)
    $(document).on('click', '.mobile-menu li.menu-item-has-children .dropdown-btn', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).toggleClass('open');
        $(this).prev('ul').slideToggle(300);
    });
    
    // Close mobile menu when clicking on navigation links (using event delegation)
    $(document).on('click', '.mobile-menu .navigation a', function(e) {
        var href = $(this).attr('href');
        if (href && href.indexOf('#') === 0) {
            console.log('Navigation link clicked, closing menu');
            $('body').removeClass('mobile-menu-visible');
        }
    });
    
    // Prevent menu from closing when clicking inside menu content
    $('.mobile-menu .menu-box').on('click', function(e) {
        e.stopPropagation();
    });
    
    // Close mobile menu on ESC key
    $(document).on('keydown', function(e) {
        if (e.key === 'Escape' && $('body').hasClass('mobile-menu-visible')) {
            console.log('ESC key pressed, closing menu');
            $('body').removeClass('mobile-menu-visible');
        }
    });
    
    // Fix CTA button click functionality
    $('.cta-content .btn').on('click', function(e) {
        var href = $(this).attr('href');
        console.log('CTA button clicked, href:', href);
        
        if (href && href.indexOf('#') === 0) {
            e.preventDefault();
            var target = $(href);
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 80
                }, 1000);
            }
        }
    });
    
    // Search Popup (Updated to match main.js)
    $('.header-search > a').on('click', function(e) {
        e.preventDefault();
        $('.search-popup-wrap').slideToggle();
        $('body').addClass('search-visible');
        return false;
    });
    
    $('.search-backdrop').on('click', function() {
        $('.search-popup-wrap').slideUp(500);
        $('body').removeClass('search-visible');
    });
    
    // Smooth Scrolling for Navigation Links
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        var target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 80
            }, 1000);
        }
        // Close mobile menu if open
        $('.mobile-menu').removeClass('show');
        $('.menu-backdrop').removeClass('active');
    });
    
    // Sticky Header (Updated to match main.js)
    $(window).on('scroll', function () {
        var scroll = $(window).scrollTop();
        if (scroll < 245) {
            $("#sticky-header").removeClass("sticky-menu");
            $('.scroll-to-target').removeClass('open');
        } else {
            $("#sticky-header").addClass("sticky-menu");
            $('.scroll-to-target').addClass('open');
        }
    });
    
    // Active Navigation on Scroll
    $(window).on('scroll', function() {
        var scrollPos = $(document).scrollTop();
        $('.navigation a[href^="#"]').each(function() {
            var currLink = $(this);
            var refElement = $(currLink.attr('href'));
            if (refElement.position() && refElement.position().top <= scrollPos + 100 && refElement.position().top + refElement.height() > scrollPos) {
                $('.navigation a').removeClass('active');
                currLink.addClass('active');
            }
        });
    });
    
    // Contact Form Handling
    $('.contact-form').on('submit', function(e) {
        e.preventDefault();
        // Basic form validation
        var name = $(this).find('input[type="text"]:first').val();
        var email = $(this).find('input[type="email"]').val();
        var phone = $(this).find('input[type="text"]:nth-of-type(2)').val();
        var subject = $(this).find('input[type="text"]:last').val();
        var message = $(this).find('textarea').val();
        
        if (!name || !email || !phone || !subject || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        if (!isValidEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Show success message (in real application, this would be AJAX call)
        alert('Thank you for your message! We will get back to you soon.');
        $(this)[0].reset();
    });
    
    // Email validation function
    function isValidEmail(email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Newsletter Form
    $('.newsletter-form').on('submit', function(e) {
        e.preventDefault();
        var email = $(this).find('input[type="email"]').val();
        
        if (!email) {
            alert('Please enter your email address.');
            return;
        }
        
        if (!isValidEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        alert('Thank you for subscribing to our newsletter!');
        $(this)[0].reset();
    });
    
    // Shopping Cart Counter (Demo functionality)
    var cartCount = 0;
    $('.product-action a').on('click', function(e) {
        e.preventDefault();
        cartCount++;
        $('.cart-count').text(cartCount);
        
        // Add animation
        $('.cart-count').addClass('animate__animated animate__bounce');
        setTimeout(function() {
            $('.cart-count').removeClass('animate__animated animate__bounce');
        }, 1000);
        
        // Show success message
        var productName = $(this).closest('.product-item').find('.title a').text();
        alert(productName + ' has been added to your cart!');
    });
    
    // Preloader
    $(window).on('load', function() {
        $('#preloader').fadeOut('slow', function() {
            $(this).remove();
        });
    });
    
    // Initialize animations on scroll
    if (typeof WOW !== 'undefined') {
        new WOW().init();
    }
    
    // Mobile Menu Navigation
    $('.mobile-menu .navigation a').on('click', function(e) {
        var href = $(this).attr('href');
        if (href.indexOf('#') === 0) {
            $('.mobile-menu').removeClass('show');
            $('.menu-backdrop').removeClass('active');
        }
    });
    
    // Background images - integrated from main.js
    $("[data-background]").each(function () {
        $(this).css("background-image", "url(" + $(this).attr("data-background") + ")")
    });
    
    // Scroll to target functionality
    if ($('.scroll-to-target').length) {
        $(".scroll-to-target").on('click', function () {
            var target = $(this).attr('data-target');
            $('html, body').animate({
                scrollTop: $(target).offset().top
            }, 1000);
        });
    }
    
    // Initialize WOW animations if available
    if (typeof WOW !== 'undefined') {
        new WOW().init();
    }
    
    // Shopping Cart functionality
    $('.shopping-cart').on('click', function(e) {
        e.preventDefault();
        $(this).next('.mini-cart-dropdown').toggle();
    });
    
    // Close cart dropdown when clicking outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.header-shop-cart').length) {
            $('.mini-cart-dropdown').hide();
        }
    });
    
    // Form submission handlers
    $('.contact-form, .newsletter-form').on('submit', function(e) {
        e.preventDefault();
        var $form = $(this);
        var formType = $form.hasClass('newsletter-form') ? 'newsletter' : 'contact';
        
        if (formType === 'newsletter') {
            var email = $form.find('input[type="email"]').val();
            if (!email || !isValidEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            alert('Thank you for subscribing to our newsletter!');
        } else {
            // Contact form validation
            var isValid = true;
            $form.find('input[required], textarea[required]').each(function() {
                if (!$(this).val().trim()) {
                    isValid = false;
                    $(this).focus();
                    return false;
                }
            });
            
            if (!isValid) {
                alert('Please fill in all required fields.');
                return;
            }
            
            var email = $form.find('input[type="email"]').val();
            if (!isValidEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            alert('Thank you for your message! We will get back to you soon.');
        }
        
        $form[0].reset();
    });
    
});

// Additional functions for compatibility
function preloader() {
    $('#preloader').delay(0).fadeOut();
}

function wowAnimation() {
    if (typeof WOW !== 'undefined') {
        new WOW().init();
    }
}

// Email validation function
function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
