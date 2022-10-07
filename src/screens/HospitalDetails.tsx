import {View, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import React from 'react';
import {ErrorText, TextInput} from '../components';
import {Controller, useForm} from 'react-hook-form';
import {Header} from '../components/Header';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch} from '../hooks/useRedux';
import {setHospitalOrEdit} from '../store/slices/hospitalSlice';
import {MainNavProps} from '../navigation/MainNav';
import {defaultColors} from '../theme/colors';
import {Spinner} from '../components/Spinner';

interface FormData {
  name: string;
  address: string;
  additionalInfo?: string;
}

export const HospitalDetails = (props: MainNavProps<'HospitalDetals'>) => {
  const [additionalInfo, setAdditionalInfo] = React.useState('');
  const [isLoading, setIsloading] = React.useState(false);
  const {params} = props.route;
  const hospitalToEdit = params?.hospitalToEdit
    ? params?.hospitalToEdit
    : undefined;

  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: {errors, isValid, isSubmitting, touchedFields},
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      name: hospitalToEdit?.name ?? '',
      address: hospitalToEdit?.address ?? '',
    },
  });

  React.useEffect(() => {
    // example how we can handle editing in plain RN without react-form
    if (hospitalToEdit && hospitalToEdit?.info) {
      setAdditionalInfo(hospitalToEdit.info);
    }
  }, []);

  const goBack = () => {
    navigation.goBack();
  };

  const handleSave = handleSubmit(async inputs => {
    setIsloading(true);
    setTimeout(() => {
      // simulate api call
      const args = {
        name: inputs.name,
        address: inputs.address,
        info: additionalInfo,
      };

      dispatch(setHospitalOrEdit({...args, id: hospitalToEdit?.id}));
      setIsloading(false);
      navigation.goBack();
    }, 1000);
  });

  return (
    <View style={styles.container}>
      <Header
        title={'Save'}
        enabled={isValid}
        onRightButtonPress={handleSave}
        onArrowPress={goBack}
      />
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
              onChangeText={(e: string) => {
                onChange(e);
              }}
              required
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
              maxLength={40}
              onChangeText={(e: string) => {
                onChange(e);
              }}
              required
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
            minLength: {
              value: 5,
              message: 'Address should be more then 5 characters',
            },
          }}
        />
        <View>
          {errors && !!touchedFields?.address && (
            <ErrorText text={errors?.address?.message} />
          )}
        </View>
        <View style={styles.info}>
          <TextInput
            label="Additional Info"
            multiline
            value={additionalInfo}
            onChangeText={(e: string) => setAdditionalInfo(e)}
          />
        </View>
      </View>

      <Button
        mode="contained"
        disabled={!isValid ? true : false}
        style={[
          styles.button,
          {
            backgroundColor: isValid
              ? defaultColors.primary
              : defaultColors.disabledButton,
          },
        ]}
        onPress={handleSave}
        loading={isLoading}>
        Save
      </Button>
      <Spinner isLoading={isLoading} />
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
  info: {
    marginTop: 28,
  },
});
