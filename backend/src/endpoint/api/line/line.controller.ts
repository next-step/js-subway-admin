import {AuthGuard, GetMapping, Inject, RestController} from "@/core";

import { LineService } from "./line.service";

@RestController('/api/lines')
export class LineController {
  constructor(
    @Inject(LineService) private readonly lineService: LineService
  ) {}

  @GetMapping()
  @AuthGuard
  public getLines() {
    return this.lineService.getLines();
  }
}
