import * as React from 'react';
import {StyleSheet, Text} from 'react-native';
import {TextInput} from 'react-native-paper';
import {defaultColors} from '../theme/colors';

const BaseTextInput = (props: any) => {
  const [text, setText] = React.useState('');
  const handleTextChange = () => {
    if (typeof props.onChangeText === 'function') {
      setText(text);
      props.onChangeText(text);
    }
  };
  return (
    <TextInput
      autoCorrect={false}
      mode="outlined"
      value={text}
      onChangeText={handleTextChange}
      style={[styles(props.multiline).textInput, props.style]}
      {...props}
      label={
        props.required ? (
          <Text>
            {props.label}
            <Text style={[styles(props.multiline).required]}> *</Text>
          </Text>
        ) : null
      }
    />
  );
};

const styles = (multiline: boolean | undefined) =>
  StyleSheet.create({
    textInput: {
      height: multiline ? 160 : undefined,
    },
    required: {
      color: defaultColors.error,
    },
  });
export default BaseTextInput;
