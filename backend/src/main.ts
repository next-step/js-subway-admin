import * as express from "express";

import {getAllRouter} from "@/core";
import './endpoint';

const app = express();
app.use(express.json());

console.log(getAllRouter());
