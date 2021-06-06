import {Component} from "~@core/Component";

export interface RouterProps {
  baseUrl: string;
  route: Record<string, Function>;
  hash: boolean;
}

export class Router {

  public readonly baseUrl: string;
  public readonly route: Record<string, Function>;
  private readonly hash: boolean;
  private selectedRoute?: string;

  constructor({ baseUrl = '/', route = {}, hash = true }: RouterProps) {
    this.baseUrl = baseUrl;
    this.route = route;
    this.hash = hash;
    this.updateRoute();
    window.addEventListener('popstate', () => this.updateRoute());
  }

  private updateRoute() {
    this.selectedRoute = Object.keys(this.route).find(v => {
      return new RegExp(
        `^${v.replace(/:\w+/gi, '\\w+').replace(/\//, "\\/")}$`,
        'g'
      ).test(this.path);
    });
  }

  public get path() {
    let path = this.hash
                  ? location.hash.replace('#!', '')
                  : location.pathname;

    return path.replace(new RegExp(`${this.baseUrl}\/?`), '/');
  }

  public get params(): Record<string, string> {
    const { selectedRoute, path } = this;
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
    const fullUrl = `${baseUrl.replace(/^\/?/, '/')}/${path.replace(/^\/?/, '')}`;
    if (hash) {
      location.hash = `!${fullUrl}`;
    } else {
      history.pushState(null, document.title, fullUrl);
    }
    this.updateRoute();
  }


}
