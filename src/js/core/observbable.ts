let currentObserver = null;

export const observe = (fn: Function) => {
  currentObserver = fn;
  fn();
  currentObserver = null;
};

const observbable = <T>(obj: T): T => {
  Object.keys(obj).forEach((key) => {
    const propObservers: Set<Function> = new Set();
    let _value = obj[key];

    Object.defineProperty(obj, key, {
      get() {
        propObservers.add(currentObserver!);
        return _value;
      },
      set(value) {
        _value = value;
        propObservers.forEach((observer) => observer());
      },
    });
  });

  return obj;
};

export default observbable;
