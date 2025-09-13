// Navbar scroll effect and mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    // Function to update navbar on scroll
    function updateNavbar() {
        if (window.scrollY > 50) {
            // Scrolled state - add compact style with rounded corners, shadow and backdrop blur
            navbar.classList.add('py-2');
            navbar.classList.add('rounded-navbar');
            navbar.classList.add('shadow-md');
            navbar.classList.add('bg-opacity-80');
            navbar.classList.add('backdrop-blur-md');
            navbar.classList.add('navbar-compact');
        } else {
            // Initial state - remove all scroll effects
            navbar.classList.remove('py-2');
            navbar.classList.remove('rounded-navbar');
            navbar.classList.remove('shadow-md');
            navbar.classList.remove('bg-opacity-80');
            navbar.classList.remove('backdrop-blur-md');
            navbar.classList.remove('navbar-compact');
        }
    }
    
    // Mobile menu toggle
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!mobileMenuButton.contains(event.target) && !mobileMenu.contains(event.target)) {
            mobileMenu.classList.add('hidden');
        }
    });
    
    // Initial call to set the correct state
    updateNavbar();
    
    // Add scroll event listener
    window.addEventListener('scroll', updateNavbar);
});
