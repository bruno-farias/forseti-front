import React, { useCallback } from 'react';
import { Container, Segment, Icon, Table, Header, Button } from 'semantic-ui-react';

import ForsetiHeader from '../../components/Header';

const Clients: React.FC = () => {
  const handleAddUser = useCallback(() => {
    console.log('add user');
  }, []);

  return (
    <>
      <ForsetiHeader />
      <Container>
        <Segment style={{ padding: '4em 0em' }} vertical>
          <Header as="h2" floated="left">
            Clientes
          </Header>
          <Button floated="right" icon labelPosition="left" primary size="small" onClick={handleAddUser}>
            <Icon name="user" /> Add User
          </Button>
          <Table celled compact definition>
            <Table.Header fullWidth>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Registration Date</Table.HeaderCell>
                <Table.HeaderCell>E-mail address</Table.HeaderCell>
                <Table.HeaderCell>Premium Plan</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell>John Lilki</Table.Cell>
                <Table.Cell>September 14, 2013</Table.Cell>
                <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
                <Table.Cell>No</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Jamie Harington</Table.Cell>
                <Table.Cell>January 11, 2014</Table.Cell>
                <Table.Cell>jamieharingonton@yahoo.com</Table.Cell>
                <Table.Cell>Yes</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Jill Lewis</Table.Cell>
                <Table.Cell>May 11, 2014</Table.Cell>
                <Table.Cell>jilsewris22@yahoo.com</Table.Cell>
                <Table.Cell>Yes</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Segment>
      </Container>
    </>
  );
};

export default Clients;
