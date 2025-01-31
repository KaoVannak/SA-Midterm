<template>
    <h1 class="mt-3">Shoping Cart</h1>
    <div class="d-flex justify-content-center" v-if="!product_store.load_products">
        <h2>Loading product information...</h2>
    </div>
    <table class="table" v-else>
        <thead>
            <tr>
                <th>Products</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Delete Product</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(cart, index) in carts" :key="index">
                <td>
                    <img :src="cart.product.image" alt="" class="img-thumbnail" width="100" style="margin-right: 10px;">
                    {{ cart.product.title }}
                </td>
                <td>{{ cart.product.price}} $</td>
                <td>
                    <button class="btn btn-sm btn-secondary" @click="cart_store.decrement_quantity(index)">-</button>
                    <span class="mx-2">{{ cart.quantity }}</span>
                    <button class="btn btn-sm btn-secondary" @click="cart_store.increment_quantity(index)">+</button>
                </td>
                <td>{{ cart.total_product }} $</td>
                <td>
                    <button class="btn btn-danger" @click="cart_store.remove_cart(index)">Delete</button>
                </td>
            </tr>
        </tbody>
    </table>
    <button class="btn btn-primary mb-5" @click="cart_store.clear_cart()">Clear the Basket</button>
    <button class="btn btn-success mb-5 mx-2">Total : {{ cart_store.total }} $</button>
    <button class="btn btn-warning mb-5 mx-2" @click="checkout">Make Payment</button>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

// currencyTHB
import { currencyTHB } from '../shared/currency';

// useProductStore
import { useProductStore } from '../store/product';
const product_store = useProductStore();

// useCartStore
import { useCartStore } from '../store/cart';
const cart_store = useCartStore();

const carts = computed(() => cart_store.cart_previews);
const router = useRouter();

const checkout = () => {
    router.push('/checkout');
};
</script>

<style lang="scss" scoped>
</style>
