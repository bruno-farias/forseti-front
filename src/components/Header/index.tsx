import React from 'react';
import { Container, Menu, Image, Dropdown } from 'semantic-ui-react';

import logoImg from '../../assets/logo.png';
import { useAuth } from '../../hooks/auth';

const Header: React.FC = () => {
  const { user, signOut } = useAuth();
  return (
    <Menu pointing secondary size="large">
      <Container>
        <Menu.Item>
          <Image size="mini" src={logoImg} />
        </Menu.Item>
        <Menu.Item as="a" active>
          Clientes
        </Menu.Item>
        <Menu.Item as="a">Processos</Menu.Item>
        <Menu.Menu position="right">
          <Dropdown text={user.name} pointing className="link item">
            <Dropdown.Menu>
              <Dropdown.Item onClick={signOut}>Sair</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Container>
    </Menu>
  );
};

export default Header;
