const constructors = new WeakMap<Clazz, Object | undefined>();
const clazzProperties = new WeakMap<Clazz, Clazz[]>();
export const container = new WeakMap<Clazz, any>();

type Clazz = { new(...args: any[]): Object }

export function instanceOf<T>(Constructor: any): T {
  const resolved = container.get(Constructor);
  if (resolved) return resolved;

  const properties: Clazz[] = clazzProperties.get(Constructor) || [];

  const instance = new Constructor(
    ...properties.map(instanceOf)!
  );

  container.set(Constructor, instance);
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
