import { createContext } from 'react';
import { ResizableTypesEnum, ResizableContext } from './Resizable.types';

const defaultContext: ResizableContext = {
  type: ResizableTypesEnum.horizontal,
  defaultSize: 25,
  minSize: 5,
  maxSize: 95,
};

const Context = createContext(defaultContext);
const { Provider, Consumer } = Context;

export {
  Context,
  Provider,
  Consumer,
};
