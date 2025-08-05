// Vercel Speed Insights for Express.js - Local Web Vitals Implementation
(function() {
    // Only run in browser environment
    if (typeof window === 'undefined') return;

    // Simple queue implementation
    window.si = window.si || function() { (window.siq = window.siq || []).push(arguments); };

    // Function to initialize Web Vitals
    function initWebVitals() {
        if (!window.webVitals) {
            console.warn('Web Vitals not available');
            return;
        }

        // Get Web Vitals functions
        const { onCLS, onFID, onLCP, onFCP, onTTFB } = window.webVitals;
        
        // Send metrics to Vercel
        function sendToAnalytics(metric) {
            const body = {
                dsn: 'https://vitals.vercel-analytics.com/v1/vitals',
                id: metric.id,
                page: window.location.pathname,
                href: window.location.href,
                event_name: metric.name,
                value: metric.value.toString(),
                speed: '4g' // Default connection speed
            };
            
            console.log('Sending metric:', metric.name, metric.value);
            
            // Use sendBeacon if available, otherwise fall back to fetch
            const blob = new Blob([new URLSearchParams(body).toString()], {
                type: 'application/x-www-form-urlencoded'
            });
            
            if (navigator.sendBeacon) {
                navigator.sendBeacon(body.dsn, blob);
            } else {
                fetch(body.dsn, {
                    body: blob,
                    method: 'POST',
                    credentials: 'omit',
                    keepalive: true
                }).catch(console.error);
            }
        }
        
        // Track all core Web Vitals
        if (onCLS) onCLS(sendToAnalytics);
        if (onFID) onFID(sendToAnalytics);
        if (onLCP) onLCP(sendToAnalytics);
        if (onFCP) onFCP(sendToAnalytics);
        if (onTTFB) onTTFB(sendToAnalytics);
        
        console.log('Vercel Speed Insights initialized');
    }

    // Load web-vitals.js
    const script = document.createElement('script');
    script.src = 'web-vitals.js';
    script.onload = initWebVitals;
    script.onerror = function() {
        console.warn('Failed to load Web Vitals library');
    };
    
    // Add the script to the document
    (document.head || document.body).appendChild(script);
})();
