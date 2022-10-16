<script setup>
import { ref, computed } from 'vue';
import { useStore } from '@/store';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid';
import AInput from '@/components/base/AInput.vue';
import ACheckbox from '@/components/base/ACheckbox.vue';
import ARadio from '@/components/base/ARadio.vue';
import AButton from '@/components/base/AButton.vue';

const store = useStore();
const fetchCollection = ref(false);
const isValidAddress = computed(() => {
  if (fetchCollection.value) {
    return store.collection?.length == 42 ? true : false;
  } else return store.wallet?.length == 42 ? true : false;
});

function toggleCollection(value) {
  value ? (fetchCollection.value = true) : (fetchCollection.value = false);
}
</script>

<template>
  <div class="w-full md:w-2/4">
    <div class="flex flex-col space-y-2.5 items-center">
      <div class="flex flex-col space-y-2.5 items-center w-full">
        <ARadio
          label="Network"
          :options="store.networkOptions"
          :loading="store.loading"
          @change="value => store.setItem('selectedNetwork', value.name)" />
        <AInput
          v-if="fetchCollection"
          name="collection_address"
          label="Collection Address"
          placeholder="Enter collection contract address"
          :loading="store.loading"
          :error="!store.collection ? false : !isValidAddress"
          @change="value => store.setItem('collection', value)" />
        <AInput
          v-else
          name="wallet_address"
          label="Wallet Address"
          placeholder="Enter wallet address"
          :loading="store.loading"
          :error="!store.wallet ? false : !isValidAddress"
          @change="value => store.setItem('wallet', value)" />
        <ACheckbox
          name="toggle_collection"
          label="Fetch from collection"
          :loading="store.loading"
          @change="toggleCollection" />
      </div>
      <AButton
        v-if="fetchCollection"
        @click="store.fetchNFTsCollection()"
        label="Fetch NFTs"
        :icon="MagnifyingGlassIcon"
        :disabled="!isValidAddress"
        :loading="store.loading" />
      <AButton
        v-else
        @click="store.fetchNFTs()"
        label="Fetch NFTs"
        :icon="MagnifyingGlassIcon"
        :disabled="!isValidAddress"
        :loading="store.loading" />
    </div>
  </div>
</template>
