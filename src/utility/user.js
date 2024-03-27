import { decodedToken } from "./jwt";
import { getFromLocalStorage } from "./local-storage";

export const getUserInfo = () => {
  const authToken = getFromLocalStorage("accessToken");

  try {
    if (authToken) {
      const decodedData = decodedToken(authToken);
      return decodedData;
    } else {
      return "";
    }
  } catch (error) {
    return "";
  }
};
