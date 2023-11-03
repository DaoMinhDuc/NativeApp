import axios from "axios";
import { loginUrl, registerUrl, customerUrl } from "./api";
import { RegisterBody } from "../interface/RegisterBody";
import { LoginBody } from "../interface/LoginBody";

export const registerApi = ({ fullName, email, password, phoneNumber }: RegisterBody) => {
  const registerRequest = axios({
    method: "POST",
    url: registerUrl,
    data: { fullName, email, password, phoneNumber},
    headers: {
      "Content-Type": "application/json",
    },
  });
  return registerRequest;
};

export const loginApi = ({ email, password }: LoginBody) => {
  const loginRequest = axios({
    method: "POST",
    url: loginUrl,
    data: { email, password },
    headers: {
      "Content-Type": "application/json",
    },
  });
  return loginRequest;
};

export const profileApi = async () => {
  try {
    const response = await axios.get(customerUrl + "profile");
    const data = await response.data;
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
