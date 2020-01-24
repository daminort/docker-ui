import React from 'react';
import cn from 'classnames';
import { Badge } from 'rsuite';

import './PanelHeader.less';

type Props = {
  title: string,
  showBadge?: boolean,
  count?: number | string,
  className?: string,
};

const PanelHeader: React.FC<Props> = (props) => {
  const { title, showBadge, count, className } = props;
  const resultClassName = cn('panel-header', className);

  if (!showBadge) {
    return (
      <div className={resultClassName}>
        {title}
      </div>
    );
  }

  return (
    <div className={resultClassName}>
      <Badge content={count}>
        {title}
      </Badge>
    </div>
  );
};

PanelHeader.defaultProps = {
  showBadge: false,
  count: 0,
  className: '',
};

export { PanelHeader };
