//Default Imports
import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

//Components Imports
import AppText from './AppText';

function BottomButton({navigated}) {
  return (
    <TouchableOpacity style={styles.touchableOpacity} onPress={navigated}>
      <AppText style={styles.floatingText}>+</AppText>
    </TouchableOpacity>
  );
}

//Stylesheet
const styles = StyleSheet.create({
  floatingText: {
    fontWeight: 'bold',
    fontSize: 50,

    height: 70,
    color: 'black',
    fontFamily: 'Poppins-Bold',
  },
  touchableOpacity: {
    backgroundColor: '#B0DAFF',
    position: 'absolute',
    width: 70,
    height: 70,
    right: 30,
    bottom: 30,
    borderRadius: 35,
    // justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BottomButton;
