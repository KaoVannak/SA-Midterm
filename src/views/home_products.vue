<template>
    <div class="d-flex justify-content-center " v-if="!product_store.load_products">
        <h2>Loading product information...</h2>
    </div>
    <div class="row mt-2" v-else>
        <div class="col mb-2" v-for="(product, index) in search_products" :key="index">
            <div class="card" style="width: 19rem;">
                <img :src="product.image" class="card-img-top mx-auto" alt="" style="width: 12rem; height: 12rem;">
                <div class="card-body">
                    <h5 class="card-title">{{ product.title }}</h5>
                    <p class="card-text" style="font-size: 25px;">Category : {{ product.category }}</p>
                    <p class="card-text" style="font-size: 30px;color: red;">Price : ${{ product.price}} </p>
                    <routerLink :to="`/product_detail/${product.id}`" class="btn btn-primary mx-2">Product Detail</routerLink>
                    <button class="btn btn-success" @click="cart_store.add_cart(product.id, product.price)">Add to Card</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'

//currencyTHB
import { currencyTHB } from '../shared/currency';

//useProductStore
import { useProductStore } from '../store/product';
const product_store = useProductStore()

const list = computed(() => product_store.list_products )

const search_products = computed(() => product_store.search_products)

//useCartStore
import { useCartStore } from '../store/cart'
const cart_store = useCartStore()



</script>

<style lang="scss" scoped>

</style>