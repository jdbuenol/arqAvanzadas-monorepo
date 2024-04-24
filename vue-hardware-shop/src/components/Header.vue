<template>
  <header class="header">
    <router-link to="/">
      <img class="header__logo" src="@/assets/images/logo.png" alt="logo" />
    </router-link>

    <nav class="header__nav">
      <button v-if="isLogged" @click="signOut">
        <div class="header__option">
          <span class="header__optionLineOne">Logged</span>
          <span class="header__optionLineTwo">Sign Out</span>
        </div>
      </button>
      <router-link v-else to="/login">
        <div class="header__option">
          <span class="header__optionLineOne">Hello Guest</span>
          <span class="header__optionLineTwo">Sign In</span>
        </div>
      </router-link>

      <router-link to="/orders">
        <div class="header__option">
          <span class="header__optionLineOne">Returns</span>
          <span class="header__optionLineTwo">& Orders</span>
        </div>
      </router-link>

      <router-link to="/checkout">
        <div class="header__option">
          <span class="header__optionLineOne">Basket</span>
          <div class="header__optionLineTwo">
            <img src="@/assets/icons/cart.svg" alt="basket" class="w-5" /> <span>{{ basket.length }}</span>
          </div>
        </div>
      </router-link>
    </nav>
  </header>
  <Loader v-if="isLoading" />
</template>

<script setup lang="ts">
import { useStore } from '@/store/index';
import axios from 'axios';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { POSITION, useToast } from 'vue-toastification';
import Loader from './Loader.vue';

const isLoading = ref<boolean>(false);

const store = useStore();
const { basket, isLogged } = storeToRefs(store);

const toast = useToast();

const signOut = async () => {
  store.logout();
  isLoading.value = true;
  try {
    await axios.post(`${import.meta.env.VITE_AUTH_SERVICE}/api/logout`, {});
  } catch (error: any) {
    toast.error(error.response?.data?.message ?? 'Error at logout, try again later', {
      timeout: 3000,
      position: POSITION.TOP_CENTER,
    });
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.header {
  width: 90%;
  margin: 10px auto;
  padding: 10px;
  border-radius: 15px;
  border: solid black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(255, 255, 255, 0.9);
  position: sticky;
  top: 10px;
  z-index: 30;
  -webkit-box-shadow: 0px 0px 100px 5px rgba(0, 0, 0, 0.9);
  -moz-box-shadow: 0px 0px 100px 5px rgba(0, 0, 0, 0.9);
  box-shadow: 0px 0px 100px 5px rgba(0, 0, 0, 0.9);
}

.header__logo {
  height: 30px;
  margin-left: 30px;
  transition: all ease-in 200ms;
}

.header__logo:hover {
  height: 25px;
}

.header__nav {
  display: flex;
  justify-content: space-evenly;
  margin-right: 10px;
}

.header__nav a {
  text-decoration: none;
}

.header__option {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-left: 20px;
  margin-right: 20px;
  color: black;
}

.header__option:hover {
  color: rgba(0, 0, 0, 0.5);
}

.header__optionLineOne {
  font-size: 18px;
  transition: all ease-in 200ms;
  text-decoration: none;
}

.header__optionLineOne:hover {
  font-size: 15px;
}

.header__optionLineTwo {
  font-size: 20px;
  font-weight: 800;
  transition: all ease-in 200ms;
  display: flex;
  align-items: center;
  gap: 5px;
}

.header__optionLineTwo:hover {
  font-size: 18px;
}

@media only screen and (max-width: 1000px) {
  .header {
    height: 50px;
    margin: 10px auto;
    top: 10px;
  }

  .header__logo {
    height: 20px;
    max-height: 12px;
    margin-left: 5px;
  }

  .header__logo:hover {
    height: 2vh;
  }

  .header__nav {
    margin-right: 5px;
  }

  .header__option {
    margin-left: 5px;
    margin-right: 5px;
  }

  .header__optionLineOne {
    font-size: 10px;
  }

  .header__optionLineOne:hover {
    font-size: 8px;
  }

  .header__optionLineTwo,
  .header__optionLineTwo .MuiSvgIcon-root {
    font-size: 12px;
    font-weight: 400;
  }

  .header__optionLineTwo:hover {
    font-size: 10px;
  }
}
</style>
