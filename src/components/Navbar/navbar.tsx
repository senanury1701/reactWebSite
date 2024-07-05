import React, { useState } from 'react';
import { 
  Navbar,
  NavbarBrand,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../../features/auth/authSelectors.ts';

function MyNavbar(props) {
  const [isOpen, setIsOpen] = useState(false);
  const isAuthenticated = useSelector(selectIsAuthenticated)
  
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar {...props}>
        <NavbarBrand href="/">MyWebsite</NavbarBrand>
        <div className='d-flex mx-5'>
          { !isAuthenticated &&
            <NavLink className='mx-2' href="Auth">Login</NavLink>
          }
          
          { isAuthenticated && 
            <div className="d-flex">
              <UncontrolledDropdown isOpen={isOpen} toggle={toggle}>
                <DropdownToggle caret className="rounded-circle bg-transparent"></DropdownToggle>
                <DropdownMenu>
                  <DropdownItem href='/profile'> Profile</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Foo Action</DropdownItem>
                  <DropdownItem>Bar Action</DropdownItem>
                  <DropdownItem>Logout</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          }
          
        </div>

      </Navbar>
    </div>
  );
}

export default MyNavbar;
