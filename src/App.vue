<script setup>
import { useStore } from '@/store';
import ALogo from '@/components/ALogo.vue';
import ASearch from '@/components/ASearch.vue';
import AGallery from '@/components/AGallery.vue';
import AFooter from '@/components/AFooter.vue';

const store = useStore();
</script>

<template>
  <div class="bg-slate-800 h-full w-full">
    <div class="flex flex-col items-center justify-center h-screen">
      <ALogo />
      <ASearch />
      <AGallery v-if="store.nfts.length >= 1" />
    </div>
    <!-- <AFooter /> -->
  </div>
</template>
