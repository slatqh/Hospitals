import React from 'react';
import {StyleSheet, Text} from 'react-native';

export const ErrorText = (props: {text: string | undefined}) => {
  const {text} = props;
  return <Text style={styles.text}>{text}</Text>;
};

const styles = StyleSheet.create({
  text: {color: '#a51f1e', fontSize: 16, paddingTop: 8},
});
