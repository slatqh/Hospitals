import {DefaultTheme as PaperTheme} from 'react-native-paper';

const lightTheme = {
  roundness: 10,
  colors: {
    ...PaperTheme,
    primary: '#085df8',
    secondary: '#085df8',
    error: '#a51f1e',
    background: '#f5f5f5',
    disabledButton: '#D7DADB',
  },
};

export const theme = {
  ...lightTheme,
};
