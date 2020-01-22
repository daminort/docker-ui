import React from 'react';

import { ResizableProps, ResizableDefaultProps } from './Resizable.types';
import { Provider } from './context';
import './Resizable.less';

const Resizable: React.FC<ResizableProps> = (props) => {
  const { children, type, defaultSize, minSize, maxSize } = props;
  const context = {
    type,
    defaultSize,
    minSize,
    maxSize,
  };

  return (
    <Provider value={context}>
      <div className="resizable-root">
        {children}
      </div>
    </Provider>
  );
};

Resizable.defaultProps = ResizableDefaultProps;

export default Resizable;
export { Resizable };
