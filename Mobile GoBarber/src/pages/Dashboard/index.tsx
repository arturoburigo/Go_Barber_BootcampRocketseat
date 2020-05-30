import React from 'react';
import { View, Button } from 'react-native';
import { useAuth } from '../../hooks/Auth';

const Dashboard: React.FC = () => {
  const { singOut } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Button title="SignOut" onPress={singOut} />
    </View>
  );
};

export default Dashboard;
