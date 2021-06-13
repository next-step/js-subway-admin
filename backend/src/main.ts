import * as express from "express";
import {Request, Response} from "express";
import {HttpStatus} from "subway-constant";

import {getRouters} from "@/core";
import {NotFoundUserError} from "@/endpoint";

import './endpoint';

const app = express();
app.use(express.json());

for (const {httpMethod, path, callback} of getRouters()) {
  const method = httpMethod.toLowerCase();
  app[method](path, (request: Request, response: Response) => {
    const result = callback(request, response);
    response.json(result);
  });
}

app.use((err, req, res, next) => {
  if (err instanceof NotFoundUserError) {
    res.status(HttpStatus.BAD_REQUEST)
  }
  res.send({ message: err.message });
});

app.listen(3000, () => {
  console.log('http://localhost:3000 listen')
});
