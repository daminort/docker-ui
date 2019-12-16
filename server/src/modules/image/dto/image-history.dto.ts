
export class ImageHistoryDto {
  readonly imageID: string;
  readonly created: string;
  readonly command: string;
  readonly size: string;
  readonly comment: string;
}

export class ImageHistoryResponseDto {
  readonly imageID: string;
  readonly history: string[];
}
