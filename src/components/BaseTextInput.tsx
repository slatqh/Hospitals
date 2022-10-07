import * as React from 'react';
import {StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';

const BaseTextInput = (props: any) => {
  const [text, setText] = React.useState('');

  return (
    <TextInput
      autoCorrect={false}
      mode="outlined"
      value={text}
      onChangeText={(input: string) => setText(input)}
      style={[styles(props.multiline).textInput, props.style]}
      {...props}
    />
  );
};

const styles = (multiline: boolean | undefined) =>
  StyleSheet.create({
    textInput: {
      height: multiline ? 160 : undefined,
    },
  });
export default BaseTextInput;

// primary: string;
// background: string;
// surface: string;
// accent: string;
// error: string;
// text: string;
// onSurface: string;
// disabled: string;
// placeholder: string;
// backdrop: string;
