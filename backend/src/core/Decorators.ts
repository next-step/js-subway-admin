import {HttpMethod} from "subway-constant";
import {join} from "path";
import {Request, Response} from "express";
import * as jwt from "jsonwebtoken";

import {Injectable, instanceOf} from "./AppContainer";
import {ForbiddenException, UnauthorizedException} from "@/core/HttpException";

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
    const controllerInstance = instanceOf(controller);
    routers.push(
      ...childRouters.map(({path, httpMethod, methodName}) => {
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

export function AuthGuard(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originMethod = descriptor.value;
  descriptor.value = function (request: Request, response: Response) {
    const { headers } = request;
    const { authorization } = headers;
    if (!authorization) throw new UnauthorizedException();

    const token = authorization.replace('Bearer ', '');

    try {
      const { email } = jwt.verify(token, 'secret') as { name: string, email: string };
      return originMethod.apply(this, [request, response, email]);
    } catch (e) {
      throw new ForbiddenException();
    }

  }
}