import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import Product from "./Product";
import { useEffect } from "react";

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);
  useEffect(() => {
    console.log(favorites);
  }, []);

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
        <div className="mt-40 text-3xl text-pink-500">
          You haven't added any products to your favorites yet
        </div>
      )}
    </div>
  );
};

export default Favorites;
