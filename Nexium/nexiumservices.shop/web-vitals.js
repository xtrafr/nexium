// Web Vitals library for Vercel Speed Insights
// This is a simplified version of the web-vitals library

(function() {
    'use strict';

    // Only run in browser environment
    if (typeof window === 'undefined') return;

    // Web Vitals functions
    window.webVitals = {
        onCLS: function(callback) {
            // Cumulative Layout Shift
            let clsValue = 0;
            let clsEntries = [];
            
            function clsCallback(entries) {
                entries.forEach(entry => {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                        clsEntries.push(entry);
                    }
                });
            }
            
            const observer = new PerformanceObserver(clsCallback);
            observer.observe({ entryTypes: ['layout-shift'] });
            
            // Report CLS when page is hidden
            document.addEventListener('visibilitychange', () => {
                if (document.visibilityState === 'hidden') {
                    callback({
                        name: 'CLS',
                        value: clsValue,
                        id: 'cls-' + Date.now()
                    });
                }
            });
        },
        
        onFID: function(callback) {
            // First Input Delay
            function fidCallback(entries) {
                entries.forEach(entry => {
                    callback({
                        name: 'FID',
                        value: entry.processingStart - entry.startTime,
                        id: 'fid-' + Date.now()
                    });
                });
            }
            
            const observer = new PerformanceObserver(fidCallback);
            observer.observe({ entryTypes: ['first-input'] });
        },
        
        onLCP: function(callback) {
            // Largest Contentful Paint
            let lcpValue = 0;
            let lcpEntry = null;
            
            function lcpCallback(entries) {
                entries.forEach(entry => {
                    if (entry.startTime > lcpValue) {
                        lcpValue = entry.startTime;
                        lcpEntry = entry;
                    }
                });
            }
            
            const observer = new PerformanceObserver(lcpCallback);
            observer.observe({ entryTypes: ['largest-contentful-paint'] });
            
            // Report LCP when page is hidden
            document.addEventListener('visibilitychange', () => {
                if (document.visibilityState === 'hidden' && lcpEntry) {
                    callback({
                        name: 'LCP',
                        value: lcpValue,
                        id: 'lcp-' + Date.now()
                    });
                }
            });
        },
        
        onFCP: function(callback) {
            // First Contentful Paint
            function fcpCallback(entries) {
                entries.forEach(entry => {
                    callback({
                        name: 'FCP',
                        value: entry.startTime,
                        id: 'fcp-' + Date.now()
                    });
                });
            }
            
            const observer = new PerformanceObserver(fcpCallback);
            observer.observe({ entryTypes: ['first-contentful-paint'] });
        },
        
        onTTFB: function(callback) {
            // Time to First Byte
            const navigationEntry = performance.getEntriesByType('navigation')[0];
            if (navigationEntry) {
                callback({
                    name: 'TTFB',
                    value: navigationEntry.responseStart - navigationEntry.requestStart,
                    id: 'ttfb-' + Date.now()
                });
            }
        }
    };
    
    console.log('Web Vitals library loaded');
})(); 