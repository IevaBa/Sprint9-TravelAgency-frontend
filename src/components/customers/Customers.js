import React from "react";
import { useNavigate } from "react-router-dom";

function Customers() {
  const navigate = useNavigate();
  return (
    <div className="text-center my-4">
      <h1>Customers Page</h1>
      <button
        className="btn btn-success my-3"
        onClick={() => navigate("/hotels/add")}
      >
        Add Customer
      </button>
    </div>
  );
}

export default Customers;
