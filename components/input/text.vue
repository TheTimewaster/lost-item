<script setup lang="ts">
const props = defineProps<{ modelValue: string; id: string; label: string }>();
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'input', event: Event): void
  (e: 'change', event: Event): void
  (e: 'blur'): void
  (e: 'focus'): void
}>();

const handleChange = ($event: Event) => {
  emit('change', $event);
};

const handleinput = ($event: Event) => {
  emit('update:modelValue', ($event.target as HTMLInputElement).value);
  emit('input', $event);
};

const attrs = useAttrs();
</script>

<template>
  <div>
    <label :for="id" class="font-bold text-sm mb-2">
      {{ label }}
    </label>
    <input
      :id="id"
      :value="modelValue"
      class="border rounded-xl outline-transparent border-gray-400 w-full p-2 hover:border-lemon focus:border-lemon"
      v-bind="attrs"
      @change="handleChange"
      @input="handleinput"
      @blur="emit('blur')"
      @focus="emit('focus')"
    >
  </div>
</template>

