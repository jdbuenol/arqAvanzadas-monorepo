import { ref } from 'vue';
import { defineStore } from 'pinia';
import { IProduct } from '@/models/product';

export const useStore = defineStore('store', () => {
  const isLogged = ref<boolean>(false);
  const basket = ref<IProduct[]>([]);

  function login() {
    isLogged.value = true;
  }

  function logout() {
    isLogged.value = false;
  }

  function addToBasket(product: IProduct) {
    const inBasket = basket.value.find(p => p.id === product.id);
    if (!inBasket) basket.value = [...basket.value, product];
  }

  function removeFromBasket(id: number) {
    basket.value = basket.value.filter(product => product.id !== id);
  }

  function resetStore() {
    basket.value = [];
    isLogged.value = false;
  }

  return { basket, isLogged, login, logout, addToBasket, removeFromBasket, resetStore };
});
