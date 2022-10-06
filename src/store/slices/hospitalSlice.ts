import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface IHospitalsState {
  hospitals: [];
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
    setHospital(state: IHospitalsState, {payload}: PayloadAction<string>) {},
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
