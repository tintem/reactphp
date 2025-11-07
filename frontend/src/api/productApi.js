import axios from "axios";

//const API_URL =  "https://67b7f5c32bddacfb27107b27.mockapi.io/product";
 
 cont API_URL ='https://be.manguonmo.top/api/product.php';
export const getAllProducts = async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data.data;
  } catch (error) {
    console.error("Error fetching products: ", error);
    return [];
  }
};
