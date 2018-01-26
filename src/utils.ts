export function propertyNameFromAttribute(name :string): string {
  return name.toLowerCase().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}
