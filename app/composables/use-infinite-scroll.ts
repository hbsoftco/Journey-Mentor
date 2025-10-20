export function useInfiniteScroll<T>(
  items: Ref<T[]>,
  itemsPerPage: number = 20,
) {
  const displayedItems = ref<T[]>([]);
  const currentPage = ref(1);
  const hasMore = computed(() => displayedItems.value.length < items.value.length);

  const loadMore = () => {
    const start = 0;
    const end = currentPage.value * itemsPerPage;
    displayedItems.value = items.value.slice(start, end);
    currentPage.value++;
  };

  // Reset when items change
  watch(items, () => {
    currentPage.value = 1;
    loadMore();
  }, { immediate: true });

  return {
    displayedItems,
    hasMore,
    loadMore,
  };
}
