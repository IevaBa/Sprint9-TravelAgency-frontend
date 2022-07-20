import React from "react";
import { useNavigate } from "react-router-dom";

function Countries() {
  const navigate = useNavigate();
  return (
    <div className="text-center my-4">
      <h1>Countries Page</h1>
      <button
        className="btn btn-success my-3"
        onClick={() => navigate("/countries/add")}
      >
        Add Country
      </button>
    </div>
  );
}

export default Countries;
