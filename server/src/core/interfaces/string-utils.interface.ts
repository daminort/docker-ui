import { StringTransformTypes } from '../../common/enum/string-transform-types.enum';

export interface ParseTableColumn {
  name: string;
  value: string;
}

export interface ParseTableTransform {
  type: StringTransformTypes,
  columnName: string;
  resultName: string;
}

export interface ParseTableOptions {
  columns: ParseTableColumn[];
  transforms?: ParseTableTransform[];
}

export interface ParseTablePositions {
  [key: string]: number;
}
