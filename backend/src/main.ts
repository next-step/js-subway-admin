import * as express from "express";
import {NextFunction, Request, Response} from "express";

import {getRouters, HttpException} from "@/core";

import './endpoint';

const app = express();
app.use(express.json());

for (const {httpMethod, path, callback} of getRouters()) {
  const method = httpMethod.toLowerCase();
  app[method](path, async (request: Request, response: Response, next: NextFunction) => {
    try {
      const result = await callback(request, response);
      response.json(result);
    } catch (Error) {
      next(Error);
    }
  });
}

app.use((err, req, res, next) => {
  if (err instanceof HttpException) {
    return res.status(err.statusCode).send(err);
  }
  console.error(err.stack);
  const httpException = new HttpException();
  res.status(httpException.statusCode).send(httpException)
});

app.listen(3000, () => {
  console.log('http://localhost:3000 listen')
});
