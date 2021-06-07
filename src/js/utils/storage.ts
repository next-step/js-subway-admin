export const getData = (key: string): [] => {
  const data = localStorage.getItem(key);
  if (!data) return [];
  return JSON.parse(data);
};

export const setData = (key: string, value: string[]): void => {
  localStorage.setItem(key, JSON.stringify(value));
};
