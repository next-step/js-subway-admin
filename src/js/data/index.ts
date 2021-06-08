import LocalStorage from "@/core/localStorage";
import { IStation, IAuth } from "@/types";

export const authDB = new LocalStorage<IAuth>("auth");
export const stationDB = new LocalStorage<IStation>("station");
