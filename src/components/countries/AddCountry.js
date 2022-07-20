import React from "react";
import { useNavigate } from "react-router-dom";

function AddCountry() {
  const navigate = useNavigate();
  return (
    <div className="text-center my-4">
      <h1>Add Country</h1>
      <button className="btn btn-secondary my-3" onClick={() => navigate(-1)}>
        Cancel
      </button>
    </div>
  );
}

export default AddCountry;
