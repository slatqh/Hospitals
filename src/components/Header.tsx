import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Button} from 'react-native-paper';

interface IProps {
  onPress: () => void;
  title: string;
  enabled: boolean;
}
export const Header = (props: IProps) => {
  const navigation = useNavigation();
  const {title, onPress, enabled} = props;
  return (
    <View style={styles.container}>
      <Button
        onPress={() => navigation.goBack()}
        icon={() => (
          <Image
            source={require('../assets/images/back-arrow.png')}
            style={styles.icon}
          />
        )}
      />
      {enabled && (
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.leftButton}>{title}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
  },
  leftButton: {
    fontSize: 18,
    paddingRight: 10,
    fontWeight: '400',
    color: '#085df8',
    letterSpacing: 0.4,
  },
});
