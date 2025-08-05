// Vercel Analytics for Express.js
(function() {
    // Create the script element
    const script = document.createElement('script');
    script.src = 'https://va.vercel-scripts.com/v1/script.js';
    script.defer = true;
    script.setAttribute('data-vercel-analytics', 'true');
    
    // Add the script to the document
    document.head.appendChild(script);
    
    // Initialize the analytics
    window.va = window.va || function() { (window.vaq = window.vaq || []).push(arguments); };
})();
