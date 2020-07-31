import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Grid, Header, Image, Message, Segment, Container } from 'semantic-ui-react';

import logoImg from '../../assets/logo.png';

interface SignInForData {
  email: string;
  password: string;
}

export const SignIn: React.FC = () => {
  const [formData, setFormData] = useState<SignInForData>({} as SignInForData);

  const handleChange = useCallback(
    (e, { name, value }) => {
      setFormData({ ...formData, [name]: value });
    },
    [formData],
  );

  const handleSignIn = useCallback(() => {
    console.log({ formData });
  }, [formData]);

  return (
    <Container>
      <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="left">
            <Image src={logoImg} />
            Entre com sua conta
          </Header>
          <Form size="large" onSubmit={handleSignIn}>
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                name="email"
                placeholder="E-mail"
                value={formData.email}
                onChange={handleChange}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                name="password"
                placeholder="Senha"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />

              <Button type="submit" color="teal" fluid size="large">
                Entrar
              </Button>
            </Segment>
          </Form>
          <Message>
            <span>Não possui cadastro? </span>
            <Link to="/signup">Criar conta</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </Container>
  );
};
