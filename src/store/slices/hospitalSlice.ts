import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IHospital} from '../../types/hospitalTypes';

export interface IHospitalsState {
  hospitals: Array<IHospital>;
  hospitalId: string;
  hospitalDetails: string;
}

const hospitalState: IHospitalsState = {
  hospitals: [],
  hospitalId: '',
  hospitalDetails: '',
};

const hospitalSlice = createSlice({
  name: 'hospitals',
  initialState: hospitalState,
  reducers: {
    setHospitalOrEdit(
      state: IHospitalsState,
      {payload}: PayloadAction<IHospital>,
    ) {
      const newHospital = {
        id: Date.now(),
        name: payload.name,
        address: payload.address,
        info: payload.info,
      };

      if (payload.id !== undefined) {
        state.hospitals.forEach((hospital: IHospital) => {
          if (hospital.id === payload.id) {
            hospital.address = payload.address;
            hospital.name = payload.name;
            hospital.info = payload.info;
          }
        });
      } else {
        state.hospitals.unshift(newHospital);
      }
    },

    setDeleteHospital(
      state: IHospitalsState,
      {payload}: PayloadAction<number>,
    ) {
      const deleteHospital = state.hospitals.filter(
        item => item.id !== payload,
      );
      state.hospitals = deleteHospital;
    },
  },
});

export const {setHospitalOrEdit, setDeleteHospital} = hospitalSlice.actions;
export default hospitalSlice.reducer;
