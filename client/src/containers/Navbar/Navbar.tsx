import React from 'react';
import { Navbar as LibNavbar, Nav, Icon } from 'rsuite';

import './Navbar.less';

const { Header, Body } = LibNavbar;
const { Item: NavItem } = Nav;

const Navbar: React.FC = () => {

  return (
    <LibNavbar className="main-navbar-container">
      <Header>
        <Nav>
          <NavItem>Docker UI</NavItem>
        </Nav>
      </Header>
      <Body>
        <Nav pullRight>
          <a href="https://github.com/daminort/docker-ui" target="_blank" rel="noopener noreferrer">
            <NavItem icon={<Icon icon="github" />}>Github</NavItem>
          </a>
        </Nav>
      </Body>
    </LibNavbar>
  );
};

export default Navbar;
export { Navbar };
