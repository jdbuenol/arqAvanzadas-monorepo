<template>
  <Header />
  <section class="w-full flex flex-grow justify-center items-center py-20">
    <div
      v-for="(ranking, index) in rankings"
      class="w-11/12 lg:w-fit max-w-screen-sm bg-white border-2 border-black rounded-2xl shadow-2xl px-12 py-7 flex flex-col items-start gap-2"
    >
      <span class="text-2xl"># {{ index + 1 }}</span>
      <span>Name: {{ ranking.name }}</span>
      <span>Revenue: {{ ranking.revenue }}</span>
    </div>
  </section>
  <Loader v-if="isLoading" />
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { POSITION, useToast } from 'vue-toastification';

import Header from '@/components/Header.vue';
import Loader from '@/components/Loader.vue';

const isLoading = ref<boolean>(true);
const rankings = ref<{ name: string; revenue: number }[]>([]);

const toast = useToast();

type IRanking = Record<string, number>;

onMounted(async () => {
  try {
    const token = sessionStorage.getItem('token');
    const res = await axios.get(`http://35.226.5.41:8000/api/ambassador/rankings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const rankingsData = res.data as IRanking;

    rankings.value = Object.keys(rankingsData).map(name => ({
      name,
      revenue: rankingsData[name],
    }));
  } catch (error) {
    console.log(error);
    toast.error('Error at get orders', {
      timeout: 3000,
      position: POSITION.TOP_CENTER,
    });
  } finally {
    isLoading.value = false;
  }
});
</script>
