import {View, Text, Button} from 'react-native';
import React from 'react';

import {MainNavProps} from '../navigation/MainNav';
import {TextInput} from '../components';

export const HospitalList = (props: MainNavProps<'Hospitals'>) => {
  const {navigation} = props;
  return (
    <View>
      <Text>HospitalList </Text>
      <Button
        title="Details"
        onPress={() => navigation.navigate('HospitalDetals')}
      />
    </View>
  );
};
