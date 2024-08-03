export function createKebabFromText(text: string) {
  return text.trim().replace(/\s+/g, "-");
}
