import {Injectable, instanceOf} from "./AppContainer";
import {HttpMethod} from "subway-constant";
import { join } from "path";
import {Request, Response} from "express";


interface Router {
  httpMethod: HttpMethod;
  path: string;
  methodName: string;
}

interface RouterWithCallback {
  httpMethod: HttpMethod;
  path: string;
  callback: (req: Request, res: Response) => any;
}

type RouterCaller = RouterWithCallback;

const allRouters: RouterCaller[] = [];
const currentRouters: Router[] = [];

export function Controller (basePath: string = '/') {
  return function (controller: any) {
    Injectable(controller);
    allRouters.push(
      ...currentRouters.map(({path, httpMethod, methodName}) => {
        const controllerInstance = instanceOf(controller);
        return {
          httpMethod,
          path: join(basePath, path).replace(/\\/g, "/"),
          callback: controllerInstance[methodName].bind(controllerInstance),
        }
      })
    );
    currentRouters.length = 0;
  }
}

export function RequestMapping(method: HttpMethod = HttpMethod.GET, uri?: string) {
  return function (target: any, property: string, descriptor: PropertyDescriptor) {
    currentRouters.push({
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

export function getAllRouter() {
  return allRouters;
}
