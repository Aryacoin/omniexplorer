/**
 *
 * Header
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { routeActions } from 'redux-simple-router';
import styled from 'styled-components';

import {
  Col,
  Collapse,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarToggler,
  NavItem,
  NavLink,
  Row,
  UncontrolledDropdown,
} from 'reactstrap';

import SearchBox from 'components/SearchBox';

import './header.scss';

const IMG = styled.img`
  padding-bottom: 3px;
  padding-right: 9px;
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
    e.preventDefault();
  }

  render() {
    return (
      <Navbar color="faded" light expand="md">
        <Container className="d-block">
          <Row className="clearfix">
            <Col>
              <Link
                to="/"
                onClick={() => this.props.changeRoute('/')}
                className="navbar-brand"
              >
                <IMG src="/favicon.png" alt="OMNIEXPLORER.INFO" />
                  OMNIEXPLORER.INFO
              </Link>
            </Col>
            <Col>
              <SearchBox />
            </Col>
          </Row>
          <Row className="clearfix">
            <Col xs="12">
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink href="/">Home</NavLink>
                  </NavItem>
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      Exchange
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>
                        <NavLink href="/">Bitcoin / OMNI  (data coming soon)</NavLink>
                      </DropdownItem>
                      <DropdownItem>
                        <NavLink href="/">Smart Properties (data coming soon)</NavLink>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
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
                      <DropdownItem>
                        <NavLink href="/">Active Crowdsales</NavLink>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      Usage Graphs
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>
                        <NavLink href="/">Coming soon</NavLink>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      Misc
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>
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
              </Collapse>
            </Col>
          </Row>
        </Container>
      </Navbar>
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
