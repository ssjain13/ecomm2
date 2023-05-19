import { createAsyncThunk } from "@reduxjs/toolkit";
import { backend_api } from ".";

export const sendVerificationEmail = createAsyncThunk(
  "user/sendVerificationEmail",
  async (email) => {
    try {
      const res = await fetch(`${backend_api}/sendVerificationEmail`, {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      if (!res.ok) {
        await res.json().then((data) => {
          throw new Error(data.message);
        });
      }
      return res.json();
    } catch (err) {
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (email) => {
    try {
      const res = await fetch(`${backend_api}/resetPassword`, {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      if (!res.ok) {
        await res.json().then((data) => {
          throw new Error(data.message);
        });
      }
      return res.json();
    } catch (err) {
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
  }
);

export const disableAccount = createAsyncThunk(
  "user/disableAccount",
  async (uid) => {
    try {
      const res = await fetch(`${backend_api}/disableAccount`, {
        method: "POST",
        body: JSON.stringify({ uid }),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });

      if (!res.ok) {
        await res.json().then((data) => {
          throw new Error(data.message);
        });
      }
      return res.json();
    } catch (err) {
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
  }
);

export const enableAccount = createAsyncThunk(
  "user/enableAccount",
  async (uid) => {
    try {
      const res = await fetch(`${backend_api}/enableAccount`, {
        method: "POST",
        body: JSON.stringify({ uid }),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      if (!res.ok) {
        await res.json().then((data) => {
          throw new Error(data.message);
        });
      }
      return res.json();
    } catch (err) {
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
  }
);

export const deleteAccount = createAsyncThunk(
  "user/deleteAccount",
  async (uid) => {
    try {
      const res = await fetch(`${backend_api}/deleteAccount`, {
        method: "POST",
        body: JSON.stringify({ uid }),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      if (!res.ok) {
        await res.json().then((data) => {
          throw new Error(data.message);
        });
      }
      return res.json();
    } catch (err) {
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
  }
);
