import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { List } from 'rsuite';

import { selectList } from '../../redux/containers/selectors';
import { containersActions } from '../../redux/containers/actions';

import { StatusIndicator } from '../../components/ui/StatusIndicator';

import './ContainersList.less';

const ContainersList = () => {

  const dispatch = useDispatch();
  const list = useSelector(selectList);

  useEffect(() => {
    dispatch(containersActions.listReload());
  }, [dispatch]);

  const items = list.map((item, index) => {
    return (
      <List.Item key={item.containerID} index={index}>
        <div className="container-row">
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
