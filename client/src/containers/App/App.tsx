import React from 'react';
import {
  Container,
  Header,
  Content,
  Footer as LibFooter,
  Panel,
  PanelGroup,
  Nav,
  Icon,
} from 'rsuite';
import { Resizable } from 're-resizable';

import { Navbar } from '../Navbar';
import { Footer } from '../Footer';

import './App.less';

const { Item: NavItem } = Nav;

const defaultLeftSize = {
  width: '25%',
  height: '100%',
};

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

        <div className="resizable">
          <Resizable
            defaultSize={defaultLeftSize}
            maxWidth="100%"
            minWidth="1"
          >
            <div className="left">
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
            </div>
          </Resizable>
          <div className="right">
            <Nav>
              <NavItem eventKey="stats" icon={icons.stats}>stats</NavItem>
              <NavItem eventKey="logs" icon={icons.logs}>logs</NavItem>
              <NavItem eventKey="info" icon={icons.info}>info</NavItem>
              <NavItem eventKey="raw" icon={icons.raw}>raw</NavItem>
            </Nav>
          </div>
        </div>
      </Content>
      <LibFooter className="main-footer">
        <Footer />
      </LibFooter>
    </Container>
  );
};

export default App;
export { App };
