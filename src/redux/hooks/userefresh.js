import axios from "axios"; // Adjust the import path for Axios
import { useEffect } from "react"; // Import useEffect
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  useEffect(() => {
    const source = axios.CancelToken.source();

    return () => {
      source.cancel("Request canceled by cleanup");
    };
  }, []);

  const refresh = async () => {
    try {
      const response = await axios.get("/refresh", {
        // Adjust any request configurations as needed
        // For example, adding headers or handling cookies
      });

      setAuth((prev) => ({
        ...prev,
        accessToken: response.data.accessToken,
      }));

      return response.data.accessToken;
    } catch (error) {
      console.error("Error refreshing token:", error);
      throw error; // Rethrow the error for handling elsewhere if needed
    }
  };

  return refresh;
};

export default useRefreshToken;
