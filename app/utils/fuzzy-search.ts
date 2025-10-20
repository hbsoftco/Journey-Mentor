export function levenshteinDistance(str1: string, str2: string): number {
  const matrix: number[][] = [];

  // Initialize first column
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }

  // Initialize first row
  for (let j = 0; j <= str1.length; j++) {
    matrix[0]![j] = j;
  }

  // Calculate distances
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i]![j] = matrix[i - 1]![j - 1]!;
      }
      else {
        matrix[i]![j] = Math.min(
          matrix[i - 1]![j - 1]! + 1, // substitution
          matrix[i]![j - 1]! + 1, // insertion
          matrix[i - 1]![j]! + 1, // deletion
        );
      }
    }
  }

  return matrix[str2.length]![str1.length]!;
}

export function fuzzyMatch(str: string, pattern: string): boolean {
  if (!pattern)
    return true;

  const strLower = str.toLowerCase();
  const patternLower = pattern.toLowerCase();

  // Exact substring match
  if (strLower.includes(patternLower))
    return true;

  // Fuzzy match using Levenshtein distance
  const distance = levenshteinDistance(strLower, patternLower);

  // Calculate threshold: allow 30% of the original string length
  // or at least 2 characters difference, whichever is greater
  const threshold = Math.max(
    Math.floor(strLower.length * 0.3),
    2,
  );

  return distance <= threshold;
}
