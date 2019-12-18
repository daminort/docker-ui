import React from 'react';
import { Navbar as LibNavbar, Nav } from 'rsuite';

import './Footer.less';

const { Header, Body } = LibNavbar;
const { Item: NavItem } = Nav;

const Footer: React.FC = () => {

  return (
    <LibNavbar className="main-footer-container">
      <Header>
        <Nav>
          <NavItem>(c) 2019, Daminort</NavItem>
        </Nav>
      </Header>
    </LibNavbar>
  );
};

export default Footer;
export { Footer };
