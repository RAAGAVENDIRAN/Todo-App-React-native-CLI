//Default Imports
import React, {useState} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

//Third-Party Imports

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function Iconic({
  name,
  size,
  onPress,
  height,
  placeholder,
  secureTextEntry,
  onChangeText,
  value,
}) {
  const [focused, setFocused] = useState(false);

  return (
    <View
      style={[
        styles.container,
        focused
          ? {
              borderWidth: 1,
              borderColor: 'purple',
            }
          : {},
      ]}>
      <MaterialCommunityIcons
        style={styles.icon}
        name={name}
        size={size}
        onPress={onPress}
      />
      <TextInput
        style={[styles.text, {height: height}]}
        placeholder={placeholder}
        value={value}
        placeholderTextColor="black"
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        importantForAutofill="no"
        onFocus={() => {
          setFocused(true);
        }}
        onBlur={() => {
          setFocused(false);
        }}
      />
    </View>
  );
}

//StyleSheet
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 10,
    padding: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 5,
    shadowOpacity: 0.88,
    shadowRadius: 10,
    shadowOffset: {
      height: 20,
      width: 0,
    },
    backgroundColor: '#fff',
  },
  text: {
    flex: 0.9,
    height: '100%',
    fontFamily: 'Poppins-ExtraBold',
    marginLeft: 5,
    color: 'black',

    // color: 'black',
  },
  icon: {
    flex: 0.1,
    marginLeft: 5,
    color: 'black',
  },
});

export default Iconic;
