export function truncateText(text: string, maxLength: number, suffix = "") {
  if (text.length < maxLength) return text;

  const words = text.split(" ");
  if (words.length === 1 || words[0].length > maxLength) {
    return text.substring(0, maxLength) + suffix;
  }

  const res = [];
  let length = 0;
  let i = 0;
  while (i < words.length && length + words[i].length <= maxLength) {
    const word = words[i];
    res.push(word);
    length += word.length + 1;
    i++;
  }

  return res.join(" ") + suffix;
}
