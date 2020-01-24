
export class ImageHistoryDto {
  readonly imageID: string;
  readonly created: string;
  readonly command: string;
  readonly size: string;
  readonly comment: string;
  readonly shortID: string;
}

export class ImageHistoryResponseDto {
  readonly imageID: string;
  readonly history: string[];
}
