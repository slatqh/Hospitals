import {MD3LightTheme as DefaultTheme} from 'react-native-paper';

const lightTheme: Partial<typeof DefaultTheme> = {
  roundness: 10,
  colors: {
    ...DefaultTheme,
    primary: '#085df8',
    secondary: '#085df8',
    error: '#a51f1e',
    background: '#f5f5f5',
  },
};

export const theme = {
  ...lightTheme,
};
