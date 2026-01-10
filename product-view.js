// ===== PRODUCT VIEW PAGE JAVASCRIPT =====
// This file handles the product view page functionality

document.addEventListener('DOMContentLoaded', function() {
    console.log('Product View page loaded');
    
    // Initialize product page features first
    initializeProductGallery();
    initializeProductControls();
    initializeAccordion();
    initializeProductActions();
    
    // Load product data from localStorage (this will override defaults)
    loadProductData();
});

// ===== LOAD PRODUCT DATA FROM LOCALSTORAGE =====
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
            console.log('No product data found in localStorage - using default product');
        }
    } catch (error) {
        console.error('Error loading product data:', error);
    }
}

// ===== UPDATE PRODUCT DISPLAY =====
function updateProductDisplay(product) {
    console.log('Updating product display with:', product);
    
    // Update main image - FORCE UPDATE
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
            console.log('Using fallback dress icon');
            // Use a dress icon as fallback
            mainImage.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='1000' viewBox='0 0 800 1000'%3E%3Cdefs%3E%3ClinearGradient id='gradMain' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%231a1a1a;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%230a0a0a;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23gradMain)' width='800' height='1000'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='200' fill='%23d4af37'%3E👗%3C/text%3E%3C/svg%3E";
            mainImage.alt = product.name;
        };
        
        // Start loading the image
        testImg.src = product.image;
    }
    
    // Update ALL thumbnails with the product image
    const thumbnails = document.querySelectorAll('.thumbnail img');
    console.log('Found thumbnails:', thumbnails.length);
    
    if (thumbnails.length > 0 && product.image) {
        // Update first thumbnail with actual product image
        const firstThumb = thumbnails[0];
        console.log('Updating first thumbnail to:', product.image);
        
        firstThumb.onload = function() {
            console.log('Thumbnail loaded successfully!');
        };
        
        firstThumb.onerror = function() {
            console.error('Failed to load thumbnail:', product.image);
        };
        
        firstThumb.src = product.image;
        firstThumb.alt = product.name;
        
        // Update other thumbnails with placeholder variants
        if (thumbnails.length > 1) {
            // Keep the other thumbnails as detail/feature icons
            thumbnails[1].src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='250' viewBox='0 0 200 250'%3E%3Crect fill='%232a2a2a' width='200' height='250'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='60' fill='%23d4af37'%3E📏%3C/text%3E%3C/svg%3E";
            thumbnails[1].alt = "Size Details";
        }
        if (thumbnails.length > 2) {
            thumbnails[2].src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='250' viewBox='0 0 200 250'%3E%3Crect fill='%230a0a0a' width='200' height='250'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='60' fill='%23d4af37'%3E🌿%3C/text%3E%3C/svg%3E";
            thumbnails[2].alt = "Eco-Friendly Materials";
        }
        if (thumbnails.length > 3) {
            thumbnails[3].src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='250' viewBox='0 0 200 250'%3E%3Crect fill='%231a1a1a' width='200' height='250'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='60' fill='%23d4af37'%3E✨%3C/text%3E%3C/svg%3E";
            thumbnails[3].alt = "Premium Quality";
        }
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
    
    // Update badge based on category
    const badge = document.querySelector('.badge');
    if (badge) {
        badge.textContent = 'Eco-Friendly';
        badge.style.display = 'block';
    }
}

// ===== PRODUCT GALLERY =====
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
    });
}

// ===== IMAGE LIGHTBOX =====
function createImageLightbox(imageSrc, imageAlt) {
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
    
    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = imageAlt || 'Product Image';
    img.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
        border-radius: 10px;
        transform: scale(0.9);
        transition: transform 0.3s ease;
    `;
    
    lightbox.appendChild(img);
    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';
    
    // Animate in
    setTimeout(() => {
        lightbox.style.opacity = '1';
        img.style.transform = 'scale(1)';
    }, 10);
    
    // Close on click
    lightbox.addEventListener('click', () => {
        lightbox.style.opacity = '0';
        img.style.transform = 'scale(0.9)';
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

// ===== PRODUCT CONTROLS =====
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

// ===== ACCORDION FUNCTIONALITY =====
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

// ===== PRODUCT ACTIONS =====
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
            
            // Show success message
            showNotification(`${productTitle} (Size: ${selectedSize}, Qty: ${quantity}) added to cart!`);
            
            // Add animation to button
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
            
            // Add animation to button
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
            
            // Here you would redirect to checkout page
            setTimeout(() => {
                console.log('Redirecting to checkout...');
                // window.location.href = 'checkout.html';
            }, 1500);
        });
    }
    
    // Add to Wishlist
    if (addWishlistBtn) {
        addWishlistBtn.addEventListener('click', function() {
            const heart = this.querySelector('span');
            const productTitle = document.getElementById('productTitle')?.textContent || 'Product';
            
            // Toggle wishlist
            if (heart.textContent === '♡') {
                heart.textContent = '♥';
                heart.style.color = '#d4af37';
                showNotification(`${productTitle} added to wishlist!`);
            } else {
                heart.textContent = '♡';
                heart.style.color = '';
                showNotification(`${productTitle} removed from wishlist!`);
            }
            
            // Add animation
            this.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    }
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message) {
    // Remove any existing notification
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Add inline styles
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
    
    // Append to body
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(function() {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(function() {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100px)';
        
        setTimeout(function() {
            notification.remove();
        }, 400);
    }, 3000);
}

console.log('Product View JavaScript loaded successfully');