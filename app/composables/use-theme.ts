export function useTheme() {
  const colorMode = useColorMode();

  const toggleTheme = () => {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  };

  const isDark = computed(() => colorMode.value === "dark");

  return {
    theme: colorMode,
    toggleTheme,
    isDark,
  };
}
