import React from "react";
import { useNavigate } from "react-router-dom";

function Hotels() {
  const navigate = useNavigate();
  return (
    <div className="text-center my-4">
      <h1>Hotels Page</h1>
      <button
        className="btn btn-success my-3"
        onClick={() => navigate("/hotels/add")}
      >
        Add Hotel
      </button>
    </div>
  );
}

export default Hotels;
