export const censorText = (s: string) => {
  return s
    .split('')
    .map((c) => '█')
    .join('');
};
