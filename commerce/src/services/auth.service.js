import axios from "axios";

const API_URL = "http://162.19.65.77:8080/authenticate";

const register = (username, email, password) => {
  return axios
    .post("http://192.168.10.79:8080/users", {
      username: username,
      email: email,
      password: password,
    })
    .then((response) => {
      console.log(response);
      if (response.data.token) {
        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.setItem(
          "username",
          JSON.stringify(response.data.username)
        );
      }
      return response.data;
    });
};

const login = (username, password) => {
  return axios
    .post(API_URL, {
      username,
      password,
    })
    .then((response) => {
      console.log(response);
      if (response.data.token) {
        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.setItem(
          "username",
          JSON.stringify(response.data.username)
        );
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("username");
  localStorage.removeItem("token");
  window.location.reload();
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("username"));
};
const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
