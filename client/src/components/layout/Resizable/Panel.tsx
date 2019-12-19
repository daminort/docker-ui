import React, { useContext } from 'react';
import cn from 'classnames';
import { Resizable as LibResizable } from 're-resizable';

import { Context } from './context';
import {
  ResizablePanelProps,
  ResizablePanelDefaultProps,
  ResizableTypesEnum,
  ResizableContext,
} from './Resizable.interface';
import './Resizable.less';

const Panel: React.FC<ResizablePanelProps> = (props) => {
  const { resizable, children } = props;
  const { type, defaultSize, minSize, maxSize } = useContext<ResizableContext>(Context);

  const className = cn({
    'resizable-panel-active': resizable,
    'resizable-panel-inactive': !resizable,
  });

  if (!resizable) {
    return (
      <div className={className}>
        {children}
      </div>
    );
  }

  const defaults = {
    width: type === ResizableTypesEnum.horizontal ? `${defaultSize}%` : '100%',
    height: type === ResizableTypesEnum.vertical ? `${defaultSize}%` : '100%',
  };

  return (
    <LibResizable
      defaultSize={defaults}
      minWidth={`${minSize}%`}
      maxWidth={`${maxSize}%`}
    >
      <div className={className}>
        {children}
      </div>
    </LibResizable>
  );
};

Panel.defaultProps = ResizablePanelDefaultProps;

export default Panel;
export { Panel };
