<script setup>
import { computed } from 'vue';
import { useStore } from '@/store';
import { ArrowUpRightIcon } from '@heroicons/vue/24/solid';

const store = useStore();
const blockExplorer = computed(() => {
  return store.selectedNetwork == 'ethereum'
    ? { name: 'Etherscan', url: 'https://etherscan.io/address' }
    : { name: 'Polygonscan', url: 'https://polygonscan.com/address' };
});
</script>

<template>
  <div class="w-4/5 md:w-3/5 pt-6">
    <p class="text-white text-center pb-4 w-full">
      {{ store.message }}
    </p>
    <div
      class="w-full grid grid-col-1 md:grid-cols-4 gap-4 overflow-y-auto h-64">
      <div
        v-for="(item, index) in store.gallery"
        :key="index"
        class="w-80 md:w-full flex flex-col bg-slate-600 rounded">
        <img
          :src="item.image"
          :alt="item.name"
          class="w-full h-full max-h-40 object-cover mb-1 rounded-t" />
        <div class="flex flex-col p-2">
          <h1 class="text-white text-sm font-semibold truncate">
            {{ item.name }}
          </h1>
          <p class="truncate text-sm text-gray-400 w-3/5">{{ item.address }}</p>
          <p class="truncate text-xs text-gray-300">{{ item.description }}</p>
          <a
            :href="`${blockExplorer.url}/${item.address}`"
            target="_blank"
            class="text-xs text-pink-500 cursor-pointer">
            <component
              :is="ArrowUpRightIcon"
              class="h-3 w-3 text-pink-500 inline-flex mr-0.5" />
            {{ blockExplorer.name }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
