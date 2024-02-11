import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import Product from "./Product";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);

  return (
    <div className="ml-[10rem]">
      <h1 className="text-2xl mt-4 font-semibold mb-4">Favorties Products</h1>

      {favorites.length > 0 ? (
        <div className="flex flex-wrap">
          {favorites.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="mt-40 text-3xl">
          You haven't added any products to your favorites yet, go back to the{" "}
          <Link to={"/shop"} className="text-pink-500 hover:text-pink-600">
            shop
          </Link>
          .
        </div>
      )}
    </div>
  );
};

export default Favorites;
