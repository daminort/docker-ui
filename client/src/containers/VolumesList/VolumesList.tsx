import React, { useCallback, useEffect } from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { List } from 'rsuite';

import { selectList } from '../../redux/volumes/selectors';
import { selectActiveVolumeID } from '../../redux/app/selectors';
import { volumesActions } from '../../redux/volumes/actions';

import './VolumesList.less';

const VolumesList = () => {

  const dispatch = useDispatch();
  const list = useSelector(selectList);
  const activeID = useSelector(selectActiveVolumeID);

  useEffect(() => {
    dispatch(volumesActions.listReload());
  }, [dispatch]);

  const onClick = useCallback((id) => {
    dispatch(volumesActions.itemSelect(id));
  }, [dispatch]);

  const items = list.map((item, index) => {
    const { volumeName } = item;
    const className = cn('list-item', {
      selected: volumeName === activeID,
    });

    return (
      <List.Item
        key={volumeName}
        index={index}
        className={className}
      >
        <div
          className="volume-row"
          onClick={() => onClick(volumeName)}
        >
          {item.shortName}
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

export default VolumesList;
export { VolumesList };
