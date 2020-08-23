import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';
import { CustomersProvider } from './customers';

const AppProvider: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <CustomersProvider>
        <ToastProvider>{children}</ToastProvider>
      </CustomersProvider>
    </AuthProvider>
  );
};

export default AppProvider;
