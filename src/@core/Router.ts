import {Component} from "~@core/Component";

export interface RouterProps {
  baseUrl?: string;
  route: Record<string, Function>;
  hash?: boolean;
}

export class Router {

  public readonly baseUrl: string;
  public readonly route: Record<string, Function>;
  private readonly hash: boolean;
  private selectedRoute?: string;
  private readonly beforeUpdate: Set<Function> = new Set();

  constructor({ baseUrl = '/', route = {}, hash = true }: RouterProps) {
    this.baseUrl = baseUrl;
    this.route = route;
    this.hash = hash;
  }

  public setup() {
    this.updateRoute();
    window.addEventListener('popstate', () => this.updateRoute());
  }

  private updateRoute() {
    this.beforeUpdate.forEach(fn => fn());

    this.selectedRoute = Object.keys(this.route).find(v => {
      return new RegExp(
        `^${v.replace(/:\w+/gi, '\\w+').replace(/\//, "\\/")}$`,
        'g'
      ).test(this.path);
    });

    if (!this.selectedRoute) return;
    this.route[this.selectedRoute]();
  }

  public get path() {
    const path = (this.hash
                  ? location.hash.replace('#!', '')
                  : location.pathname) || '/';

    const reg = new RegExp(`^${this.baseUrl}\/?`);

    return path.replace(reg, '/');
  }

  public get params(): Record<string, string> {
    const { selectedRoute, path } = this;
    if (!selectedRoute) return {};

    const keys = [ ...selectedRoute!.matchAll(/:(\w+)/g) ].map(v => v[1]);
    const valuePaths = path.split('/');
    const routePaths = selectedRoute!.split('/');

    return keys.reduce((obj: Record<string, string>, key) => {
      const index = routePaths.findIndex(v => key === `/:${v}`);
      obj[key] = valuePaths[index];
      return obj;
    }, {});
  }

  public push(path: string) {
    const { hash, baseUrl } = this;
    const fullUrl = `${baseUrl.replace(/^\/?/, '/')}${path.replace(location.origin, '').replace(/^\/?/, '')}`;
    if (hash) {
      location.href = `/#!${fullUrl}`;
    } else {
      history.pushState(null, document.title, fullUrl);
    }
  }

  public beforeRouterUpdate(fn: Function) {
    this.beforeUpdate.add(fn);
  }

}
