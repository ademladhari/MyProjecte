// services/authService.js
export const login = async (username, password) => {
  try {
    // Simulating login request
    const response = await fetch("http://localhost:3000/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();
    return data.token; // Assuming your API returns a token upon successful login
  } catch (error) {
    throw error;
  }
};
