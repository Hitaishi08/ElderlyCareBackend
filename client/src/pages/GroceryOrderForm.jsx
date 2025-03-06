import { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const GroceryOrderForm = ({ fetchOrders }) => {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);
  const [itemOptions, setItemOptions] = useState([]);
  const [orderData, setOrderData] = useState({ items: [], requestedBy: "", status: "pending" });

  // Get token and userId from localStorage
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId"); // Ensure userId is stored in localStorage

  // Check authentication on mount
  useEffect(() => {
    if (!token || !userId) {
      toast.error("Unauthorized! Please log in.");
      navigate("/login");
    } else {
      setOrderData((prev) => ({ ...prev, requestedBy: userId })); // Set user ID
    }
  }, [token, userId, navigate]);

  console.log("Token:", token);
  console.log("User ID:", userId);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, [token]);

  // Fetch grocery items
  useEffect(() => {
    const fetchGroceries = async () => {
      try {
        const res = await axios.get("https://world.openfoodfacts.org/api/v2/search?fields=product_name");
        const options = res.data.products.map((item) => ({ label: item.product_name, value: item.product_name }));
        setItemOptions(options);
      } catch (error) {
        toast.error("Error fetching groceries!");
      }
    };
    fetchGroceries();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Unauthorized! Please log in again.");
      navigate("/login");
      return;
    }

    if (!orderData.requestedBy) {
      toast.error("User ID is missing. Please log in again.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/groceries",
        {
          items: selectedItems.map((item) => ({ name: item.value, quantity: 1 })),
          requestedBy: orderData.requestedBy, // ✅ Ensure user ID is included
          status: "pending",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Order Placed Successfully!");
      setSelectedItems([]);
      fetchOrders();
    } catch (error) {
      console.error("Order Error:", error.response);
      if (error.response?.status === 401) {
        toast.error("Session expired! Please log in again.");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        toast.error(error.response?.data?.message || "Failed to place order!");
      }
    }
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg w-96">
      <h3 className="text-lg font-semibold mb-3">Request Groceries</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <Select options={itemOptions} isMulti placeholder="Select grocery items..." onChange={setSelectedItems} />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Place Order</button>
      </form>
      <div>
</div>

    </div>
  );
};

export default GroceryOrderForm;
