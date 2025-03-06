import { useState } from "react";
import GroceryOrderForm from "./GroceryOrderForm";
import GroceryOrderList from "./GroceryOrderList";

const GroceryApp = () => {
  const [reload, setReload] = useState(false);

  const fetchOrders = () => setReload(!reload);

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Grocery & Essentials Ordering</h2>
      <GroceryOrderForm fetchOrders={fetchOrders} />
      <GroceryOrderList key={reload} />
    </div>
  );
};

export default GroceryApp;
