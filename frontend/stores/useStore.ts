import { create } from 'zustand'

const useStore = create((set) => ({
  postcode: null,
  setPostcode: (postcode: any) => set({ postcode }),

  intensityPostcodeData: null,
  setIntensityPostcodeData: (data: any) => set({ intensityPostcodeData: data }),

}))

export default useStore