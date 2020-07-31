import React from 'react';
import { Container, Header, Button } from 'semantic-ui-react';

import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  return (
    <Container>
      <Header>Bem vindo {user.name}</Header>
      <Button onClick={signOut}>Sair</Button>
    </Container>
  );
};

export default Dashboard;
