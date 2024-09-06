import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const InventoryItem = ({item, onPress}) => {
  return (
    <View
      style={{padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc'}}>
      <Text>Name: {item.name}</Text>
      <Text>Quantity: {item.quantity}</Text>
      <Text>Location: {item.location}</Text>
      <Text>Owner: {item.owner}</Text>
    </View>
  );
};

export default InventoryItem;
