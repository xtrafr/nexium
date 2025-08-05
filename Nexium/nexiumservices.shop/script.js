// Global variables
let products = [];
let currentProduct = null;

// DOM elements
const productsGrid = document.getElementById('productsGrid');
const productModal = document.getElementById('productModal');
const modalContent = document.getElementById('modalContent');
const closeModal = document.querySelector('.close');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Force scroll to top on page load/reload (more reliable)
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
        
        loadProducts();
        setupEventListeners();
        setupSmoothScrolling();
        setupMobileNavigation();
        setupScrollAnimations();
        setupEnhancedAnimations();
    } catch (error) {
        console.error('Error initializing application:', error);
    }
});

// Additional scroll to top on window load (backup)
window.addEventListener('load', function() {
    if (window.scrollY > 0) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// Setup event listeners
function setupEventListeners() {
    // Close modal
    closeModal.addEventListener('click', closeProductModal);
    window.addEventListener('click', function(event) {
        if (event.target === productModal) {
            closeProductModal();
        }
    });

    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
}

// Setup mobile navigation
function setupMobileNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });
        
        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('nav-open');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
        });
    }
}

// Setup smooth scrolling for navigation links
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link, .btn[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Fallback product data (will be replaced by JSON data)
const productsData = [
    {
        "_id": "1",
        "name": "Nexium VALORANT Unlock All",
        "description": "Why spend hundreds on skins when you can unlock everything for the price of a knife? Unlock every skin with Nexium Skinchanger.",
        "price": "4.99 - 34.99",
        "originalPrice": 34.99,
        "category": "Gaming Tools",
        "compatibility": [
            "Vanguard Detection Removed with a VGC Emulator",
            "Compatible with windows 10 & 11 (Including 24h2)",
            "Supports amd and intel"
        ],
        "features": [
            "Unlock All Skins",
            "Unlock All Variations",
            "Unlock all Sound Effects & Kill effects",
            "Save skins"
        ],
        "inStock": true,
        "stockCount": 50,
        "image": "../unlock all.webp"
    },
    {
        "_id": "2",
        "name": "Nexium Spoofer",
        "description": "The spoofer alters your system's unique hardware ID, making your PC appear as an entirely different device—perfect for bypassing bans and staying undetected by anti-cheat systems.",
        "price": "8.99 - 47.99",
        "originalPrice": 47.99,
        "category": "Security Tools",
        "features": [
            "VAN 152, VAL 185, VAL 5 Bypass",
            "TPM, HVCI, Temp Ban Bypass",
            "Advanced ARP Spoofing",
            "Bypass ALL Game Bans"
        ],
        "supportedGames": [
            "Valorant",
            "Overwatch",
            "Rainbow Six Siege",
            "Apex Legends"
        ],
        "supportedMotherboards": [
            "Asus",
            "Asrock",
            "MSI",
            "Gigabyte",
            "Biostar",
            "Acer",
            "HP"
        ],
        "inStock": true,
        "stockCount": 20,
        "image": "../woofer.webp"
    },
    {
        "_id": "3",
        "name": "Netflix Premium Lifetime",
        "description": "Unlock unlimited entertainment with no ads, full HD, and downloads on all your devices with Netflix Premium!",
        "price": "4.99",
        "originalPrice": 15.99,
        "category": "Streaming",
        "features": [
            "Lifetime Warranty",
            "NFA",
            "Replacable in case of any problems",
            "4K Ultra HD + HDR",
            "Download your shows and movies offline"
        ],
        "inStock": true,
        "stockCount": 25,
        "image": "../netflix.webp"
    },
    {
        "_id": "4",
        "name": "Crunchyroll Premium Lifetime",
        "description": "Unlock unlimited anime with no ads, new episodes one hour after Japan, and full HD streaming with Crunchyroll Premium.",
        "price": "4.99",
        "originalPrice": 9.99,
        "category": "Streaming",
        "features": [
            "Lifetime Warranty",
            "NFA",
            "Replacable in case of any problems",
            "4K Ultra HD + HDR",
            "Download your animes offline"
        ],
        "inStock": true,
        "stockCount": 30,
        "image": "../crunchyroll.webp"
    },
    {
        "_id": "5",
        "name": "Nexium Private SLOTTED VALORANT Cheat",
        "description": "Experience next-level gameplay with our private, undetectable Valorant cheat packed with powerful features and built to stay stealthy so you dominate every match without compromise.",
        "price": "12.99 - 129.99",
        "originalPrice": 129.99,
        "category": "Gaming Tools",
        "compatibility": [
            "Vanguard Detection Removed, Completely Undetectable",
            "Compatible with windows 10 & 11 (Excluding 24h2)",
            "Supports amd and intel"
        ],
        "features": [
            "Private Undetectable Cheat",
            "Visual ESP & Chams",
            "Advanced Aimbot System",
            "Unlock All Skins",
            "Third Person Mode",
            "Custom Anti-Aim"
        ],
        "visualFeatures": [
            "Enemy Chams (Color/RGB/Fresnel)",
            "Skeleton ESP - Head ESP - Distance ESP",
            "Weapon Icon - Spike Info - Agent Icon",
            "Health and Armor Bar - Riot Name ESP",
            "Dropped Traps/Skills - Weapon State"
        ],
        "aimbotFeatures": [
            "Enable Aim - Visible Check",
            "Perfect No Spread (Run and Gun)",
            "Recoil Control - Recoil Crosshair",
            "Adjustable Aim Key - Aim Radius",
            "Aim Smoothness - Selectable Aimbone",
            "Auto Shoot (Custom Speed)"
        ],
        "miscFeatures": [
            "Unlock All Skins - Skip Tutorial",
            "Hand/Gun/Self Wireframe (1P and 3P)",
            "Big Gun 1P / 3P - Gun Chams 3P (Auto)",
            "Hand Material Color / Rainbow",
            "Third Person - Fast Crouch - Bunny Hop",
            "Viewmodel FOV / Wide Arms",
            "Server-Sided Anti-Aim (Custom)",
            "Buddy Changer",
            "Custom Sky",
            "Skybox Changer",
            "Custom Weapon",
            "Galaxy Chams"
        ],
        "inStock": true,
        "stockCount": 15,
        "image": "../slotted.webp",
        "gallery": [
            "../slotted.webp",
            "../slotted.webp",
            "../slotted.webp"
        ],
        "videos": [
            {
                "title": "Nexium Slotted - Gameplay Showcase 1",
                "url": "https://www.youtube.com/embed/IBII3qi0X9U",
                "thumbnail": "../slotted.webp",
                "description": "Watch our advanced features in action - Part 1"
            },
            {
                "title": "Nexium Slotted - Gameplay Showcase 2",
                "url": "https://www.youtube.com/embed/nw8DxMHsiD0",
                "thumbnail": "../slotted.webp",
                "description": "Watch our advanced features in action - Part 2"
            }
        ]
    },
    {
        "_id": "6",
        "name": "Nexium VANGUARD Emulator & Internal",
        "description": "⌛ What Are You Waiting For? Purchase Now! Emulates and disables Vanguard, gets rid of any annoying VALORANT Popups, and makes any detectable cheat undetectable by the anti-cheat system.",
        "price": "7.99 - 44.99",
        "originalPrice": 44.99,
        "category": "Security Tools",
        "compatibility": [
            "Compatible with windows 10 & 11 (Including 24h2)",
            "Supports amd and intel"
        ],
        "features": [
            "Vanguard Emulator",
            "Popup Bypass",
            "Internal Cheat Included",
            "Emulates and disables vanguard",
            "Gets rid of any annoying VALORANT Popups",
            "HVCI Error, Secure Boot & more bypass",
            "Makes any detectable cheat undetectable by the ac"
        ],
        "inStock": true,
        "stockCount": 3,
        "image": "../public.avif",
        "gallery": [
            "../public.avif",
            "../public.avif",
            "../public.avif"
        ],
        "videos": []
    }
];

// Load products from API endpoint
function loadProducts() {
    try {
        // First try to fetch from API
        fetch('/api/products')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                return response.json();
            })
            .then(data => {
                products = data;
                renderProducts(data);
            })
            .catch(error => {
                console.error('Error loading products from API:', error);
                // Fallback to embedded data if API fails
                loadEmbeddedProducts();
            });
    } catch (error) {
        console.error('Error in loadProducts:', error);
        loadEmbeddedProducts();
    }
}

// Load embedded products as fallback
function loadEmbeddedProducts() {
    try {
        products = productsData;
        renderProducts(productsData);
    } catch (fallbackError) {
        console.error('Fallback also failed:', fallbackError);
        const productsGrid = document.getElementById('productsGrid');
        if (productsGrid) {
            productsGrid.innerHTML = '<p class="error-message" style="text-align: center; color: #ef4444; padding: 20px;">Failed to load products. Please try again later.</p>';
        }
    }
}

// Render products in the grid
function renderProducts(productsData) {
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';
    
    productsData.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Create a product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.addEventListener('click', () => openProductModal(product));
    
    const priceDisplay = `€${product.price}`;
    
    const statusClass = product.inStock ? 'status-in-stock' : 'status-out-of-stock';
    const statusText = product.inStock ? 'In Stock' : 'Out of Stock';
    
    // Limit features display to first 3 - with safety check
    const features = product.features || [];
    const displayFeatures = features.slice(0, 3);
    const hasMoreFeatures = features.length > 3;
    
    // Create image with fallback
    const imageUrl = product.image || '/images/placeholder.jpg';
    
    // Create truncated description for preview
    const truncatedDescription = product.description.length > 120 ? product.description.substring(0, 120) + '...' : product.description;
    
    card.innerHTML = `
        <div class="product-image-container">
            <img src="${imageUrl}" alt="${product.name}" class="product-image" loading="lazy">
            <div class="product-overlay">
                <div class="overlay-content">
                    <i class="fas fa-eye"></i>
                    <span>View Details</span>
                </div>
            </div>
            ${product.videos && product.videos.length > 0 ? '<div class="video-indicator"><i class="fas fa-play"></i></div>' : ''}
        </div>
        
        <div class="product-content">
            <div class="product-header">
                <div>
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-category">${product.category}</p>
                </div>
                <span class="product-status ${statusClass}">${statusText}</span>
            </div>
            
            <p class="product-description">${truncatedDescription}</p>
            
            <div class="product-price">${priceDisplay}</div>
            
            <div class="product-features">
                <h4>Key Features:</h4>
                <div class="features-list">
                    ${displayFeatures.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
                    ${hasMoreFeatures ? `<span class="feature-tag">+${product.features.length - 3} more</span>` : ''}
                </div>
            </div>
            
            <div class="product-actions">
                <button class="btn btn-primary btn-small" ${!product.inStock ? 'disabled' : ''}>
                    <i class="fas fa-shopping-cart"></i>
                    ${product.inStock ? 'View Details' : 'Out of Stock'}
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Open product modal with smooth animation
function openProductModal(product) {
    currentProduct = product;
    
    const priceDisplay = `€${product.price}`;
    
    const statusClass = product.inStock ? 'status-in-stock' : 'status-out-of-stock';
    const statusText = product.inStock ? 'In Stock' : 'Out of Stock';
    
    // Create media gallery section
    const createMediaGallery = () => {
        if (!product.image) return '';
        
        return `
            <div class="media-gallery">
                <div class="main-image-container">
                    <img src="${product.image}" alt="${product.name}" class="main-product-image">
                </div>
            </div>
        `;
    };
    
    // Create videos section for any product with videos
    const createVideosSection = () => {
        if (!product.videos || product.videos.length === 0) return '';
        
        return `
            <div class="videos-section">
                <h3 class="videos-title"><i class="fas fa-play-circle"></i> Product Showcase Videos</h3>
                <div class="videos-grid">
                    ${product.videos.map((video, index) => `
                        <div class="video-card featured-video" onclick="openVideoModal('${video.url}', '${video.title}')">
                            <div class="video-thumbnail">
                                <img src="${video.thumbnail}" alt="${video.title}">
                                <div class="play-overlay">
                                    <i class="fas fa-play"></i>
                                    <span class="play-text">WATCH NOW</span>
                                </div>
                            </div>
                            <div class="video-info">
                                <h4>${video.title}</h4>
                                <p>${video.description}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    };

    modalContent.innerHTML = `
        <div class="modal-header">
            <div class="product-header">
                <div>
                    <h2 class="product-title">${product.name}</h2>
                    <p class="product-category">${product.category}</p>
                </div>
                <span class="product-status ${statusClass}">${statusText}</span>
            </div>
        </div>
        
        <div class="modal-body">
            ${createMediaGallery()}
            
            <div class="product-info">
                <div class="product-price">${priceDisplay}</div>
                
                <div class="modal-product-description">
                    <h4>Description</h4>
                    <p>${product.description}</p>
                </div>
                
                ${createVideosSection()}
                
                ${product.compatibility ? `
                    <div class="product-features">
                        <h4>Compatibility</h4>
                        <div class="features-list">
                            ${product.compatibility.map(item => `<span class="feature-tag">${item}</span>`).join('')}
                        </div>
                    </div>
                ` : ''}
                
                <div class="product-features">
                    <h4>Features</h4>
                    <div class="features-list">
                        ${product.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
                    </div>
                </div>
                
                ${product.visualFeatures ? `
                    <div class="product-features">
                        <h4>Visual Features</h4>
                        <div class="features-list">
                            ${product.visualFeatures.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
                        </div>
                    </div>
                ` : ''}
                
                ${product.aimbotFeatures ? `
                    <div class="product-features">
                        <h4>Aimbot Features</h4>
                        <div class="features-list">
                            ${product.aimbotFeatures.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
                        </div>
                    </div>
                ` : ''}
                
                ${product.miscFeatures ? `
                    <div class="product-features">
                        <h4>Misc Features</h4>
                        <div class="features-list">
                            ${product.miscFeatures.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
                        </div>
                    </div>
                ` : ''}
                
                ${product.supportedGames ? `
                    <div class="product-features">
                        <h4>Supported Games</h4>
                        <div class="features-list">
                            ${product.supportedGames.map(game => `<span class="feature-tag">${game}</span>`).join('')}
                        </div>
                    </div>
                ` : ''}
                
                ${product.supportedMotherboards ? `
                    <div class="product-features">
                        <h4>Supported Motherboards</h4>
                        <div class="features-list">
                            ${product.supportedMotherboards.map(mb => `<span class="feature-tag">${mb}</span>`).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>
        
        <div class="modal-footer">
            <button class="btn btn-secondary" onclick="closeProductModal()">Close</button>
            ${product.inStock ? `
                <button class="btn btn-primary purchase-btn" onclick="purchaseProduct()">
                    <i class="fas fa-shopping-cart"></i>
                    Purchase Now
                </button>
            ` : `
                <button class="btn btn-disabled" disabled>
                    <i class="fas fa-times"></i>
                    Out of Stock
                </button>
            `}
        </div>
    `;
    
    // Show modal with animation
    productModal.style.display = 'block';
    
    // Prevent background scrolling and disable smooth scroll while preserving scrollbar space
    const scrollY = window.scrollY;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    
    document.documentElement.classList.add('modal-open');
    document.body.classList.add('modal-open');
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    
    // Trigger animation after a small delay
    setTimeout(() => {
        productModal.classList.add('show');
    }, 10);
}

// Close product modal with smooth animation
function closeProductModal() {
    // Start closing animation
    productModal.classList.remove('show');
    
    // Wait for animation to complete before hiding
    setTimeout(() => {
        productModal.style.display = 'none';
        
        // Get the stored scroll position
        const scrollY = document.body.style.top;
        const targetScrollY = scrollY ? parseInt(scrollY) * -1 : 0;
        
        // Temporarily disable smooth scrolling
        const originalScrollBehavior = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = 'auto';
        
        // Remove modal classes and restore body styles
        document.documentElement.classList.remove('modal-open');
        document.body.classList.remove('modal-open');
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.paddingRight = '';
        
        // Instantly restore scroll position
        window.scrollTo(0, targetScrollY);
        
        // Restore original scroll behavior
        document.documentElement.style.scrollBehavior = originalScrollBehavior;
        
        currentProduct = null;
    }, 300);
}

// Purchase product
async function purchaseProduct() {
    if (!currentProduct || !currentProduct.inStock) return;
    
    const selectedPriceOption = modalContent.querySelector('.price-option.selected');
    const priceOption = selectedPriceOption ? 
        (selectedPriceOption.dataset.price == currentProduct.price.max ? 'max' : 'min') : 'min';
    
    // Simple redirect to SellAuth store
    const purchaseBtn = document.querySelector('.purchase-btn');
    if (purchaseBtn) {
        purchaseBtn.textContent = 'Redirecting...';
        purchaseBtn.disabled = true;
    }
    
    setTimeout(() => {
        window.open('https://nexiumservices.sellauth.com/', '_blank');
        
        if (purchaseBtn) {
            purchaseBtn.textContent = 'Purchase Now';
            purchaseBtn.disabled = false;
        }
    }, 1000);
}

// Utility functions
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

function showError(message) {
    // Create a simple toast notification
    const toast = document.createElement('div');
    toast.className = 'toast error';
    toast.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <span>${message}</span>
    `;
    
    // Add toast styles
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--danger);
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 5000);
}

function showLoading(message = 'Loading...') {
    const loader = document.createElement('div');
    loader.id = 'loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="spinner"></div>
            <p>${message}</p>
        </div>
    `;
    
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 4000;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        .loader-content {
            text-align: center;
            color: white;
        }
        .spinner {
            width: 40px;
            height: 40px;
            border: 4px solid rgba(139, 92, 246, 0.3);
            border-top: 4px solid var(--primary-purple);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 20px;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(loader);
}

function hideLoading() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.remove();
    }
}

// Enhanced scroll animations and effects
function setupScrollAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -30px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.product-card, .feature-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Enhanced animations and interactions
function setupEnhancedAnimations() {
    // Add staggered animation to product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        
        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px rgba(139, 92, 246, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 20px 40px rgba(139, 92, 246, 0.2)';
        });
    });

    // Enhanced button animations
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            if (this.classList.contains('btn-primary')) {
                this.style.transform = 'translateY(-2px) scale(1.05)';
                this.style.boxShadow = '0 10px 30px rgba(139, 92, 246, 0.5)';
            }
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            if (this.classList.contains('btn-primary')) {
                this.style.boxShadow = '0 4px 15px rgba(139, 92, 246, 0.3)';
            }
        });
    });

    // Add scroll-to-top button
    createScrollToTopButton();
}

// Create floating scroll-to-top button
function createScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, var(--primary-purple), var(--secondary-purple));
        border: none;
        border-radius: 50%;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px);
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
    `;
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    scrollBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.1)';
        this.style.boxShadow = '0 8px 25px rgba(139, 92, 246, 0.5)';
    });
    
    scrollBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 4px 15px rgba(139, 92, 246, 0.3)';
    });
    
    document.body.appendChild(scrollBtn);
    
    // Show/hide scroll button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
            scrollBtn.style.transform = 'translateY(0)';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
            scrollBtn.style.transform = 'translateY(20px)';
        }
    });
}

// Helper functions for media gallery
function changeMainImage(imageSrc) {
    const mainImage = document.getElementById('mainImage');
    if (mainImage) {
        mainImage.style.opacity = '0';
        setTimeout(() => {
            mainImage.src = imageSrc;
            mainImage.style.opacity = '1';
        }, 150);
    }
    
    // Update active thumbnail
    document.querySelectorAll('.thumbnail-item').forEach(thumb => {
        thumb.classList.remove('active');
    });
    event.target.closest('.thumbnail-item').classList.add('active');
}

// Video modal functionality
function openVideoModal(videoUrl, videoTitle) {
    const videoModal = document.createElement('div');
    videoModal.className = 'video-modal';
    
    // Check if it's a local video file or YouTube embed
    const isLocalVideo = videoUrl.endsWith('.mov') || videoUrl.endsWith('.mp4') || videoUrl.endsWith('.webm');
    
    const videoContent = isLocalVideo ? 
        `<video controls autoplay style="width: 100%; height: 100%;">
            <source src="${videoUrl}" type="video/mp4">
            <source src="${videoUrl}" type="video/quicktime">
            Your browser does not support the video tag.
        </video>` :
        `<iframe src="${videoUrl}?autoplay=1&rel=0&modestbranding=1" frameborder="0" allowfullscreen allow="autoplay; encrypted-media" style="width: 100%; height: 100%;"></iframe>`;
    
    videoModal.innerHTML = `
        <div class="video-modal-content">
            <div class="video-modal-header">
                <h3>${videoTitle}</h3>
                <span class="video-close" onclick="closeVideoModal()">&times;</span>
            </div>
            <div class="video-container">
                ${videoContent}
            </div>
        </div>
    `;
    
    document.body.appendChild(videoModal);
    setTimeout(() => videoModal.classList.add('show'), 10);
    
    // Prevent background scrolling
    document.body.style.overflow = 'hidden';
    
    // Add click outside to close functionality
    videoModal.addEventListener('click', function(e) {
        if (e.target === videoModal) {
            closeVideoModal();
        }
    });
}

function closeVideoModal() {
    const videoModal = document.querySelector('.video-modal');
    if (videoModal) {
        videoModal.classList.remove('show');
        setTimeout(() => {
            videoModal.remove();
            document.body.style.overflow = '';
        }, 300);
    }
}

// Enhanced navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.scrollY;
    
    if (scrolled > 50) {
        navbar.style.background = 'rgba(15, 15, 35, 0.98)';
        navbar.style.backdropFilter = 'blur(15px)';
        navbar.style.boxShadow = '0 4px 20px rgba(139, 92, 246, 0.1)';
    } else {
        navbar.style.background = 'rgba(15, 15, 35, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.boxShadow = 'none';
    }
    
    // Subtle parallax effect for hero section (reduced intensity)
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});
