import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';


class TopNav extends Component {
  render() {
    const { category } = this.props;
    return (
      <div>
         <Navbar inverse collapseOnSelect>
            <Navbar.Collapse>
              <Nav>
                <NavItem eventKey={1} href="#">
                  <Link to="/">Home</Link>
                </NavItem>
                <NavDropdown eventKey={3} title="Category" id="basic-nav-dropdown">
                {category && category.map((cat, key) =>
                  <MenuItem eventKey={key}> <Link to={`/category/${cat.id}`}>{cat.name}</Link></MenuItem>
                )}
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
        </Navbar>
      </div>
        );
      }
    }

    TopNav.propTypes = {
          category: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };
  
export default TopNav;



        
       