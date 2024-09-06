import React, {useState} from 'react';
import {View, TouchableOpacity, Text, Alert, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {addItem} from '../redux/inventorySlice';
import Input from '../components/Input';

const AddItemScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [location, setLocation] = useState('');
  const [owner, setOwner] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (name && quantity > 0 && location && owner) {
      dispatch(
        addItem({
          id: Date.now(),
          name,
          quantity: parseInt(quantity),
          location,
          owner,
        }),
      );
      navigation.goBack();
    } else {
      Alert.alert(
        'Invalid Input',
        'Please fill all fields and ensure quantity is a positive number',
      );
    }
  };

  return (
    <View style={styles.container}>
      <Input
        label="Item Name:"
        placeholder="Enter item name"
        value={name}
        onChangeText={setName}
      />
      <Input
        label="Quantity:"
        placeholder="Enter quantity"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
      />
      <Input
        label="Location:"
        placeholder="Enter location"
        value={location}
        onChangeText={setLocation}
      />
      <Input
        label="Owner:"
        placeholder="Enter owner"
        value={owner}
        onChangeText={setOwner}
      />

      <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Add Item</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  addButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddItemScreen;
