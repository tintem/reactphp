import axios from "axios";

const API_URL =  "https://67b7f5c32bddacfb27107b27.mockapi.io/product";
// const API_URL2='http://localhost:8000/api/product.php';
export const getAllProducts = async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (error) {
    console.error("Error fetching products: ", error);
    return [];
  }
};
