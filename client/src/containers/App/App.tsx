import React, { useEffect } from 'react';
import { Container, Content, Footer as LibFooter, Header, Icon, Nav, Panel, PanelGroup } from 'rsuite';
import { useDispatch } from 'react-redux';

import { containersActions } from '../../redux/containers/actions';

import { Resizable, Panel as ResizablePanel } from '../../components/layout/Resizable';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { ResizableTypesEnum } from '../../components/layout/Resizable/Resizable.types';

import './App.less';

const { Item: NavItem } = Nav;

const icons = {
  stats: <Icon icon="bar-chart" />,
  logs: <Icon icon="file-text-o" />,
  info: <Icon icon="info" />,
  raw: <Icon icon="gear-circle" />,
};

const App: React.FC = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(containersActions.listReload());
  }, [dispatch]);

  return (
    <Container className="main-root">
      <Header className="main-navbar">
        <Navbar />
      </Header>
      <Content className="main-content">
        <Resizable type={ResizableTypesEnum.horizontal}>
          <ResizablePanel resizable>
            <PanelGroup accordion>
              <Panel header="Containers" defaultExpanded>
                Some containers...
              </Panel>
              <Panel header="Images">
                Some images...
              </Panel>
              <Panel header="Volumes">
                Some volumes...
              </Panel>
            </PanelGroup>
          </ResizablePanel>
          <ResizablePanel>
            <Nav>
              <NavItem eventKey="stats" icon={icons.stats}>Stats</NavItem>
              <NavItem eventKey="logs" icon={icons.logs}>Logs</NavItem>
              <NavItem eventKey="info" icon={icons.info}>Info</NavItem>
              <NavItem eventKey="raw" icon={icons.raw}>Raw</NavItem>
            </Nav>
          </ResizablePanel>
        </Resizable>
      </Content>
      <LibFooter className="main-footer">
        <Footer />
      </LibFooter>
    </Container>
  );
};

export default App;
export { App };
