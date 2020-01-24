import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { List } from 'rsuite';

import { selectList } from '../../redux/images/selectors';
import { imagesActions } from '../../redux/images/actions';

import './ImagesList.less';

const ImagesList = () => {

  const dispatch = useDispatch();
  const list = useSelector(selectList);

  useEffect(() => {
    dispatch(imagesActions.listReload());
  }, [dispatch]);

  const items = list.map((item, index) => {
    const key = `${item.imageID}/${item.repository}:${item.tag}`;
    const name = (item.repository !== '<none>')
      ? item.repository
      : item.shortID;

    return (
      <List.Item key={key} index={index}>
        {name}
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
