import React from 'react';
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

  const containersCount = useSelector(selectContainersCount);
  const imagesCount = useSelector(selectImagesCount);
  const volumesCount = useSelector(selectVolumesCount);

  const headers = {
    containers: <PanelHeader showBadge title="Containers" count={containersCount} />,
    images: <PanelHeader showBadge title="Images" count={imagesCount} />,
    volumes: <PanelHeader showBadge title="Volumes" count={volumesCount} />,
  };

  return (
    <PanelGroup accordion>
      <Panel header={headers.containers} defaultExpanded>
        <ContainersList />
      </Panel>
      <Panel header={headers.images}>
        <ImagesList />
      </Panel>
      <Panel header={headers.volumes}>
        <VolumesList />
      </Panel>
    </PanelGroup>
  );
};

export default Sidebar;
export { Sidebar };
