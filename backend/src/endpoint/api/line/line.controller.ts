import {Request} from "express";

import {AuthGuard, DeleteMapping, GetMapping, Inject, PostMapping, PutMapping, RestController, Status} from "@/core";
import {LineService} from "./line.service";
import {HttpStatus} from "subway-constant";
import {LineUpdateRequest, SectionRequest} from "subway-domain";

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

  @GetMapping('/:idx')
  @AuthGuard
  public getLine({ params }: Request) {
    return this.lineService.getLineWithStations(Number(params.idx));
  }

  @PostMapping()
  @AuthGuard
  @Status(HttpStatus.CREATED)
  public addLine({ body }: Request) {
    this.lineService.addLine(body);
  }

  @PutMapping('/:idx')
  @AuthGuard
  @Status(HttpStatus.NO_CONTENT)
  public updateLine({ body, params }: Request) {
    this.lineService.updateLine(
      Number(params.idx),
      body as LineUpdateRequest
    );
  }

  @DeleteMapping('/:idx')
  @AuthGuard
  @Status(HttpStatus.NO_CONTENT)
  public removeLine({ params }: Request) {
    this.lineService.removeLine(Number(params.idx));
  }

  @PostMapping('/:idx/sections')
  @AuthGuard
  @Status(HttpStatus.NO_CONTENT)
  public addSection({ params, body }: Request) {
    this.lineService.addSection(
      Number(params.idx),
      body as SectionRequest
    );
  }

  @DeleteMapping('/:idx/sections')
  @AuthGuard
  @Status(HttpStatus.NO_CONTENT)
  public removeSection({ params, query }: Request) {
    this.lineService.removeSection(
      Number(params.idx),
      Number(query.stationId)
    );
  }
}
