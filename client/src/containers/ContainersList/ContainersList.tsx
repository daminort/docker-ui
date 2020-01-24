import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { List } from 'rsuite';

import { selectList } from '../../redux/containers/selectors';
import { containersActions } from '../../redux/containers/actions';

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
        {item.name || item.containerID}
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
