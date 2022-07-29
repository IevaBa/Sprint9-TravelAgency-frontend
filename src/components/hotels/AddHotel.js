import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function AddHotel() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [days, setDays] = useState("");
  const [country_id, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [validationError, setValidationError] = useState({});
  const [token, _] = useState(localStorage.getItem("token"));

  const navigate = useNavigate();

  // Fetch countries
  useEffect(() => {
    if (!token) return navigate("/login");
    fetch("/api/countries", {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        //  console.log(result);
        setCountries(result);
      });
  }, []);

  const addHotel = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("price", price);
    formData.append("days", days);
    formData.append("image", image);
    formData.append("country_id", country_id);

    await axios
      .post(`/api/hotels`, formData, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          text: data.message,
        });
        navigate("/hotels");
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
      <h1 className="my-4 text-center">Add Hotel</h1>
      <div className="col-sm-6 offset-sm-3">
        {Object.keys(validationError).length > 0 && (
          <div className="mb-0 alert alert-danger">
            {Object.entries(validationError).map(([key, value]) => (
              <div key={key}>{value}</div>
            ))}
          </div>
        )}
        <form onSubmit={addHotel}>
          <input
            type="text"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            className="form-control my-3"
          />
          <input
            type="file"
            placeholder="File"
            onChange={(e) => setImage(e.target.files[0])}
            className="form-control my-3"
          />
          <input
            type="number"
            placeholder="Price"
            onChange={(e) => setPrice(e.target.value)}
            className="form-control my-3"
          />
          <input
            type="number"
            placeholder="Length of the stay"
            onChange={(e) => setDays(e.target.value)}
            className="form-control my-3"
          />
          <select
            className="form-select my-3"
            onChange={(e) => setCountry(e.target.value)}
          >
            <option defaultValue disabled>
              Choose country
            </option>
            {countries.map((country, index) => (
              <option key={country.id} value={country.id}>
                {country.title}
              </option>
            ))}
          </select>
          <button type="submit" className="btn btn-success">
            Add Hotel
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
