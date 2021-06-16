const constructors = new WeakMap<Clazz, Object | undefined>();
const clazzProperties = new WeakMap<Clazz, Clazz[]>();
export const container = new WeakMap<Clazz, any>();

type Clazz = { new(...args: any[]): Object }

export function instanceOf<T>(constructor: any): T {
  const resolved = container.get(constructor);
  if (resolved) return resolved;

  const properties: Clazz[] = clazzProperties.get(constructor) || [];

  const instance = new constructor(
    ...properties.map(instanceOf)!
  );

  container.set(constructor, instance);
  return instance as T;
}

export function Injectable (constructor: Clazz) {
  constructors.set(constructor, clazzProperties.get(constructor));
}

export function Inject (singleton: Clazz) {
  return function (target: Clazz, propertyKey: string, index: number) {
    const properties = clazzProperties.get(target) || [];
    if (properties) {
      properties[index] = singleton;
    }
    clazzProperties.set(target, properties);
  }
}
