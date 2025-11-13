import axios from "axios";

// ✅ Always send cookies (session ID) with every request
axios.defaults.withCredentials = true;

// ✅ Base URLs
export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export const USERS_API = `${HTTP_SERVER}/api/users`;

// ✅ Sign in a user
export const signin = async (credentials: any) => {
  const response = await axios.post(`${USERS_API}/signin`, credentials);
  return response.data;
};

// ✅ Sign up a new user
export const signup = async (user: any) => {
  const response = await axios.post(`${USERS_API}/signup`, user);
  return response.data;
};

// ✅ Get the current signed-in user's profile
export const profile = async () => {
  const response = await axios.post(`${USERS_API}/profile`);
  return response.data;
};

// ✅ Sign out the current user
export const signout = async () => {
  const response = await axios.post(`${USERS_API}/signout`);
  return response.data;
};

// ✅ Update a user's profile
export const updateUser = async (user: any) => {
  const response = await axios.put(`${USERS_API}/${user._id}`, user);
  return response.data;
};
