document.addEventListener("DOMContentLoaded", () => {
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const cartPanel = document.getElementById("cart-panel");
    const cartToggle = document.getElementById("cart-toggle");
    const closeCartBtn = document.getElementById("close-cart");
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartCount = document.getElementById("cart-count");
    const checkoutBtn = document.getElementById("checkout");

    let cart = [];

    function updateCart() {
        cartItemsContainer.innerHTML = "";
        let total = 0;

        cart.forEach(item => {
            total += item.price;

            const div = document.createElement("div");
            div.className = "cart-item";
            div.innerHTML = `
                <p>${item.name} - Q${item.price.toFixed(2)}</p>
                <button class="remove-btn">Eliminar</button>
            `;
            div.querySelector(".remove-btn").addEventListener("click", () => {
                cart = cart.filter(i => i !== item);
                updateCart();
            });
            cartItemsContainer.appendChild(div);
        });

        cartTotal.textContent = total.toFixed(2);
        cartCount.textContent = cart.length;
    }

    addToCartButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const name = btn.getAttribute("data-product");
            const price = parseFloat(btn.getAttribute("data-price"));

            cart.push({ name, price });
            updateCart();
        });
    });

    cartToggle.addEventListener("click", () => {
        cartPanel.classList.toggle("active");
    });

    closeCartBtn.addEventListener("click", () => {
        cartPanel.classList.remove("active");
    });

    // WhatsApp checkout
    checkoutBtn.addEventListener("click", () => {
        if (cart.length === 0) return;

        let message = '¡Hola! Estoy interesado en los siguientes productos:\n\n';

        cart.forEach(item => {
            message += `${item.name}: Q${item.price.toFixed(2)}\n`;
        });

        const total = cart.reduce((sum, item) => sum + item.price, 0);
        message += `\nTotal: Q${total.toFixed(2)}`;

        const whatsappUrl = `https://wa.me/50259073864?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');

        cart = []; // Vaciar carrito
        updateCart();
    });

    // Filtros (mismo código anterior para filtrar)
    const filterBtn = document.getElementById("apply-filters");
    const searchInput = document.getElementById("search");
    const categoryFilter = document.getElementById("category-filter");
    const sortOrder = document.getElementById("sort-order");

    filterBtn.addEventListener("click", () => {
        let products = Array.from(document.querySelectorAll(".product"));

        const searchText = searchInput.value.toLowerCase();
        const category = categoryFilter.value;
        const order = sortOrder.value;

        products.forEach(product => {
            product.style.display = "block";

            const name = product.querySelector("h3").textContent.toLowerCase();

            if (searchText && !name.includes(searchText)) {
                product.style.display = "none";
            }

            if (category === "inalambricos" && !name.includes("pro")) {
                product.style.display = "none";
            } else if (category === "cableados" && name.includes("pro")) {
                product.style.display = "none";
            }
        });

        if (order !== "default") {
            const container = document.getElementById("product-list");

            let sorted = [...products].sort((a, b) => {
                const get = attr => parseFloat(a.dataset[attr]) - parseFloat(b.dataset[attr]);
                switch (order) {
                    case "popularity": return get("popularity");
                    case "rating": return get("rating");
                    case "latest": return new Date(b.dataset.date) - new Date(a.dataset.date);
                    case "price-desc": return parseFloat(b.dataset.price) - parseFloat(a.dataset.price);
                    case "price-asc": return parseFloat(a.dataset.price) - parseFloat(b.dataset.price);
                    default: return 0;
                }
            });

            container.innerHTML = "";
            sorted.forEach(p => container.appendChild(p));
        }
    });
});
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