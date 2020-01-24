import React from 'react';
import { Container, Content, Footer as LibFooter, Header, Icon, Nav } from 'rsuite';

import { Resizable, Panel } from '../../components/layout/Resizable';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { ResizableTypesEnum } from '../../components/layout/Resizable/Resizable.types';

import { Sidebar } from '../Sidebar/Sidebar';

import './App.less';

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
          <Panel resizable>
            <Sidebar />
          </Panel>
          <Panel>
            <Nav>
              <NavItem eventKey="stats" icon={icons.stats}>Stats</NavItem>
              <NavItem eventKey="logs" icon={icons.logs}>Logs</NavItem>
              <NavItem eventKey="info" icon={icons.info}>Info</NavItem>
              <NavItem eventKey="raw" icon={icons.raw}>Raw</NavItem>
            </Nav>
          </Panel>
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
