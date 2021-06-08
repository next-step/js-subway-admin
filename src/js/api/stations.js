import customAxios from 'js/api/customAxios';

export const getStations = async () => {
  const res = await customAxios.get('/stations');
  return res.data;
};
