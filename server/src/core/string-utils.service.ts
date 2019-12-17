import * as stripColor from 'strip-color';
import { Injectable } from '@nestjs/common';

import { ParseTableOptions, ParseTablePositions } from './interfaces/string-utils.interface';

@Injectable()
export class StringUtilsService {

  determinePositions(line: string, options: ParseTableOptions): ParseTablePositions {
    if (!line || line.trim() === '') {
      return null;
    }

    return options.columns.reduce((res, col) => {
      res[col.name] = line.indexOf(col.value);
      return res;
    }, {} as ParseTablePositions);
  }

  async parseTable<T>(input: string, options: ParseTableOptions): Promise<T[]> {

    const result = [];
    const strippedInput = stripColor(input);
    const lines = strippedInput.split('\n');
    const pos = this.determinePositions(lines[0], options);
    if (!pos) {
      return Promise.resolve([]);
    }

    lines.forEach((line, index) => {
      if (index === 0 || line.trim() === '') {
        return;
      }

      const row = {} as T;
      let prevPos = 0;
      options.columns.forEach((col, colIndex) => {
        const { name } = col;
        const nextCol = options.columns[colIndex + 1];
        const nextPos = nextCol ? pos[nextCol.name] : undefined;

        row[name] = line.slice(prevPos, nextPos).trim();
        prevPos = nextPos;
      });

      result.push(row);
    });

    return Promise.resolve(result);
  }
}
