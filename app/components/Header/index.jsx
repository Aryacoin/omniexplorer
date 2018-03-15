/**
 *
 * Header
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { routeActions } from 'redux-simple-router';
import styled from 'styled-components';
import SearchBox from 'components/SearchBox';

import {
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  UncontrolledTooltip
} from 'reactstrap';

const IMG = styled.img`
  padding-bottom: 3px;
  padding-right: 9px;
`;

const StyledNavItem = styled(NavItem)`
	font-size: 16px;
`;

const StyledCollapse = styled(Collapse)`
  font-size: 16px;
`;

class Header extends React.PureComponent {
  constructor(props) {
    super(props);
    
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }
  
  toggle(e) {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  
  render() {
    return (
      <div>
        <Navbar color="faded" light expand="sm" className="d-block">
          <div className="d-flex">
            <NavbarBrand href="/">
              <IMG src="/favicon.png" alt="OMNIEXPLORER.INFO"/>
              OMNIEXPLORER.INFO
            </NavbarBrand>
            <div className="ml-auto w-50 d-flex">
              <div className="w-100 ml-auto">
                <SearchBox />
              </div>
              <NavbarToggler onClick={this.toggle} />
            </div>
          </div>
          <div className="d-flex">
            <StyledCollapse isOpen={this.state.isOpen} navbar>
              <Nav navbar className="ml-auto">
                <StyledNavItem>
                  <NavLink href="/">Home</NavLink>
                </StyledNavItem>
                <StyledNavItem>
                  <NavLink href="#" id="cs1">Exchange</NavLink>
                  <UncontrolledTooltip placement="top" target="cs1">
                    Coming Soon.
                  </UncontrolledTooltip>
                </StyledNavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    API
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      <NavLink href="https://api.omniexplorer.info">Documentation</NavLink>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Smart Property
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      <NavLink href="/search/1">Property List (Main Eco)</NavLink>
                    </DropdownItem>
                    <DropdownItem>
                      <NavLink href="/search/2">Property List (Test Eco)</NavLink>
                    </DropdownItem>
                    <DropdownItem header>
                      <NavLink href="/">Active Crowdsales (Coming Soon)</NavLink>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <StyledNavItem>
                  <NavLink href="#" id="cs2">Usage Graphs</NavLink>
                  <UncontrolledTooltip placement="top" target="cs2">
                    Coming Soon.
                  </UncontrolledTooltip>
                </StyledNavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Misc
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem header>
                      <NavLink href="/">Feature Activations (Coming Soon)</NavLink>
                    </DropdownItem>
                    <DropdownItem>
                      <NavLink href="http://www.omnilayer.org/#GetStarted">Wallets</NavLink>
                    </DropdownItem>
                    <DropdownItem>
                      <NavLink href="https://github.com/OmniLayer/omniexplorer/wiki/OmniExplorer-FAQ">Help/FAQ</NavLink>
                    </DropdownItem>
                    <DropdownItem>
                      <NavLink href="https://github.com/OmniLayer/omniexplorer/issues">Report Bug</NavLink>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </StyledCollapse>
          </div>
        </Navbar>
      </div>
    );
  }
}

Navbar.propTypes = {
  light: PropTypes.bool,
  dark: PropTypes.bool,
  fixed: PropTypes.string,
  color: PropTypes.string,
  role: PropTypes.string,
  expand: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};

NavbarToggler.propTypes = {
  type: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};


function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(routeActions.push(url)),
    dispatch,
  };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(
  withConnect,
)(Header);
