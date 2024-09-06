import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {login} from '../redux/inventorySlice';
import Input from '../components/Input';

const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const mockUsers = [
    {username: 'manager', password: 'password', role: 'manager'},
    {username: 'staff', password: 'password', role: 'staff'},
  ];

  const handleLogin = () => {
    const user = mockUsers.find(
      u => u.username === username && u.password === password,
    );

    if (user) {
      dispatch(login(user)); // Save the user info and role
      navigation.navigate('Inventory');
    } else {
      setError('Invalid username or password');
    }
  };

  useEffect(() => {
    setError('');
  }, [username, password]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Warehouse Management Login</Text>

      <Input
        label="Username:"
        placeholder="Enter username"
        value={username}
        onChangeText={setUsername}
      />
      <Input
        label="Password:"
        placeholder="Enter password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 40,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
