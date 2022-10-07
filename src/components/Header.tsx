import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';

interface IProps {
  title: string;
  enabled: boolean;
  onArrowPress?: () => void;
  hideLeftButton?: boolean;
  onRightButtonPress?: () => void;
}
export const Header = (props: IProps) => {
  const {title, enabled, onArrowPress, hideLeftButton, onRightButtonPress} =
    props;
  return (
    <View style={styles.container}>
      {hideLeftButton ? (
        <View />
      ) : (
        <Button
          onPress={onArrowPress}
          icon={() => (
            <Image
              source={require('../assets/images/back-arrow.png')}
              style={styles.icon}
            />
          )}
        />
      )}
      {enabled && (
        <TouchableOpacity
          style={{alignSelf: 'flex-end'}}
          onPress={onRightButtonPress}>
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
    fontSize: 24,
    paddingRight: 10,
    fontWeight: '400',
    color: '#085df8',
    letterSpacing: 0.4,
  },
});
