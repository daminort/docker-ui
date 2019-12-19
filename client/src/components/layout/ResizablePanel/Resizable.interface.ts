import React from 'react';

export enum ResizableTypes {
  horizontal = 'horizontal',
  vertical = 'vertical',
}

export type ResizableType = ResizableTypes.horizontal | ResizableTypes.vertical;

export interface ResizableProps {
  children: React.ReactNode[],
  type?: ResizableType,
  defaultSize?: number,  // in percents
  minSize?: number,  // in percents
  maxSize?: number,  // in percents
}

export const ResizableDefaultProps = {
  type: ResizableTypes.horizontal,
  defaultSize: 25,
  minSize: 5,
  maxSize: 95,
}
