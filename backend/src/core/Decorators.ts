import {HttpMethod} from "subway-constant";
import {join} from "path";
import {Request, Response} from "express";
import {Injectable, instanceOf} from "./AppContainer";

interface ChildRouter {
  httpMethod: HttpMethod;
  path: string;
  methodName: string;
}

interface Router {
  httpMethod: HttpMethod;
  path: string;
  callback: (req: Request, res: Response) => any;
}

const routers: Router[] = [];
const childRouters: ChildRouter[] = [];

export function RestController(basePath: string = '/') {
  return function (controller: any) {
    Injectable(controller);
    routers.push(
      ...childRouters.map(({path, httpMethod, methodName}) => {
        const controllerInstance = instanceOf(controller);
        return {
          httpMethod,
          path: join(basePath, path).replace(/\\/g, "/"),
          callback: controllerInstance[methodName].bind(controllerInstance),
        }
      })
    );
    childRouters.length = 0;
  }
}

export function RequestMapping(method: HttpMethod = HttpMethod.GET, uri?: string) {
  return function (target: any, property: string, descriptor: PropertyDescriptor) {
    childRouters.push({
      httpMethod: method,
      path: uri || '',
      methodName: property
    });
  }
}

export function GetMapping(uri?: string) {
  return RequestMapping(HttpMethod.GET, uri);
}

export function PostMapping(uri?: string) {
  return RequestMapping(HttpMethod.POST, uri);
}

export function PutMapping(uri?: string) {
  return RequestMapping(HttpMethod.PUT, uri);
}

export function DeleteMapping(uri?: string) {
  return RequestMapping(HttpMethod.DELETE, uri);
}

export function getRouters() {
  return routers;
}
