import { getApiAuth } from "../../utils/api/api"

export const getUserData = async (userId) => {
    try {
      const response = await getApiAuth.get(`login/${userId}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };