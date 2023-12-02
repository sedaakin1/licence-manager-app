import React from 'react';
import styled from 'styled-components';


const Navbar = styled.div`
  background: #676D72;
  color: white;
  padding: 60px 0;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const NavbarTitle = styled.h1`
  font-size: 35px;
  margin: 0;
  padding: 0;
  color: #42b983;
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const NavbarMenu = styled.div`
  display: flex;
  gap: 20px;
  margin: 0;
  position: absolute;
  right: 20px;
  bottom: 20px;
`;

const NavbarMenuItem = styled.div`
  font-size: 16px;
  cursor: pointer;
  &:hover {
    color: #42b983;
  }
`;

const NavbarMenuItemActive = styled.div`
font-size: 16px;
cursor: pointer;
color: green;
&:hover {
  color: #42b983;
}
`;

const Header = ({title}) => {
  return (
    <Navbar>
          <NavbarTitle>LICENSE MANAGER APP</NavbarTitle>
          <NavbarMenu>
          {
            title=="MÜŞTERİ TANIMLAMA" ? 
            <NavbarMenuItemActive>MÜŞTERİLER</NavbarMenuItemActive>
            :
            <NavbarMenuItem>MÜŞTERİLER</NavbarMenuItem>
          }
          {
            title=="LİSANS TANIMLAMA" ? 
            <NavbarMenuItemActive>LİSANSLAR</NavbarMenuItemActive>
            :
            <NavbarMenuItem>LİSANSLAR</NavbarMenuItem>
          }
    
          </NavbarMenu>
    </Navbar>
  );
};

export default Header;