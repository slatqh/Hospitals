import {View, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import React from 'react';
import {MainNavProps} from '../navigation/MainNav';
import {ErrorText, TextInput} from '../components';
import {Controller, useForm} from 'react-hook-form';
import {Header} from '../components/Header';

interface FormData {
  name: string;
  address: string;
  additionalInfo?: string;
}

export const HospitalDetails = (props: MainNavProps<'HospitalDetals'>) => {
  const [isError, setIsError] = React.useState(false);
  const [additionalInfo, setAdditionalInfo] = React.useState('');
  const [isLoading, setIsloading] = React.useState(false);
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
    setIsloading(true);
    setTimeout(() => {
      const args = {
        firstName: inputs.name,
        lastName: inputs.address,
        info: additionalInfo,
      };

      console.log('ARGS', args);
      setIsloading(false);
    }, 1000);
  });
  return (
    <View style={styles.container}>
      <Header title={'Save'} enabled={isValid} onPress={handleSave} />
      <View style={styles.inputContainer}>
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
              message: 'Hospital name required',
            },
            minLength: {
              value: 5,
              message: 'Name should be more then 5 characters',
            },
          }}
        />
        <View>
          {errors && !!touchedFields?.name && (
            <ErrorText text={errors?.name?.message} />
          )}
        </View>
        <Controller
          control={control}
          render={({
            field: {onChange, onBlur, value},
            fieldState: {error, isTouched},
          }) => (
            <TextInput
              label="Address"
              placeholder={'Enter hospital address'}
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
              style={styles.textInputStyle}
            />
          )}
          name="address"
          rules={{
            required: {
              value: true,
              message: 'Hospital address required',
            },
          }}
        />
        <View>
          {errors && !!touchedFields?.address && (
            <ErrorText text={errors?.address?.message} />
          )}
        </View>

        <TextInput
          label="Additional Info"
          multiline
          value={additionalInfo}
          onChangeText={(e: string) => setAdditionalInfo(e)}
        />
      </View>

      {isValid && (
        <Button
          mode="contained"
          style={styles.button}
          onPress={handleSave}
          loading={isLoading}
          textColor="white">
          Save
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  inputContainer: {
    marginTop: 20,
  },
  textInputStyle: {
    marginTop: 10,
  },
  button: {
    marginTop: 15,
  },
});
