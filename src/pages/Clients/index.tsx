import React, { useState, useEffect } from 'react';
import { Container, Dimmer, Loader, Segment, Icon, Table, Header, Button } from 'semantic-ui-react';

import { useCustomers } from '../../hooks/customers';

import FormModal from './components/FormModal';
import ForsetiHeader from '../../components/Header';

const Clients: React.FC = () => {
  const { customers, getCustomers } = useCustomers();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getCustomers();
  }, [getCustomers]);

  return (
    <>
      <ForsetiHeader />
      <FormModal open={open} closeModal={() => setOpen(false)} />
      {!customers && (
        <Dimmer active inverted>
          <Loader size="mini">Carregando</Loader>
        </Dimmer>
      )}
      <Container>
        <Segment style={{ padding: '4em 0em' }} vertical>
          <Header as="h2" floated="left">
            Clientes
          </Header>
          <Button floated="right" icon labelPosition="left" primary size="small" onClick={() => setOpen(true)}>
            <Icon name="user" /> Adicionar Cliente
          </Button>
          <Table celled compact definition>
            <Table.Header fullWidth>
              <Table.Row>
                <Table.HeaderCell>Nome</Table.HeaderCell>
                <Table.HeaderCell>Nome Legal</Table.HeaderCell>
                <Table.HeaderCell>Nome no documento</Table.HeaderCell>
                <Table.HeaderCell>E-mail address</Table.HeaderCell>
                <Table.HeaderCell>Telefone</Table.HeaderCell>
                <Table.HeaderCell>Celular</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {customers?.map(customer => (
                <Table.Row>
                  <Table.Cell>{customer.name}</Table.Cell>
                  <Table.Cell>{customer.legal_name}</Table.Cell>
                  <Table.Cell>{customer.document_name}</Table.Cell>
                  <Table.Cell>{customer.email}</Table.Cell>
                  <Table.Cell>{customer.phone}</Table.Cell>
                  <Table.Cell>{customer.mobile}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Segment>
      </Container>
    </>
  );
};

export default Clients;
