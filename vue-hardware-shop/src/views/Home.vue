<template>
  <Header />
  <div class="home">
    <div class="home__container">
      <div class="home__imagesContainer">
        <img class="home__image" src="@/assets/images/caja-gaming.png" alt="PcCase" />

        <img class="home__message" src="@/assets/images/message.png" alt="message" />
      </div>

      <div class="home__row__title">
        <h2 class="font-bold">PRODUCTS</h2>
      </div>
      <div class="home__row">
        <Product v-for="product in products" :key="product.id" :product="product" />
      </div>
    </div>
  </div>
  <Loader v-if="isLoading" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { POSITION, useToast } from 'vue-toastification';
import axios from 'axios';

import Header from '@/components/Header.vue';
import Product from '@/components/Product.vue';
import Loader from '@/components/Loader.vue';
import { IProduct } from '@/models/product';

const isLoading = ref<boolean>(true);
const products = ref<IProduct[]>([]);

const toast = useToast();

onMounted(async () => {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_NODE_AMBASSADOR}/api/ambassador/products/frontend`);
    products.value = data as IProduct[];
  } catch (error) {
    console.log(error);
    toast.error('Error at get products', {
      timeout: 3000,
      position: POSITION.TOP_CENTER,
    });
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
.home {
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  max-width: 1500px;
}

.home__imagesContainer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: calc(100vh - 90px);
}

.home__image {
  max-width: 40%;
  max-height: 100%;
}

.home__message {
  max-width: 40%;
  max-height: 80%;
}

.home__row__title {
  max-width: 1500;
  margin: 30px 10px;
  padding: 10px;
  display: flex;
  font-size: 25px;
  color: black;
  background-color: rgba(255, 255, 255, 0.5);
  justify-content: center;
  border-top: solid black;
  border-bottom: solid black;
}

.home__row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

@media only screen and (max-width: 1000px) {
  .home__imagesContainer {
    height: calc(100vh - 70px);
  }

  .home__image {
    display: none;
  }

  .home__message {
    max-width: 90%;
    max-height: 100%;
    margin-bottom: 0;
  }

  .home__row__title {
    margin: 10px 5px;
    padding: 5px;
    font-size: 12px;
  }
}
</style>
