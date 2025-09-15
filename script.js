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
    
    // Animated word functionality
    const words = ['enterprise', 'development', 'powerful', 'innovative', 'scalable'];
    const animatedWordElement = document.getElementById('animatedWord');
    
    if (animatedWordElement) {
        let currentWordIndex = 0;
        
        function animateWord() {
            const currentWord = words[currentWordIndex];
            
            // Create spans for each character
            const charSpans = currentWord.split('').map(char => 
                `<span class="char-animate">${char}</span>`
            ).join('');
            
            // Set word with fade class and character spans
            animatedWordElement.innerHTML = charSpans;
            animatedWordElement.className = 'text-[#E04D2B] animated-word word-fade';
            
            // Fade in the whole word in gray
            setTimeout(() => {
                animatedWordElement.classList.add('fade-in');
            }, 100);
            
            // Animate each character to orange one by one
            setTimeout(() => {
                const charElements = animatedWordElement.querySelectorAll('.char-animate');
                charElements.forEach((char, index) => {
                    setTimeout(() => {
                        char.classList.add('highlight');
                    }, index * 150); // 150ms delay between each character
                });
            }, 1000);
            
            // Fade out and move to next word
            setTimeout(() => {
                animatedWordElement.classList.remove('fade-in');
                
                setTimeout(() => {
                    currentWordIndex = (currentWordIndex + 1) % words.length;
                    animateWord();
                }, 500);
            }, 1000 + (currentWord.length * 150) + 1500); // Wait for character animation + display time
        }
        
        // Start animation after page load
        setTimeout(animateWord, 1000);
    }
    
    // Services section word-by-word animation
    const serviceItems = document.querySelectorAll('.service-item');
    let activeTimeouts = []; // Store active timeouts
    
    // Function to clear all active timeouts and reset all titles
    function resetAllTitles() {
        // Clear all pending timeouts
        activeTimeouts.forEach(timeout => clearTimeout(timeout));
        activeTimeouts = [];
        
        // Reset all service titles to gray immediately
        serviceItems.forEach(serviceItem => {
            const title = serviceItem.querySelector('.service-title');
            const words = title.querySelectorAll('.word');
            words.forEach(word => {
                word.style.color = '#9CA3AF'; // gray-400
            });
        });
    }
    
    serviceItems.forEach(item => {
        const title = item.querySelector('.service-title');
        const words = title.querySelectorAll('.word');
        
        // Reset all words to gray initially
        words.forEach(word => {
            word.style.color = '#9CA3AF'; // gray-400
            word.style.transition = 'color 0.1s ease'; // Faster transition for instant reset
        });
        
        // Add hover event listeners
        item.addEventListener('mouseenter', () => {
            // First, reset all titles and clear timeouts
            resetAllTitles();
            
            // Then animate current title words to orange one by one
            words.forEach((word, index) => {
                const timeout = setTimeout(() => {
                    word.style.color = '#E04D2B'; // orange color
                }, index * 100); // Reduced delay for faster animation
                activeTimeouts.push(timeout);
            });
        });
        
        item.addEventListener('mouseleave', () => {
            // Clear timeouts and reset colors immediately
            resetAllTitles();
        });
    });
});
