//Default Imports
import React from 'react';
import {View, StyleSheet} from 'react-native';

//Third Party imports
import {Icon} from '@rneui/themed';

export default function IconsGreater({
  iconType = 'Entypo',
  name = 'chevron-right',
  size = 20,
  style,
  onPress,
}) {
  return (
    <View style={[styles.circle, style]}>
      <Icon name={name} size={size} onPress={onPress} type={iconType}></Icon>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    width: 35,
    height: 35,
    backgroundColor: 'red',
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
