import {View, FlatList, StyleSheet, Alert} from 'react-native';
import React from 'react';

import {MainNavProps} from '../navigation/MainNav';
import {HospitalCard, Header, DefaultEmptyList} from '../components';
import {useAppDispatch, useAppSelector} from '../hooks/useRedux';
import {IHospital} from '../types/hospitalTypes';
import {setDeleteHospital} from '../store/slices/hospitalSlice';
import {Spinner} from '../components/Spinner';

export const HospitalList = (props: MainNavProps<'Hospitals'>) => {
  const hospitalsList = useAppSelector(store => store.hospitals);
  const {navigation} = props;
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = React.useState(false);

  // this could be a stand alone custom component
  const confirmDelete = (id: number) => {
    Alert.alert('Are you sure?', 'You going to delete your record', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'YES', onPress: () => onDelete(id)},
    ]);
  };
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
        onDelete={() => confirmDelete(item.id)}
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
      {hospitalsList && hospitalsList.length === 0 ? (
        <DefaultEmptyList />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={hospitalsList}
          renderItem={renderItem}
          keyExtractor={(item: IHospital, _) => item.id}
        />
      )}
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
