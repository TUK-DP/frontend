import { atom } from "recoil";

export const selectedColorState = atom({
  key: "selectedColorState",
  default: "#000000",
});
export const brushSizeState = atom({
  key: "brushSizeState",
  default: 3,
});
