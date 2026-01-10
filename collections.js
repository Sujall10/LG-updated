// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Collections page initialized');
    
    // Initialize all functionality
    initializeFilters();
    initializeQuickView();
    initializeAddToCart();
    
    // Show all collections by default
    showAllCollections();
});

// ===== Filter Functionality =====
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

// ===== Quick View Functionality =====
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
    
    // Create product data object
    const productData = {
        name: productName,
        description: productDesc,
        price: productPrice,
        category: productCategory
    };
    
    console.log('Product data:', productData);
    
    // Store in localStorage
    try {
        localStorage.setItem('currentProduct', JSON.stringify(productData));
        console.log('Product data saved to localStorage');
        
        // Show notification
        showNotification('Loading product details...');
        
        // Redirect to product page after a short delay
        setTimeout(function() {
            window.location.href = 'product-view.html';
        }, 600);
        
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        // Still redirect even if localStorage fails
        window.location.href = 'product-view.html';
    }
}

// ===== Add to Cart Functionality =====
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

// ===== Show Notification =====
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

// ===== Scroll Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe headers
document.querySelectorAll('.collection-header .section-label, .collection-header .section-heading').forEach(function(el) {
    observer.observe(el);
});

console.log('Collections JavaScript loaded successfully');