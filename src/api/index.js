import { createAsyncThunk } from "@reduxjs/toolkit";

const baseURL = "https://fakestoreapi.com";

export const fetchProducts = createAsyncThunk(
  "products/getAll",
  async (thunkAPI) => {
    const res = await fetch(`${baseURL}/products`)
      .then((data) => {
        return data.json();
      })
      .catch((err) => {
        return err;
      });
    return res;
  }
);
export const fetchCategories = createAsyncThunk(
  "categories/getAll",
  async (thunkAPI) => {
    try {
      const data = await fetch(`${baseURL}/products/categories`);
      const categories = await data.json();
      return categories;
    } catch (err) {
      return err;
    }
  }
);
export const getAllCategories = async () => {
  try {
    const data = await fetch(`${baseURL}/products/categories`);
    const categories = await data.json();
    return categories;
  } catch (err) {
    return err;
  }
};

export const testbackend = async () => {
  try {
    await fetch(
      "https://cerulean-cascaron-fa20ab.netlify.app/.netlify/functions/api/"
    ).then((data) => {
      console.log(data);
    });
  } catch (err) {
    console.log(err);
  }
};

export const checkout = async (product) => {
  try {
    const data = await fetch(
      "https://cerulean-cascaron-fa20ab.netlify.app/.netlify/functions/api/create-checkout-session",
      {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(product),
      }
    );
    return await data.json();
  } catch (err) {
    return err;
  }
};
