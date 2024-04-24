<template>
  <div class="register">
    <router-link to="/">
      <img src="@/assets/images/logo.png" alt="logo" class="register__logo" />
    </router-link>

    <div class="register__container">
      <h1>Sign up</h1>

      <form @submit.prevent="signUp">
        <label for="firstName">First Name</label>
        <input id="firstName" type="text" required v-model="firstName" />

        <label for="lastName">Last Name</label>
        <input id="lastName" type="text" required v-model="lastName" />

        <label for="email">E-mail</label>
        <input id="email" type="email" required v-model="email" />

        <label for="password">Password</label>
        <input id="password" type="password" required v-model="password" />

        <label for="passwordConfirm">Confirm Password</label>
        <input id="passwordConfirm" type="password" required v-model="passwordConfirm" />

        <button class="register__signUpButton">Create Account</button>
      </form>

      <p>
        By signing-in you agree to the Hardware Shop Conditions of Use & Sale. Please see our Privacy Notice, our Cookies Notice and our
        Interest-Based Ads Notice
      </p>
    </div>
  </div>
  <Loader v-if="isLoading" />
</template>

<script setup lang="ts">
import Loader from '@/components/Loader.vue';
import axios from 'axios';
import { ref } from 'vue';
import { POSITION, useToast } from 'vue-toastification';
import { useStore } from '@/store/index';
import { useRouter } from 'vue-router';

const isLoading = ref<boolean>(false);
const firstName = ref<string>('');
const lastName = ref<string>('');
const email = ref<string>('');
const password = ref<string>('');
const passwordConfirm = ref<string>('');

const toast = useToast();
const store = useStore();
const router = useRouter();

const signUp = async () => {
  isLoading.value = true;
  try {
    await axios.post(`${import.meta.env.VITE_AUTH_SERVICE}/api/register`, {
      first_name: firstName.value,
      last_name: lastName.value,
      email: email.value,
      password: password.value,
      password_confirm: passwordConfirm.value,
    });
    store.login();
    router.push('/');
  } catch (error: any) {
    toast.error(error.response?.data?.message ?? 'Error at register, try again later', {
      timeout: 3000,
      position: POSITION.TOP_CENTER,
    });
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.register {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.register__logo {
  margin-top: 20px;
  margin-bottom: 20px;
  object-fit: contain;
  width: 500px;
  margin-right: auto;
  margin-left: auto;
  transition: all ease-in 200ms;
}

.register__logo:hover {
  width: 470px;
}

.register__container {
  width: 500px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 10px;
  border: solid black;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.3);
  -webkit-box-shadow: 0px 0px 100px 5px rgba(0, 0, 0, 0.9);
  -moz-box-shadow: 0px 0px 100px 5px rgba(0, 0, 0, 0.9);
  box-shadow: 0px 0px 100px 5px rgba(0, 0, 0, 0.9);
}

.register__container > h1 {
  font-weight: 800;
  margin-bottom: 10px;
  font-size: 25px;
}

.register__container > form > label {
  margin-bottom: 5px;
}

.register__container > form > input {
  height: 30px;
  margin-bottom: 10px;
  background-color: white;
  border: 1px solid black;
  width: 98%;
}

.register__container > p {
  margin-top: 15px;
  font-size: 15px;
}

.register__signUpButton {
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

.register__signUpButton:hover {
  font-size: 13px;
  -webkit-box-shadow: 0px 0px 40px 10px rgba(240, 190, 70, 0.5);
  -moz-box-shadow: 0px 0px 40px 10px rgba(240, 190, 70, 0.5);
  box-shadow: 0px 0px 40px 10px rgba(240, 190, 70, 0.5);
}

@media only screen and (max-width: 500px) {
  .register__logo {
    max-width: 100%;
  }

  .register__container {
    max-width: 80%;
    height: 70%;
  }

  .register__container > h1 {
    font-weight: 300;
    margin-bottom: 10px;
  }

  .register__container > p {
    margin-top: 10px;
    font-size: 12px;
  }
}
</style>
