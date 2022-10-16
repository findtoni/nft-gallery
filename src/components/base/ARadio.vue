<script setup>
import { ref } from 'vue';
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue';

const selected = ref(props.options[0]);
const props = defineProps({
  options: {
    type: Array,
    required: true,
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
  <div class="w-3/4 md:w-2/4">
    <label :for="props.name" class="block text-sm font-medium text-white">
      {{ props.label }}
    </label>
    <RadioGroup v-model="selected" class="mt-2">
      <div class="grid grid-cols-3 gap-3">
        <RadioGroupOption
          as="template"
          v-for="option in props.options"
          :key="option.name"
          :value="option"
          :disabled="props.loading"
          v-slot="{ active, checked }"
          @click="$emit('change', selected)">
          <div
            :class="[
              active ? 'ring-2 ring-offset-2 ring-emerald-500' : '',
              checked
                ? 'bg-emerald-600 border-transparent text-white hover:bg-emerald-700'
                : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50',
              props.loading ? 'opacity-25 cursor-not-allowed' : '',
              'border rounded p-1 flex items-center justify-center text-sm font-medium capitalize cursor-pointer',
            ]">
            <RadioGroupLabel as="span">{{ option.name }}</RadioGroupLabel>
          </div>
        </RadioGroupOption>
      </div>
    </RadioGroup>
  </div>
</template>
