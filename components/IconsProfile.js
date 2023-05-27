//Default Imports
import React from 'react';
import {View, StyleSheet} from 'react-native';

//Third Party Imports

import AntDesign from 'react-native-vector-icons/AntDesign';

export default function IconsProfile({name, size = 30, style, onPress}) {
  // let Icon = Icons[iconType];
  return (
    <View style={[styles.circle, style]}>
      <AntDesign
        name={name}
        size={size}
        onPress={onPress}
        color="black"></AntDesign>
    </View>
  );
}

//Stylesheet
const styles = StyleSheet.create({
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
