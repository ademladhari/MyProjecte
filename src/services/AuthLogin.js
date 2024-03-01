export const login = async (email, password) => {
  try {
    const response = await fetch("http://192.168.0.4:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ email, password }),
    });
    console.log(response);
    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();
    console.log(data);
    return data; // Return response data
  } catch (error) {
    throw error;
  }
};
