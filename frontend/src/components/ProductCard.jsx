export default function ProductCard({ product }) {
  return (
    <div className="card h-100 shadow-sm">
      <hr />
      <img
        src={product.image}
        className="card-img-top"
        alt={product.name}
        style={{ height: "200px", objectFit: "contain" }}
      />
      <div className="card-body">
        <h6 className="card-title">{product.name}</h6>
        <p className="card-text text-success fw-bold">${product.price}</p>
      </div>
    </div>
  );
}
