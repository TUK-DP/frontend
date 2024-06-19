import { atom } from "recoil";

export const apiKeyStore = atom({
  key: "apiKeyState",
  default: {
    apiKey: "",
  },
});
