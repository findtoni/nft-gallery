<script setup>
import { ref } from 'vue';

const toggle = ref(false);
const props = defineProps({
  name: {
    type: String,
    required: false,
  },
  label: {
    type: String,
    required: false,
  },
  loading: {
    type: Boolean,
    required: false,
  },
});
defineEmits(['change']);
</script>

<template>
  <div class="relative flex items-start">
    <div class="flex h-5 items-center">
      <input
        v-model="toggle"
        :id="props.name"
        :name="props.name"
        :disabled="props.loading"
        type="checkbox"
        @change="$emit('change', toggle)"
        class="h-4 w-4 rounded border-gray-300 accent-pink-600 text-pink-600 focus:ring-pink-500" />
    </div>
    <div class="ml-2 text-sm">
      <label :for="props.name" class="font-medium text-white">
        {{ props.label }}</label
      >
    </div>
  </div>
</template>
