import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../services/api';

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  legal_name: string;
  document_name: string;
  mobile: string;
}

interface CustomersState {
  customers: Customer[];
}

type CreateCustomerDTO = Omit<Customer, 'id'>;

interface CustomersContextData {
  customers: Customer[];
  getCustomers(): Promise<void>;
  create(customerData: CreateCustomerDTO): Promise<void>;
  updateCustomer(customer: Customer): Promise<void>;
  remove(id: string): void;
}

const CustomersContext = createContext<CustomersContextData>({} as CustomersContextData);

const CustomersProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<CustomersState>(() => {
    const customers = localStorage.getItem('@Forseti:customers');

    if (customers) {
      return { customers: JSON.parse(customers) };
    }
    return {} as CustomersState;
  });

  const getCustomers = useCallback(async () => {
    const response = await api.get('customers');
    const customers = response.data.data;
    localStorage.setItem('@Forseti:customers', JSON.stringify(customers));

    setData({ customers });
  }, []);

  const create = useCallback(
    async (customerData: CreateCustomerDTO) => {
      const response = await api.post('customers', customerData);

      const { customer } = response.data;
      const customers = [...data.customers, customer];
      localStorage.setItem('@Forseti:customers', JSON.stringify(customers));

      setData({ customers });
    },
    [data.customers],
  );

  const remove = useCallback(
    async (id: string) => {
      const updatedCustomer = data.customers.filter(c => c.id !== id);

      await api.delete(`customers/${id}`);
      localStorage.setItem('@Forseti:customers', JSON.stringify(updatedCustomer));

      setData({
        customers: updatedCustomer,
      });
    },
    [setData, data.customers],
  );

  const updateCustomer = useCallback(
    async (customer: Customer) => {
      const updatedCustomer = data.customers.map(c => {
        if (c.id === customer.id) {
          return {
            ...c,
            ...customer,
          };
        }
        return c;
      });

      await api.put(`customers/${customer.id}`, { customer });
      localStorage.setItem('@Forseti:customers', JSON.stringify(updatedCustomer));

      setData({
        customers: updatedCustomer,
      });
    },
    [setData, data.customers],
  );

  return (
    <CustomersContext.Provider value={{ customers: data.customers, getCustomers, create, updateCustomer, remove }}>
      {children}
    </CustomersContext.Provider>
  );
};

function useCustomers(): CustomersContextData {
  const context = useContext(CustomersContext);

  if (!context) {
    throw new Error('useCustomers must be user within an CustomersProvider');
  }

  return context;
}

export { CustomersProvider, useCustomers };
