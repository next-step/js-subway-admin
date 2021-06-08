import { StateObj } from '../types/index';

const setState = <T>(obj: StateObj<T>, key: string, value: T): void => {
  obj[key] = value;
};

export default setState;
