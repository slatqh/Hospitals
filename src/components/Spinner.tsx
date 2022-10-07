import React from 'react';
import {useRef} from 'react';
import {
  StyleProp,
  ViewStyle,
  Animated,
  Easing,
  Modal,
  View,
  StyleSheet,
} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

import LoadingSpinnerSvg from '../assets/images/spinner.svg';

interface ISpinnerProps {
  isLoading: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

export const Spinner = (props: ISpinnerProps) => {
  const {isLoading, containerStyle} = props;
  const [loading, setLoading] = React.useState<boolean>(false);
  const val = useRef(new Animated.Value(0));

  const anim = useRef(
    Animated.loop(
      Animated.timing(val.current, {
        toValue: 3,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ),
  ).current;

  const rotation = val.current.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  React.useEffect(() => {
    if (loading) {
      anim.start();
    } else {
      anim.stop();
      val.current.setValue(0);
    }

    return () => anim.stop();
  }, [loading, anim]);

  React.useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      style={[{zIndex: 1100}, containerStyle]}>
      <View style={styles.backgroundContainer}>
        <Animated.View style={{transform: [{rotate: rotation}]}}>
          <ActivityIndicator size="large" />
          {/* <LoadingSpinnerSvg height={72} width={72} /> */}
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#000000',
    opacity: 0.7,
    zIndex: 1000,
  },
});
