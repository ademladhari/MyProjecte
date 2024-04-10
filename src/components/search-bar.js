import React, { useState } from "react";
import {
  Button,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function SearchBar({ setSearchQuery, searchBy, setSearchBy }) {
  const searchOptions = ["requestName", "DepartureAddress", "Name"];
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearchOptionSelect = (option) => {
    setSearchBy(option);
    setShowDropdown(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchInputContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder={`Search by ${searchBy}`}
          onChangeText={(text) => setSearchQuery(text)}
        />
        <TouchableOpacity onPress={() => setShowDropdown(!showDropdown)}>
          <Icon name="chevron-down" size={24} style={styles.dropdownIcon} />
        </TouchableOpacity>
      </View>
      {showDropdown && (
        <View style={styles.dropdownContainer}>
          <FlatList
            data={searchOptions}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSearchOptionSelect(item)}>
                <Text style={styles.dropdownItem}>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: "90%",
    alignSelf: "center", // Center vertically
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // Center horizontally
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
    alignSelf: "center", // Center vertically
  },
  dropdownIcon: {
    marginLeft: -35,
    marginRight: 15,
  },
  dropdownContainer: {
    position: "absolute",
    zIndex: 20,
    top: 50, // Adjust the top position as needed
    right: 10,
    backgroundColor: "white",
    borderRadius: 5,
    elevation: 3,
  },
  dropdownItem: {
    padding: 10,
    fontSize: 16,
  },
});
