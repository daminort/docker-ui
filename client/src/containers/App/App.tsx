import React from 'react';
import { Container, Content, Footer as LibFooter, Header, Icon, Nav, Panel, PanelGroup } from 'rsuite';

import { Resizable, Panel as ResizablePanel } from '../../components/layout/Resizable';
import { Navbar } from '../Navbar';
import { Footer } from '../Footer';

import './App.less';
import { ResizableTypesEnum } from '../../components/layout/Resizable/Resizable.interface';

const { Item: NavItem } = Nav;

const icons = {
  stats: <Icon icon="bar-chart" />,
  logs: <Icon icon="file-text-o" />,
  info: <Icon icon="info" />,
  raw: <Icon icon="gear-circle" />,
};

const App: React.FC = () => {
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
