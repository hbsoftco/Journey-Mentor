<script setup lang="ts">
export type SelectOption = {
  value: string | number;
  label: string;
  disabled?: boolean;
};

export type AppSelectProps = {
  modelValue?: string | number;
  options?: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  error?: string;
  label?: string;
  required?: boolean;
};

const props = withDefaults(defineProps<AppSelectProps>(), {
  disabled: false,
  size: "md",
  required: false,
  options: () => [],
});

const emit = defineEmits<{
  "update:modelValue": [value: string | number];
  "change": [value: string | number];
}>();

function handleChange(event: Event) {
  const target = event.target as HTMLSelectElement;
  const value = target.value;
  emit("update:modelValue", value);
  emit("change", value);
}

const sizeClasses = computed(() => {
  const sizes = {
    sm: "px-4 py-2 pr-10 text-sm",
    md: "px-5 py-3 pr-12 text-base",
    lg: "px-6 py-4 pr-14 text-lg",
  };
  return sizes[props.size];
});

const arrowSizeClasses = computed(() => {
  const sizes = {
    sm: "w-3 h-3",
    md: "w-3.5 h-3.5",
    lg: "w-4 h-4",
  };
  return sizes[props.size];
});
</script>

<template>
  <div class="flex flex-col gap-1.5 w-full">
    <label
      v-if="label"
      class="text-sm font-medium text-light-text dark:text-white"
    >
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <div class="relative flex items-center w-full">
      <select
        :value="modelValue"
        :disabled="disabled"
        :required="required"
        class="w-full appearance-none rounded-sm border-none bg-white dark:bg-dark-blue text-light-text dark:text-white shadow-md cursor-pointer transition-all duration-200 focus:outline-none"
        :class="[
          sizeClasses,
          {
            'opacity-50 cursor-not-allowed bg-very-light-gray dark:bg-very-dark-blue': disabled,
            'border border-red-500': error,
          },
        ]"
        @change="handleChange"
      >
        <option
          v-if="placeholder"
          value=""
          disabled
          :selected="!modelValue"
        >
          {{ placeholder }}
        </option>
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
          :disabled="option.disabled"
          class="bg-white dark:bg-dark-blue text-light-text dark:text-white"
        >
          {{ option.label }}
        </option>
      </select>

      <span
        class="absolute right-4 flex items-center justify-center pointer-events-none text-light-input dark:text-dark-text transition-transform duration-200"
      >
        <Icon name="heroicons-outline:chevron-down" :class="arrowSizeClasses" />
      </span>
    </div>

    <span v-if="error" class="text-xs text-red-500">
      {{ error }}
    </span>
  </div>
</template>
