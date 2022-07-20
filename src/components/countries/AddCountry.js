import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function AddCountry() {
  const [title, setTitle] = useState("");
  const [season, setSeason] = useState("");
  const navigate = useNavigate();
  const [validationError, setValidationError] = useState({});

  const addCountry = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("season", season);

    await axios
      .post(`http://localhost:8000/api/countries`, formData)
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          text: data.message,
        });
        navigate("/countries");
      })
      .catch(({ response }) => {
        if (response.status === 422) {
          setValidationError(response.data.errors);
        } else {
          Swal.fire({
            text: response.data.error,
            icon: "error",
          });
        }
      });
  };

  return (
    <div>
      <h1 className="my-4 text-center">Add Country</h1>
      <div className="col-sm-6 offset-sm-3">
        {Object.keys(validationError).length > 0 && (
          <div className="mb-0 alert alert-danger">
            {Object.entries(validationError).map(([key, value]) => (
              <div key={key}>{value}</div>
            ))}
          </div>
        )}
        <form onSubmit={addCountry}>
          <input
            type="text"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            className="form-control my-3"
          />
          <select
            className="form-select my-3"
            onChange={(e) => setSeason(e.target.value)}
          >
            <option defaultValue disabled>
              Choose season
            </option>
            <option value="Spring">Spring</option>
            <option value="Summer">Summer</option>
            <option value="Autumn">Autumn</option>
            <option value="Winter">Winter</option>
            <option value="All year">All year</option>
          </select>
          <button type="submit" className="btn btn-success">
            Add Country
          </button>
          <button
            className="btn btn-secondary mx-2"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddCountry;
