import {instanceOf} from "@/_core";
import {LineService} from "@/services/LineService";
import {StationService} from "@/services/StationService";
import {AuthService} from "@/services/AuthService";

export const lineService = instanceOf<LineService>(LineService);
export const stationService = instanceOf<StationService>(StationService);
export const authService = instanceOf<AuthService>(AuthService);
