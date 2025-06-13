/* Box Description: Initializes cart array and DOM elements for cart functionality */
let cart = [];
const cartItemsEl = document.getElementById('cartItems');
const cartTotalEl = document.getElementById('cartTotal');
const cartCountEl = document.getElementById('cartCount');
const cartModal = document.getElementById('cartModal');
const checkoutModal = document.getElementById('checkoutModal');
const checkoutBtn = document.getElementById('checkoutBtn');
const checkoutForm = document.getElementById('checkoutForm');

/* Box Description: Adds product to cart, updates UI, and handles quantity */
function addToCart(id, name, price) {
  const existingItem = cart.find(item => item.id === id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id, name, price: parseFloat(price), quantity: 1 });
  }
  updateCart();
}

/* Box Description: Updates cart modal with items, total, and cart count */
function updateCart() {
  cartItemsEl.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
    const div = document.createElement('div');
    div.className = 'flex justify-between items-center mb-2';
    div.innerHTML = `
      <span>${item.name} (x${item.quantity})</span>
      <span>$${ (item.price * item.quantity).toFixed(2)}</span>
      <button class="text-red-500" onclick="removeFromCart('${item.id}')">Remove</button>
    `;
    cartItemsEl.appendChild(div);
  });
  cartTotalEl.textContent = total.toFixed(2);
  cartCountEl.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

/* Box Description: Removes item from cart and updates UI */
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
}

/* Box Description: Toggles cart modal visibility */
function toggleCart() {
  cartModal.classList.toggle('hidden');
  cartModal.classList.toggle('show');
}

/* Box Description: Toggles checkout modal visibility */
function toggleCheckout() {
  checkoutModal.classList.toggle('hidden');
  checkoutModal.classList.toggle('show');
}

/* Box Description: Handles add-to-cart button clicks */
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const id = button.dataset.id;
    const name = button.dataset.name;
    const price = button.dataset.price;
    addToCart(id, name, price);
  });
});

/* Box Description: Opens checkout modal when clicking checkout button */
checkoutBtn.addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  toggleCart();
  toggleCheckout();
});

/* Box Description: Simulates order placement with an alert */
checkoutForm.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Order placed successfully! (This is a simulation)');
  cart = [];
  updateCart();
  toggleCheckout();
});
