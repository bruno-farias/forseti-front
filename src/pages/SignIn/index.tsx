import React, { useCallback, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Form, Grid, Header, Image, Message, Segment, Container } from 'semantic-ui-react';

import { useAuth } from '../../hooks/auth';

import logoImg from '../../assets/logo.png';
import { useToast } from '../../hooks/toast';

interface SignInForData {
  email: string;
  password: string;
}

export const SignIn: React.FC = () => {
  const history = useHistory();
  const { addToast } = useToast();
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<SignInForData>({} as SignInForData);

  const handleChange = useCallback(
    (e, { name, value }) => {
      setFormData({ ...formData, [name]: value });
    },
    [formData],
  );

  const handleSignIn = useCallback(async () => {
    setLoading(true);
    try {
      await signIn({ email: formData.email, password: formData.password });

      history.push('/');
    } catch {
      addToast({
        type: 'error',
        title: 'Erro na autenticação',
        description: 'Ocorreu um erro ao fazer login, cheque as credenciais',
      });
    } finally {
      setLoading(false);
    }
  }, [formData, history, addToast, signIn]);

  return (
    <Container>
      <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="left">
            <Image src={logoImg} />
            Entre com sua conta
          </Header>
          <Form size="large" onSubmit={handleSignIn}>
            <Segment>
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

              <Button loading={loading} disabled={loading} type="submit" color="teal" fluid size="large">
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
