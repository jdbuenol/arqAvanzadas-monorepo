<template>
  <Header />
  <div class="checkout">
    <div class="checkout__left">
      <div>
        <div class="checkout__title">
          <h3>Hello, {user?.email}</h3>
          <h2>{{ basket.length > 0 ? 'Your Shopping Basket' : 'The Basket is empty' }}</h2>
        </div>

        <CheckoutProduct v-for="product in basket" :key="product.id" :product="product" />
      </div>
    </div>

    <div class="checkout__right">
      <div className="subtotal">
        <p>
          Subtotal ({{ basket.length }} items):
          <strong>${{ value }}</strong>
        </p>

        <button v-if="basket.length > 0" @click="goToPayment">Proceed to Checkout</button>
      </div>
    </div>
  </div>
  <Loader v-if="isLoading" />
</template>

<script setup lang="ts">
import CheckoutProduct from '@/components/CheckoutProduct.vue';
import Header from '@/components/Header.vue';
import Loader from '@/components/Loader.vue';
import { useStore } from '@/store/index';
import axios from 'axios';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { POSITION, useToast } from 'vue-toastification';

const isLoading = ref<boolean>(false);

const store = useStore();
const { basket } = storeToRefs(store);
const toast = useToast();

const value = computed(() => basket.value.reduce((acc, product) => acc + product.price, 0));

const goToPayment = async () => {
  isLoading.value = true;
  try {
    const { data } = await axios.post(`${import.meta.env.VITE_NODE_AMBASSADOR}/api/ambassador/links`, {
      products: basket.value.map(product => product.id),
    });
    window.open(`${import.meta.env.VITE_NEXT_CHECKOUT}/${data.code}`, '_blank');
  } catch (error) {
    console.log(error);
    toast.error('Error at get payment link', {
      timeout: 3000,
      position: POSITION.TOP_CENTER,
    });
  } finally {
    isLoading.value = false;
  }
};
</script>

<style>
.checkout {
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.checkout__title {
  margin: 30px 10px;
  padding: 10px;
  font-size: 25px;
  color: black;
  background-color: rgba(255, 255, 255, 0.5);
  border-top: solid black;
  border-bottom: solid black;
}

@media only screen and (max-width: 500px) {
  .checkout__title {
    margin: 20px 5px;
    padding: 5px;
    font-size: 15px;
  }
}

.subtotal {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex-basis: 500px;
  flex-shrink: 1;
  width: 500px;
  height: 150px;
  padding: 20px;
  margin-top: 30px;
  margin-bottom: 30px;
  font-size: 20px;
  color: white;
  border: solid white;
  border-radius: 15px;
  background-color: rgba(0, 0, 0, 0.8);
  -webkit-box-shadow: 0px 0px 100px 5px rgba(0, 0, 0, 0.9);
  -moz-box-shadow: 0px 0px 100px 5px rgba(0, 0, 0, 0.9);
  box-shadow: 0px 0px 100px 5px rgba(0, 0, 0, 0.9);
}

.subtotal > button {
  cursor: pointer;
  width: 100%;
  background: #f0c14b;
  font-size: 15px;
  font-family: 'Carter One', cursive;
  color: #111;
  padding: 10px;
  margin-top: 10px;
  border-radius: 10px;
  border-color: #f0c14b;
  transition: all ease-in 200ms;
}

.subtotal > button:hover {
  font-size: 13px;
  -webkit-box-shadow: 0px 0px 40px 10px rgba(240, 190, 70, 0.5);
  -moz-box-shadow: 0px 0px 40px 10px rgba(240, 190, 70, 0.5);
  box-shadow: 0px 0px 40px 10px rgba(240, 190, 70, 0.5);
}

@media only screen and (max-width: 500px) {
  .subtotal {
    width: 100%;
    padding: 10px;
    font-size: 12px;
  }

  .subtotal > button {
    width: 80%;
    margin: auto;
    font-size: 10px;
  }

  .subtotal > button:hover {
    font-size: 8px;
  }
}
</style>
