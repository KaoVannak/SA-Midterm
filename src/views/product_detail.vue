<template>
    <div class="d-flex justify-content-center" v-if="!load_product">
        <h2>Loading product information...</h2>
    </div>
    <div class="row mt-3" v-else>
        <div class="col-md-6">
            <img :src="product.image" alt="" class="img-fluid">
        </div>
            <div class="col-md-6">
                <h1>{{ product.title }}</h1>
                <p>
                   {{ product.description }}
                </p>
                <h4 style="font-size: 30px;color: red;">Price : ${{ product.price }} </h4>
            
            <div class="d-flex mt-3">
                <div class="btn-group me-auto">
                    <button class="btn btn-outline-primary" @click="increment_quantity()">Add Product</button>
                    <button class="btn btn-outline-primary">{{ quantity }}</button>
                    <button class="btn btn-outline-danger" @click="decrement_quantity()" :disabled="quantity == 1">Delete Product</button>
                </div>
                <button class="btn btn-primary" @click="cart_store.add_cart_detail(product.id, product.price, quantity)">Add to Card</button>
            </div>
                
            </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import { useRoute } from 'vue-router'

import axios from 'axios'

//currencyTHB
import { currencyTHB } from '../shared/currency'

//useCartStore
import { useCartStore } from '../store/cart'
const cart_store = useCartStore()

const product = ref({})

const quantity = ref(1)

const increment_quantity = () => {
    quantity.value++
}

const decrement_quantity = () => quantity.value--

const load_product = ref(false)

const route = useRoute()

const product_detail = async () => {
    await axios.get(`${import.meta.env.VITE_API}/${route.params.id}`)
    .then((response) => {
        product.value = response.data
        load_product.value = true
    }).catch((err) => {
        console.log(err)
    })
}

onMounted(() => product_detail())


</script>

<style lang="scss" scoped>

</style>