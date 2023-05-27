//Default Imports
import React from 'react';
import {StyleSheet, Text} from 'react-native';

export default function AppText({style, numberOfLines, onPress, children}) {
  return (
    <Text style={[style]} onPress={onPress} numberOfLines={numberOfLines}>
      {children}
    </Text>
  );
}

// const styles = StyleSheet.create({
//   text: {
//     color: 'black',
//   },
// });
