import React, { useContext } from 'react';
import {
  Container,
  Header,
  Content,
  Footer as LibFooter,
  Panel,
  PanelGroup,
  Nav,
  Icon,
} from 'rsuite';
import { Resizable as LibResizable } from 're-resizable';

import { ResizableProps, ResizableDefaultProps, ResizableTypes } from './Resizable.interface';

const Resizable: React.FC<ResizableProps> = (props) => {
  const { children, type, defaultSize, minSize, maxSize } = props;
  const defaults = {
    width: type === ResizableTypes.horizontal ? `${defaultSize}%` : '100%',
    height: type === ResizableTypes.vertical ? `${defaultSize}%` : '100%',
  };

  return (
    <div className="resizable-panel-root">
      <LibResizable
        defaultSize={defaultLeftSize}
        minWidth={`${leftMin}%`}
        maxWidth={`${leftMax}%`}
      >
        <div className="left">
          {left}
        </div>
      </LibResizable>
      <div className="right">
        {right}
      </div>
    </div>
  );
};

Resizable.defaultProps = {
  leftDefault: 25,
  leftMin: 5,
  leftMax: 95,
};

export default Resizable;
export { Resizable };
