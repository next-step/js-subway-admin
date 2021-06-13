import { Injectable } from "./AppContainer";
import {HttpMethod} from "subway-constant";
import { join } from "path";
import {Request, Response} from "express";


interface Router {
  httpMethod: HttpMethod;
  path: string;
  callback: (request: Request, response: Response) => any;
}

const allRouters: Router[] = [];
const currentRouters: Router[] = [];

export function Controller (basePath: string = '/') {
  return function (controller: any) {
    Injectable(controller);
    allRouters.push(
      ...currentRouters.map(({path, ...router}) => {
        return {
          ...router,
          path: join(basePath, path).replace(/\\/g, "/"),
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
      callback: descriptor.value,
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
