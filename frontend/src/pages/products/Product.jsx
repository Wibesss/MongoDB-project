import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="w-[30rem] ml-[2rem] p-3 relative">
      <div className="object-contain relative">
        <img
          className="cursor-pointer w-full"
          src={product.image}
          alt={product.name}
          style={{ height: "300px", objectFit: "cover" }}
        />
        <HeartIcon product={product} />
      </div>

      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex justify-between items-center">
            <div className="text-lg text-pink-500 hover:text-pink-600">
              {product.name}
            </div>
            <span className="bg-white text-pink-500 text-sm font-bold mr-2 p-2 rounded-full">
              {product.price}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default Product;
