import { ref } from 'vue';
import { defineStore } from 'pinia';
import { IProduct } from '@/models/product';

export const useStore = defineStore('store', () => {
  const isLogged = ref<boolean>(false);
  const basket = ref<IProduct[]>([]);

  function setIsLogged(value: boolean) {
    isLogged.value = value;
  }

  function login(token: string) {
    sessionStorage.setItem('token', token);
    isLogged.value = true;
  }

  function logout() {
    sessionStorage.removeItem('token');
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

  return { basket, isLogged, setIsLogged, login, logout, addToBasket, removeFromBasket, resetStore };
});
