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
    setHospital(state: IHospitalsState, {payload}: PayloadAction<IHospital>) {
      const hospital = {
        id: Date.now(),
        name: payload.name,
        address: payload.address,
        info: payload.info,
      };
      state.hospitals.push(hospital);
    },
    setEditHospital(state: IHospitalsState, {payload}: PayloadAction<string>) {
      state.hospitalId = payload;
    },
    setDeleteHospital(
      state: IHospitalsState,
      {payload}: PayloadAction<string>,
    ) {
      state.hospitalId = payload;
    },
  },
});

export const {setHospital, setEditHospital, setDeleteHospital} =
  hospitalSlice.actions;
export default hospitalSlice.reducer;
