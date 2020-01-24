import * as stripColor from 'strip-color';
import { Injectable } from '@nestjs/common';
import { isArray } from 'lodash';

import { StringTransformTypes } from '../common/enum/string-transform-types.enum';
import { ParseTableOptions, ParseTablePositions } from './interfaces/string-utils.interface';

const idPrefix = 'sha256:';
const idLength = 64;
const shortLength = 12;

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

  createShortID(id = ''): string {
    let shortID = id.replace(idPrefix, '');
    if (shortID.length >= idLength) {
      shortID = shortID.slice(0, shortLength);
    }

    return shortID;
  }

  async parseTable<T>(input: string, options: ParseTableOptions): Promise<T[]> {

    const result = [];
    const strippedInput = stripColor(input);
    const lines = strippedInput.split('\n');
    const pos = this.determinePositions(lines[0], options);
    if (!pos) {
      return Promise.resolve([]);
    }

    const { transforms } = options;
    const useTransforms = isArray(transforms);

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

      if (useTransforms) {
        transforms.forEach(sh => {
          const { type, columnName, resultName } = sh;
          const value = row[columnName];
          switch (type) {
            case StringTransformTypes.shortID: {
              row[resultName] = this.createShortID(value);
              break;
            }
            default: {
              row[resultName] = value;
            }
          }
        })
      }

      result.push(row);
    });

    return Promise.resolve(result);
  }
}
