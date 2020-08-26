import React, { useState, useEffect, useCallback } from 'react';
import { Container, Dimmer, Loader, Segment, Icon, Table, Header, Button, Popup } from 'semantic-ui-react';

import { useCustomers, Customer } from '../../hooks/customers';

import FormModal from './components/FormModal';
import ForsetiHeader from '../../components/Header';
import { useToast } from '../../hooks/toast';

const Clients: React.FC = () => {
  const { addToast } = useToast();
  const { customers, getCustomers, remove } = useCustomers();

  const [loading, setLoading] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | undefined>(undefined);

  useEffect(() => {
    getCustomers();
  }, [getCustomers]);

  const handleEditCustomer = useCallback((customer: Customer) => {
    setSelectedCustomer(customer);
  }, []);

  const handleRemoveCustomer = useCallback(
    async (customer: Customer) => {
      setLoading(true);
      try {
        await remove(customer.id);
      } catch {
        addToast({
          type: 'error',
          title: 'Erro cadastrando cliente',
          description: 'Ocorreu um erro ao cadastrar o cliente, cheque os dados de cadastro',
        });
      } finally {
        setPopupOpen(false);
        setLoading(false);
      }
    },
    [setPopupOpen, remove, addToast, setLoading],
  );

  const handleClosePopup = useCallback(() => {
    if (!loading) {
      setPopupOpen(false);
    }
  }, [loading]);

  return (
    <>
      <ForsetiHeader />
      <FormModal open={formModalOpen} closeModal={() => setFormModalOpen(false)} />
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
          <Button
            floated="right"
            icon
            labelPosition="left"
            color="teal"
            size="small"
            onClick={() => setFormModalOpen(true)}
          >
            <Icon name="user" /> Adicionar Cliente
          </Button>
          <Table celled compact definition>
            <Table.Header fullWidth>
              <Table.Row>
                <Table.HeaderCell>Nome</Table.HeaderCell>
                <Table.HeaderCell>Nome Legal</Table.HeaderCell>
                <Table.HeaderCell>Documento</Table.HeaderCell>
                <Table.HeaderCell>E-mail address</Table.HeaderCell>
                <Table.HeaderCell>Telefone</Table.HeaderCell>
                <Table.HeaderCell>Celular</Table.HeaderCell>
                <Table.HeaderCell>Ações</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {customers?.map(customer => (
                <Table.Row key={customer.id}>
                  <Table.Cell>{customer.name}</Table.Cell>
                  <Table.Cell>{customer.legal_name}</Table.Cell>
                  <Table.Cell>{customer.document_number}</Table.Cell>
                  <Table.Cell>{customer.email}</Table.Cell>
                  <Table.Cell>{customer.phone}</Table.Cell>
                  <Table.Cell>{customer.mobile}</Table.Cell>
                  <Table.Cell>
                    <Popup
                      trigger={<Button basic color="red" icon="user delete" />}
                      content={
                        // eslint-disable-next-line react/jsx-wrap-multilines
                        <Button
                          loading={loading}
                          disabled={loading}
                          color="orange"
                          content="confirma?"
                          onClick={() => handleRemoveCustomer(customer)}
                        />
                      }
                      on="click"
                      open={popupOpen}
                      onOpen={() => setPopupOpen(true)}
                      onClose={handleClosePopup}
                      position="top right"
                    />
                    <Button basic color="teal" icon="edit" onClick={() => handleEditCustomer(customer)} />
                  </Table.Cell>
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
