// ===== COMPLETE JAVASCRIPT FOR LOYAL GREENS WEBSITE =====
// This file contains ALL functionality for the entire website

console.log('SCRIPT.JS LOADED - VERSION 3.0 - COMPLETE');

// ===== Wait for DOM to be fully loaded =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('%c🌿 Loyal Greens - Sustainable Fashion', 'color: #d4af37; font-size: 20px; font-weight: bold;');
    console.log('%cWebsite by Loyal Greens Team', 'color: #0a0a0a; font-size: 14px;');
    
    // Initialize common functionality
    initializeNavbar();
    initializeScrollAnimations();
    initializeGallery();
    
    // Initialize collections page specific features if on collections page
    if (document.querySelector('.collection-section')) {
        console.log('Collections page detected - initializing collection features');
        initializeCollections();
    }
    
    // Initialize product view page if on product page
    if (document.querySelector('.product-view')) {
        console.log('Product view page detected - initializing product features');
        initializeProductPage();
    }
    
    // Initialize contact form if present
    initializeContactForm();
    
    // Trigger initial animations
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }
    }, 100);
});

// ===== NAVBAR FUNCTIONALITY =====
function initializeNavbar() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!navbar || !hamburger || !navMenu) {
        console.log('Navbar elements not found on this page');
        return;
    }
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    
    const highlightNav = () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink?.classList.add('active');
            } else {
                navLink?.classList.remove('active');
            }
        });
    };
    
    window.addEventListener('scroll', highlightNav);
}

// ===== SCROLL ANIMATIONS =====
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all elements that need animation
    const animatedElements = document.querySelectorAll(
        '.section-label, .section-heading, .about-image, .about-text, ' +
        '.service-card, .gallery-item, .team-member, .feature-card, .product-card, ' +
        '.collection-header .section-label, .collection-header .section-heading'
    );
    
    animatedElements.forEach(el => observer.observe(el));
    
    // Stagger animation delays
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach((member, index) => {
        member.style.transitionDelay = `${index * 0.15}s`;
    });
    
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href === '') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Parallax effect for hero background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroBg = document.querySelector('.hero-bg');
        
        if (heroBg && scrolled < window.innerHeight) {
            heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// ===== GALLERY FUNCTIONALITY =====
function initializeGallery() {
    const galleryImages = document.querySelectorAll('.gallery-item img');
    
    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            createImageLightbox(img.src, img.alt);
        });
    });
    
    // Testimonials auto scroll enhancement
    const testimonialsTrack = document.getElementById('testimonialsTrack');
    
    if (testimonialsTrack) {
        testimonialsTrack.addEventListener('mouseenter', () => {
            testimonialsTrack.style.animationPlayState = 'paused';
        });
        
        testimonialsTrack.addEventListener('mouseleave', () => {
            testimonialsTrack.style.animationPlayState = 'running';
        });
    }
}

// ===== IMAGE LIGHTBOX =====
function createImageLightbox(imageSrc, imageAlt = 'Image') {
    const lightbox = document.createElement('div');
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        cursor: zoom-out;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const lightboxImg = document.createElement('img');
    lightboxImg.src = imageSrc;
    lightboxImg.alt = imageAlt;
    lightboxImg.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
        border-radius: 10px;
        transform: scale(0.9);
        transition: transform 0.3s ease;
    `;
    
    lightbox.appendChild(lightboxImg);
    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';
    
    // Animate in
    setTimeout(() => {
        lightbox.style.opacity = '1';
        lightboxImg.style.transform = 'scale(1)';
    }, 10);
    
    // Close on click
    lightbox.addEventListener('click', () => {
        lightbox.style.opacity = '0';
        lightboxImg.style.transform = 'scale(0.9)';
        document.body.style.overflow = '';
        setTimeout(() => lightbox.remove(), 300);
    });
    
    // Close on ESC key
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            lightbox.click();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
}

// ===== COLLECTIONS PAGE FUNCTIONALITY =====
function initializeCollections() {
    initializeFilters();
    initializeQuickView();
    initializeAddToCart();
    showAllCollections();
}

// Filter Functionality
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('Filter clicked:', button.getAttribute('data-filter'));
            
            // Remove active from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active to clicked button
            button.classList.add('active');
            
            // Get filter value
            const filterValue = button.getAttribute('data-filter');
            
            // Show/hide collections based on filter
            filterCollections(filterValue);
        });
    });
}

function filterCollections(filterValue) {
    const mensCollection = document.getElementById('mens-collection');
    const womensCollection = document.getElementById('womens-collection');
    
    console.log('Filtering collections:', filterValue);
    
    if (filterValue === 'all') {
        mensCollection.style.display = 'block';
        womensCollection.style.display = 'block';
    } else if (filterValue === 'mens') {
        mensCollection.style.display = 'block';
        womensCollection.style.display = 'none';
    } else if (filterValue === 'womens') {
        mensCollection.style.display = 'none';
        womensCollection.style.display = 'block';
    }
    
    // Animate visible items
    setTimeout(animateVisibleItems, 100);
}

function showAllCollections() {
    const allSections = document.querySelectorAll('.collection-section');
    allSections.forEach(section => {
        section.style.display = 'block';
    });
    animateVisibleItems();
}

function animateVisibleItems() {
    const visibleSections = document.querySelectorAll('.collection-section[style*="display: block"]');
    
    visibleSections.forEach(section => {
        const items = section.querySelectorAll('.collection-item');
        
        items.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        });
    });
}

// Quick View Functionality
function initializeQuickView() {
    console.log('Initializing Quick View buttons...');
    
    // Use event delegation on the document
    document.body.addEventListener('click', function(event) {
        // Check if clicked element is or contains a quick-view button
        const quickViewBtn = event.target.closest('.quick-view');
        
        if (quickViewBtn) {
            event.preventDefault();
            event.stopPropagation();
            
            console.log('Quick View button clicked!');
            handleQuickView(quickViewBtn);
        }
    });
    
    // Log how many buttons we found
    const quickViewButtons = document.querySelectorAll('.quick-view');
    console.log(`Found ${quickViewButtons.length} Quick View buttons`);
}

function handleQuickView(button) {
    // Find the parent collection item
    const collectionItem = button.closest('.collection-item');
    
    if (!collectionItem) {
        console.error('Could not find collection item');
        return;
    }
    
    // Extract product information
    const productName = collectionItem.querySelector('h3')?.textContent || 'Product';
    const productDesc = collectionItem.querySelector('.item-info p')?.textContent || 'Premium sustainable product';
    const productPrice = collectionItem.querySelector('.item-price')?.textContent || '₹2,999';
    const productCategory = collectionItem.querySelector('.item-category')?.textContent || 'Collection';
    
    // IMPORTANT: Get the image from the img element
    const productImageElement = collectionItem.querySelector('.item-image img');
    const productImage = productImageElement ? productImageElement.src : '';
    
    console.log('Product Image Element:', productImageElement);
    console.log('Product Image SRC:', productImage);
    
    // Create product data object
    const productData = {
        name: productName,
        description: productDesc,
        price: productPrice,
        category: productCategory,
        image: productImage
    };
    
    console.log('Product data with image:', productData);
    
    // Show Quick View Modal
    showQuickViewModal(productData);
}

function showQuickViewModal(productData) {
    // Remove existing modal if any
    const existingModal = document.querySelector('.quick-view-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    console.log('Creating modal with product data:', productData);
    console.log('Product image in modal:', productData.image);
    
    // Create modal HTML
    const modal = document.createElement('div');
    modal.className = 'quick-view-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <div class="modal-body">
                <div class="modal-image">
                    <img src="${productData.image}" alt="${productData.name}">
                </div>
                <div class="modal-details">
                    <span class="modal-category">${productData.category}</span>
                    <h2>${productData.name}</h2>
                    <div class="modal-rating">
                        <span class="stars">★★★★★</span>
                        <span class="rating-text">(4.9 rating)</span>
                    </div>
                    <p class="modal-description">${productData.description}</p>
                    <div class="modal-price">${productData.price}</div>
                    <div class="modal-buttons">
                        <button class="modal-add-cart">Add to Cart</button>
                        <button class="modal-view-full">View Full Details</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    if (!document.querySelector('style[data-modal-styles]')) {
        const style = document.createElement('style');
        style.setAttribute('data-modal-styles', 'true');
        style.innerHTML = `
            .quick-view-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: fadeIn 0.3s ease;
            }
            
            .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                backdrop-filter: blur(5px);
            }
            
            .modal-content {
                position: relative;
                background: #1a1a1a;
                border: 1px solid #d4af37;
                border-radius: 20px;
                max-width: 900px;
                width: 90%;
                max-height: 90vh;
                overflow-y: auto;
                animation: scaleIn 0.3s ease;
                box-shadow: 0 20px 60px rgba(212, 175, 55, 0.3);
            }
            
            .modal-close {
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: none;
                border: none;
                font-size: 2.5rem;
                color: #d4af37;
                cursor: pointer;
                transition: transform 0.3s ease;
                z-index: 10;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                line-height: 1;
            }
            
            .modal-close:hover {
                transform: rotate(90deg);
            }
            
            .modal-body {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 3rem;
                padding: 2rem;
            }
            
            .modal-image {
                width: 100%;
                height: 500px;
                border-radius: 15px;
                overflow: hidden;
                border: 1px solid rgba(212, 175, 55, 0.2);
            }
            
            .modal-image img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            
            .modal-details {
                display: flex;
                flex-direction: column;
                justify-content: center;
            }
            
            .modal-category {
                display: inline-block;
                font-size: 0.75rem;
                text-transform: uppercase;
                letter-spacing: 1.5px;
                color: #d4af37;
                margin-bottom: 1rem;
                font-weight: 600;
            }
            
            .modal-body h2 {
                font-size: 2.5rem;
                color: white;
                margin-bottom: 1rem;
                font-family: 'Space Grotesk', sans-serif;
            }
            
            .modal-rating {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                margin-bottom: 1.5rem;
            }
            
            .modal-rating .stars {
                color: #d4af37;
                font-size: 1.2rem;
            }
            
            .modal-rating .rating-text {
                color: #9ca3af;
                font-size: 0.9rem;
            }
            
            .modal-description {
                font-size: 1.1rem;
                color: #9ca3af;
                line-height: 1.8;
                margin-bottom: 2rem;
            }
            
            .modal-price {
                font-size: 2.5rem;
                color: #d4af37;
                font-weight: 700;
                margin-bottom: 2rem;
                font-family: 'Space Grotesk', sans-serif;
            }
            
            .modal-buttons {
                display: flex;
                gap: 1rem;
                flex-wrap: wrap;
            }
            
            .modal-add-cart,
            .modal-view-full {
                flex: 1;
                padding: 1rem 2rem;
                border-radius: 50px;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                font-family: 'Inter', sans-serif;
                border: none;
            }
            
            .modal-add-cart {
                background: #d4af37;
                color: #0a0a0a;
            }
            
            .modal-add-cart:hover {
                background: #f4d03f;
                transform: translateY(-2px);
                box-shadow: 0 5px 20px rgba(212, 175, 55, 0.4);
            }
            
            .modal-view-full {
                background: transparent;
                color: #d4af37;
                border: 2px solid #d4af37;
            }
            
            .modal-view-full:hover {
                background: #d4af37;
                color: #0a0a0a;
                transform: translateY(-2px);
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes scaleIn {
                from { 
                    opacity: 0;
                    transform: scale(0.9);
                }
                to { 
                    opacity: 1;
                    transform: scale(1);
                }
            }
            
            @media (max-width: 768px) {
                .modal-body {
                    grid-template-columns: 1fr;
                    gap: 2rem;
                    padding: 1.5rem;
                }
                
                .modal-image {
                    height: 350px;
                }
                
                .modal-body h2 {
                    font-size: 2rem;
                }
                
                .modal-price {
                    font-size: 2rem;
                }
                
                .modal-buttons {
                    flex-direction: column;
                }
                
                .modal-add-cart,
                .modal-view-full {
                    width: 100%;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Append modal to body
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    const addToCartBtn = modal.querySelector('.modal-add-cart');
    const viewFullBtn = modal.querySelector('.modal-view-full');
    
    const closeModal = () => {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 300);
    };
    
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    
    // Add to cart from modal
    addToCartBtn.addEventListener('click', () => {
        showNotification(`${productData.name} added to cart!`);
        closeModal();
    });
    
    // View full details - SAVE WITH IMAGE
    viewFullBtn.addEventListener('click', () => {
        console.log('Saving product data to localStorage:', productData);
        console.log('Image being saved:', productData.image);
        
        // Save to localStorage with image
        localStorage.setItem('currentProduct', JSON.stringify(productData));
        
        // Verify it was saved
        const savedData = localStorage.getItem('currentProduct');
        console.log('Verified saved data:', JSON.parse(savedData));
        
        // Redirect to product page
        window.location.href = 'product-view.html';
    });
    
    // Close on ESC key
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    
    document.addEventListener('keydown', handleEscape);
}

// Add to Cart Functionality
function initializeAddToCart() {
    document.body.addEventListener('click', function(event) {
        const addToCartBtn = event.target.closest('.add-to-cart');
        
        if (addToCartBtn) {
            event.preventDefault();
            handleAddToCart(addToCartBtn);
        }
    });
}

function handleAddToCart(button) {
    const collectionItem = button.closest('.collection-item');
    
    if (!collectionItem) {
        console.error('Could not find collection item');
        return;
    }
    
    const productName = collectionItem.querySelector('h3')?.textContent || 'Product';
    const productPrice = collectionItem.querySelector('.item-price')?.textContent || '₹2,999';
    
    // Save original button state
    const originalText = button.textContent;
    const originalBg = button.style.background;
    const originalColor = button.style.color;
    
    // Update button
    button.textContent = 'Added ✓';
    button.style.background = 'var(--gold)';
    button.style.color = 'var(--primary)';
    button.style.borderColor = 'var(--gold)';
    
    // Show notification
    showNotification(`${productName} added to cart!`);
    
    // Log to console
    console.log(`Added to cart: ${productName} - ${productPrice}`);
    
    // Reset button after 2 seconds
    setTimeout(function() {
        button.textContent = originalText;
        button.style.background = originalBg;
        button.style.color = originalColor;
        button.style.borderColor = 'var(--gold)';
    }, 2000);
}

// ===== PRODUCT VIEW PAGE FUNCTIONALITY =====
function initializeProductPage() {
    console.log('Initializing product page...');
    
    // Load product data from localStorage
    loadProductData();
    
    // Initialize product gallery
    initializeProductGallery();
    
    // Initialize product controls
    initializeProductControls();
    
    // Initialize accordion
    initializeAccordion();
    
    // Initialize product actions
    initializeProductActions();
}

function loadProductData() {
    try {
        const productDataStr = localStorage.getItem('currentProduct');
        
        if (productDataStr) {
            const productData = JSON.parse(productDataStr);
            console.log('Loaded product data:', productData);
            console.log('Image URL:', productData.image);
            
            // Update page with product data
            updateProductDisplay(productData);
        } else {
            console.log('No product data found in localStorage');
        }
    } catch (error) {
        console.error('Error loading product data:', error);
    }
}

function updateProductDisplay(product) {
    console.log('Updating product display with:', product);
    
    // Update main image
    const mainImage = document.getElementById('mainImage');
    if (mainImage && product.image) {
        console.log('Updating main image to:', product.image);
        
        // Create a new image to test if it loads
        const testImg = new Image();
        testImg.onload = function() {
            console.log('Image loaded successfully!');
            mainImage.src = product.image;
            mainImage.alt = product.name;
            
            // Add fade-in animation
            mainImage.style.opacity = '0';
            setTimeout(() => {
                mainImage.style.transition = 'opacity 0.5s ease';
                mainImage.style.opacity = '1';
            }, 50);
        };
        
        testImg.onerror = function() {
            console.error('Failed to load image:', product.image);
            console.log('Using fallback image');
        };
        
        // Start loading the image
        testImg.src = product.image;
    }
    
    // Update first thumbnail with the product image
    const thumbnails = document.querySelectorAll('.thumbnail img');
    console.log('Found thumbnails:', thumbnails.length);
    
    if (thumbnails.length > 0 && product.image) {
        const firstThumb = thumbnails[0];
        console.log('Updating first thumbnail to:', product.image);
        firstThumb.src = product.image;
        firstThumb.alt = product.name;
    }
    
    // Update product title
    const productTitle = document.getElementById('productTitle');
    if (productTitle && product.name) {
        console.log('Updating title to:', product.name);
        productTitle.textContent = product.name;
    }
    
    // Update product category
    const productCategory = document.getElementById('productCategory');
    if (productCategory && product.category) {
        console.log('Updating category to:', product.category);
        productCategory.textContent = product.category;
    }
    
    // Update product price
    const productPrice = document.getElementById('productPrice');
    if (productPrice && product.price) {
        console.log('Updating price to:', product.price);
        productPrice.textContent = product.price;
    }
    
    // Update product description
    const productDescription = document.getElementById('productDescription');
    if (productDescription && product.description) {
        console.log('Updating description to:', product.description);
        productDescription.textContent = product.description;
    }
    
    // Update breadcrumb
    const breadcrumbCategory = document.getElementById('breadcrumb-category');
    if (breadcrumbCategory && product.category) {
        breadcrumbCategory.textContent = product.category;
    }
    
    const breadcrumbProduct = document.getElementById('breadcrumb-product');
    if (breadcrumbProduct && product.name) {
        breadcrumbProduct.textContent = product.name;
    }
}

function initializeProductGallery() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('mainImage');
    
    if (!mainImage) {
        console.error('Main image element not found!');
        return;
    }
    
    console.log('Initializing gallery with', thumbnails.length, 'thumbnails');
    
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', function() {
            console.log('Thumbnail clicked:', index);
            
            // Remove active class from all thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked thumbnail
            this.classList.add('active');
            
            // Update main image
            const thumbnailImg = this.querySelector('img');
            if (thumbnailImg && thumbnailImg.src) {
                console.log('Switching to thumbnail image:', thumbnailImg.src);
                
                // Add animation
                mainImage.style.opacity = '0';
                
                setTimeout(() => {
                    mainImage.src = thumbnailImg.src;
                    mainImage.alt = thumbnailImg.alt;
                    mainImage.style.transition = 'opacity 0.3s ease';
                    mainImage.style.opacity = '1';
                }, 150);
            }
        });
    });
    
    // Main image zoom on hover
    mainImage.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.transition = 'transform 0.5s ease';
    });

    mainImage.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
});

// Click main image for full view
mainImage.addEventListener('click', function() {
    createImageLightbox(this.src, this.alt);
});}
function initializeProductControls() {
// Size selection
const sizeButtons = document.querySelectorAll('.size-btn');
sizeButtons.forEach(btn => {
btn.addEventListener('click', function() {
sizeButtons.forEach(b => b.classList.remove('active'));
this.classList.add('active');
console.log('Selected size:', this.textContent);
});
});
// Color selection
const colorButtons = document.querySelectorAll('.color-btn');
colorButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        colorButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        console.log('Selected color:', this.title);
    });
});

// Quantity controls
const decreaseBtn = document.getElementById('decreaseQty');
const increaseBtn = document.getElementById('increaseQty');
const quantityInput = document.getElementById('quantity');

if (decreaseBtn && increaseBtn && quantityInput) {
    decreaseBtn.addEventListener('click', function() {
        let currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    });
    
    increaseBtn.addEventListener('click', function() {
        let currentValue = parseInt(quantityInput.value);
        let maxValue = parseInt(quantityInput.max) || 10;
        if (currentValue < maxValue) {
            quantityInput.value = currentValue + 1;
        }
    });
}
}
function initializeAccordion() {
const accordionHeaders = document.querySelectorAll('.accordion-header');
accordionHeaders.forEach(header => {
    header.addEventListener('click', function() {
        const accordionItem = this.parentElement;
        const content = accordionItem.querySelector('.accordion-content');
        const icon = this.querySelector('.accordion-icon');
        
        // Check if currently active
        const isActive = this.classList.contains('active');
        
        // Close all accordions
        accordionHeaders.forEach(h => {
            h.classList.remove('active');
            const c = h.parentElement.querySelector('.accordion-content');
            const i = h.querySelector('.accordion-icon');
            if (c) c.style.display = 'none';
            if (i) i.textContent = '+';
        });
        
        // If wasn't active, open this one
        if (!isActive) {
            this.classList.add('active');
            if (content) content.style.display = 'block';
            if (icon) icon.textContent = '−';
        }
    });
});
}
function initializeProductActions() {
const addToCartBtn = document.getElementById('addToCart');
const buyNowBtn = document.getElementById('buyNow');
const addWishlistBtn = document.getElementById('addWishlist');
// Add to Cart
if (addToCartBtn) {
    addToCartBtn.addEventListener('click', function() {
        const productTitle = document.getElementById('productTitle')?.textContent || 'Product';
        const selectedSize = document.querySelector('.size-btn.active')?.textContent || 'M';
        const quantity = document.getElementById('quantity')?.value || 1;
        
        showNotification(`${productTitle} (Size: ${selectedSize}, Qty: ${quantity}) added to cart!`);
        
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });
}

// Buy Now
if (buyNowBtn) {
    buyNowBtn.addEventListener('click', function() {
        const productTitle = document.getElementById('productTitle')?.textContent || 'Product';
        showNotification(`Processing ${productTitle}... Redirecting to checkout`);
        
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });
}

// Add to Wishlist
if (addWishlistBtn) {
    addWishlistBtn.addEventListener('click', function() {
        const heart = this.querySelector('span');
        const productTitle = document.getElementById('productTitle')?.textContent || 'Product';
        
        if (heart.textContent === '♡') {
            heart.textContent = '♥';
            heart.style.color = '#d4af37';
            showNotification(`${productTitle} added to wishlist!`);
        } else {
            heart.textContent = '♡';
            heart.style.color = '';
            showNotification(`${productTitle} removed from wishlist!`);
        }
        
        this.style.transform = 'scale(1.1)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });
}
}
// ===== CONTACT FORM =====
function initializeContactForm() {
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}
}
// ===== NOTIFICATION SYSTEM =====
function showNotification(message) {
const existing = document.querySelector('.notification');
if (existing) {
existing.remove();
}
const notification = document.createElement('div');
notification.className = 'notification';
notification.textContent = message;

notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: #d4af37;
    color: #0a0a0a;
    padding: 1rem 2rem;
    border-radius: 50px;
    font-weight: 600;
    font-size: 0.95rem;
    z-index: 10000;
    box-shadow: 0 10px 30px rgba(212, 175, 55, 0.3);
    opacity: 0;
    transform: translateX(100px);
    transition: all 0.4s ease;
`;

document.body.appendChild(notification);

setTimeout(function() {
    notification.style.opacity = '1';
    notification.style.transform = 'translateX(0)';
}, 10);

setTimeout(function() {
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(100px)';
    
    setTimeout(function() {
        notification.remove();
    }, 400);
}, 3000);
}
// ===== PAGE LOAD ANIMATION =====
window.addEventListener('load', () => {
document.body.style.opacity = '0';
setTimeout(() => {
document.body.style.transition = 'opacity 0.5s ease';
document.body.style.opacity = '1';
}, 100);
});
console.log('Main JavaScript loaded successfully - All features ready!');