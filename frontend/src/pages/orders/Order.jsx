import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
} from "../../redux/api/orderApiSlice";

const Order = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const deliverHandler = async () => {
    try {
      await deliverOrder(orderId);
      toast.success("Order has been marked as delivered");
    } catch (error) {
      toast.error(error);
    }
    refetch();
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error.data}</Message>
  ) : (
    <div className="container flex ml-[10rem] flex-row">
      <div className="w-2/3 pr-4">
        <div className="border border-pink-500 mt-5 pb-4 mb-5 mr-10">
          {order.orderItems.length === 0 ? (
            <Message>Order is empty</Message>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b-2 border-pink-500">
                  <tr>
                    <th className="p-2 text-center">Image</th>
                    <th className="p-2 text-center">Product</th>
                    <th className="p-2 text-center">Quantity</th>
                    <th className="p-2 text-center">Unit Price</th>
                    <th className="p-2 text-center">Total</th>
                  </tr>
                </thead>

                <tbody>
                  {order.orderItems.map((item, index) => (
                    <tr key={index}>
                      <td className="p-2 flex justify-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover items-center"
                        />
                      </td>

                      <td className="p-2 text-center">
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </td>

                      <td className="p-2 text-center">{item.qty}</td>
                      <td className="p-2 text-center">RSD {item.price}</td>
                      <td className="p-2 text-center">
                        RSD {(item.qty * item.price).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <div className="md:w-1/3">
        <div className="mt-5 border-gray-300 pb-4 mb-4">
          <h2 className="text-xl font-bold mb-2">Shipping</h2>
          <p className="mb-4 mt-4">
            <strong className="text-pink-500">Order Number: </strong>{" "}
            {order._id}
          </p>

          <p className="mb-4">
            <strong className="text-pink-500">Name:</strong>{" "}
            {order.user.username}
          </p>

          <p className="mb-4">
            <strong className="text-pink-500">Email:</strong> {order.user.email}
          </p>

          <p className="mb-4">
            <strong className="text-pink-500">Address:</strong>{" "}
            {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
            {order.shippingAddress.postalCode}, {order.shippingAddress.country}
          </p>
        </div>

        <h2 className="text-xl font-bold mb-2 mt-[3rem]">Order Summary</h2>
        <div className="flex justify-between mb-2">
          <span>Items</span>
          <span>
            {order.itemsPrice} <span className="text-pink-500"> RSD </span>{" "}
          </span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Shipping</span>
          <span>
            {order.shippingPrice} <span className="text-pink-500"> RSD </span>
          </span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Total</span>
          <span>
            {order.totalPrice} <span className="text-pink-500"> RSD </span>{" "}
          </span>
        </div>
        <div className="flex justify-between mb-2 text-pink-500">
          <span>Shipping is free for orders over 5000 RSD</span>
        </div>

        {loadingDeliver && <Loader />}

        {userInfo && userInfo.isAdmin && !order.isDelivered && (
          <div>
            <button
              type="button"
              className="bg-pink-500 hover:bg-pink-600 text-white w-full py-2 mt-6"
              onClick={deliverHandler}
            >
              Mark As Delivered
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
