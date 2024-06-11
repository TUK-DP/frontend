import { atom } from "recoil";

export const keywordState = atom({
  key: "keywordState",
  default: [],
});
export const indexState = atom({
  key: "indexState",
  default: 0,
});
