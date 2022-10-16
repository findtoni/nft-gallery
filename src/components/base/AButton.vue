<script setup>
import ALoading from '@/components/base/ALoading.vue';

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  icon: {
    type: Function,
    required: false,
  },
  loading: {
    type: Boolean,
    required: false,
  },
  disabled: {
    type: Boolean,
    required: false,
  }
});
</script>

<template>
  <button v-if="props.loading" class="w-3/4 md:w-2/4 h-10 rounded bg-gray-200 text-gray-500 cursor-not-allowed shadow-sm">
    <ALoading class="mb-0.5 mr-1" />
    Fetching...
  </button>
  <button v-else-if="props.disabled" class="w-3/4 md:w-2/4 h-10 rounded bg-gray-200 text-gray-500 cursor-not-allowed shadow-sm">
    <component :is="props.icon" class="w-5 h-5 mb-1 mr-0.5 inline-flex text-gray-500" />
    {{ props.label }}
  </button>
  <button v-else class="w-3/4 md:w-2/4 h-10 rounded bg-emerald-600 text-white font-medium cursor-pointer shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
    <component :is="props.icon" class="w-5 h-5 mb-1 mr-0.5 inline-flex text-white" />
    {{ props.label }}
  </button>
</template>
