import React, { useCallback, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Form, Grid, Header, Image, Message, Segment, Container } from 'semantic-ui-react';

import { useAuth } from '../../hooks/auth';

import logoImg from '../../assets/logo.png';

interface SignUpForData {
  name: string;
  email: string;
  password: string;
}

export const SignUp: React.FC = () => {
  const history = useHistory();
  const { signUp } = useAuth();
  const [formData, setFormData] = useState<SignUpForData>({} as SignUpForData);

  const handleChange = useCallback(
    (e, { name, value }) => {
      setFormData({ ...formData, [name]: value });
    },
    [formData],
  );

  const handleSignUp = useCallback(async () => {
    await signUp({ name: formData.name, email: formData.email, password: formData.password });
    history.push('/signin');
  }, [formData, history, signUp]);

  return (
    <Container>
      <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="left">
            <Image src={logoImg} />
            Cria sua conta
          </Header>
          <Form size="large" onSubmit={handleSignUp}>
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Nome"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <Form.Input
                fluid
                icon="address book"
                iconPosition="left"
                placeholder="E-mail"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Senha"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />

              <Button type="submit" color="teal" fluid size="large">
                Criar Conta
              </Button>
            </Segment>
          </Form>
          <Message>
            <Link to="/signin">Voltar ao Sign In</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </Container>
  );
};
