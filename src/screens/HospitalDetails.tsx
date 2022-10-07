import {View, Text, Button, StyleSheet} from 'react-native';
import React from 'react';
import {MainNavProps} from '../navigation/MainNav';
import {ErrorText, TextInput} from '../components';
import {Controller, useForm} from 'react-hook-form';

interface FormData {
  name: string;
  address: string;
  additionalInfo?: string;
}

export const HospitalDetails = (props: MainNavProps<'HospitalDetals'>) => {
  const [isError, setIsError] = React.useState(false);
  const {
    control,
    handleSubmit,
    formState: {errors, isValid, isSubmitting, touchedFields},
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      address: '',
      additionalInfo: '',
    },
  });
  const {navigation} = props;

  const handleSave = handleSubmit(async inputs => {
    const args = {
      firstName: inputs.name,
      lastName: inputs.address,
      info: inputs.additionalInfo,
    };

    console.log('ARGS', args);
  });
  return (
    <View style={styles.container}>
      <Text>HospitalDetails </Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
      <Controller
        control={control}
        render={({
          field: {onChange, onBlur, value},
          fieldState: {error, isTouched},
        }) => (
          <TextInput
            label="Hospital name"
            placeholder={'Enter hospital name'}
            autoFocus
            maxLength={40}
            onChangeText={e => {
              onChange(e);
              setIsError(false);
            }}
            value={value}
            error={Boolean(error && isTouched)}
            disabled={isSubmitting}
            onBlur={onBlur}
            autoCapitalize="sentences"
            textContentType="givenName"
          />
        )}
        name="name"
        rules={{
          required: {
            value: true,
            message: 'Hospital name requireds',
          },
        }}
      />
      <View>
        {errors && !!touchedFields?.name && (
          <ErrorText text={errors?.name?.message} />
        )}
      </View>
      <TextInput label="Address" />
      {/* <TextInput label="Hospital Name" />
      <TextInput label="Additional Info" multiline /> */}
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
});
