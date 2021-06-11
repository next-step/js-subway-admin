import {instanceOf} from "~@core";
import {LineService} from "~services/LineService";
import {SectionService} from "~services/SectionService";
import {StationService} from "~services/StationService";
import {UserService} from "~services/UserService";

export const lineService = instanceOf(LineService);
export const sectionService = instanceOf(SectionService);
export const stationService = instanceOf(StationService);
export const userService = instanceOf(UserService);
