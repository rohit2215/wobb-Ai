export function formatFollowers(count: number, precision: number = 1): string {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(precision) + "M";
  }
  if (count >= 1000) {
    // For thousands, standard is usually 1 decimal place or 0 depending on precision
    const kPrecision = precision === 2 ? 1 : precision;
    return (count / 1000).toFixed(kPrecision) + "K";
  }
  return count.toString();
}

export function formatEngagementRate(rate: number | undefined): string {
  if (rate === undefined) return "N/A";
  return (rate * 100).toFixed(2) + "%";
}
