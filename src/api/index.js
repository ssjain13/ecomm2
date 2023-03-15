import { createAsyncThunk } from "@reduxjs/toolkit";

const baseURL = "https://fakestoreapi.com";

//const backend_api = process.env.PROD_URL;
const backend_api = "http://localhost:3030";

export const authenticate = createAsyncThunk(
  "user/login",
  async (credentials) => {
    try {
      const res = await fetch(`${backend_api}/login`, {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      if (!res.ok) {
        await res.json().then((data) => {
          throw new Error(data.code);
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
export const fetchProducts = createAsyncThunk(
  "products/getAll",
  async (thunkAPI) => {
    const res = await fetch(`${backend_api}/fetchProducts`)
      .then((data) => {
        return data.json();
      })
      .catch((err) => {
        return err;
      });
    return res;
  }
);

export const fetchProductsCount = createAsyncThunk(
  "products/fetchProductsCount",
  async (category) => {
    const res = await fetch(
      `${backend_api}/getCountByCategory?` + new URLSearchParams({ category })
    )
      .then((data) => {
        return data.json();
      })
      .catch((err) => {
        return err;
      });
    return res;
  }
);

export const saveCategory = createAsyncThunk(
  "categories/save",
  async (category) => {
    try {
      console.log(category);
      const data = await fetch(`${backend_api}/saveCategory`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(category),
      });

      return await data.json();
    } catch (err) {
      return err;
    }
  }
);

export const saveProduct = createAsyncThunk(
  "products/save",
  async (product) => {
    try {
      const data = await fetch(`${backend_api}/saveProduct`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(product),
      });

      return await data.json();
    } catch (err) {
      return err;
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/update",
  async (product) => {
    try {
      const data = await fetch(`${backend_api}/updateProduct`, {
        method: "PUT", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(product),
      });

      return await data.json();
    } catch (err) {
      return err;
    }
  }
);

export const updateCategory = createAsyncThunk(
  "categories/update",
  async (category) => {
    try {
      const data = await fetch(`${backend_api}/updateCategory`, {
        method: "PUT", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(category),
      });

      return await data.json();
    } catch (err) {
      return err;
    }
  }
);

export const deleteProduct = createAsyncThunk("products/delete", async (id) => {
  try {
    const data = await fetch(`${backend_api}/deleteProduct`, {
      method: "DELETE", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ id }),
    });

    return await data.json();
  } catch (err) {
    console.log(err);
  }
});

export const deleteCategory = createAsyncThunk(
  "categories/delete",
  async (id) => {
    try {
      const data = await fetch(`${backend_api}/deleteCategory`, {
        method: "DELETE", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ id }),
      });

      return await data.json();
    } catch (err) {
      console.log(err);
    }
  }
);

export const fetchCategories = createAsyncThunk(
  "categories/getAll",
  async (thunkAPI) => {
    try {
      const data = await fetch(`${backend_api}/fetchCategories`);
      const categories = await data.json();
      return categories;
    } catch (err) {
      return err;
    }
  }
);

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
