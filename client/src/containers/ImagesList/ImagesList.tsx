import React, { useCallback, useEffect } from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { List } from 'rsuite';

import { selectList } from '../../redux/images/selectors';
import { selectActiveImageID } from '../../redux/app/selectors';
import { imagesActions } from '../../redux/images/actions';

import './ImagesList.less';

const ImagesList = () => {

  const dispatch = useDispatch();
  const list = useSelector(selectList);
  const activeID = useSelector(selectActiveImageID);

  useEffect(() => {
    dispatch(imagesActions.listReload());
  }, [dispatch]);

  const onClick = useCallback((id) => {
    dispatch(imagesActions.itemSelect(id));
  }, [dispatch]);

  const items = list.map((item, index) => {
    const { imageID, repository, tag, shortID } = item;
    const key = `${imageID}/${repository}:${tag}`;
    const name = (repository !== '<none>') ? repository : shortID;
    const className = cn('list-item', {
      selected: imageID === activeID,
    });

    return (
      <List.Item
        key={key}
        index={index}
        className={className}
      >
        <div
          className="image-row"
          onClick={() => onClick(imageID)}
        >
          {name}
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

export default ImagesList;
export { ImagesList };
