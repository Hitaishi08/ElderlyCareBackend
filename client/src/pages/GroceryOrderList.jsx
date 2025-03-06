import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const GroceryOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null); // Store user details

  useEffect(() => {
    fetchUserDetails();
    fetchOrders();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data); // Store user details (including role)
    } catch (error) {
      console.error("Failed to fetch user details", error);
      toast.error("Failed to fetch user details!");
    }
  };

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/groceries", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch (error) {
      console.error("Failed to fetch orders", error);
      toast.error("Failed to fetch orders!");
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/groceries/${orderId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`Order marked as ${newStatus}`);
      fetchOrders();
    } catch (error) {
      toast.error("Failed to update order status");
    }
  };

  return (
    <div className="w-3/4 bg-white p-4 rounded-lg shadow mt-6">
      <h3 className="text-lg font-semibold mb-3">Grocery Orders</h3>
      {orders.length === 0 ? (
        <p className="text-gray-500">No orders available.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order._id} className="p-3 border-b flex justify-between">
              <div>
                {/* Fix: Display user name instead of object */}
                <strong>Requested By:</strong> {order.requestedBy.name} <br />

                <strong>Items:</strong>
                <ul className="list-disc pl-5">
                  {order.items.map((item, index) => (
                    <li key={index}>{item.name} (Qty: {item.quantity})</li>
                  ))}
                </ul>
                <strong>Status:</strong> {order.status}
              </div>
              <div>
                {/* Only show "Accept Order" if user exists, is not an elder, and the order is not their own */}
                {user && order.status === "pending" && user.role !== "elder" && order.requestedBy._id !== user._id && (
                  <button
                    onClick={() => updateOrderStatus(order._id, "accepted")}
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Accept Order
                  </button>
                )}

                {/* Show "Mark as Delivered" only for accepted orders */}
                {user && order.status === "accepted" && user.role !== "elder" && order.requestedBy._id !== user._id && (
                  <button
                    onClick={() => updateOrderStatus(order._id, "delivered")}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Mark as Delivered
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GroceryOrderList;
