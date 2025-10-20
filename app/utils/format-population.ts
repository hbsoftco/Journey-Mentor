export function formatPopulation(population: number): string {
  return new Intl.NumberFormat("en-US").format(population);
}
