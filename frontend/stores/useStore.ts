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

  regionData: null,
  setRegionData: (data: any) => set({ regionData: data }),

  selectedRegionId: null,
  setSelectedRegionId: (regionId: any) => set({ selectedRegionId: regionId }),
}));

export default useStore;
