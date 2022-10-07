import {View, FlatList, StyleSheet} from 'react-native';
import React from 'react';

import {MainNavProps} from '../navigation/MainNav';
import {HospitalCard, Header} from '../components';
import {useAppDispatch, useAppSelector} from '../hooks/useRedux';
import {IHospital} from '../types/hospitalTypes';
import {setDeleteHospital} from '../store/slices/hospitalSlice';
import {Spinner} from '../components/Spinner';

export const HospitalList = (props: MainNavProps<'Hospitals'>) => {
  const hospitalsList = useAppSelector(store => store.hospitals);
  const {navigation} = props;
  const dispatch = useAppDispatch(setDeleteHospital);
  const [isLoading, setIsLoading] = React.useState(false);

  const onDelete = (id: number) => {
    setIsLoading(true);
    setTimeout(() => {
      dispatch(setDeleteHospital(id));
      setIsLoading(false);
    }, 1000); // simulate api call
  };

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
        onRightButtonPress={() => navigation.navigate('HospitalDetals', {})}
      />
      <FlatList
        // contentContainerStyle={{flex: 1}}
        showsVerticalScrollIndicator={false}
        data={hospitalsList}
        renderItem={renderItem}
        keyExtractor={(item: IHospital, _) => item.id}
      />
      <Spinner isLoading={isLoading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
});
