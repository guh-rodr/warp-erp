export function captalizeFirstLetter(text: string) {
  const fl = text[0].toUpperCase();
  return fl + text.slice(1);
}
