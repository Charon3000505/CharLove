 // Cart state
        let cartCount = 0;
        let selectedSize = 'L';
        let quantity = 1;
        let isInWishlist = false;
        
        // DOM Elements
        const cartCountElement = document.getElementById('cartCount');
        const quantityInput = document.getElementById('quantity');
        const sizeWarning = document.getElementById('sizeWarning');
        const wishlistBtn = document.getElementById('wishlistBtn');
        const cartToast = document.getElementById('cartToast');
        const toastMessage = document.getElementById('toastMessage');
        
        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            // Load cart from localStorage
            const savedCart = localStorage.getItem('cartCount');
            if (savedCart) {
                cartCount = parseInt(savedCart);
                cartCountElement.textContent = cartCount;
            }
            
            // Set active thumbnail
            document.querySelector('.thumb').classList.add('active');
        });
        
        // Change main image
        function changeImage(src) {
            document.getElementById("mainImage").src = src;
            
            // Update active thumbnail
            document.querySelectorAll('.thumb').forEach(thumb => {
                thumb.classList.remove('active');
            });
            event.target.classList.add('active');
        }
        
        // Size selection
        document.querySelectorAll(".size-btn").forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll(".size-btn").forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                selectedSize = btn.getAttribute('data-size');
                sizeWarning.classList.add('hidden');
            });
        });
        
        // Quantity adjustment
        function changeQuantity(change) {
            let currentValue = parseInt(quantityInput.value);
            let newValue = currentValue + change;
            
            if (newValue >= 1 && newValue <= 10) {
                quantityInput.value = newValue;
                quantity = newValue;
            }
        }
        
        // Quantity input validation
        quantityInput.addEventListener('change', function() {
            let value = parseInt(this.value);
            if (value < 1) this.value = 1;
            if (value > 10) this.value = 10;
            quantity = this.value;
        });
        
        // Add to cart with animation
        function addToCart() {
            // Check if size is selected
            if (!selectedSize) {
                sizeWarning.classList.remove('hidden');
                return;
            }
            
            // Calculate items to add
            const itemsToAdd = quantity;
            
            // Update cart count
            cartCount += itemsToAdd;
            cartCountElement.textContent = cartCount;
            
            // Save to localStorage
            localStorage.setItem('cartCount', cartCount);
            
            // Animate cart icon
            cartCountElement.classList.add('cart-bounce');
            setTimeout(() => {
                cartCountElement.classList.remove('cart-bounce');
            }, 500);
            
            // Show product fly animation
            createFlyAnimation();
            
            // Show toast notification
            showToast(`${itemsToAdd} item(s) ditambahkan ke keranjang`, 'success');
            
            // Optional: Add item to cart data
            addToCartData({
                name: "Minimalist Flag Patchwork Hoodie",
                size: selectedSize,
                quantity: quantity,
                price: 89,
                image: "https://fashionsierra.com/cdn/shop/files/S69e0a4607b9f4b36abd10449187d6c44Z.webp?v=1755585262"
            });
        }
        
        // Buy now function
        function buyNow() {
            if (!selectedSize) {
                sizeWarning.classList.remove('hidden');
                return;
            }
            
            // First add to cart
            addToCart();
            
            // Then redirect to checkout
            setTimeout(() => {
                window.location.href = 'checkout.html';
            }, 1000);
        }
        
        // Toggle wishlist
        function toggleWishlist() {
            isInWishlist = !isInWishlist;
            
            if (isInWishlist) {
                wishlistBtn.innerHTML = '<i class="fas fa-heart mr-2 text-red-400"></i> In Wishlist';
                showToast('Ditambahkan ke Wishlist', 'info');
            } else {
                wishlistBtn.innerHTML = '<i class="far fa-heart mr-2"></i> Add to Wishlist';
            }
        }
        
        // Create flying animation to cart
        function createFlyAnimation() {
            const productImage = document.getElementById('mainImage');
            const cartIcon = document.querySelector('.fa-shopping-bag').parentElement;
            
            // Create animation element
            const flyElement = document.createElement('div');
            flyElement.className = 'cart-animation';
            
            // Clone and style the product image
            const imgClone = productImage.cloneNode(true);
            imgClone.style.width = '50px';
            imgClone.style.height = '50px';
            imgClone.style.borderRadius = '10px';
            imgClone.style.objectFit = 'cover';
            imgClone.style.position = 'absolute';
            
            flyElement.appendChild(imgClone);
            document.body.appendChild(flyElement);
            
            // Get positions
            const productRect = productImage.getBoundingClientRect();
            const cartRect = cartIcon.getBoundingClientRect();
            
            // Set initial position
            flyElement.style.left = productRect.left + 'px';
            flyElement.style.top = productRect.top + 'px';
            flyElement.style.width = '50px';
            flyElement.style.height = '50px';
            
            // Animate to cart
            setTimeout(() => {
                flyElement.style.left = cartRect.left + 'px';
                flyElement.style.top = cartRect.top + 'px';
                flyElement.style.width = '20px';
                flyElement.style.height = '20px';
                flyElement.style.opacity = '0.5';
            }, 10);
            
            // Remove element after animation
            setTimeout(() => {
                document.body.removeChild(flyElement);
            }, 800);
        }
        
        // Show toast notification
        function showToast(message, type) {
            toastMessage.textContent = message;
            
            // Set color based on type
            if (type === 'success') {
                cartToast.style.borderLeftColor = '#00ff00';
            } else if (type === 'info') {
                cartToast.style.borderLeftColor = '#00ffff';
            }
            
            cartToast.classList.add('show');
            
            // Hide after 3 seconds
            setTimeout(() => {
                cartToast.classList.remove('show');
            }, 3000);
        }
        
        // Add item to cart data (simulated)
        function addToCartData(item) {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            
            // Check if item already exists with same size
            const existingIndex = cart.findIndex(cartItem => 
                cartItem.name === item.name && cartItem.size === item.size);
            
            if (existingIndex > -1) {
                // Update quantity
                cart[existingIndex].quantity += item.quantity;
            } else {
                // Add new item
                cart.push(item);
            }
            
            localStorage.setItem('cart', JSON.stringify(cart));
        }
        
        // Scroll to size guide
        function scrollToSize(){
            document.getElementById("sizeGuide").scrollIntoView({behavior:"smooth"});
        }
        
        // FAQ functionality
        document.querySelectorAll(".faq-item").forEach(item => {
            item.addEventListener('click', () => {
                const content = item.querySelector(".faq-content");
                const icon = item.querySelector(".faq-icon");
                content.classList.toggle("show");
                icon.innerText = content.classList.contains("show") ? "−" : "+";
            });
        });
        
        // Mobile menu toggle
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const mobileMenu = document.getElementById('mobileMenu');
        
        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }