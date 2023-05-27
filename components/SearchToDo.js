import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

function SearchToDo({onChangeText, placeholder, value, style}) {
  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={onChangeText}
        placeholderTextColor="black"
        style={[styles.Inputdesign, style]}
        placeholder={placeholder}
        value={value}
      />
    </View>
  );
}

//Stylesheet
const styles = StyleSheet.create({
  container: {
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Inputdesign: {
    width: '80%',
    paddingHorizontal: 25,
    marginBottom: 20,
    borderRadius: 35,
    fontSize: 15,
    borderWidth: 0.5,
    backgroundColor: 'white',
    height: 50,
    fontFamily: 'Poppins-Light',
    elevation: 10,
    color: 'black',
  },
});

export default SearchToDo;
