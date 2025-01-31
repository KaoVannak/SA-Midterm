import { createRouter, createWebHashHistory } from 'vue-router';

// Import views
import home_products from '../views/home_products.vue';
import product_detail from '../views/product_detail.vue';
import cart_cart from '../views/cart_cart.vue';
import checkout_page from '../views/checkout.vue';
import TelegramSettings from '../views/TelegramSettings.vue'; // Telegram Settings page

const routes = [
  {
    path: '/',
    name: 'settings',
    component: TelegramSettings
  },
  {
    path: '/home',
    name: 'home_products',
    component: home_products
  },
  {
    path: '/product_detail/:id',
    name: 'product_detail',
    component: product_detail
  },
  {
    path: '/cart',
    name: 'cart_cart',
    component: cart_cart
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: checkout_page
  }
];

const router = createRouter({
  history: createWebHashHistory(), // Use hash mode for GitHub Pages compatibility
  routes
});

// Clear localStorage every time the app starts
localStorage.removeItem('botToken');
localStorage.removeItem('chatId');

// Navigation Guard to enforce Telegram settings
router.beforeEach((to, from, next) => {
  const botToken = localStorage.getItem('botToken');
  const chatId = localStorage.getItem('chatId');

  if (!botToken || !chatId) {
    if (to.name !== 'settings') {
      return next({ name: 'settings' });
    }
  } else {
    if (to.name === 'settings') {
      return next({ name: 'home_products' });
    }
  }

  next();
});

export default router;
