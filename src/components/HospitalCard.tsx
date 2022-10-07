import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';
import {IHospital} from '../types/hospitalTypes';
import {defaultColors} from '../theme/colors';

type IDetails = {
  label: 'Name' | 'Address' | 'Information';
  value: string | undefined;
};
interface ICard extends IHospital {
  onDelete: () => void;
  onEdit: () => void;
}
const ItemDetails = (props: IDetails) => {
  return (
    <View style={styles.itemDetailsContainer}>
      <Text style={styles.itemDetailsLabel}>{props.label}</Text>
      <Text style={styles.itemDetailsValue}>{props.value}</Text>
    </View>
  );
};
const ActionBar = (props: Partial<ICard>) => {
  const {onDelete, onEdit} = props;
  return (
    <View style={styles.actionBarContainer}>
      <TouchableOpacity style={styles.actionButton} onPress={onDelete}>
        <Image
          source={require('../assets/images/delete.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={onEdit}>
        <Image
          source={require('../assets/images/edit.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};
export const HospitalCard = (props: ICard) => {
  const {id, info, name, address, onDelete, onEdit} = props;
  return (
    <View key={id} style={styles.cardContainer}>
      <View>
        <ItemDetails label="Name" value={name} />
        <ItemDetails label="Address" value={address} />
        <ItemDetails label="Information" value={info} />
      </View>
      <View>
        <ActionBar onDelete={onDelete} onEdit={onEdit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderColor: defaultColors.primary,
    borderWidth: 1.3,
    borderRadius: 8,
    marginTop: 10,
    backgroundColor: 'white',
  },
  icon: {
    height: 20,
    width: 20,
  },
  actionBarContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    padding: 10,
    paddingRight: 20,
  },
  actionButton: {
    paddingRight: 10,
  },
  itemDetailsLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  itemDetailsValue: {
    fontSize: 16,
    opacity: 0.7,
    letterSpacing: 0.6,
  },
  itemDetailsContainer: {
    padding: 7,
  },
});
