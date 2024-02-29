import { getApi } from "../utils/api/api";
export const data = async () => {
  try {
    const response = await getApi.get("testing");
    
    return response;
  } catch (Error) {
    throw Error;
  }
};
