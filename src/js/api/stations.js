import customAxios from 'js/api/customAxios';

export const getStations = async () => {
  const res = await customAxios.get('/stations');
  return res.data;
};

export const addStation = async station => {
  const res = await customAxios.post('/stations', station);
  return res.data;
};

export const modifyStation = async (id, station) => {
  const res = await customAxios.patch(`/stations/${id}`, station);
  return res.data;
};

export const deleteStation = async id => {
  const res = await customAxios.delete(`/stations/${id}`);
  return res.data;
};
