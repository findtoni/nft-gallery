<script setup>
import { ref } from 'vue';

const input = ref('');
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: true,
  },
  loading: {
    type: Boolean,
    required: false,
  },
  error: {
    type: Boolean,
    required: false,
  },
});
defineEmits(['change']);
</script>

<template>
  <div class="w-3/4 md:w-2/4">
    <div class="flex justify-between items-center">
      <label :for="props.name" class="block text-sm font-medium text-white">
        {{ props.label }}
      </label>
      <p v-if="props.error" class="text-sm font-normal text-red-500">
        Enter a valid address
      </p>
    </div>
    <div class="mt-1">
      <input
        v-model="input"
        :name="props.name"
        :placeholder="props.placeholder"
        :disabled="props.loading"
        @input="$emit('change', input)"
        :class="[
          'block w-full rounded p-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
          { 'cursor-not-allowed': props.loading },
        ]" />
    </div>
  </div>
</template>
