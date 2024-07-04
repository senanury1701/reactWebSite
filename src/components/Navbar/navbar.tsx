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

function MyNavbar(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar {...props}>
        <NavbarBrand href="/">MyWebsite</NavbarBrand>
        <div className='d-flex mx-5'>
          <NavLink className='mx-2' href="Auth">Login</NavLink>
          
          <div className="d-flex">
            <UncontrolledDropdown isOpen={isOpen} toggle={toggle}>
              <DropdownToggle caret className="rounded-circle bg-transparent"></DropdownToggle>
              <DropdownMenu>
                <DropdownItem >Profile</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Foo Action</DropdownItem>
                <DropdownItem>Bar Action</DropdownItem>
                <DropdownItem>Logout</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </div>

      </Navbar>
    </div>
  );
}

export default MyNavbar;
