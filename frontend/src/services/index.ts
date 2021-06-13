import {instanceOf} from "@/_core";
import {LineService} from "@/services/LineService";
import {SectionService} from "@/services/SectionService";
import {StationService} from "@/services/StationService";
import {AuthService} from "@/services/AuthService";

export const lineService = instanceOf<LineService>(LineService);
export const sectionService = instanceOf<SectionService>(SectionService);
export const stationService = instanceOf<StationService>(StationService);
export const authService = instanceOf<AuthService>(AuthService);
