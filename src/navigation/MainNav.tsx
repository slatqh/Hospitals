import * as React from 'react';
import {RouteProp} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import {HospitalDetails, HospitalList} from '../screens';
import {IHospital} from '../types/hospitalTypes';

export enum MainNav {
  HOSPITALS_LIST = 'Hospitals',
  HOSPITALS_DETAILS = 'HospitalDetals',
}
export type MainNavParamList = {
  Hospitals: undefined;
  HospitalDetals: {
    hospitalToEdit?: IHospital;
  };
};
export type MainNavProps<T extends keyof MainNavParamList> = {
  navigation: NativeStackNavigationProp<MainNavParamList, T>;
  route: RouteProp<MainNavParamList, T>;
};
const MainStack = createNativeStackNavigator();

export const MainNavigator = () => {
  return (
    <MainStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={MainNav.HOSPITALS_LIST}>
      <MainStack.Screen
        name={MainNav.HOSPITALS_LIST}
        component={HospitalList}
      />
      <MainStack.Screen
        name={MainNav.HOSPITALS_DETAILS}
        component={HospitalDetails}
      />
    </MainStack.Navigator>
  );
};
