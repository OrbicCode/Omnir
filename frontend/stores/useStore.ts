import { create } from "zustand";

const useStore = create((set) => ({
  postcode: null,
  setPostcode: (postcode: any) => set({ postcode }),

  intensityPostcodeData: null,
  setIntensityPostcodeData: (data: any) => set({ intensityPostcodeData: data }),

  datetimeFrom: null,
  setDatetimeFrom: (date: any) => set({ datetimeFrom: date }),

  datetimeTo: null,
  setDatetimeTo: (date: any) => set({ datetimeTo: date }),

  mapGenMixData: null,
  setMapGenMixData: (data: any) => set({ mapGenMixData: data }),
}));

export default useStore;
