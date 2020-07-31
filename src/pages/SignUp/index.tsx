import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Grid, Header, Image, Message, Segment, Container } from 'semantic-ui-react';

import logoImg from '../../assets/logo.png';

interface SignUpForData {
  email: string;
  password: string;
}

export const SignUp: React.FC = () => {
  const [formData, setFormData] = useState<SignUpForData>({} as SignUpForData);

  const handleChange = useCallback(
    (e, { name, value }) => {
      setFormData({ ...formData, [name]: value });
    },
    [formData],
  );

  const handleSignUp = useCallback(() => {
    console.log({ formData });
  }, [formData]);

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
