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
    let currentActiveItem = null; // Track currently active service item
    let hoverTimeout = null; // Track hover timeout for stability
    
    // Function to clear all active timeouts and reset all titles
    function resetAllTitles() {
        // Clear all pending timeouts
        activeTimeouts.forEach(timeout => clearTimeout(timeout));
        activeTimeouts = [];
        
        // Reset all service titles to dark blue immediately
        serviceItems.forEach(serviceItem => {
            const title = serviceItem.querySelector('.service-title');
            const words = title.querySelectorAll('.word');
            words.forEach(word => {
                word.style.color = '#172D44'; // dark blue
                word.style.transition = 'color 0.2s ease-in-out';
            });
        });
    }
    
    // Function to reset all images to initial state
    function resetAllImages() {
        serviceItems.forEach(serviceItem => {
            const image = serviceItem.querySelector('.service-hover-image');
            if (image) {
                // Reset image to initial state
                image.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                image.style.opacity = '0';
                image.style.transform = 'scale(0.3) translateY(15px) translateX(10px) rotate(2deg)';
                image.style.filter = 'blur(2px)';
                image.style.zIndex = '5';
            }
        });
    }
    
    // Function to handle smooth transitions between service cards
    function handleServiceCardTransition(newActiveItem) {
        // If there's a currently active item and it's different from the new one
        if (currentActiveItem && currentActiveItem !== newActiveItem) {
            // Force close the previous item's image quickly
            const previousImage = currentActiveItem.querySelector('.service-hover-image');
            if (previousImage) {
                previousImage.style.transition = 'all 0.15s cubic-bezier(0.4, 0, 1, 1)';
                previousImage.style.opacity = '0';
                previousImage.style.transform = 'scale(0.2) translateY(20px) translateX(15px) rotate(3deg)';
                previousImage.style.filter = 'blur(3px)';
                previousImage.style.zIndex = '5';
            }
        }
        
        // Set the new active item
        currentActiveItem = newActiveItem;
        
        // Reset transition timing for the new item
        if (newActiveItem) {
            const newImage = newActiveItem.querySelector('.service-hover-image');
            if (newImage) {
                newImage.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            }
        }
    }
    
    serviceItems.forEach(item => {
        const title = item.querySelector('.service-title');
        const words = title.querySelectorAll('.word');
        
        // Reset all words to gray initially
        words.forEach(word => {
            word.style.color = '#9CA3AF'; // gray-400
            word.style.transition = 'color 0.1s ease'; // Faster transition for instant reset
        });
        
        // Add hover event listeners with stability
        item.addEventListener('mouseenter', () => {
            // Clear any existing hover timeout
            if (hoverTimeout) {
                clearTimeout(hoverTimeout);
                hoverTimeout = null;
            }
            
            // Handle smooth transition between cards
            handleServiceCardTransition(item);
            
            // First, reset all titles and clear timeouts
            resetAllTitles();
            
            // Reset all images first, then animate current one
            resetAllImages();
            
            // Small delay to ensure image animation works when returning to a card
            setTimeout(() => {
                const currentImage = item.querySelector('.service-hover-image');
                if (currentImage) {
                    currentImage.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    currentImage.style.opacity = '1';
                    currentImage.style.transform = 'scale(1) translateY(0) translateX(0) rotate(0deg)';
                    currentImage.style.filter = 'blur(0px)';
                    currentImage.style.zIndex = '10';
                }
            }, 50);
            
            // Animate all words to orange color simultaneously for smoother effect
            words.forEach((word, index) => {
                const timeout = setTimeout(() => {
                    word.style.color = '#E04D2B'; // orange color
                    word.style.transition = 'color 0.3s ease-in-out';
                }, index * 50); // Faster animation with shorter delay
                activeTimeouts.push(timeout);
            });
        });
        
        item.addEventListener('mouseleave', () => {
            // Add small delay to prevent rapid toggling on border
            hoverTimeout = setTimeout(() => {
                // Clear timeouts and reset colors
                resetAllTitles();
                
                // Reset all images to initial state
                resetAllImages();
                
                // Clear the current active item when leaving
                if (currentActiveItem === item) {
                    currentActiveItem = null;
                }
            }, 100); // 100ms delay to prevent rapid toggling
        });
    });
});
