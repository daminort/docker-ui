import React from 'react';
import { Container, Header, Content, Footer, Sidebar } from 'rsuite';

import './App.less';

const App: React.FC = () => {
  return (
    <Container className="root">
      <Sidebar>Sidebar</Sidebar>
      <Container>
        <Header>Header</Header>
        <Content>Content</Content>
        <Footer>Footer</Footer>
      </Container>
    </Container>
  );
};

export default App;
export { App };
