import React, { useState, useCallback } from 'react';
import { Button, Form, Modal, Segment } from 'semantic-ui-react';

import { useToast } from '../../../../hooks/toast';
import { Customer, useCustomers } from '../../../../hooks/customers';

interface Props {
  open: boolean;
  closeModal: () => void;
}

type CustomerFormData = Omit<Customer, 'id'>;

const FormModal: React.FC<Props> = ({ open, closeModal }) => {
  const { addToast } = useToast();
  const { create } = useCustomers();
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
        title: 'Erro cadastrando cliente',
        description: 'Ocorreu um erro ao cadastrar o cliente, cheque os dados de cadastro',
      });
    } finally {
      setLoading(false);
    }
  }, [closeModal, create, addToast, setLoading, formData]);

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
              icon="user"
              iconPosition="left"
              placeholder="Nome legal"
              name="legal_name"
              value={formData.legal_name}
              onChange={handleChange}
            />
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Nome no documento"
              name="document_name"
              value={formData.document_name}
              onChange={handleChange}
            />
            <Form.Input
              fluid
              icon="phone"
              iconPosition="left"
              placeholder="Telefone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <Form.Input
              fluid
              icon="mobile alternate"
              iconPosition="left"
              placeholder="Celular"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
            />
          </Segment>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={handleCloseModal}>
          Cancelar
        </Button>
        <Button loading={loading} disabled={loading} onClick={handleSubmit} color="teal">
          Criar
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default FormModal;
