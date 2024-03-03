import AsyncStorage from "@react-native-async-storage/async-storage";
import { getApiAuth } from "../utils/api/api";

export const login = async (email, password) => {
  try {
    const response = await getApiAuth.post(
      "login",
      {
        email,
        password,
      },
      {
        headers: {
          // Include your token in the Authorization header
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Login response:", response);

    if (!response || !response.data) {
      throw new Error("Login failed");
    }

    const { token, user } = response.data;

    // Store token in AsyncStorage
    await AsyncStorage.setItem("token", token);

    // Optionally, you can store user data as well
    await AsyncStorage.setItem("userData", JSON.stringify(user));

    return { token, user }; // Return token and user data
  } catch (error) {
    throw error;
  }
};
