import {View, Text, FlatList, StyleSheet} from 'react-native';
import React from 'react';

import {MainNavProps} from '../navigation/MainNav';
import {HospitalCard, Header} from '../components';
import {useAppSelector} from '../hooks/useRedux';
import {IHospital} from '../types/hospitalTypes';

export const HospitalList = (props: MainNavProps<'Hospitals'>) => {
  const hospitalsList = useAppSelector(store => store.hospitals);
  const {navigation} = props;
  console.log('hospitalsList', hospitalsList);
  React.useEffect(() => {}, []);

  const onDelete = item => {};

  const onEdit = (item: IHospital) => {
    navigation.navigate('HospitalDetals', {
      hospitalToEdit: item,
    });
  };
  const renderItem = ({item}: {item: IHospital}) => {
    return (
      <HospitalCard
        key={item.id}
        {...item}
        onDelete={() => onDelete(item.id)}
        onEdit={() => onEdit(item)}
      />
    );
  };
  return (
    <View style={styles.container}>
      <Header
        title={'Add'}
        enabled
        hideLeftButton
        onRightButtonPress={() => navigation.navigate('HospitalDetals')}
      />
      <FlatList
        data={hospitalsList}
        renderItem={renderItem}
        keyExtractor={(item: IHospital, _) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
});
