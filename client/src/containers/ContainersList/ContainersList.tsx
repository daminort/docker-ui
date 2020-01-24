import React, { useCallback, useEffect } from 'react';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { List } from 'rsuite';

import { selectList } from '../../redux/containers/selectors';
import { selectActiveContainerID } from '../../redux/app/selectors';
import { containersActions } from '../../redux/containers/actions';

import { StatusIndicator } from '../../components/ui/StatusIndicator';

import './ContainersList.less';

const ContainersList = () => {

  const dispatch = useDispatch();
  const list = useSelector(selectList);
  const activeID = useSelector(selectActiveContainerID);

  useEffect(() => {
    dispatch(containersActions.listReload());
  }, [dispatch]);

  const onClick = useCallback((id) => {
    dispatch(containersActions.itemSelect(id));
  }, [dispatch]);

  const items = list.map((item, index) => {
    const { containerID } = item;
    const className = cn('list-item', {
      selected: containerID === activeID,
    });

    return (
      <List.Item
        key={containerID}
        index={index}
        className={className}
      >
        <div
          className="container-row"
          onClick={() => onClick(containerID)}
        >
          <StatusIndicator status={item.status} />
          <div className="name">{item.name || item.shortID}</div>
          <div className="size">{item.size}</div>
        </div>
      </List.Item>
    );
  });

  return (
    <List size="sm" className="list">
      {items}
    </List>
  );
};

export default ContainersList;
export { ContainersList };
