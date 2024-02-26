import React, { useRef, useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Import axios or any other HTTP client library compatible with React Native
// Make sure to configure it properly for your environment

const LOGIN_URL = "/auth"; // Update with your actual login endpoint

const login = () => {
  const navigation = useNavigation();

  const userRef = useRef(null);
  const pwdRef = useRef(null);

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async () => {
    try {
      // Perform login request using your HTTP client library (e.g., axios)
      // Update headers and request configuration as needed
      const response = await axios.post(LOGIN_URL, { user, pwd });

      // Handle successful login response
      console.log(JSON.stringify(response.data));
      // Assuming response contains accessToken and roles
      const accessToken = response.data.accessToken;
      const roles = response.data.roles;

      // Navigate to home or another screen upon successful login
      navigation.navigate("Home");
    } catch (err) {
      // Handle login error
      console.error("Login failed:", err);

      // Update error message based on error status
      if (!err.response) {
        setErrMsg("No Server Response");
      } else if (err.response.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.errorMsg}>{errMsg}</Text>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        ref={userRef}
        style={styles.input}
        placeholder="Username"
        onChangeText={setUser}
        value={user}
      />
      <TextInput
        ref={pwdRef}
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={setPwd}
        value={pwd}
      />
      <Button title="Sign In" onPress={handleSubmit} />
      <Text style={styles.signUpText}>
        Need an Account?{"\n"}
        <Text
          style={styles.link}
          onPress={() => navigation.navigate("Register")}
        >
          Sign Up
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  errorMsg: {
    color: "red",
    marginBottom: 10,
  },
  signUpText: {
    marginTop: 20,
    textAlign: "center",
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
  },
});

export default login;
