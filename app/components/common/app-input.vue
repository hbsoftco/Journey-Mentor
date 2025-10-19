<script setup lang="ts">
export type AppInputProps = {
  modelValue?: string | number;
  type?: "text" | "email" | "password" | "number" | "search" | "tel" | "url";
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  size?: "sm" | "md" | "lg";
  error?: string;
  label?: string;
  required?: boolean;
  icon?: string;
  iconPosition?: "left" | "right";
};

const props = withDefaults(defineProps<AppInputProps>(), {
  type: "text",
  disabled: false,
  readonly: false,
  size: "md",
  required: false,
  iconPosition: "left",
});

const emit = defineEmits<{
  "update:modelValue": [value: string | number];
  "focus": [event: FocusEvent];
  "blur": [event: FocusEvent];
  "keydown": [event: KeyboardEvent];
}>();

const inputRef = ref<HTMLInputElement | null>(null);

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;
  const value = props.type === "number" ? Number(target.value) : target.value;
  emit("update:modelValue", value);
}

function focus() {
  inputRef.value?.focus();
}

const sizeClasses = computed(() => {
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-3 text-base",
    lg: "px-6 py-4 text-lg",
  };
  return sizes[props.size];
});

const iconPaddingClasses = computed(() => {
  if (!props.icon)
    return "";

  const padding = {
    sm: props.iconPosition === "left" ? "pl-10" : "pr-10",
    md: props.iconPosition === "left" ? "pl-12" : "pr-12",
    lg: props.iconPosition === "left" ? "pl-14" : "pr-14",
  };
  return padding[props.size];
});

const iconSizeClasses = computed(() => {
  const sizes = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-xl",
  };
  return sizes[props.size];
});

defineExpose({ focus });
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
      <span
        v-if="icon && iconPosition === 'left'"
        class="absolute left-4 flex items-center justify-center pointer-events-none text-light-input dark:text-dark-text"
        :class="[
          iconSizeClasses,
        ]"
      >
        <Icon :name="icon" />
      </span>

      <input
        ref="inputRef"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        class="w-full rounded-sm border-none bg-white dark:bg-dark-blue text-light-text dark:text-white placeholder:text-light-input dark:placeholder:text-dark-text shadow-md transition-all duration-200 focus:outline-none"
        :class="[
          sizeClasses,
          iconPaddingClasses,
          {
            'opacity-50 cursor-not-allowed bg-very-light-gray dark:bg-very-dark-blue': disabled,
            'border border-red-500': error,
          },
        ]"
        @input="handleInput"
        @focus="emit('focus', $event)"
        @blur="emit('blur', $event)"
        @keydown="emit('keydown', $event)"
      >

      <span
        v-if="icon && iconPosition === 'right'"
        class="absolute right-4 flex items-center justify-center pointer-events-none text-light-input dark:text-dark-text"
        :class="[
          iconSizeClasses,
        ]"
      >
        {{ icon }}
      </span>
    </div>

    <span v-if="error" class="text-xs text-red-500">
      {{ error }}
    </span>
  </div>
</template>
