// Carrito con gestión de cantidad
let cart = [];

function addToCart(productName, productPrice) {
  // Buscar si el producto ya está en el carrito
  const productIndex = cart.findIndex(item => item.name === productName);
  if (productIndex !== -1) {
    // Incrementar cantidad y actualizar total del producto
    cart[productIndex].quantity++;
    cart[productIndex].total = cart[productIndex].quantity * productPrice;
  } else {
    // Agregar producto nuevo
    cart.push({ name: productName, price: productPrice, quantity: 1, total: productPrice });
  }
  updateCartUI();
}

function updateCartUI() {
  const cartCount = document.getElementById('cart-count');
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  
  // Actualizar contador global
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;
  
  let cartHTML = '';
  let total = 0;
  
  cart.forEach(item => {
    cartHTML += `
      <div class="cart-item">
        <p>${item.name} - Q${item.price.toFixed(2)} x ${item.quantity} = Q${item.total.toFixed(2)}</p>
        <button class="remove-btn" onclick="removeFromCart('${item.name}')">Eliminar</button>
      </div>
    `;
    total += item.total;
  });
  
  cartItems.innerHTML = cartHTML;
  cartTotal.textContent = total.toFixed(2);
}

function removeFromCart(productName) {
  cart = cart.filter(item => item.name !== productName);
  updateCartUI();
}

// Función para finalizar la compra y redirigir a WhatsApp
function checkout() {
  if (cart.length === 0) return;
  
  let message = '¡Hola! Estoy interesado en los siguientes productos:\n\n';
  
  cart.forEach(item => {
    message += `${item.name} (x${item.quantity}): Q${item.total.toFixed(2)}\n`;
  });
  
  const total = cart.reduce((sum, item) => sum + item.total, 0);
  message += `\nTotal: Q${total.toFixed(2)}`;
  
  const whatsappUrl = `https://wa.me/50259073864?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
  cart = []; // Vaciar carrito después de la compra
  updateCartUI();
}

// Función para cerrar el popup de descuento
function closeDiscountPopup() {
  const popup = document.getElementById('discount-popup');
  popup.style.display = 'none';
}

// Mostrar popup de descuento en 3 segundos
setTimeout(() => {
  const popup = document.getElementById('discount-popup');
  popup.style.display = 'flex';
}, 3000);

// Carrusel de productos
document.addEventListener("DOMContentLoaded", function () {
  const carouselImages = document.querySelector(".carousel-images");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  let index = 0;
  const totalImages = document.querySelectorAll(".carousel-images img").length;
  
  function updateCarousel() {
    // Para dispositivos móviles, usamos el ancho actual del contenedor
    const imgWidth = carouselImages.querySelector("img").clientWidth;
    carouselImages.style.transform = `translateX(-${index * imgWidth}px)`;
  }
  
  nextBtn.addEventListener("click", function () {
    if (index < totalImages - 1) {
      index++;
      updateCarousel();
    }
  });
  
  prevBtn.addEventListener("click", function () {
    if (index > 0) {
      index--;
      updateCarousel();
    }
  });
  
  setInterval(() => {
    index = (index + 1) % totalImages;
    updateCarousel();
  }, 5000); // Cambio automático cada 5 segundos
  
  // Ajustar carrusel al redimensionar la ventana
  window.addEventListener('resize', updateCarousel);
});
document.addEventListener("DOMContentLoaded", function () {
    const cartToggle = document.getElementById("cart-toggle");
    const cartPanel = document.getElementById("cart-panel");
    const closeCart = document.getElementById("close-cart");
    
    let cart = [];

    // Abrir carrito
    cartToggle.addEventListener("click", function () {
        cartPanel.classList.add("active");
    });

    // Cerrar carrito
    closeCart.addEventListener("click", function () {
        cartPanel.classList.remove("active");
    });

    // Función para agregar productos al carrito
    function addToCart(productName, productPrice) {
        cart.push({ name: productName, price: productPrice });
        updateCartUI();
    }

    // Actualizar interfaz del carrito
    function updateCartUI() {
        const cartItems = document.getElementById("cart-items");
        const cartCount = document.getElementById("cart-count");
        const cartTotal = document.getElementById("cart-total");

        cartCount.textContent = cart.length;

        let cartHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            cartHTML += `
                <div class="cart-item">
                    <p>${item.name} - Q${item.price.toFixed(2)}</p>
                    <button class="remove-item" data-index="${index}">❌</button>
                </div>
            `;
            total += item.price;
        });

        cartItems.innerHTML = cartHTML || "<p>Tu carrito está vacío</p>";
        cartTotal.textContent = total.toFixed(2);

        // Eliminar productos
        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                cart.splice(index, 1);
                updateCartUI();
            });
        });
    }

    // Finalizar compra y enviar a WhatsApp
    document.getElementById("checkout-btn").addEventListener("click", function () {
        if (cart.length === 0) {
            alert("Tu carrito está vacío.");
            return;
        }

        let message = "¡Hola! Estoy interesado en los siguientes productos:\n\n";
        cart.forEach(item => {
            message += `${item.name}: Q${item.price.toFixed(2)}\n`;
        });

        const total = cart.reduce((sum, item) => sum + item.price, 0);
        message += `\nTotal: Q${total.toFixed(2)}`;

        const whatsappUrl = `https://wa.me/50259073864?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank");

        cart = []; // Vaciar carrito después de la compra
        updateCartUI();
    });

    // Hacer accesible la función globalmente para agregar productos
    window.addToCart = addToCart;
});
