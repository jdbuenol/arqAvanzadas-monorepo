<template>
  <div class="login">
    <router-link to="/">
      <img src="@/assets/images/logo.png" alt="logo" class="login__logo" />
    </router-link>

    <div class="login__container">
      <h1>Sign in</h1>

      <form @submit.prevent="signIn">
        <label for="email">E-mail</label>
        <input id="email" type="email" required v-model="email" />

        <label for="password">Password</label>
        <input id="password" type="password" required v-model="password" />

        <button class="login__signInButton">Sign In</button>
      </form>

      <p>
        By signing-in you agree to the Hardware Shop Conditions of Use & Sale. Please see our Privacy Notice, our Cookies Notice and our
        Interest-Based Ads Notice
      </p>

      <router-link to="/register" class="login__registerButton">Create your Account</router-link>
    </div>
  </div>
  <Loader v-if="isLoading" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Loader from '@/components/Loader.vue';
import axios from 'axios';
import { POSITION, useToast } from 'vue-toastification';

const isLoading = ref<boolean>(false);
const email = ref<string>('');
const password = ref<string>('');

const toast = useToast();

const signIn = async () => {
  isLoading.value = true;
  try {
    const { data } = await axios.post(`${import.meta.env.VITE_AUTH_SERVICE}/api/login`, {
      email: email.value,
      password: password.value,
    });
    console.log(data);
  } catch (error) {
    console.log(error);
    toast.error('Error at login', {
      timeout: 3000,
      position: POSITION.TOP_CENTER,
    });
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.login {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.login__logo {
  margin-top: 20px;
  margin-bottom: 20px;
  object-fit: contain;
  width: 500px;
  margin-right: auto;
  margin-left: auto;
  transition: all ease-in 200ms;
}

.login__logo:hover {
  width: 470px;
}

.login__container {
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

.login__container > h1 {
  font-weight: 800;
  margin-bottom: 10px;
  font-size: 25px;
}

.login__container > form > label {
  margin-bottom: 5px;
}

.login__container > form > input {
  height: 30px;
  margin-bottom: 10px;
  background-color: white;
  border: 1px solid black;
  width: 98%;
}

.login__container > p {
  margin-top: 15px;
  font-size: 15px;
}

.login__signInButton {
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

.login__signInButton:hover {
  font-size: 13px;
  -webkit-box-shadow: 0px 0px 40px 10px rgba(240, 190, 70, 0.5);
  -moz-box-shadow: 0px 0px 40px 10px rgba(240, 190, 70, 0.5);
  box-shadow: 0px 0px 40px 10px rgba(240, 190, 70, 0.5);
}

.login__registerButton {
  cursor: pointer;
  width: 100%;
  font-size: 15px;
  font-family: 'Carter One', cursive;
  text-align: center;
  color: #111;
  background-color: #c8c3c3;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid darkgray;
  border-radius: 10px;
  transition: all ease-in 200ms;
}

.login__registerButton:hover {
  font-size: 13px;
  -webkit-box-shadow: 0px 0px 40px 10px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0px 0px 40px 10px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 0px 40px 10px rgba(0, 0, 0, 0.3);
}

@media only screen and (max-width: 500px) {
  .login__logo {
    max-width: 100%;
  }

  .login__container {
    max-width: 80%;
    height: 70%;
  }

  .login__container > h1 {
    font-weight: 300;
    margin-bottom: 10px;
  }

  .login__container > p {
    margin-top: 10px;
    font-size: 12px;
  }
}
</style>
