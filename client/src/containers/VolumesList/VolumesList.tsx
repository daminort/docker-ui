import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { List } from 'rsuite';

import { selectList } from '../../redux/volumes/selectors';
import { volumesActions } from '../../redux/volumes/actions';

import './VolumesList.less';

const VolumesList = () => {

  const dispatch = useDispatch();
  const list = useSelector(selectList);

  useEffect(() => {
    dispatch(volumesActions.listReload());
  }, [dispatch]);

  const items = list.map((item, index) => {
    return (
      <List.Item key={item.volumeName} index={index}>
        {item.volumeName}
      </List.Item>
    );
  });

  return (
    <List size="sm" className="list">
      {items}
    </List>
  );
};

export default VolumesList;
export { VolumesList };
