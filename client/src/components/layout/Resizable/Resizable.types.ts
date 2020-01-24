import { ReactNode } from 'react';

export enum ResizableTypesEnum {
  horizontal = 'horizontal',
  vertical = 'vertical',
}

export type ResizableType = ResizableTypesEnum.horizontal | ResizableTypesEnum.vertical;

export interface ResizableContext {
  type?: ResizableType,
  defaultSize?: number,  // in percents
  minSize?: number,  // in percents
  maxSize?: number,  // in percents
}

export interface ResizableProps extends ResizableContext {
  children: ReactNode | ReactNode[],
}

export const ResizableDefaultProps = {
  type: ResizableTypesEnum.horizontal,
  defaultSize: 25,
  minSize: 5,
  maxSize: 95,
};

export interface ResizablePanelProps {
  resizable?: boolean,
  children: ReactNode,
}

export const ResizablePanelDefaultProps = {
  resizable: false,
};
