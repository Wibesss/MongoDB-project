import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import Message from "../../components/Message";
import { Link } from "react-router-dom";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="mb-4 block">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Slider
          {...settings}
          className="xl:w-[50rem]  lg:w-[50rem] md:w-[56rem] sm:w-[40rem] sm:block"
        >
          {products.map(
            ({
              image,
              _id,
              name,
              price,
              description,
              brand,
              createdAt,
              numReviews,
              rating,
              quantity,
              countInStock,
            }) => (
              <div key={_id}>
                <Link to={`/product/${_id}`}>
                  <img
                    src={image}
                    alt={name}
                    className="w-full rounded-lg object-cover h-[30rem]"
                  />

                  <div className="mt-4 flex justify-between">
                    <div className="one flex flex-col w-1/2">
                      <h2 className="text-pink-500 hover:text-pink-600 font-bold text-3xl">{name}</h2>
                      <p className="font-bold mt-6 text-2xl">{price} RSD</p>
                      <p className="w-[25rem] mt-6">
                        {description.substring(0, 170)} ...
                      </p>
                    </div>

                    <div className="flex justify-between w-1/2 ml-10">
                      <div className="two">
                        <h1 className="flex items-center mb-6">
                          <FaStore className="mr-2 text-pink-500" /> Brand: {brand}
                        </h1>
                        <h1 className="flex items-center mb-6">
                          <FaClock className="mr-2 text-pink-500" /> Added:{" "}
                          {moment(createdAt).fromNow()}
                        </h1>
                        <h1 className="flex items-center mb-6">
                          <FaStar className="mr-2 text-pink-500" /> Reviews:{" "}
                          {numReviews}
                        </h1>
                      </div>

                      <div className="two">
                        <h1 className="flex items-center mb-6">
                          <FaStar className="mr-2 text-pink-500" /> Ratings:{" "}
                          {Math.round(rating)}
                        </h1>
                        <h1 className="flex items-center mb-6">
                          <FaShoppingCart className="mr-2 text-pink-500" />{" "}
                          Quantity: {quantity}
                        </h1>
                        <h1 className="flex items-center mb-6">
                          <FaBox className="mr-2 text-pink-500" /> In Stock:{" "}
                          {countInStock}
                        </h1>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )
          )}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;
