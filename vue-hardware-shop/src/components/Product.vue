<template>
  <div class="product">
    <div class="product__info">
      <h3 class="font-bold capitalize">{{ product.title }}</h3>
      <p>{{ product.description }}</p>
      <p class="product__price">
        <small>$</small>
        <strong>{{ product.price }}</strong>
      </p>
    </div>

    <img :src="product.image" :alt="product.title" />

    <button @click="addToBasket" class="flex flex-col items-center font-bold self-center">
      Add to Basket <br />
      <img src="@/assets/icons/plus.svg" alt="basket" class="w-5" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { IProduct } from '@/models/product';
import { useStore } from '@/store/index';

interface Props {
  product: IProduct;
}

const { product } = defineProps<Props>();
const store = useStore();

const addToBasket = () => {
  store.addToBasket(product);
};
</script>

<style scoped>
.product {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  flex-basis: 350px;
  flex-grow: 1;
  margin: 10px;
  padding: 20px;
  border: solid black;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 1;
  -webkit-box-shadow: 0px 0px 100px 5px rgba(0, 0, 0, 0.9);
  -moz-box-shadow: 0px 0px 100px 5px rgba(0, 0, 0, 0.9);
  box-shadow: 0px 0px 100px 5px rgba(0, 0, 0, 0.9);
}

.product > img {
  max-height: 200px;
  width: 100%;
  object-fit: contain;
  margin-bottom: 15px;
}

.product > button {
  cursor: pointer;
  background: #f0c14b;
  font-size: 15px;
  font-family: 'Carter One', cursive;
  color: #111;
  padding: 15px;
  margin-top: 10px;
  border-radius: 20px;
  border-color: #f0c14b;
  transition: all ease-in 200ms;
}

.product > button:hover {
  font-size: 13px;
  -webkit-box-shadow: 0px 0px 40px 10px rgba(240, 190, 70, 0.5);
  -moz-box-shadow: 0px 0px 40px 10px rgba(240, 190, 70, 0.5);
  box-shadow: 0px 0px 40px 10px rgba(240, 190, 70, 0.5);
}

.product__price {
  margin-top: 5px;
}

.product__info {
  margin-bottom: 15px;
  font-size: 18px;
}

@media only screen and (max-width: 1000px) {
  .product {
    padding: 10px;
  }

  .product > img {
    margin-bottom: 10px;
  }

  .product > button {
    font-size: 12px;
    padding: 5px;
    margin-top: 5px;
    border-radius: 20px;
    margin-bottom: 10px;
  }

  .product > button:hover {
    font-size: 10px;
  }

  .product__info {
    font-size: 12px;
  }
}
</style>
