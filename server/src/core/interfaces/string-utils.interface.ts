
export interface ParseTableColumn {
  name: string,
  value: string,
}

export interface ParseTableOptions {
  columns: ParseTableColumn[];
}

export interface ParseTablePositions {
  [key: string]: number,
}
