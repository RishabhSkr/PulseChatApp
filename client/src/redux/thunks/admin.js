import { createAsyncThunk } from "@reduxjs/toolkit";
import { SERVER_URL } from "../../constants/config";
import axios from "axios";

const adminLogin = createAsyncThunk("admin/login", async (secretKey) => {
  try {
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${SERVER_URL}/api/v1/admin/verify`,
      { secretKey },
      config
    );

    return data.message;
  } catch (error) {
    throw error.response.data.message;
  }
});

const getAdmin = createAsyncThunk("admin/getAdmin", async () => {
  try {
    const { data } = await axios.get(`${SERVER_URL}/api/v1/admin/`, {
      withCredentials: true,
    });

    return data.admin;
  } catch (error) {
    throw error.response.data.message;
  }
});

const adminLogout = createAsyncThunk("admin/logout", async () => {
  try {
    const { data } = await axios.get(`${SERVER_URL}/api/v1/admin/logout`, {
      withCredentials: true,
    });

    return data.message;
  } catch (error) {
    throw error.response.data.message;
  }
});

export { adminLogin, getAdmin, adminLogout };