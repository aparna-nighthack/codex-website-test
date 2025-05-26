
document.addEventListener('DOMContentLoaded', () => {
  // Handle 'Shop Now' button redirect
  const shopNowButton = document.querySelector('#shop-now');
  if (shopNowButton) {
    shopNowButton.addEventListener('click', () => {
      window.location.href = 'login.html';
    });
  }

  // Handle dark/light mode toggle
  const themeToggle = document.querySelector('#theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
      sessionStorage.setItem('theme', currentTheme);
    });

    // Apply stored theme on page load
    const storedTheme = sessionStorage.getItem('theme');
    if (storedTheme) {
      document.body.classList.toggle('dark-mode', storedTheme === 'dark');
    }
  }

  // Handle login/signup session storage
  const loginForm = document.querySelector('#login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const email = document.querySelector('#email').value;
      const password = document.querySelector('#password').value;
      sessionStorage.setItem('userEmail', email);
      sessionStorage.setItem('userAuthenticated', 'true');
      window.location.href = 'home.html';
    });
  }

  const logoutButton = document.querySelector('#logout');
  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      sessionStorage.removeItem('userEmail');
      sessionStorage.setItem('userAuthenticated', 'false');
      window.location.href = 'index.html';
    });
  }

  // Manage shopping cart with localStorage
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const addToCartButtons = document.querySelectorAll('.add-to-cart');

  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      const productName = button.dataset.productName;
      const productPrice = button.dataset.productPrice;
      
      const product = cart.find(item => item.id === productId);
      if (product) {
        product.quantity += 1;
      } else {
        cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();
    });
  });

  function updateCartCount() {
    const cartIcon = document.querySelector('#cart-count');
    if (cartIcon) {
      cartIcon.textContent = cart.reduce((total, product) => total + product.quantity, 0);
    }
  }

  updateCartCount();
});