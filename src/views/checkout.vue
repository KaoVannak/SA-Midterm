<template>
  <div class="checkout-container">
    <div class="checkout-form">
      <h2>Checkout</h2>
      <form @submit.prevent="confirmOrder">
        <!-- Customer Information Form -->
        <div class="input-group">
          <label>Full Name *</label>
          <input v-model="customer.name" type="text" placeholder="Enter your full name" required />
        </div>

        <div class="input-group">
          <label>Email *</label>
          <input v-model="customer.email" type="email" placeholder="Enter your email" required />
        </div>

        <div class="input-group">
          <label>Phone *</label>
          <input v-model="customer.phone" type="text" placeholder="Enter your phone number" required />
        </div>

        <div class="input-group">
          <label>Address *</label>
          <input v-model="customer.address" type="text" placeholder="Enter your address" required />
        </div>

        <div class="address-details">
          <input v-model="customer.city" type="text" placeholder="City" />
          <input v-model="customer.state" type="text" placeholder="State" />
          <input v-model="customer.postcode" type="text" placeholder="Post code" />
        </div>

        <div class="input-group">
          <label>Note</label>
          <textarea v-model="customer.note" placeholder="Additional notes"></textarea>
        </div>

        <!-- Payment Method Selection -->
        <!-- Payment Method Selection -->
<div class="payment-methods">
  <h3>Select Payment Method</h3>
  
  <div class="payment-options">
    <!-- PayPal Option -->
    <label class="payment-card" :class="{ selected: paymentMethod === 'paypal' }">
      <input type="radio" id="paypal" value="paypal" v-model="paymentMethod" />
      <div class="payment-info">
        <img src="https://www.cdnlogo.com/logos/p/41/paypal.svg" alt="PayPal" class="payment-logo" />
        <img src="https://icon-library.com/images/paypal-credit-card-icon/paypal-credit-card-icon-11.jpg" class="payment-icons" />
      </div>
    </label>

    <!-- Credit/Debit Card Option -->
    <label class="payment-card" :class="{ selected: paymentMethod === 'credit-card' }">
      <input type="radio" id="credit-card" value="credit-card" v-model="paymentMethod" />
      <div class="payment-info">
        <span class="payment-title">Credit/Debit Card</span>
        <img src="https://icon-library.com/images/paypal-credit-card-icon/paypal-credit-card-icon-11.jpg" class="payment-icons" />
      </div>
    </label>

    <!-- Bank Transfer Option -->
    <label class="payment-card" :class="{ selected: paymentMethod === 'bank-transfer' }">
      <input type="radio" id="bank-transfer" value="bank-transfer" v-model="paymentMethod" />
      <div class="payment-info">
        <span class="payment-title">Bank Transfer</span>
      </div>
    </label>
  </div>
</div>


        <!-- Payment Method Specific Fields -->
        <div v-if="paymentMethod === 'credit-card'" class="credit-card-details">
          <h4 style="margin-top: 20px;">Credit/Debit Card Details</h4>
          <div class="input-group">
            <label>Card Number</label>
            <input v-model="cardDetails.cardNumber" type="text" placeholder="Enter card number" />
          </div>
          <div class="input-group">
            <label>Expiry Date</label>
            <input v-model="cardDetails.expiryDate" type="text" placeholder="MM/YY" />
          </div>
          <div class="input-group">
            <label>CVV</label>
            <input v-model="cardDetails.cvv" type="text" placeholder="Enter CVV" />
          </div>
        </div>

        <div v-if="paymentMethod === 'bank-transfer'" class="bank-transfer-details">
          <h4 style="margin-top: 20px;">Bank Transfer Details</h4>
          <div class="input-group">
            <label>Bank Name</label>
            <input v-model="bankDetails.bankName" type="text" placeholder="Enter bank name" />
          </div>
          <div class="input-group">
            <label>Account Number</label>
            <input v-model="bankDetails.accountNumber" type="text" placeholder="Enter account number" />
          </div>
        </div>

        <!-- Submit Order Button -->
        <button class="confirm-order" @click="confirmOrder">Confirm Order</button>
      </form>
    </div>

    <div class="order-summary">
      <h3>Order Summary</h3>
      <table class="summary-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cart_store.cart_previews" :key="item.product.id">
            <td class="summary-product">
              <img :src="item.product.image" alt="Product Image" class="product-image" />
              <span class="product-name">{{ item.product.title }}</span>
            </td>
            <td>{{ item.quantity }}</td>
            <td>${{item.product.price }}</td>
          </tr>
        </tbody>
      </table>
      <hr />
      <p><strong>Subtotal : $</strong> {{ subtotal }}</p>
      <p><strong>Tax (10%) : $</strong> {{ tax }} </p>
      <h3>Total : $ {{ total }}</h3>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useCartStore } from '../store/cart';
import { currencyTHB } from '../shared/currency';

const cart_store = useCartStore();

const subtotal = computed(() => cart_store.cart_previews.reduce((acc, item) => acc + item.product.price * item.quantity, 0));
const tax = computed(() => Number((subtotal.value * 0.1).toFixed(2)));
const total = computed(() => Number((subtotal.value + tax.value).toFixed(2)));

const customer = ref({
  name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  postcode: '',
  note: ''
});

const paymentMethod = ref(null);  // Store selected payment method

const cardDetails = ref({
  cardNumber: '',
  expiryDate: '',
  cvv: ''
});

const bankDetails = ref({
  bankName: '',
  accountNumber: ''
});

const confirmOrder = async () => {
  if (!paymentMethod.value) {
    alert('Please select a payment method!');
    return;
  }

  const orderDetails = `📦 *New Order Received!*

  👤 Name: ${customer.value.name}
  📧 Email: ${customer.value.email}
  📞 Phone: ${customer.value.phone}
  📍 Address: ${customer.value.address}, ${customer.value.city}, ${customer.value.state} - ${customer.value.postcode}
  📝 Note: ${customer.value.note || 'N/A'}

  🛒 *Order Summary:*
  ${cart_store.cart_previews.map(item => `🔹 ${item.quantity} x ${item.product.title} - $${item.product.price}`).join('\n')}

  💰 *Total:* ${total.value}

  💳 *Payment Method:* ${paymentMethod.value}
  `;

  // Send the order details to Telegram
  sendOrderToTelegram(orderDetails);
};

const sendOrderToTelegram = async (orderDetails) => {
  const botToken = localStorage.getItem('botToken');
  const chatId = localStorage.getItem('chatId');
  
  if (!botToken || !chatId) {
    alert('Please configure your Telegram Bot Token and Chat ID in Settings!');
    return;
  }

  const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
  
  try {
    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: orderDetails,
        parse_mode: 'Markdown'
      })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      alert('Order confirmed! Invoice sent to the owner.');
    } else {
      console.error('Error from Telegram API:', data.description);
      alert(`Failed to send order notification. Error: ${data.description}`);
    }
  } catch (error) {
    console.error('Network or other error:', error);
    alert('Failed to send order notification due to a network error.');
  }
};
</script>

<style scoped>
.payment-methods {
  margin-top: 20px;
}

.payment-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.payment-card {
  display: flex;
  align-items: center;
  padding: 12px;
  background: #fff;
  border: 2px solid #ddd;
  border-radius: 8px;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
}

.payment-card:hover {
  border-color: #0070ba;
  background: #f7fafd;
}

.payment-card input[type="radio"] {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.payment-card .payment-info {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  justify-content: center;
}

.payment-logo {
  width: 70px;
  height: 30px;
}

.payment-icons {
  width: 150px;
  height: 30px;
}

.payment-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.selected {
  border-color: #0070ba;
  background: #e3f2fd;
}
.checkout-container {
  display: flex;
  justify-content: space-between;
  max-width: 1000px;
  margin: auto;
  padding: 20px;
  gap: 20px;
}

.checkout-form, .order-summary {
  flex: 1;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.input-group {
  margin-bottom: 15px;
}

input, textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.payment-methods {
  margin-top: 20px;
}

.payment-option {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.payment-logo {
  
  
  display: flex;
  
}

.payment-button {
  flex: 1;
  padding: 10px;
  background: #2a9d8f;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.payment-button:hover {
  background: #21867a;
}

.confirm-order {
  width: 100%;
  padding: 12px;
  background: #e76f51;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s ease;
}

.confirm-order:hover {
  background: #d65a40;
}

.summary-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 10px;
}

.summary-table th, .summary-table td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  text-align: left;
}

.summary-product {
  display: flex;
  align-items: center;
}

.product-image {
  width: 50px;
  height: 50px;
  margin-right: 10px;
  border-radius: 5px;
  object-fit: cover;
}

.product-name {
  font-weight: bold;
}
</style>
