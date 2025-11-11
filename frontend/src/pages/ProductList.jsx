import { useEffect, useState } from "react";
import { getAllProducts } from "../api/productApi";
import ProductCard from "../components/ProductCard";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getAllProducts();
      setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  if (loading) return <p className="text-center mt-4">Đang tải sản phẩm...</p>;

  return (
    <div className="container mt-4">
      <h3 className="mb-3 text-center">Danh Mục Sách...11.11</h3>
      <div className="row g-3">
        {products.map((p) => (
          <div key={p.id} className="col-md-3">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
}
