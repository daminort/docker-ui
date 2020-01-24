import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Panel, PanelGroup } from 'rsuite';

import { selectCount as selectContainersCount } from '../../redux/containers/selectors';
import { selectCount as selectImagesCount } from '../../redux/images/selectors';
import { selectCount as selectVolumesCount } from '../../redux/volumes/selectors';

import { PanelHeader } from '../../components/ui/PanelHeader';

import { ContainersList } from '../ContainersList';
import { ImagesList } from '../ImagesList';
import { VolumesList } from '../VolumesList';

const Sidebar: React.FC = () => {

  const [activeKey, setActiveKey] = useState('containers');

  const containersCount = useSelector(selectContainersCount);
  const imagesCount = useSelector(selectImagesCount);
  const volumesCount = useSelector(selectVolumesCount);

  const onSelect = useCallback((eventKey) => {
    setActiveKey(eventKey);
  }, [setActiveKey]);

  const headers = {
    containers: <PanelHeader showBadge title="Containers" count={containersCount} />,
    images: <PanelHeader showBadge title="Images" count={imagesCount} />,
    volumes: <PanelHeader showBadge title="Volumes" count={volumesCount} />,
  };

  return (
    <PanelGroup accordion activeKey={activeKey} onSelect={onSelect}>
      <Panel header={headers.containers} eventKey="containers">
        <ContainersList />
      </Panel>
      <Panel header={headers.images} eventKey="images">
        <ImagesList />
      </Panel>
      <Panel header={headers.volumes} eventKey="volumes">
        <VolumesList />
      </Panel>
    </PanelGroup>
  );
};

export default Sidebar;
export { Sidebar };
