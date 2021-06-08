import customAxios from 'js/api/customAxios';

export const getStations = async () => {
  const res = await customAxios.get('/stations');
  return res.data;
};

export const addStation = async station => {
  const res = await customAxios.post('/stations', station);
  return res.data;
};
