export const stationNameValidator = (name: string) => {
  return name.length >= 2 && name.length <= 20;
};
