import Storage from "@/core/storage";
import { IStation, IAuth, ILine } from "@/types";

export const authDB = new Storage<IAuth>("auth");
export const stationDB = new Storage<IStation>("station");
export const lineDB = new Storage<ILine>("line");
