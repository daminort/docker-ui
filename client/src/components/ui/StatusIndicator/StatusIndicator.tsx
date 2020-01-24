import React from 'react';
import cn from 'classnames';

import './StatusIndicator.less';

type Props = {
  status: string,
  size?: number,
  pointSize?: number,
};

const StatusIndicator: React.FC<Props> = (props) => {
  const { status, size, pointSize } = props;

  const className = cn('point', {
    running: /^Up/.test(status),
    exited: /^Exited \(0\)/.test(status),
    error: /^Exited \([1-9]+\)/.test(status),
  });

  const boxStyle = {
    width: size,
    height: size,
  };

  const pointStyle = {
    width: pointSize,
    height: pointSize,
  };

  return (
    <div className="status-indicator" style={boxStyle}>
      <div className={className} style={pointStyle} />
    </div>
  );
};

StatusIndicator.defaultProps = {
  size: 16,
  pointSize: 6,
};

export default StatusIndicator;
export { StatusIndicator };
