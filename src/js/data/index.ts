import LocalStorage from "@/core/localStorage";
import { IStation, IAuth, ILine } from "@/types";

export const authDB = new LocalStorage<IAuth>("auth");
export const stationDB = new LocalStorage<IStation>("station");
export const lineDB = new LocalStorage<ILine>("line");
