import React from 'react';

import { AuthProvider } from './Auth';

// eslint-disable-next-line react/prop-types
const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>{children}</AuthProvider>
);

export default AppProvider;
