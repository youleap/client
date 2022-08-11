export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
export function lowercase(str: string): string {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

export function addDelegateSuffix(str: string): `${string}Delegate` {
  const capitalizedStr = capitalize(str);
  return `${capitalizedStr}Delegate`;
}
