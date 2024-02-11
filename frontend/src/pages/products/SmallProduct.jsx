import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const SmallProduct = ({ product }) => {
  return (
    <div className="w-[20rem] ml-[2rem] p-3">
      <div className="object-contain relative">
        <img
          className="cursor-pointer w-full"
          src={product.image}
          alt={product.name}
          style={{ height: "200px", objectFit: "cover" }}
        />
        <HeartIcon product={product} />
      </div>
      <Link to={`/product/${product._id}`}>
        <div className="p-4">
          <h2 className="flex justify-between items-center">
            <div className="text-pink-500 hover:text-pink-600">{product.name}</div>
            <span className="bg-white text-pink-500 text-xs font-bold  mr-2 px-2.5 py-0.5 rounded-full">
              {product.price} RSD
            </span>
          </h2>
        </div>
      </Link>
    </div>
  );
};

export default SmallProduct;
