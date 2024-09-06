import React, { useState } from 'react';
import { FlatList, Button, View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import InventoryItem from '../components/InventoryItem';
import Input from '../components/Input';

const InventoryScreen = ({ navigation }) => {
  const { items, user } = useSelector(state => state.inventory);
  const [filterVisible, setFilterVisible] = useState(false); // State to toggle filter visibility
  const [filterName, setFilterName] = useState('');
  const [filterOwner, setFilterOwner] = useState('');
  const [minQuantity, setMinQuantity] = useState('');
  const [maxQuantity, setMaxQuantity] = useState('');

  // Function to filter the items based on the user's input
  const filterItems = () => {
    return items.filter(item => {
      const nameMatch = item.name.toLowerCase().includes(filterName.toLowerCase());
      const ownerMatch = item.owner.toLowerCase().includes(filterOwner.toLowerCase());
      const quantityMatch =
        (minQuantity === '' || item.quantity >= parseInt(minQuantity)) &&
        (maxQuantity === '' || item.quantity <= parseInt(maxQuantity));
      return nameMatch && ownerMatch && quantityMatch;
    });
  };

  const filteredItems = filterItems();

  // Toggle the filter visibility and reset filters when hiding
  const toggleFilter = () => {
    if (filterVisible) {
      // Reset filter values when hiding the filter
      setFilterName('');
      setFilterOwner('');
      setMinQuantity('');
      setMaxQuantity('');
    }
    setFilterVisible(!filterVisible); // Toggle filter visibility
  };

  return (
    <View style={styles.container}>
      {/* Toggle Button for Showing/Hiding the Filter */}
      <TouchableOpacity style={styles.filterButton} onPress={toggleFilter}>
        <Text style={styles.filterButtonText}>
          {filterVisible ? 'Reset Filter' : 'Filter'}
        </Text>
      </TouchableOpacity>

      {/* Filter Input Fields (Visible only if filterVisible is true) */}
      {filterVisible && (
        <View style={styles.filterContainer}>
          <Text style={styles.filterLabel}>Filter by Name:</Text>
          <Input
            placeholder="Enter item name"
            value={filterName}
            onChangeText={setFilterName}
            style={styles.inputField}
          />
          <Text style={styles.filterLabel}>Filter by Owner:</Text>
          <Input
            placeholder="Enter owner name"
            value={filterOwner}
            onChangeText={setFilterOwner}
            style={styles.inputField}
          />
          <Text style={styles.filterLabel}>Filter by Quantity Range:</Text>
          <View style={styles.quantityRangeContainer}>
            <Input
              placeholder="Min Quantity"
              value={minQuantity}
              onChangeText={setMinQuantity}
              keyboardType="numeric"
              style={[styles.inputField, styles.quantityInput]}
            />
            <Input
              placeholder="Max Quantity"
              value={maxQuantity}
              onChangeText={setMaxQuantity}
              keyboardType="numeric"
              style={[styles.inputField, styles.quantityInput]}
            />
          </View>
        </View>
      )}

      {/* Filtered Inventory List */}
      <FlatList
        data={filteredItems}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('ItemDetail', { item })}
          >
            <InventoryItem item={item} />
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()}
      />

      {/* Add New Item Button */}
      {user.role === 'manager' && (
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddItem')}>
          <Text style={styles.addButtonText}>+ Add New Item</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default InventoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  filterButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  filterButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  filterContainer: {
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  inputField: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
  },
  quantityRangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quantityInput: {
    flex: 1,
    marginRight: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
