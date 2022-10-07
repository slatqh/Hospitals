import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {defaultColors} from '../theme/colors';

export const DefaultEmptyList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        You don't have any Hotels to show. Please add one!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontColor: defaultColors.primary,
    textAlign: 'center',
  },
});
