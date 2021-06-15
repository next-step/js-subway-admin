import * as express from "express";
import {NextFunction, Request, Response} from "express";
import { resolve } from "path";

import {getRouters, HttpException} from "@/core";

import './endpoint';
import * as fs from "fs";

const app = express();
app.use(express.json());
app.use(express.static(resolve(process.cwd(), 'static')));

const index = fs.readFileSync(resolve(process.cwd(), 'static/index.html'), { encoding: 'utf-8' });

app.get('/*', (req, res) => {
  res.setHeader('content-type', 'text/html');
  res.send(index);
})

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

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`http://localhost:${port} listen`);
});
