import {debounce} from "@/utils";

let currentObserver: Function | null = null;

export function observe (fn: Function) {
  currentObserver = debounce(fn);
  fn();
  currentObserver = null;
}

export function observable<T> (obj: T): T {

  if (!(obj instanceof Object)) return obj;

  Object.entries(obj).forEach(([ key, value ]) => {
    const observers: Set<Function> = new Set();
    let _value = value;

    Object.defineProperty(obj, key, {
      get () {
        observers.add(currentObserver!);
        return _value;
      },

      set (newValue) {
        if (JSON.stringify(_value) !== JSON.stringify(newValue)) {
          _value = newValue;
          observers.forEach(fn => fn?.());
        }
      },
    })
  });

  return obj;
}
