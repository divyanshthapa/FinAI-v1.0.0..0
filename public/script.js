document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title'); // "Welcome to FinAI"
    const whatWeOfferSection = document.querySelector('.features'); // "What We Offer" section
    
    // Function to check if an element is in the viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Function to handle scroll event and trigger animations
    function handleScroll() {
        if (isInViewport(whatWeOfferSection)) {
            // Trigger the slide-up and fade-out animation for the hero title
            heroTitle.style.animation = 'slideUpFadeOut 1s ease-out forwards';
        }
    }

    // Listen for scroll events
    window.addEventListener('scroll', handleScroll);
    
    // Initial check in case the section is already in the viewport on page load
    handleScroll();
});

// Detect when the feature items are in the viewport and trigger fade-in animation one by one
window.addEventListener('scroll', function() {
    const featureItems = document.querySelectorAll('.feature-item');
    let delay = 0;

    featureItems.forEach(function(item, index) {
        const rect = item.getBoundingClientRect();

        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
            // Set the delay for each feature's fade-in animation (2 seconds delay between items)
            item.style.animationDelay = `${delay}s`;
            item.classList.add('visible');
            delay += 2; // Increase delay by 2 seconds for the next item
        }
    });
});
