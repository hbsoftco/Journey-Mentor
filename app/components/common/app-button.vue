<script setup lang="ts">
export type AppButtonProps = {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: string;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
};

const props = withDefaults(defineProps<AppButtonProps>(), {
  variant: "primary",
  size: "md",
  disabled: false,
  loading: false,
  fullWidth: false,
  type: "button",
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

function handleClick(event: MouseEvent) {
  if (!props.disabled && !props.loading) {
    emit("click", event);
  }
}

const variantClasses = computed(() => {
  const variants = {
    primary: "bg-white dark:bg-dark-blue text-light-text dark:text-white shadow-md hover:bg-gray-50 dark:hover:bg-dark-blue/90",
    secondary: "bg-very-light-gray dark:bg-dark-blue text-light-text dark:text-white shadow-md hover:bg-gray-100 dark:hover:bg-dark-blue/80",
    outline: "bg-transparent border border-light-gray dark:border-dark-blue text-light-text dark:text-white hover:bg-very-light-gray dark:hover:bg-dark-blue/50",
    ghost: "bg-transparent text-light-text dark:text-white hover:bg-very-light-gray dark:hover:bg-dark-blue/50",
  };
  return variants[props.variant];
});

const sizeClasses = computed(() => {
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-6 py-3 text-lg",
  };
  return sizes[props.size];
});
</script>

<template>
  <button
    :type="type"
    class="inline-flex items-center justify-center gap-2 rounded-sm font-medium transition-all duration-200 ease-in-out cursor-pointer"
    :class="[
      variantClasses,
      sizeClasses,
      {
        'opacity-50 cursor-not-allowed': disabled,
        'cursor-wait': loading,
        'w-full': fullWidth,
      },
    ]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span
      v-if="loading"
      class="inline-block w-4 h-4 border-2 border-current border-r-transparent rounded-full animate-spin"
    />
    <span :class="{ 'opacity-0': loading }" class="flex justify-center items-center">
      <Icon
        v-if="icon"
        :name="icon"
        class="w-4 h-4 mr-1.5"
      />
      <slot />
    </span>
  </button>
</template>
