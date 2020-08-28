import React, { useState, useCallback } from 'react';
import { Button, Form, Modal, Segment } from 'semantic-ui-react';

import { useToast } from '../../../../hooks/toast';
import { Customer, useCustomers } from '../../../../hooks/customers';

interface Props {
  customer?: Customer;
  open: boolean;
  closeModal: () => void;
}

type CustomerFormData = Omit<Customer, 'id'>;

const FormModal: React.FC<Props> = ({ customer, open, closeModal }) => {
  const { addToast } = useToast();
  const { create, updateCustomer } = useCustomers();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CustomerFormData>({} as CustomerFormData);

  const handleChange = useCallback(
    (e, { name, value }) => {
      setFormData({ ...formData, [name]: value });
    },
    [formData],
  );

  const handleCloseModal = useCallback(() => {
    closeModal();
    setFormData({} as CustomerFormData);
  }, [closeModal]);

  const handleSubmit = useCallback(async () => {
    setLoading(true);
    try {
      await create(formData);
      closeModal();
    } catch {
      addToast({
        type: 'error',
        title: 'Erro atualizando cliente',
        description: 'Ocorreu um erro ao atualizar o cliente, cheque os dados',
      });
    } finally {
      setLoading(false);
    }
  }, [closeModal, create, addToast, setLoading, formData]);

  const handleEditUser = useCallback(async () => {
    setLoading(true);
    try {
      if (customer) {
        await updateCustomer({
          ...customer,
          ...formData,
        });
      }
      closeModal();
    } catch {
      addToast({
        type: 'error',
        title: 'Erro cadastrando cliente',
        description: 'Ocorreu um erro ao cadastrar o cliente, cheque os dados de cadastro',
      });
    } finally {
      setLoading(false);
    }
  }, [closeModal, customer, updateCustomer, addToast, setLoading, formData]);

  return (
    <Modal open={open} onClose={handleCloseModal}>
      <Modal.Header>Cadastro de cliente</Modal.Header>
      <Modal.Content>
        <Form size="large" onSubmit={handleSubmit}>
          <Segment>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Nome"
              name="name"
              value={formData.name}
              defaultValue={customer?.name}
              onChange={handleChange}
            />
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Nome legal"
              name="legal_name"
              value={formData.legal_name}
              defaultValue={customer?.legal_name}
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
              defaultValue={customer?.email}
              onChange={handleChange}
            />
            <Form.Input
              fluid
              icon="address card"
              iconPosition="left"
              placeholder="Documento"
              name="document_number"
              value={formData.document_number}
              defaultValue={customer?.document_number}
              onChange={handleChange}
            />
            <Form.Input
              fluid
              icon="phone"
              iconPosition="left"
              placeholder="Telefone"
              name="phone"
              value={formData.phone}
              defaultValue={customer?.phone}
              onChange={handleChange}
            />
            <Form.Input
              fluid
              icon="mobile alternate"
              iconPosition="left"
              placeholder="Celular"
              name="mobile"
              value={formData.mobile}
              defaultValue={customer?.mobile}
              onChange={handleChange}
            />
          </Segment>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={handleCloseModal}>
          Cancelar
        </Button>
        <Button loading={loading} disabled={loading} onClick={customer ? handleEditUser : handleSubmit} color="teal">
          {customer ? 'Atualizar' : 'Criar'}
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default FormModal;
