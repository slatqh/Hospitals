import {View, Text, Button} from 'react-native';
import React from 'react';
import {MainNavProps} from '../navigation/MainNav';

export const HospitalDetails = (props: MainNavProps<'HospitalDetals'>) => {
  const {navigation} = props;
  return (
    <View>
      <Text>HospitalDetails </Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};
