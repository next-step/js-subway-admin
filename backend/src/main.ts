import * as express from "express";
import {Request, Response} from "express";

import {getAllRouter} from "@/core";
import './endpoint';

const app = express();
app.use(express.json());

for (const { httpMethod, path, callback } of getAllRouter()) {
  app[httpMethod.toLowerCase()](path, (request: Request, response: Response) => {
    const result = callback(request, response);

    console.log(typeof result);

    response.send(result);
  });
}

app.listen(3000, () => {
  console.log('http://localhost:3000 listen')
})
