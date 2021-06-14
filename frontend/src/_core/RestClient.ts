import {HttpMethod, HttpStatus} from "subway-constant";

export type RequestInterceptor = (request: RequestInit) => RequestInit;

export class RestClient {

  private readonly responseInterceptors: Set<Function> = new Set();
  private readonly requestInterceptors: Set<RequestInterceptor> = new Set();

  constructor(
    protected readonly baseUrl: string
  ) {}

  private getResponse = (responseInit: Response) => {
    if ([HttpStatus.CREATED, HttpStatus.NO_CONTENT].includes(responseInit.status)) {
      return;
    }
    return responseInit.json().then(json => {
      if (responseInit.status >= 400) {
        throw new Error(json.message);
      }

      let response = json;
      for (const interceptor of this.responseInterceptors) {
        response = interceptor(response);
      }
      return response;
    })
  }

  private getRequest (requestInit: RequestInit): RequestInit {
    let request: RequestInit = requestInit;
    for (const interceptor of this.requestInterceptors) {
      request = interceptor(request);
    }
    return request;
  }

  private request<T> (method: HttpMethod, uri: string): Promise<T> {
    const url = new URL(`.${uri}`, this.baseUrl);
    return fetch(url.href, this.getRequest({ method }))
            .then(this.getResponse);
  }

  private requestWithBody<T, B> (method: HttpMethod, uri: string, body: B): Promise<T> {
    const url = new URL(`.${uri}`, this.baseUrl);
    return fetch(url.href, this.getRequest({
              method,
              body: JSON.stringify(body),
              headers: {
                'content-type': 'application/json'
              },
            }))
            .then(this.getResponse);
  }

  public get<T> (uri: string): Promise<T> {
    return this.request<T>(HttpMethod.GET, uri);
  }

  public post<T, B> (uri: string, body: B): Promise<T> {
    return this.requestWithBody<T, B>(HttpMethod.POST, uri, body);
  }

  public patch<T, B> (uri: string, body: B): Promise<T> {
    return this.requestWithBody<T, B>(HttpMethod.PATCH, uri, body);
  }

  public put<T, B> (uri: string, body: B): Promise<T> {
    return this.requestWithBody<T, B>(HttpMethod.PUT, uri, body);
  }

  public delete<T> (uri: string): Promise<T> {
    return this.request(HttpMethod.DELETE, uri);
  }

  protected addRequestInterceptor(interceptor: RequestInterceptor): void {
    this.requestInterceptors.add(interceptor);
  }

  protected addResponseInterceptor(interceptor: Function): void {
    this.responseInterceptors.add(interceptor);
  }
}
