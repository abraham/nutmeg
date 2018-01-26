/** Convert `fooBar` to `foo-bar`. */
export function attributeNameFromProperty(name :string): string {
  return name.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();
}

/** Convert `foo-bar` to `fooBar`. */
export function propertyNameFromAttribute(name :string): string {
  if (name.includes('-')) {
    return name.toLowerCase().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
  } else {
    return name;
  }
}

/** Convert `foo` to `_foo`. */
export function privatePropertyName(name :string): string {
  return `__${name}`;
}
