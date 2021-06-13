import * as express from "express";
import {Request, Response} from "express";

import {getRouters} from "@/core";
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

app.listen(3000, () => {
  console.log('http://localhost:3000 listen')
});
