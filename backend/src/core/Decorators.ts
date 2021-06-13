import { Injectable } from "./AppContainer";
import {HttpMethod} from "subway-domain";

export function Controller (basePath: string) {
  return function (controller: any) {
    Injectable(controller);
  }
}

export function RequestMapping(uri?: string, method: string = HttpMethod.GET) {
  return function (target: any, property: string, descriptor: PropertyDescriptor) {
    console.log({ uri, target, property, descriptor });
  }
}

export function GetMapping(uri?: string) {
  return RequestMapping(uri, HttpMethod.GET);
}

export function PostMapping(uri?: string) {
  return RequestMapping(uri, HttpMethod.POST);
}

export function PutMapping(uri?: string) {
  return RequestMapping(uri, HttpMethod.PUT);
}

export function DeleteMapping(uri?: string) {
  return RequestMapping(uri, HttpMethod.DELETE);
}
