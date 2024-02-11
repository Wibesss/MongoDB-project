import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";
import AdminMenu from "./AdminMenu";

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-semibold mb-4">All Orders </h2>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.error || error.error}</Message>
      ) : (
        <table className="w-full">
          <thead>
            <tr>
              <td className="py-2 text-center text-pink-500 font-semibold">
                IMAGE
              </td>
              <td className="py-2 text-center text-pink-500 font-semibold">
                ID
              </td>
              <td className="py-2 text-center text-pink-500 font-semibold">
                USER
              </td>
              <td className="py-2 text-center text-pink-500 font-semibold">
                DATE
              </td>
              <td className="py-2 text-center text-pink-500 font-semibold">
                TOTAL
              </td>
              <td className="py-2 text-center text-pink-500 font-semibold">
                DELIVERED
              </td>
              <td className="py-2 text-center"></td>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="p-2 flex justify-center">
                  <img
                    src={order.orderItems[0].image}
                    alt={order.user}
                    className="w-[6rem] mb-5"
                  />
                </td>

                <td className="py-2 text-center">{order._id}</td>
                <td className="py-2 text-center">
                  {order.user ? order.user.username : "N/A"}
                </td>
                <td className="py-2 text-center">
                  {order.createdAt ? order.createdAt.substring(0, 10) : "N/A"}
                </td>
                <td className="py-2 text-center">RSD {order.totalPrice}</td>

                <td className="p-2">
                  <div className="flex justify-center">
                    {order.isDelivered ? (
                      <p className="p-1 text-center bg-green-600 w-[6rem] rounded-full">
                        Delivered
                      </p>
                    ) : (
                      <p className="p-1 text-center bg-red-600 w-[6rem] rounded-full">
                        Pending
                      </p>
                    )}
                  </div>
                </td>

                <td className="px-2 py-2">
                  <Link to={`/order/${order._id}`}>
                    <button className="bg-pink-500 hover:bg-pink-600 text-back py-2 px-3 rounded">
                      View Details
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderList;
